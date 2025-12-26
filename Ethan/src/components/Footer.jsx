import DotBackground from './DotBackground';

function Footer() {
  return (
    <footer className="text-white py-8 relative overflow-hidden" style={{ backgroundColor: 'rgb(28, 28, 28)' }}>
      {/* Faint dot grid background */}
      <DotBackground />
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <p className="text-gray-400 text-sm">
          © 2025 Ethan Cha. Built with React and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;