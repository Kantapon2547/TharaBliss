// components/DecoratedBackground.tsx
'use client';

import { useEffect, useState } from 'react';

export default function DecoratedBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate coordinates relative to center of the viewport
      const x = (e.clientX - window.innerWidth / 2) / 40; // subtle movement divisor
      const y = (e.clientY - window.innerHeight / 2) / 40;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 0,
        overflow: 'hidden',
        backgroundColor: '#FAFAF7',
      }}
    >
      <style>{`
        /* ── GENTLE BACKGROUND SWAYS ── */
        @keyframes sway-rotate-1 {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: translate3d(15px, -20px, 0) rotate(15deg); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        }
        @keyframes sway-rotate-2 {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: translate3d(-20px, 15px, 0) rotate(-20deg); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        }
        @keyframes sway-rotate-3 {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: translate3d(20px, 20px, 0) rotate(10deg); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        }
        .thara-sway-1 {
          animation: sway-rotate-1 22s infinite ease-in-out;
        }
        .thara-sway-2 {
          animation: sway-rotate-2 26s infinite ease-in-out;
        }
        .thara-sway-3 {
          animation: sway-rotate-3 24s infinite ease-in-out;
        }
      `}</style>

      {/* ── 1. AMBIENT GLOWING BLOBS (MESH GRADIENTS + MOUSE PARALLAX) ── */}
      {/* Blob 1: Forest Green (Top Left) */}
      <div
        className="animate-blob-1"
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-15%',
          width: '55vw',
          height: '55vw',
          willChange: 'transform',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: 'rgba(15, 110, 86, 0.05)', // #0F6E56 with 5% opacity
            filter: 'blur(100px)',
            transform: `translate3d(${mousePos.x * 0.7}px, ${mousePos.y * 0.7}px, 0)`,
            transition: 'transform 1.6s cubic-bezier(0.15, 0.85, 0.45, 1)',
          }}
        />
      </div>

      {/* Blob 2: Warm Gold/Cream (Bottom Right) */}
      <div
        className="animate-blob-2"
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-15%',
          width: '60vw',
          height: '60vw',
          willChange: 'transform',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: 'rgba(251, 245, 221, 0.09)', // #FBF5DD with 9% opacity
            filter: 'blur(120px)',
            transform: `translate3d(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px, 0)`,
            transition: 'transform 1.8s cubic-bezier(0.15, 0.85, 0.45, 1)',
          }}
        />
      </div>

      {/* Blob 3: Soft Aqua/Teal (Middle Left) */}
      <div
        className="animate-blob-3"
        style={{
          position: 'absolute',
          top: '30%',
          left: '-10%',
          width: '45vw',
          height: '45vw',
          willChange: 'transform',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: 'rgba(217, 239, 234, 0.08)', // #D9EFEA with 8% opacity
            filter: 'blur(90px)',
            transform: `translate3d(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px, 0)`,
            transition: 'transform 1.5s cubic-bezier(0.15, 0.85, 0.45, 1)',
          }}
        />
      </div>

      {/* ── 2. SUBTLE ORGANIC WAVE LINES (THARA/WATER CONCEPT) ── */}
      {/* Wave on the Right side */}
      <div className="thara-sway-2" style={{ position: 'absolute', right: 0, top: '15%', zIndex: 1 }}>
        <svg
          style={{
            width: '320px',
            height: '600px',
            opacity: 0.22,
            color: '#0F6E56',
          }}
          viewBox="0 0 100 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 100 0 Q 30 50 100 100 T 100 200"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
          <path
            d="M 100 15 Q 40 65 100 115 T 100 215"
            stroke="currentColor"
            strokeWidth="0.3"
            strokeDasharray="2 3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Wave on the Left side */}
      <div className="thara-sway-1" style={{ position: 'absolute', left: 0, bottom: '10%', zIndex: 1 }}>
        <svg
          style={{
            width: '380px',
            height: '500px',
            opacity: 0.18,
            color: '#0F6E56',
          }}
          viewBox="0 0 100 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 50 Q 70 100 0 150 T 0 250"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeLinecap="round"
          />
          <path
            d="M 0 35 Q 60 85 0 135 T 0 235"
            stroke="currentColor"
            strokeWidth="0.25"
            strokeDasharray="3 3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ── 3. FLOATING BOTANICAL LEAF SHAPES (WELLNESS & AROMA CONCEPT) ── */}
      {/* Leaf 1: Top Right */}
      <div
        className="thara-sway-3"
        style={{
          position: 'absolute',
          top: '12%',
          right: '8%',
          color: '#0F6E56',
          opacity: 0.08,
          transformOrigin: 'center',
          willChange: 'transform',
        }}
      >
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58-1 8-1.2 1.8-3.1 3.2-5 3.8-1 .3-1.6 1.3-1.6 2.2V20Z" />
          <path d="M19 2c-2.2 4.9-6 8.3-8.6 12" />
        </svg>
      </div>

      {/* Leaf 2: Bottom Left */}
      <div
        className="thara-sway-1"
        style={{
          position: 'absolute',
          bottom: '18%',
          left: '7%',
          color: '#0F6E56',
          opacity: 0.06,
          transformOrigin: 'center',
          transform: 'rotate(-45deg)',
          willChange: 'transform',
        }}
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58-1 8-1.2 1.8-3.1 3.2-5 3.8-1 .3-1.6 1.3-1.6 2.2V20Z" />
          <path d="M19 2c-2.2 4.9-6 8.3-8.6 12" />
        </svg>
      </div>

      {/* Leaf 3: Middle Right */}
      <div
        className="thara-sway-2"
        style={{
          position: 'absolute',
          top: '55%',
          right: '12%',
          color: '#0F6E56',
          opacity: 0.05,
          transformOrigin: 'center',
          transform: 'rotate(35deg)',
          willChange: 'transform',
        }}
      >
        <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58-1 8-1.2 1.8-3.1 3.2-5 3.8-1 .3-1.6 1.3-1.6 2.2V20Z" />
          <path d="M19 2c-2.2 4.9-6 8.3-8.6 12" />
        </svg>
      </div>

      {/* ── 4. PREMIUM TACTILE NOISE GRAIN OVERLAY ── */}
      <div
        className="bg-noise"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.028, // extremely subtle paper texture
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}
