import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Github, ExternalLink, Cloud } from 'lucide-react';
import { SiReact, SiFlask, SiMongodb, SiSocketdotio, SiTailwindcss, SiSupabase, SiThreedotjs, SiGooglegemini } from 'react-icons/si';
import { Database, Map, Mail, Server, Mic } from 'lucide-react';
import DotBackground from './DotBackground';

function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);
  const [timelineMetrics, setTimelineMetrics] = useState({
    startY: 0,
    height: 0,
    leftX: 0
  });
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  // Track scroll progress with framer-motion
  const { scrollYProgress } = useScroll();

  // Apply spring physics for smooth animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  // Map scroll progress to percentage
  const progressPercentage = useTransform(
    smoothProgress,
    (latest) => {
      if (timelineMetrics.height === 0) return 0;

      const scrollY = latest * document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      // Start drawing when projects section comes into view
      const startScroll = timelineMetrics.startY - viewportHeight * 0.5;
      const endScroll = timelineMetrics.startY + timelineMetrics.height;
      const scrollRange = endScroll - startScroll;

      const progress = Math.max(0, Math.min(1,
        (scrollY - startScroll) / scrollRange
      ));

      return progress * 100;
    }
  );

  // Convert percentage to string for CSS
  const progressHeight = useTransform(progressPercentage, (v) => `${v}%`);

  // Tech icon mapping
  const getTechIcon = (tech) => {
    const iconMap = {
      'React': <SiReact className="w-4 h-4" />,
      'React Native': <SiReact className="w-4 h-4" />,
      'Flask': <SiFlask className="w-4 h-4" />,
      'MongoDB': <SiMongodb className="w-4 h-4" />,
      'Socket.IO': <SiSocketdotio className="w-4 h-4" />,
      'AWS S3': <Cloud className="w-4 h-4" />,
      'TailwindCSS': <SiTailwindcss className="w-4 h-4" />,
      'Supabase': <SiSupabase className="w-4 h-4" />,
      'Three.js': <SiThreedotjs className="w-4 h-4" />,
      'Gemini AI': <SiGooglegemini className="w-4 h-4" />,
      'ElevenLabs API': <Mic className="w-4 h-4" />,
      'Leaflet': <Map className="w-4 h-4" />,
      'Sendgrid API': <Mail className="w-4 h-4" />,
      'Railway': <Server className="w-4 h-4" />,
    };
    return iconMap[tech] || null;
  };

  const projects = [
    {
      title: "Yapp",
      version: "v2.1",
      date: "2024",
      shortDate: "2024",
      tagline: "Building a social home for TMU students. 100+ daily users.",
      metadata: {
        status: "Production / Live",
        engine: "Flask + React",
        impact: "180+ endpoints, 100+ users"
      },
      features: [
        "Architected RESTful API backend using Flask with modular blueprint design, implementing 180+ endpoints across 16 microservice modules with MongoDB database integration",
        "Integrated AWS S3 cloud storage with boto3 SDK for scalable file management, implementing secure image uploads, CDN optimization, and automated cleanup processes",
        "Built interactive campus features including Leaflet maps with user-created waypoints, event hosting/joining system, and community engagement tools"
      ],
      mainTech: ["React", "React Native", "Flask", "MongoDB", "Socket.IO", "AWS S3"],
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
      tagline: "Your AI doctor. Real-time 3D assistant with voice.",
      metadata: {
        status: "Production / Live",
        engine: "React + Gemini AI",
        impact: "90% accuracy, 500+ conversations"
      },
      features: [
        "Engineered comprehensive medical prompts with multi-turn context management and safety guardrails, achieving 90% accuracy in symptom assessment across 500+ test conversations",
        "Integrated Google Gemini AI for intelligent diagnosis suggestions and ElevenLabs API for natural voice synthesis responses",
        "Implemented secure authentication and real-time data persistence using Supabase, storing user-specific health data, conversation logs, and AI-generated summaries with automatic session continuity"
      ],
      mainTech: ["React", "TailwindCSS", "Three.js", "Gemini AI", "ElevenLabs API", "Supabase"],
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

  // Calculate timeline dimensions by finding actual dot positions
  useEffect(() => {
    const calculateMetrics = () => {
      // Find all timeline dots in the projects section
      const projectsSection = sectionRef.current;
      if (!projectsSection) return;

      const dots = projectsSection.querySelectorAll('[data-timeline-dot]');
      const endMarker = projectsSection.querySelector('[data-timeline-end]');

      if (dots.length === 0) return;

      // Get first dot and last element (either last dot or end marker)
      const firstDot = dots[0];
      const lastElement = endMarker || dots[dots.length - 1];

      // Get their bounding rectangles
      const firstRect = firstDot.getBoundingClientRect();
      const lastRect = lastElement.getBoundingClientRect();

      // Calculate absolute positions
      const scrollY = window.scrollY || window.pageYOffset;

      // Dot center positions (dots are w-3 h-3 = 12px, so center is at +6px)
      const startY = firstRect.top + scrollY + 6;
      const leftX = firstRect.left + 6; // Center of the dot horizontally

      // Height from first dot to last element
      const endY = lastRect.top + scrollY + 6;
      const height = endY - startY;

      setTimelineMetrics({
        startY,
        height,
        leftX
      });
    };

    // Calculate on mount and when window resizes
    calculateMetrics();
    window.addEventListener('resize', calculateMetrics);

    // Recalculate after animations settle
    const timer = setTimeout(calculateMetrics, 500);
    const timer2 = setTimeout(calculateMetrics, 1000);

    return () => {
      window.removeEventListener('resize', calculateMetrics);
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [isVisible]);

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
        <div className="relative" ref={timelineRef}>
          {/* Simple timeline - relative positioning, starts at first dot (top-1) */}
          <div className="absolute left-[130px] top-1 bottom-8 w-px bg-gray-800 z-0"></div>
          <motion.div
            className="absolute left-[130px] top-1 w-px bg-white z-0"
            style={{
              height: progressHeight,
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
            }}
          />

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
                      {/* Title */}
                      <div>
                        <h3 className="text-2xl font-mono font-semibold mb-3" style={{ color: '#FFFFFF' }}>
                          {project.title}
                        </h3>
                        <p className="font-mono text-sm text-gray-300 mb-4">
                          &gt; {project.tagline}
                        </p>
                      </div>

                      {/* Metadata - Bracket Style */}
                      <div className="space-y-1 font-mono text-sm">
                        {Object.entries(project.metadata).map(([key, value]) => (
                          <div key={key} className="flex">
                            <span className="text-purple-400 min-w-[100px]">[{key.charAt(0).toUpperCase() + key.slice(1)}]:</span>
                            <span className="text-gray-300">{value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack - Icon Badges */}
                      <div>
                        <p className="font-mono text-xs mb-2 text-gray-500">// Stack:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.mainTech.map((tech, idx) => {
                            const icon = getTechIcon(tech);
                            return (
                              <div
                                key={idx}
                                className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-800/50 border border-gray-700/50 rounded-md hover:border-purple-500/50 hover:bg-gray-800 transition-all duration-200 group/tech"
                              >
                                {icon && (
                                  <span className="text-gray-400 group-hover/tech:text-purple-400 transition-colors">
                                    {icon}
                                  </span>
                                )}
                                <span className="text-xs font-mono text-gray-400 group-hover/tech:text-gray-300 transition-colors">
                                  {tech}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Collapsible Features */}
                      {expandedProject === index && (
                        <div className="animate-fade-in">
                          <p className="font-mono text-xs mb-2 text-gray-500">// Key Features:</p>
                          <ul className="space-y-2 text-sm font-mono leading-relaxed" style={{ color: '#71717A', listStyle: 'none', padding: 0 }}>
                            {project.features.map((feature, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="mt-1" style={{ color: '#52525B' }}>•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Verbose Toggle */}
                      <button
                        onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                        className="font-mono text-xs text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        {expandedProject === index ? '$ hide --all' : '$ show --all'}
                      </button>

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

          {/* End Marker */}
          <div className={`relative mt-8 ${isVisible ? 'animate-slide-up-expo' : 'opacity-0'}`} style={{ animationDelay: `${projects.length * 0.2}s` }}>
            <div className="absolute left-[130px] -translate-x-1/2">
              <div
                data-timeline-end
                className="w-3 h-3 rounded-full bg-gray-700 border-2 border-gray-800"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
