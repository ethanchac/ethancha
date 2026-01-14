import { useRef, useEffect } from 'react';

function DotBackground({ enableHover = false, pulseActive = false }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const pulseStartTimeRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let dots = [];

    // Configuration
    const spacing = 50; // Spacing between dots (Matches Hero original)
    const baseRadius = 2; // Matches w-1 h-1 (4px diameter)
    const hoverRadius = 100; // Radius of influence for cursor - smaller area for subtle effect
    const scaleFactor = 2.5; // How much dots grow when hovered - reduced for subtlety

    // Resize handler
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = window.devicePixelRatio || 1;
        const rect = parent.getBoundingClientRect();

        // Set actual size in memory (scaled to account for extra pixel density)
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        // Normalize coordinate system to use css pixels
        ctx.scale(dpr, dpr);

        // Set visible size
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        // Re-initialize dots
        initDots(rect.width, rect.height);
      }
    };

    const initDots = (width, height) => {
      dots = [];
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      // Calculate center for pulse effect
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * spacing + (spacing / 2);
          const y = i * spacing + (spacing / 2);

          // Calculate distance from center for pulse animation
          const distanceFromCenter = Math.sqrt(
            Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
          );

          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            distanceFromCenter,
          });
        }
      }
    };

    const draw = (timestamp) => {
      // Clear using the scaled dimensions
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Track pulse animation start time
      if (pulseActive && !pulseStartTimeRef.current) {
        pulseStartTimeRef.current = timestamp;
      } else if (!pulseActive) {
        pulseStartTimeRef.current = null;
      }

      dots.forEach(dot => {
        // Calculate distance to mouse
        const dx = mouseRef.current.x - dot.x;
        const dy = mouseRef.current.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let currentRadius = baseRadius;
        let currentAlpha = 0.05;

        // Pulse animation effect
        if (pulseActive && pulseStartTimeRef.current) {
          const elapsedTime = timestamp - pulseStartTimeRef.current;
          const pulseDelay = dot.distanceFromCenter; // in milliseconds

          if (elapsedTime >= pulseDelay) {
            const timeSincePulse = elapsedTime - pulseDelay;
            const pulseDuration = 600; // 0.6s to match CSS animation

            if (timeSincePulse < pulseDuration) {
              // Animate from 0.05 to 0.2 and back
              const progress = timeSincePulse / pulseDuration;
              // Use ease-in-out function
              const eased = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

              const peakAlpha = 0.2;
              currentAlpha = progress < 0.5
                ? 0.05 + (peakAlpha - 0.05) * (eased * 2) // Rise to peak
                : peakAlpha - (peakAlpha - 0.05) * ((eased - 0.5) * 2); // Fall back
            }
          }
        }

        // Interactive hover effect - only if enableHover is true
        // This can override the pulse effect for a more dynamic experience
        if (enableHover && distance < hoverRadius) {
          // Scale size based on proximity
          const scale = 1 + (scaleFactor - 1) * (1 - distance / hoverRadius);
          currentRadius = baseRadius * scale;
          const hoverAlpha = 0.05 + (0.15 * (1 - distance / hoverRadius)); // Lighter hover - brighten up to 0.2
          currentAlpha = Math.max(currentAlpha, hoverAlpha); // Use the brighter value
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    // Initial setup
    resize();
    animationFrameId = requestAnimationFrame(draw);

    window.addEventListener('resize', resize);
    // Use ResizeObserver for parent size changes (important for scrollable content growth)
    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    const trackMouseGlobal = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    window.addEventListener('mousemove', trackMouseGlobal);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', trackMouseGlobal);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [enableHover, pulseActive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default DotBackground;
