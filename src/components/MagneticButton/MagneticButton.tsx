import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: any) => void;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  download?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = '', 
  onClick, 
  as = 'button',
  href,
  target,
  rel,
  download
}) => {
  const magneticRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const magnetic = magneticRef.current;
    const wrapper = wrapperRef.current;
    if (!magnetic || !wrapper) return;

    const xTo = gsap.quickTo(magnetic, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(magnetic, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = wrapper.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Reduce the distance to make it subtle
      xTo(x * 0.3);
      yTo(y * 0.3);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const Component = as as any;

  return (
    <div ref={wrapperRef} style={{ display: 'inline-block', padding: '10px', margin: '-10px' }}>
      <Component
        ref={magneticRef}
        className={className}
        onClick={onClick}
        href={href}
        target={target}
        rel={rel}
        download={download}
        style={{ display: 'inline-flex', position: 'relative' }}
      >
        {children}
      </Component>
    </div>
  );
};
