// components/DecoratedBackground.tsx
'use client';

export default function DecoratedBackground() {
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
      {/* ── 1. AMBIENT GLOWING BLOBS (MESH GRADIENTS) ── */}
      {/* Blob 1: Forest Green (Top Left) */}
      <div
        className="animate-blob-1"
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-15%',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          backgroundColor: 'rgba(15, 110, 86, 0.05)', // #0F6E56 with 5% opacity
          filter: 'blur(100px)',
          willChange: 'transform',
        }}
      />

      {/* Blob 2: Warm Gold/Cream (Bottom Right) */}
      <div
        className="animate-blob-2"
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-15%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          backgroundColor: 'rgba(251, 245, 221, 0.09)', // #FBF5DD with 9% opacity
          filter: 'blur(120px)',
          willChange: 'transform',
        }}
      />

      {/* Blob 3: Soft Aqua/Teal (Middle Left) */}
      <div
        className="animate-blob-3"
        style={{
          position: 'absolute',
          top: '30%',
          left: '-10%',
          width: '45vw',
          height: '45vw',
          borderRadius: '50%',
          backgroundColor: 'rgba(217, 239, 234, 0.08)', // #D9EFEA with 8% opacity
          filter: 'blur(90px)',
          willChange: 'transform',
        }}
      />

      {/* ── 2. SUBTLE ORGANIC WAVE LINES (THARA/WATER CONCEPT) ── */}
      {/* Wave on the Right side */}
      <svg
        style={{
          position: 'absolute',
          right: 0,
          top: '15%',
          width: '320px',
          height: '600px',
          opacity: 0.25,
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

      {/* Wave on the Left side */}
      <svg
        style={{
          position: 'absolute',
          left: 0,
          bottom: '10%',
          width: '380px',
          height: '500px',
          opacity: 0.2,
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

      {/* ── 3. PREMIUM TACTILE NOISE GRAIN OVERLAY ── */}
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
