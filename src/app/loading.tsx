'use client';

import { useState, useEffect } from 'react';

const Loading = () => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevDotCount) => {
        const nextDotCount = prevDotCount + 1;
        return nextDotCount > 3 ? 0 : nextDotCount;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const displayDots = dotCount === 0 ? '' : '.'.repeat(dotCount);

  return (
    <section className='px-10 grid place-items-center h-screen bg-begh-background'>
      <div className='flex flex-col gap-2 items-center'>
        <h1 className=' text-lg font-medium relative text-begh-gray'>
          Loading
          <span className='absolute'>{displayDots}</span>
        </h1>
        <span className='loader'></span>
      </div>
    </section>
  );
};

export default Loading;
