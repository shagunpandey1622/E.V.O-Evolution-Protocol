import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (not mobile / touchscreen)
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const clickable = target.closest('button, a, input, select, textarea, [role="button"], .interactive');
      setIsHovering(!!clickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden transition-opacity duration-300">
      {/* Center Reticle Point */}
      <div
        className="fixed w-2 h-2 rounded-full bg-[#42EAFF] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#42EAFF] transition-transform duration-75"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`,
        }}
      />
      {/* Outer Rotating Targeting Ring */}
      <div
        className="fixed rounded-full border border-[#42EAFF]/40 -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHovering ? '44px' : '26px',
          height: isHovering ? '44px' : '26px',
          borderColor: isHovering ? '#987BFF' : 'rgba(66, 234, 255, 0.45)',
          boxShadow: isHovering ? '0 0 15px rgba(152, 123, 255, 0.4)' : 'none',
        }}
      />
    </div>
  );
}
