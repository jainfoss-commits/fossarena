import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

/**
 * CustomCursor - Pure White Crisp Cyber Cursor
 *  - Ultra-clean sharp pointer with NO blurry smudge or aura
 *  - Direct O(1) DOM updates via requestAnimationFrame
 *  - Smooth fluid lerp interpolation with aerodynamic tilt
 *  - Compact size (22x25px)
 *  - Native touch bypass
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Disable on touch screens
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    // Positions & Velocities
    let targetX = -100;
    let targetY = -100;

    let arrowX = -100;
    let arrowY = -100;

    let currentAngle = 0;
    let targetAngle = 0;

    let isVisible = false;
    let isHovering = false;
    let isClicking = false;

    let pendingTarget = null;
    let checkCounter = 0;

    let animationFrameId = null;

    // Fast O(1) Movement Listener
    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      pendingTarget = e.target;

      if (!isVisible) {
        isVisible = true;
        arrowX = targetX;
        arrowY = targetY;
        cursorEl.style.opacity = '1';
      }
    };

    const onMouseDown = () => {
      isClicking = true;
    };

    const onMouseUp = () => {
      isClicking = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
      cursorEl.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      cursorEl.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // ── High-FPS Hardware Accelerated RAF Loop ──
    const render = () => {
      // Responsive, butter-smooth glide lerp for the arrow pointer
      const arrowLerp = 0.42;
      arrowX += (targetX - arrowX) * arrowLerp;
      arrowY += (targetY - arrowY) * arrowLerp;

      // Throttle interactive element DOM query to once every 6 frames
      checkCounter++;
      if (checkCounter % 6 === 0 && pendingTarget) {
        if (pendingTarget.closest) {
          const interactive = pendingTarget.closest(
            'a, button, input, textarea, select, [role="button"], .chroma-pill-btn, .nav-link, .clickable, .role-option-btn, .glass-card-container, .footer-link'
          );
          isHovering = !!interactive;
        }
      }

      // Calculate instantaneous glide velocity for natural aerodynamic tilt
      const vx = targetX - arrowX;
      const vy = targetY - arrowY;
      const speed = Math.hypot(vx, vy);

      if (speed > 1.2) {
        const moveAngle = Math.atan2(vy, vx) * (180 / Math.PI);
        const bank = Math.max(-12, Math.min(12, (moveAngle - 45) * 0.16));
        targetAngle = bank;
      } else {
        targetAngle = 0;
      }
      currentAngle += (targetAngle - currentAngle) * 0.15;

      // Dynamic scale
      const baseScale = isClicking ? 0.86 : isHovering ? 1.1 : 1.0;

      // Update primary arrow transform
      cursorEl.style.transform = `translate3d(${arrowX}px, ${arrowY}px, 0) rotate(${currentAngle.toFixed(2)}deg) scale(${baseScale})`;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (isTouchDevice) {
    return null;
  }

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      {/* Primary Pure White Gliding Arrow Pointer (No blurry aura or smudge) */}
      <div ref={cursorRef} className="custom-cursor-pointer">
        <svg
          className="custom-cursor-svg"
          width="22"
          height="25"
          viewBox="0 0 22 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Crisp Pure White cyber arrow with high-contrast obsidian border */}
          <path
            d="M2 1.5L9 22L12.7 13.7L21 10L2 1.5Z"
            fill="#ffffff"
            stroke="#0a0d14"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
