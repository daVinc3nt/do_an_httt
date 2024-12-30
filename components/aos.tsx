'use client';

import { useEffect } from 'react';

export default function Aos() {
  useEffect(() => {
    import('aos').then((AOS) =>
      AOS.init({
        once: true,
        disable: 'phone',
        duration: 600,
        easing: 'ease-out-sine',
      })
    );
  }, []);

  return <></>;
}
