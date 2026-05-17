import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [success, setSuccess] = useState('');
  const { login, register } = useAuth();

  const handle = async () => {
    setError(''); setSuccess(''); setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
        setSuccess('Welcome back!');
        setTimeout(onClose, 800);
      } else {
        await register(email, password);
        setSuccess('Account created! Check your email to confirm.');
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem 1rem', background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--border)', color: 'var(--white)',
    fontFamily: 'Barlow,sans-serif', fontSize: '0.8rem', letterSpacing: '0.05em',
    outline: 'none', marginBottom: '0.8rem', boxSizing: 'border-box',
  };

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.7)' }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        zIndex: 1001, background: 'var(--mid)', padding: '3rem',
        width: 400, maxWidth: '90vw', border: '1px solid var(--border)',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '1.2rem', right: '1.5rem', background: 'none', border: 'none',
          color: 'var(--white)', cursor: 'pointer', opacity: 0.4, fontSize: '0.9rem',
        }}>✕</button>

        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '2.2rem', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
          {mode === 'login' ? 'WELCOME BACK' : 'JOIN LEEZOO'}
        </h2>
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', opacity: 0.4, marginBottom: '2rem', textTransform: 'uppercase' }}>
          {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
        </p>

        <input type="email" placeholder="Email address" value={email}
          onChange={e => setEmail(e.target.value)} style={inputStyle} />
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} style={inputStyle}
          onKeyDown={e => e.key === 'Enter' && handle()} />

        {error && <p style={{ fontSize: '0.65rem', color: '#ff6b6b', marginBottom: '1rem', letterSpacing: '0.05em' }}>{error}</p>}
        {success && <p style={{ fontSize: '0.65rem', color: '#25D366', marginBottom: '1rem', letterSpacing: '0.05em' }}>{success}</p>}

        <button onClick={handle} disabled={loading || !email || !password} style={{
          width: '100%', padding: '1rem', background: 'var(--white)', color: 'var(--ink)',
          border: 'none', cursor: loading ? 'wait' : 'pointer', fontFamily: 'Barlow,sans-serif',
          fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem',
          opacity: (!email || !password) ? 0.5 : 1, transition: 'background 0.25s',
        }}
          onMouseEnter={e => { if (email && password) e.currentTarget.style.background = 'var(--accent)'; }}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--white)'}
        >
          {loading ? '...' : mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>

        <p style={{ fontSize: '0.62rem', letterSpacing: '0.1em', opacity: 0.45, textAlign: 'center' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setSuccess(''); }}
            style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '0.62rem', letterSpacing: '0.1em', textDecoration: 'underline' }}>
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </>
  );
}
