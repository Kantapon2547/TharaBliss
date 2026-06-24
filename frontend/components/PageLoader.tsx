'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function PageLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  // Initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Show loader on route changes
  useEffect(() => {
    if (!pathname) return;

    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (loading) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#FAFAF7',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}
      >
        <div style={{ width: 700 }}>
          <DotLottieReact
            src="https://lottie.host/94ba614a-8ff8-481d-a015-d7aca7f048da/exX70giGZT.lottie"
            autoplay
            loop
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}