// src/components/VideoIntro.jsx
import { useState, useEffect, useRef, useCallback } from 'react';

const DISPLAY_DURATION = 1700; // ms before exit starts
const MAX_WAIT = 3000;         // hard cap — site shows no matter what after this

export default function VideoIntro({ children }) {
  const videoRef = useRef(null);
  const [phase, setPhase] = useState('video'); // 'video' | 'exiting' | 'done'
  const exitedRef = useRef(false);             // guard against double-calls

  const beginExit = useCallback(() => {
    if (exitedRef.current) return;
    exitedRef.current = true;
    setPhase('exiting');
    setTimeout(() => setPhase('done'), 900);
  }, []);

  useEffect(() => {
    const vid = videoRef.current;

    // Hard fallback — always fires, ensures site is never permanently hidden
    const hardTimer = setTimeout(beginExit, MAX_WAIT);

    // Normal timer — fires after intended display duration
    const displayTimer = setTimeout(beginExit, DISPLAY_DURATION);

    if (vid) {
      // If video errors or stalls, bail out immediately
      const onError = () => beginExit();
      const onStall = () => beginExit();
      vid.addEventListener('error', onError);
      vid.addEventListener('stalled', onStall);

      vid.play().catch(() => {
        // Autoplay blocked — skip intro immediately
        beginExit();
      });

      return () => {
        clearTimeout(hardTimer);
        clearTimeout(displayTimer);
        vid.removeEventListener('error', onError);
        vid.removeEventListener('stalled', onStall);
      };
    }

    return () => {
      clearTimeout(hardTimer);
      clearTimeout(displayTimer);
    };
  }, [beginExit]);

  // If already done, render children directly with no wrapper overhead
  if (phase === 'done') {
    return <>{children}</>;
  }

  return (
    <>
      {/* ── Video overlay ─────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#1a0f08',
          opacity: phase === 'exiting' ? 0 : 1,
          transition: phase === 'exiting'
            ? 'opacity 0.75s cubic-bezier(0.4, 0, 0.2, 1)'
            : 'none',
          pointerEvents: phase === 'exiting' ? 'none' : 'all',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source
            src="https://tpsjxaqxsedgshxiqvst.supabase.co/storage/v1/object/public/Web%20images%20Home%20LEEZOO/gemini_generated_video_256EA6B6.mov"
            type="video/mp4"
          />
        </video>

        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(245,237,224,0.55)',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '1.1rem',
            letterSpacing: '0.35em',
            opacity: phase === 'exiting' ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
        />
      </div>

      {/* ── Main site — visible during exiting phase so fade-in works ── */}
      <div
        style={{
          opacity: phase === 'exiting' ? 1 : 0,
          transform: phase === 'exiting' ? 'scale(1) translateY(0)' : 'scale(1.04) translateY(18px)',
          filter: phase === 'exiting' ? 'blur(0px)' : 'blur(8px)',
          transition: phase === 'exiting'
            ? 'opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1), transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), filter 0.85s ease'
            : 'none',
          visibility: phase === 'video' ? 'hidden' : 'visible',
        }}
      >
        {children}
      </div>
    </>
  );
}