import React, { useEffect, useRef } from 'react';

export const BannerAd: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.referrerPolicy = 'no-referrer-when-downgrade';
    s.src = '//quarrelsomebitter.com/b.XQVLs_dtG-lR0/YHWZcE/AeSmq9Iu/Z/UilNk/PCTEcG1/MmTCczy/MnDMEItCNbzzUrx/N/zgImwMNPQY';
    (s as any).settings = {};

    containerRef.current.appendChild(s);
  }, []);

  return <div ref={containerRef} className="my-4 min-h-[50px] flex justify-center items-center overflow-hidden" />;
};
