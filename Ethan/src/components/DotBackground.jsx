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
    const spacing = 40; // Spacing between dots
    const baseRadius = 1;
    const hoverRadius = 50; // Radius of influence for cursor
    const scaleFactor = 2.5; // How much dots grow when hovered

    // Resize handler
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // Set canvas size to parent size to cover full scrollable area
        // We use offsetWidth/Height to get the full dimension
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;

        // Re-initialize dots
        initDots();
      }
    };

    const initDots = () => {
      dots = [];
      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);

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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // Base dot color

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

    // Attach event listeners to window to track mouse globally or canvas locally
    // If background is behind content, events might be blocked by content.
    // So we attach to window or parent and map to canvas coords? 
    // Actually canvas typically has pointer-events: none; so we need to track on window
    // and convert to canvas coords.

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
