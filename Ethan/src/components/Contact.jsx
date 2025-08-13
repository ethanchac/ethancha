import { Github, Linkedin, Mail, ExternalLink, ChevronDown } from 'lucide-react';

function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-800/50 backdrop-blur-sm relative">
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 to-blue-900/10"></div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-6">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            I'm always interested in hearing about new opportunities and interesting projects. 
            Let's create something amazing together!
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30 group-hover:border-green-400/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-green-500/25">
              <Mail className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="font-semibold text-white mb-3 text-lg">Email</h3>
            <p className="text-gray-300">hello@ethanchan.dev</p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/30 group-hover:border-blue-400/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/25">
              <Linkedin className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-3 text-lg">LinkedIn</h3>
            <p className="text-gray-300">linkedin.com/in/ethanchan</p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/25">
              <Github className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white mb-3 text-lg">GitHub</h3>
            <p className="text-gray-300">github.com/ethanchan</p>
          </div>
        </div>
        
        <a 
          href="mailto:hello@ethanchan.dev"
          className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-10 py-4 rounded-xl font-semibold hover:from-green-400 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-green-500/25 hover:scale-105 border border-green-500/30 hover:border-green-400/50"
        >
          Let's Work Together
        </a>
      </div>
    </section>
  );
};

export default Contact;