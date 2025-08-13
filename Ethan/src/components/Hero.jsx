import { Github, Linkedin, Mail, ExternalLink, ChevronDown } from 'lucide-react';

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="mb-8">
          <div className="w-36 h-36 mx-auto mb-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-2xl ring-4 ring-blue-500/30 hover:ring-purple-500/30 transition-all duration-500 hover:scale-105">
            ED
          </div>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6 animate-fade-in">
            Ethan Doe
          </h1>
          <p className="text-2xl md:text-3xl text-blue-300 mb-8 font-light">
            Full Stack Developer & Creative Technologist
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Crafting elegant digital experiences with cutting-edge technologies 
            and innovative design solutions that push boundaries.
          </p>
        </div>
        
        <div className="flex justify-center space-x-8 mb-16">
          <a href="#" className="group p-4 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25">
            <Github className="w-7 h-7 text-gray-300 group-hover:text-blue-400 transition-colors" />
          </a>
          <a href="#" className="group p-4 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25">
            <Linkedin className="w-7 h-7 text-gray-300 group-hover:text-blue-400 transition-colors" />
          </a>
          <a href="#" className="group p-4 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25">
            <Mail className="w-7 h-7 text-gray-300 group-hover:text-blue-400 transition-colors" />
          </a>
        </div>
        
        <button 
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="group animate-bounce hover:animate-none"
        >
          <ChevronDown className="w-10 h-10 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
        </button>
      </div>
    </section>
  );
};

export default Hero;