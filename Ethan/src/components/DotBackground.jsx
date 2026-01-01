import { useRef, useEffect } from 'react';

function DotBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let dots = [];

    // Configuration
    const spacing = 50; // Spacing between dots (Matches Hero original)
    const baseRadius = 2; // Matches w-1 h-1 (4px diameter)
    const hoverRadius = 50; // Radius of influence for cursor
    const scaleFactor = 2.5; // How much dots grow when hovered

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

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          dots.push({
            x: j * spacing + (spacing / 2),
            y: i * spacing + (spacing / 2),
            baseX: j * spacing + (spacing / 2),
            baseY: i * spacing + (spacing / 2),
          });
        }
      }
    };

    const draw = () => {
      // Clear using the scaled dimensions
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      dots.forEach(dot => {
        // Calculate distance to mouse
        const dx = mouseRef.current.x - dot.x;
        const dy = mouseRef.current.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let currentRadius = baseRadius;
        let currentAlpha = 0.05;

        // Interactive effect
        if (distance < hoverRadius) {
          // Scale size based on proximity
          const scale = 1 + (scaleFactor - 1) * (1 - distance / hoverRadius);
          currentRadius = baseRadius * scale;
          currentAlpha = 0.05 + (0.3 * (1 - distance / hoverRadius)); // Brighten up to 0.35
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    // Track mouse position relative to canvas
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // Initial setup
    resize();
    draw();

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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default DotBackground;
