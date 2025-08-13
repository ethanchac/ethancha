import { Github, Linkedin, Mail, ExternalLink, ChevronDown } from 'lucide-react';

function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React frontend and Node.js backend. Features include user authentication, payment processing, and admin dashboard.",
      image: "bg-gradient-to-br from-purple-400 to-pink-500",
      technologies: ["React", "Node.js", "Stripe", "MongoDB"],
      github: "#",
      live: "#"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "bg-gradient-to-br from-green-400 to-blue-500",
      technologies: ["Vue.js", "Socket.io", "Express", "PostgreSQL"],
      github: "#",
      live: "#"
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather application that provides detailed forecasts, interactive maps, and location-based weather alerts.",
      image: "bg-gradient-to-br from-yellow-400 to-orange-500",
      technologies: ["React", "OpenWeather API", "Chart.js", "Tailwind"],
      github: "#",
      live: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-900/50 backdrop-blur-sm relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-green-900/10"></div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-6">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-green-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300 group hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10">
              <div className={`h-48 ${project.image} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-4">{project.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-green-500/20 text-blue-300 border border-blue-500/30 rounded-full text-sm hover:from-blue-500/30 hover:to-green-500/30 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-6">
                  <a 
                    href={project.github}
                    className="flex items-center text-gray-300 hover:text-blue-400 transition-all duration-300 hover:scale-105"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    Code
                  </a>
                  <a 
                    href={project.live}
                    className="flex items-center text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-105"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;