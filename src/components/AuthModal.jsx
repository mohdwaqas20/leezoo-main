import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const { login, register } = useAuth();
  const firstInputRef = useRef(null);

  // Focus first input on open / mode switch
  useEffect(() => {
    const t = setTimeout(() => firstInputRef.current?.focus({ preventScroll: true }), 120);
    return () => clearTimeout(t);
  }, [mode]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const isValid =
    email &&
    password &&
    (mode === 'login' || name.trim().length >= 2);

  const handle = async () => {
    if (!isValid) return;
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
        setSuccess('Welcome back!');
        setTimeout(onClose, 700);
      } else {
        await register(email, password, name.trim());
        setSuccess('Account created! Check your email to confirm.');
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode((m) => (m === 'login' ? 'register' : 'login'));
    setError('');
    setSuccess('');
  };

  const inputStyle = {
    width: '100%',
    padding: '0.9rem 1rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--border)',
    color: 'var(--dark)',
    fontFamily: 'Jost,sans-serif',
    fontSize: '0.8rem',
    letterSpacing: '0.05em',
    outline: 'none',
    marginBottom: '0.8rem',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(4px)',
          animation: 'authBackdropIn 0.25s ease both',
        }}
      />

      <style>{`
        @keyframes authModalIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        @keyframes authBackdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* Modal */}
      <div
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          zIndex: 1001, background: 'var(--surface)',
          padding: '3rem', width: 420, maxWidth: '92vw',
          border: '1px solid var(--border)',
          animation: 'authModalIn 0.28s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1.2rem', right: '1.5rem',
            background: 'none', border: 'none', color: 'var(--dark)',
            cursor: 'pointer', opacity: 0.4, fontSize: '0.9rem',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.4)}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: '2.2rem', letterSpacing: '0.08em', marginBottom: '0.3rem',
        }}>
          {mode === 'login' ? 'WELCOME BACK' : 'JOIN LEEZOO'}
        </h2>
        <p style={{
          fontSize: '0.6rem', letterSpacing: '0.15em',
          opacity: 0.4, marginBottom: '2rem', textTransform: 'uppercase',
        }}>
          {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
        </p>

        {/* Name field — register only */}
        {mode === 'register' && (
          <input
            ref={firstInputRef}
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          />
        )}

        <input
          ref={mode === 'login' ? firstInputRef : undefined}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          onKeyDown={(e) => e.key === 'Enter' && handle()}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
        />

        {error && (
          <p style={{
            fontSize: '0.65rem', color: '#ff6b6b',
            marginBottom: '1rem', letterSpacing: '0.05em',
          }}>
            {error}
          </p>
        )}
        {success && (
          <p style={{
            fontSize: '0.65rem', color: 'var(--accent)',
            marginBottom: '1rem', letterSpacing: '0.05em',
          }}>
            {success}
          </p>
        )}

        {/* Submit */}
        <button
          onClick={handle}
          disabled={loading || !isValid}
          style={{
            width: '100%', padding: '1rem',
            background: 'var(--white)', color: 'var(--ink)',
            border: 'none', cursor: loading ? 'wait' : 'pointer',
            fontFamily: 'Jost,sans-serif', fontSize: '0.65rem',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            marginBottom: '1rem',
            opacity: !isValid ? 0.45 : 1,
            transition: 'background 0.25s, opacity 0.25s',
          }}
          onMouseEnter={(e) => { if (isValid) e.currentTarget.style.background = 'var(--accent)'; }}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--white)')}
        >
          {loading ? '···' : mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>

        {/* Toggle mode */}
        <p style={{
          fontSize: '0.62rem', letterSpacing: '0.1em',
          opacity: 0.45, textAlign: 'center',
        }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={switchMode}
            style={{
              background: 'none', border: 'none',
              color: 'var(--accent)', cursor: 'pointer',
              fontSize: '0.62rem', letterSpacing: '0.1em',
              textDecoration: 'underline',
            }}
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </>
  );
}