import { useRef } from 'react';

function DotBackground() {
  const dotsRef = useRef(null);

  const generateDots = () => {
    const dots = [];
    const spacing = 50;
    const cols = Math.ceil(window.innerWidth / spacing);
    const rows = Math.ceil(window.innerHeight / spacing);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * spacing;
        const y = i * spacing;

        dots.push(
          <div
            key={`${i}-${j}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              opacity: 0.05,
            }}
          />
        );
      }
    }
    return dots;
  };

  return (
    <div ref={dotsRef} className="absolute inset-0 pointer-events-none">
      {generateDots()}
    </div>
  );
}

export default DotBackground;
