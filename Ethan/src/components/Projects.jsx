import { Github, Linkedin, Mail, ExternalLink, ChevronDown } from 'lucide-react';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function Projects() {
  const sectionRef = useRef(null);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const projects = [
    {
      title: "Yapp",
      description: "A social media platform exclusively for Toronto Metropolitan University (TMU) students. Features student-only access via TMU email verification, real-time messaging using WebSockets, and campus-focused social interactions.",
      image: "bg-gradient-to-br from-red-500 via-blue-600 to-red-700",
      technologies: ["React", "Flask", "MongoDB", "Socket.IO", "TailwindCSS"],
      github: "https://github.com/ethanchac/Yap",
      live: "https://yap-mu.vercel.app",
      preview: "https://yap-mu.vercel.app",
      layout: "left",
      theme: {
        background: "bg-gradient-to-br from-orange-500/10 via-black to-orange-600/10",
        border: "border-orange-500/40 hover:border-orange-600/60",
        accent: "from-orange-500 to-orange-600",
        sectionBg: "from-gray-900 via-black to-gray-900",
        sectionOverlay: "bg-gradient-to-r from-orange-500/15 to-orange-600/10"
      }
    },
    {
      title: "MedPal",
      description: "An AI-powered medical assistant that uses Google Gemini AI to help users understand symptoms and get personalized health insights. Features voice technology by ElevenLabs, 3D avatars, and comprehensive health tracking capabilities.",
      image: "bg-gradient-to-br from-red-700 via-blue-600 to-red-800",
      technologies: ["React", "Google Gemini AI", "ElevenLabs", "ReadyPlayerMe", "Supabase"],
      github: "https://github.com/ethanchac/MedPal",
      live: null,
      layout: "right",
      theme: {
        background: "bg-gradient-to-br from-red-700/10 via-blue-600/15 to-red-800/10",
        border: "border-red-700/40 hover:border-blue-600/50",
        accent: "from-red-700 to-blue-600",
        sectionBg: "from-gray-900 via-black to-gray-900",
        sectionOverlay: "bg-gradient-to-r from-red-700/15 to-blue-600/10"
      }
    },
    {
      title: "LibUp",
      description: "A full-stack library management application built with React and Tailwind CSS. Features comprehensive book tracking, user management, and modern UI design for seamless library operations and book discovery.",
      image: "bg-gradient-to-br from-white via-gray-200 to-gray-300",
      technologies: ["React", "Tailwind CSS", "MongoDB", "JavaScript", "Node.js"],
      github: "https://github.com/ethanchac/LibUp",
      live: null,
      layout: "left",
      theme: {
        background: "bg-gradient-to-br from-white/5 via-gray-200/10 to-gray-300/5",
        border: "border-white/30 hover:border-gray-300/50",
        accent: "from-white to-gray-300",
        sectionBg: "from-gray-900 via-black to-gray-900",
        sectionOverlay: "bg-gradient-to-r from-white/8 to-gray-300/5"
      }
    }
  ];

  // Dynamic background based on project themes
  const backgroundGlows = projects.map((project) => {
    if (project.title === 'Yapp') {
      return {
        glows: [
          { position: '-top-20 -right-20', size: 'w-80 h-80', color: 'bg-orange-500/40', blur: 'blur-3xl' },
          { position: 'top-1/4 -left-20', size: 'w-60 h-60', color: 'bg-orange-400/35', blur: 'blur-2xl' },
          { position: 'top-20 right-1/3', size: 'w-40 h-40', color: 'bg-orange-600/30', blur: 'blur-xl' }
        ],
        sectionBg: 'bg-gradient-to-br from-orange-900/20 via-black to-orange-800/15'
      };
    } else if (project.title === 'MedPal') {
      return {
        glows: [
          { position: '-bottom-20 right-1/6', size: 'w-72 h-72', color: 'bg-red-700/35', blur: 'blur-3xl' },
          { position: 'bottom-1/3 -left-16', size: 'w-56 h-56', color: 'bg-blue-600/30', blur: 'blur-2xl' },
          { position: 'bottom-10 right-2/3', size: 'w-44 h-44', color: 'bg-red-500/25', blur: 'blur-xl' }
        ],
        sectionBg: 'bg-gradient-to-br from-red-900/20 via-black to-blue-900/15'
      };
    } else if (project.title === 'LibUp') {
      return {
        glows: [
          { position: 'bottom-1/4 -right-24', size: 'w-64 h-64', color: 'bg-white/25', blur: 'blur-3xl' },
          { position: '-bottom-16 left-1/4', size: 'w-52 h-52', color: 'bg-gray-300/20', blur: 'blur-2xl' },
          { position: 'bottom-32 right-1/2', size: 'w-36 h-36', color: 'bg-white/15', blur: 'blur-xl' }
        ],
        sectionBg: 'bg-gradient-to-br from-white/5 via-black to-gray-300/10'
      };
    }
    return { glows: [], sectionBg: '' };
  });

  const allGlows = backgroundGlows.flatMap(bg => bg.glows);

  return (
    <motion.section
      ref={sectionRef}
      id="projects"
      className="py-20 backdrop-blur-sm relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
      style={{backgroundColor: '#121212', opacity, scale, y}}
    >
      {/* Dynamic Background Glows */}
      {allGlows.map((glow, index) => (
        <div 
          key={index}
          className={`absolute ${glow.position} ${glow.size} ${glow.color} rounded-full ${glow.blur}`}
        ></div>
      ))}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-500 via-red-500 via-blue-600 to-white bg-clip-text text-transparent mb-6">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-red-500 via-blue-600 to-white mx-auto rounded-full"></div>
        </div>
        
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden rounded-3xl border transition-all duration-500 group hover:transform hover:scale-[1.02] hover:shadow-2xl ${
                project.theme ? project.theme.border : 'border-gray-700/50 hover:border-blue-500/50'
              }`}
            >
              {/* Project-specific background overlay */}
              <div className={`absolute inset-0 ${
                project.title === 'Yapp' ? 'bg-gradient-to-br from-orange-900/20 via-black to-orange-800/15' 
                : project.title === 'MedPal' ? 'bg-gradient-to-br from-red-900/20 via-black to-blue-900/15'
                : project.title === 'LibUp' ? 'bg-gradient-to-br from-white/5 via-black to-gray-300/10'
                : 'bg-gray-800/80'
              } backdrop-blur-sm`}></div>
              
              {/* Additional project-specific ambient glow */}
              {project.title === 'Yapp' && (
                <>
                  <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-10 right-10 w-24 h-24 bg-orange-400/15 rounded-full blur-xl"></div>
                </>
              )}
              {project.title === 'MedPal' && (
                <>
                  <div className="absolute top-10 right-10 w-28 h-28 bg-red-600/20 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-10 left-10 w-20 h-20 bg-blue-600/15 rounded-full blur-xl"></div>
                </>
              )}
              {project.title === 'LibUp' && (
                <>
                  <div className="absolute top-10 left-10 w-30 h-30 bg-white/15 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-10 right-10 w-22 h-22 bg-gray-300/12 rounded-full blur-xl"></div>
                </>
              )}
              
              <div className={`absolute inset-0 ${project.theme ? project.theme.background : 'bg-gray-800/80'} backdrop-blur-sm`}></div>
              
              <div className={`relative z-10 grid lg:grid-cols-2 gap-12 p-12 ${
                project.layout === 'right' ? 'lg:grid-flow-col-dense' : ''
              }`}>
                <div className={`space-y-6 ${project.layout === 'right' ? 'lg:col-start-2' : ''}`}>
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-4">{project.title}</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">{project.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className={`px-4 py-2 bg-gradient-to-r ${
                          project.title === 'Yapp' ? 'from-orange-500/20 to-orange-600/20 text-orange-400 border border-orange-500/40 hover:border-orange-600/50' 
                          : project.title === 'MedPal' ? 'from-red-700/20 to-blue-600/20 text-red-400 border border-red-700/40 hover:border-blue-600/50'
                          : project.title === 'LibUp' ? 'from-white/20 to-gray-300/20 text-white border border-white/40 hover:border-gray-300/50'
                          : 'from-blue-500/20 to-green-500/20 text-blue-300 border border-blue-500/30'
                        } rounded-full text-sm font-medium transition-all duration-300 hover:scale-105`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-8 pt-4">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 text-lg"
                    >
                      <Github className="w-6 h-6 mr-3" />
                      Code
                    </a>
                    {project.live && (
                      <a 
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center transition-all duration-300 hover:scale-105 text-lg ${
                          project.title === 'Yapp' ? 'text-orange-400 hover:text-orange-300' 
                          : project.title === 'MedPal' ? 'text-red-400 hover:text-blue-400'
                          : project.title === 'LibUp' ? 'text-white hover:text-gray-300'
                          : 'text-blue-400 hover:text-blue-300'
                        }`}
                      >
                        <ExternalLink className="w-6 h-6 mr-3" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
                
                <div className={`relative ${project.layout === 'right' ? 'lg:col-start-1' : ''}`}>
                  <div className={`relative overflow-hidden rounded-2xl border bg-black/50 h-96 ${
                    project.title === 'Yapp' ? 'border-orange-500/30' 
                    : project.title === 'MedPal' ? 'border-red-700/30'
                    : project.title === 'LibUp' ? 'border-white/30'
                    : 'border-gray-500/30'
                  }`}>
                    {project.title === 'Yapp' ? (
                      <div className="w-full h-full bg-gradient-to-br from-orange-500/20 via-black to-orange-600/10 flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="text-orange-400 text-6xl font-bold mb-4">Yapp</div>
                          <div className="text-gray-400 text-lg mb-6">Social Media for TMU Students</div>
                          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg font-semibold inline-block">
                            Join Now!
                          </div>
                        </div>
                      </div>
                    ) : project.title === 'MedPal' ? (
                      <div className="w-full h-full bg-gradient-to-br from-red-700/20 via-blue-600/10 to-red-800/15 flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="text-red-400 text-5xl font-bold mb-4">MedPal</div>
                          <div className="text-gray-400 text-lg mb-6">Your AI Doctor in One Click</div>
                          <div className="bg-gradient-to-r from-red-700 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold inline-block mb-4">
                            Try MedPal Free
                          </div>
                          <div className="text-xs text-gray-500">AI-Powered Medical Assistant</div>
                        </div>
                      </div>
                    ) : project.title === 'LibUp' ? (
                      <div className="w-full h-full bg-gradient-to-br from-white/15 via-gray-200/10 to-gray-300/5 flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="text-white text-5xl font-bold mb-4">LibUp</div>
                          <div className="text-gray-300 text-lg mb-6">Library Management System</div>
                          <div className="bg-gradient-to-r from-white to-gray-300 text-black px-6 py-2 rounded-lg font-semibold inline-block mb-4">
                            Explore Library
                          </div>
                          <div className="text-xs text-gray-400">Full-Stack Library Solution</div>
                        </div>
                      </div>
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                  </div>
                  <div className={`absolute -top-2 -right-2 w-3 h-3 rounded-full animate-pulse ${
                    project.title === 'Yapp' ? 'bg-orange-500' 
                    : project.title === 'MedPal' ? 'bg-red-500'
                    : project.title === 'LibUp' ? 'bg-white'
                    : 'bg-blue-500'
                  }`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;