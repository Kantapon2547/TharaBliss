// components/FloatingDecoration.tsx
'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function FloatingDecoration() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '120px',
        height: '120px',
        pointerEvents: 'none',
        opacity: 0.8,
        zIndex: 10,
      }}
    >
      <DotLottieReact
        src="https://lottie.host/9c5fb401-dba3-4d48-a4dd-de8e64c2f473/BYKBWhfyXs.lottie"
        autoplay
        loop
      />
    </div>
  );
}