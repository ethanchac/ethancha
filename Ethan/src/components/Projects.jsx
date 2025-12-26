import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import DotBackground from './DotBackground';

function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const projects = [
    {
      title: "Yapp",
      version: "v2.1",
      date: "2024",
      shortDate: "2024",
      description: "A full-stack TMU-exclusive social platform fostering campus community engagement with event hosting, community tabs, interactive maps, and real-time messaging, bringing 100+ daily users.",
      features: [
        "Architected RESTful API backend using Flask with modular blueprint design, implementing 180+ endpoints across 16 microservice modules with MongoDB database integration",
        "Integrated AWS S3 cloud storage with boto3 SDK for scalable file management, implementing secure image uploads, CDN optimization, and automated cleanup processes",
        "Built interactive campus features including Leaflet maps with user-created waypoints, event hosting/joining system, and community engagement tools"
      ],
      technologies: ["React", "React Native", "Flask", "MongoDB", "Socket.IO", "AWS S3", "Leaflet", "Sendgrid API", "Railway", "TailwindCSS"],
      github: "https://github.com/ethanchac/Yap",
      live: "https://yap-mu.vercel.app",
      status: "deployed"
    },
    {
      title: "MedPal",
      version: "v1.5",
      date: "2024",
      shortDate: "2024",
      description: "A real-time 3D medical AI assistant that functions as a personal doctor, holding natural voice conversations, tracking symptoms, and remembering key health notes.",
      features: [
        "Engineered comprehensive medical prompts with multi-turn context management and safety guardrails, achieving 90% accuracy in symptom assessment across 500+ test conversations",
        "Integrated Google Gemini AI for intelligent diagnosis suggestions and ElevenLabs API for natural voice synthesis responses",
        "Implemented secure authentication and real-time data persistence using Supabase, storing user-specific health data, conversation logs, and AI-generated summaries with automatic session continuity"
      ],
      technologies: ["React", "TailwindCSS", "Supabase", "Three.js", "Gemini API", "ElevenLabs API", "Google Cloud API"],
      github: "https://github.com/ethanchac/MedPal",
      live: "https://med-pal-one.vercel.app/",
      status: "deployed"
    }
  ];

  // Intersection Observer for fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="min-h-screen relative overflow-hidden flex items-center px-8 md:px-16 lg:px-24 py-20"
      style={{ backgroundColor: 'rgb(28, 28, 28)' }}
    >
      {/* Faint dot grid background */}
      <DotBackground />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className={`mb-16 ${isVisible ? 'animate-slide-up-expo' : 'opacity-0'}`}>
          <p className="text-sm font-mono text-gray-500 mb-2">&gt; git log --projects</p>
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-white">Deployment Log</h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Project Entries */}
          <div className="space-y-24">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`relative group ${
                  isVisible ? 'animate-slide-up-expo' : 'opacity-0'
                }`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                {/* Date (Left of Timeline) */}
                <div className="absolute left-0 top-0 w-24 text-right">
                  <span className="font-mono text-xs text-gray-500">{project.shortDate}</span>
                </div>

                {/* Commit Node */}
                <div
                  data-timeline-dot
                  className={`absolute left-[124px] top-1 w-3 h-3 rounded-full transition-all duration-300 z-10 ${
                    project.status === 'deployed'
                      ? 'bg-green-500 border-2 border-green-400 shadow-[0_0_12px_rgba(34,197,94,0.5)]'
                      : 'bg-yellow-500 border-2 border-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.5)]'
                  }`}
                />

                {/* Content (Right of Timeline) */}
                <div className="ml-40">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Side - Project Details */}
                    <div className="space-y-4">
                      {/* Title & Version */}
                      <div>
                        <div className="flex items-baseline gap-3 mb-2">
                          <h3 className="text-2xl font-mono font-semibold" style={{ color: '#FFFFFF' }}>
                            {project.title}
                          </h3>
                          <span className="font-mono text-xs px-2 py-1 bg-white/10 border border-white/20 rounded" style={{ color: '#A1A1AA' }}>
                            {project.version}
                          </span>
                        </div>
                        <p className="font-mono text-sm" style={{ color: '#A1A1AA' }}>
                          {project.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div>
                        <p className="font-mono text-xs mb-2" style={{ color: '#52525B' }}>// Key Features:</p>
                        <ul className="space-y-2 text-sm font-mono leading-relaxed" style={{ color: '#71717A' }}>
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="mt-1" style={{ color: '#52525B' }}>•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="font-mono text-xs pt-2" style={{ color: '#52525B' }}>
                        <span>// Stack: </span>
                        {project.technologies.join(', ')}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-6 pt-4">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 font-mono text-sm transition-all duration-300 hover:scale-105"
                          style={{ color: '#A1A1AA' }}
                        >
                          <Github className="w-4 h-4" />
                          <span className="relative group/link">
                            View Code
                            <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover/link:w-full"></span>
                          </span>
                        </a>
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 font-mono text-sm transition-all duration-300 hover:scale-105"
                            style={{ color: '#FFFFFF' }}
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="relative group/link">
                              Live Demo
                              <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover/link:w-full"></span>
                            </span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Side - Project Preview Window */}
                    <div>
                      <div className="code-window">
                        {/* macOS Window Controls */}
                        <div className="window-header">
                          <div className="window-controls">
                            <div className="window-dot window-dot-red"></div>
                            <div className="window-dot window-dot-yellow"></div>
                            <div className="window-dot window-dot-green"></div>
                          </div>
                          <div className="window-title">{project.title.toLowerCase()}.v01</div>
                        </div>

                        {/* Project Preview */}
                        <div className="relative overflow-hidden bg-black/50 h-80">
                          {project.title === 'Yapp' ? (
                            <div className="w-full h-full bg-gradient-to-br from-orange-500/20 via-black to-orange-600/10 flex items-center justify-center p-8">
                              <div className="text-center">
                                <div className="text-orange-400 text-5xl font-bold mb-4 font-mono">Yapp</div>
                                <div className="text-gray-400 text-base mb-6 font-mono">TMU Social Network</div>
                                <div className="space-y-2 text-xs font-mono text-gray-500 text-left max-w-md">
                                  <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Real-time messaging</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Student verification</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>AWS S3 media storage</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Flask RESTful API</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : project.title === 'MedPal' ? (
                            <div className="w-full h-full bg-gradient-to-br from-red-700/20 via-blue-600/10 to-red-800/15 flex items-center justify-center p-8">
                              <div className="text-center">
                                <div className="text-red-400 text-5xl font-bold mb-4 font-mono">MedPal</div>
                                <div className="text-gray-400 text-base mb-6 font-mono">AI Medical Assistant</div>
                                <div className="space-y-2 text-xs font-mono text-gray-500 text-left max-w-md">
                                  <div className="flex items-center gap-2">
                                    <span className="text-blue-500">⚡</span>
                                    <span>3D Avatar (Three.js)</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-blue-500">⚡</span>
                                    <span>Google Gemini AI</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-blue-500">⚡</span>
                                    <span>ElevenLabs Voice</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-blue-500">⚡</span>
                                    <span>Health tracking</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
