import { Github, Linkedin, Mail, ExternalLink, ChevronDown } from 'lucide-react';
import DotBackground from './DotBackground';

function Footer() {
  return (
    <footer className="text-white py-16 relative overflow-hidden" style={{ backgroundColor: 'rgb(28, 28, 28)' }}>
      {/* Faint dot grid background */}
      <DotBackground />
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <div className="mb-10">
          <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Ethan Chan</h3>
          <p className="text-gray-300 mb-8 text-lg">Full Stack Developer & Creative Technologist</p>
          <div className="flex justify-center space-x-8">
            <a href="#" className="group p-3 bg-gray-800/50 rounded-full border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25">
              <Github className="w-7 h-7 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </a>
            <a href="#" className="group p-3 bg-gray-800/50 rounded-full border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25">
              <Linkedin className="w-7 h-7 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </a>
            <a href="#" className="group p-3 bg-gray-800/50 rounded-full border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25">
              <Mail className="w-7 h-7 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700/50 pt-8">
          <p className="text-gray-400 text-lg">
            © 2024 Ethan Chan. Built with React and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;