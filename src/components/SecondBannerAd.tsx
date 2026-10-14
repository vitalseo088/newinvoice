import React, { useEffect, useRef } from 'react';

export const SecondBannerAd: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.referrerPolicy = 'no-referrer-when-downgrade';
    s.src = '//quarrelsomebitter.com/bMXxVGs.djGUl/0eYGW/cH/Zelm/9buUZLUfl-kyPbT/cl1nMXTNc-4gNSDkErtXNTzSUQx/N-zLgH0GNdQM';
    (s as any).settings = {};

    containerRef.current.appendChild(s);
  }, []);

  return <div ref={containerRef} className="my-6 min-h-[50px] flex justify-center items-center overflow-hidden" />;
};
