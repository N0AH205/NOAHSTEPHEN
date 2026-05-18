"use client";
import { useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';

interface PixelTrailProps {
  color?: string;
}

export default function PixelTrail({ color = '#000000' }: PixelTrailProps) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Use refs instead of state — zero React re-renders on mouse events
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      // Show cursor on first move via direct DOM mutation (no re-render)
      if (!visibleRef.current && cursorRef.current) {
        cursorRef.current.style.opacity = '1';
        visibleRef.current = true;
      }
    };

    const handleMouseDown = () => {
      if (innerRef.current) innerRef.current.style.transform = 'scale(0.8)';
    };

    const handleMouseUp = () => {
      if (innerRef.current) innerRef.current.style.transform = 'scale(1)';
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
        visibleRef.current = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] drop-shadow-xl"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: 0,
          color,
          willChange: 'transform',
          transition: 'opacity 0.15s ease',
        }}
      >
        <div
          ref={innerRef}
          className="-ml-[6px] -mt-[6px]"
          style={{ transition: 'transform 0.1s cubic-bezier(0.34,1.56,0.64,1)' }}
        >
          <MousePointer2 size={32} className="fill-black" strokeWidth={1.5} />
        </div>
      </motion.div>
    </>
  );
}
