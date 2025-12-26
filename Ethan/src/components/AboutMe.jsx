import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import profileImage from '../assets/ethan_pfp.png';
import DotBackground from './DotBackground';

function AboutMe() {
  const [isVisible, setIsVisible] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hoveredMetadata, setHoveredMetadata] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [skillsExpanded, setSkillsExpanded] = useState(false);
  const sectionRef = useRef(null);
  const dotGridRef = useRef(null);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Scroll-based animations for fade-in from About Me section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"]
  });

  const aboutOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const aboutScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const aboutY = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  // Intersection Observer for fade-in animation with higher threshold
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.4 } // Trigger later for snappier feel
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

  // Track when section is actively in view for purple glow sync
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.5);
      },
      { threshold: [0, 0.5, 1] }
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

  // Parallax effect for dot grid with exponential easing
  useEffect(() => {
    const handleScroll = () => {
      if (dotGridRef.current && sectionRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - sectionTop) / window.innerHeight));

        // Exponential easing for more dramatic effect
        const easedProgress = scrollProgress * scrollProgress * scrollProgress;
        const offset = easedProgress * 200;

        dotGridRef.current.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bioData = {
    location: "Markham, ON",
    focus: "Full-Stack Architectures & AI Systems",
    philosophy: "Simple > Complex",
    topSkills: ["React", "Node.js", "Python", "Flask", "AWS", "Supabase"],
    skillCategories: {
      Languages: ["Java", "Python", "C", "JavaScript", "HTML/CSS", "SQL", "ASM", "Swift", "Lisp"],
      "Libraries/Frameworks": ["React", "React Native", "Node JS", "Express JS", "Next JS", "Flask", "Swing", "Tailwind CSS", "SwiftUI"],
      "Development Tools": ["Git", "VS Code", "MongoDB", "Firebase", "PostgreSQL", "AWS", "Supabase", "S3", "Railway"]
    },
    interests: ["Software Engineering", "Machine Learning", "Cloud Scaling"],
    availability: "Open to opportunities",
    currentlyBuilding: "Scalable social media platform"
  };

  // Format current time
  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/Toronto'
    }) + ' (EST)';
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden flex items-center px-8 md:px-16 lg:px-24 py-12 sm:py-16 md:py-20"
      style={{ backgroundColor: 'rgb(28, 28, 28)' }}
    >
      {/* Faint dot grid background */}
      <DotBackground />

      <motion.div
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 relative z-10"
        style={{ opacity: aboutOpacity, scale: aboutScale, y: aboutY }}
      >
        {/* Left Side - System Log (60%) */}
        <div
          className={`lg:col-span-3 space-y-6 md:space-y-8 ${
            isVisible ? 'animate-slide-up-expo' : 'opacity-0 translate-y-20'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* Header */}
          <div className="space-y-2">
            <p className="text-xs sm:text-sm font-mono text-gray-500">&gt; system_info.log</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono text-white">
              About Me
            </h2>
          </div>

          {/* System Log */}
          <div className="space-y-3 md:space-y-4 font-mono text-xs sm:text-sm md:text-base">
            <div className="flex flex-col sm:flex-row transition-all duration-300">
              <span className={`sm:min-w-[140px] mb-1 sm:mb-0 transition-all duration-500 ${
                isInView ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]' : 'text-purple-400'
              }`}>[Location]:</span>
              <span className="text-gray-300">{bioData.location}</span>
            </div>

            <div className="flex flex-col sm:flex-row transition-all duration-300">
              <span className={`sm:min-w-[140px] mb-1 sm:mb-0 transition-all duration-500 ${
                isInView ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]' : 'text-purple-400'
              }`}>[Focus]:</span>
              <span className="text-gray-300">{bioData.focus}</span>
            </div>

            <div className="flex flex-col sm:flex-row transition-all duration-300">
              <span className={`sm:min-w-[140px] mb-1 sm:mb-0 transition-all duration-500 ${
                isInView ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]' : 'text-purple-400'
              }`}>[Philosophy]:</span>
              <span className="text-gray-300">{bioData.philosophy}</span>
            </div>

            <div className="transition-all duration-300 relative">
              <div className="flex flex-col sm:flex-row items-start">
                <span className={`sm:min-w-[140px] mb-1 sm:mb-0 transition-all duration-500 ${
                  isInView ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]' : 'text-purple-400'
                }`}>[Skills]:</span>
                <div className="flex-1">
                  <span className="text-gray-300">{bioData.topSkills.join(', ')}</span>
                  <span
                    onMouseEnter={() => setSkillsExpanded(true)}
                    onMouseLeave={() => setSkillsExpanded(false)}
                    className="ml-2 text-purple-400 hover:text-purple-300 transition-colors duration-200 hover:drop-shadow-[0_0_6px_rgba(168,85,247,0.8)] cursor-pointer"
                  >
                    [+ more]
                  </span>
                </div>
              </div>

              {/* VSCode Terminal-Style Overlay */}
              {skillsExpanded && (
                <div
                  className="absolute left-0 top-full mt-2 z-50 animate-fade-in w-full max-w-[500px]"
                  onMouseEnter={() => setSkillsExpanded(true)}
                  onMouseLeave={() => setSkillsExpanded(false)}
                >
                  {/* Terminal Window */}
                  <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-md shadow-2xl overflow-hidden w-full">
                    {/* Terminal Header */}
                    <div className="bg-[#2d2d30] px-3 py-1.5 flex items-center justify-between border-b border-[#3c3c3c]">
                      <div className="flex items-center gap-2">
                        <div className="text-[#cccccc] text-xs font-mono">TERMINAL</div>
                        <div className="text-[#666666] text-xs">×</div>
                      </div>
                      <div className="flex gap-1">
                        <div className="text-[#666666] text-xs">⌃</div>
                      </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-4 font-mono text-sm space-y-1">
                      <div className="text-[#4ec9b0]">$ cat skills.txt</div>
                      <div className="mt-2 space-y-2">
                        {Object.entries(bioData.skillCategories).map(([category, skills]) => (
                          <div key={category}>
                            <div className="text-[#569cd6]">
                              <span className="text-[#dcdcaa]">{category}</span>
                              <span className="text-[#d4d4d4]">:</span>
                            </div>
                            <div className="text-[#ce9178] ml-4">
                              {skills.map((skill, index) => (
                                <span key={skill}>
                                  {skill}
                                  {index < skills.length - 1 && <span className="text-[#d4d4d4]">, </span>}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-[#4ec9b0] mt-2">$ <span className="animate-pulse">_</span></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row transition-all duration-300">
              <span className={`sm:min-w-[140px] mb-1 sm:mb-0 transition-all duration-500 ${
                isInView ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]' : 'text-purple-400'
              }`}>[Interests]:</span>
              <span className="text-gray-300">{bioData.interests.join(', ')}</span>
            </div>

            <div className="flex flex-col sm:flex-row transition-all duration-300">
              <span className={`sm:min-w-[140px] mb-1 sm:mb-0 transition-all duration-500 ${
                isInView ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]' : 'text-purple-400'
              }`}>[Availability]:</span>
              <span className="text-gray-300">{bioData.availability}</span>
            </div>

            {/* Live Data Section */}
            <div className="h-px w-full bg-purple-500/20 my-2"></div>

            <div className="flex flex-col sm:flex-row transition-all duration-300">
              <span className="text-green-400 sm:min-w-[140px] mb-1 sm:mb-0 animate-pulse">[Local_Time]:</span>
              <span className="text-gray-300">{formatTime()}</span>
            </div>

            <div className="flex flex-col sm:flex-row transition-all duration-300">
              <span className="text-green-400 sm:min-w-[140px] mb-1 sm:mb-0 animate-pulse">[Currently_Building]:</span>
              <span className="text-gray-300">{bioData.currentlyBuilding}</span>
            </div>
          </div>

          {/* Summary Paragraph */}
          <div className={`space-y-4 ${
            isVisible ? 'animate-slide-up-expo-delay-1' : 'opacity-0 translate-y-20'
          }`}>
            <div className="h-px w-16 bg-purple-500/50"></div>
            <p className="text-sm sm:text-base md:text-lg font-mono text-gray-300 leading-relaxed max-w-2xl">
              I build web experiences where everything feels right. I realized the best technology is invisible and it quietly does its thing so people can focus on what actually matters. No drama, no crashes, just smooth sailing.
            </p>
          </div>
        </div>

        {/* Right Side - Media Inspector Window (40%) */}
        <div className={`lg:col-span-2 ${
          isVisible ? 'animate-slide-up-expo-delay-2' : 'opacity-0 translate-y-20'
        }`}>
          <div className="code-window lg:sticky lg:top-24">
            {/* macOS Window Controls */}
            <div className="window-header">
              <div className="window-controls">
                <div className="window-dot window-dot-red"></div>
                <div className="window-dot window-dot-yellow"></div>
                <div className="window-dot window-dot-green"></div>
              </div>
              <div className="window-title">avatar.png</div>
            </div>

            {/* Media Inspector Content */}
            <div className="code-content p-6">
              {/* Profile Image Container with Glow */}
              <div className="relative group">
                {/* Purple/Blue Backlight Glow - Synced with navigation */}
                <div className={`absolute inset-0 blur-2xl transition-all duration-500 ${
                  isInView
                    ? 'opacity-80 animate-pulse'
                    : 'opacity-60 group-hover:opacity-80'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-violet-600 rounded-2xl"></div>
                </div>

                {/* Image Container */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 h-[300px] sm:h-[350px] md:h-[400px]">
                  {/* Profile Image */}
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 10%' }}
                  />

                  {/* Technical Metadata Overlays */}
                  <div
                    className="absolute top-3 left-3 font-mono text-xs text-gray-400 bg-black/50 backdrop-blur-sm px-2 py-1 rounded cursor-help transition-all hover:bg-black/70 hover:text-purple-400"
                    onMouseEnter={() => setHoveredMetadata('iso')}
                    onMouseLeave={() => setHoveredMetadata(null)}
                  >
                    ISO 100
                    {hoveredMetadata === 'iso' && (
                      <div className="absolute left-0 top-full mt-1 whitespace-nowrap text-xs text-purple-300 bg-gray-900/95 backdrop-blur-sm px-2 py-1 rounded animate-fade-in">
                        // Low light sensitivity
                      </div>
                    )}
                  </div>
                  <div
                    className="absolute top-3 right-3 font-mono text-xs text-gray-400 bg-black/50 backdrop-blur-sm px-2 py-1 rounded cursor-help transition-all hover:bg-black/70 hover:text-purple-400"
                    onMouseEnter={() => setHoveredMetadata('aperture')}
                    onMouseLeave={() => setHoveredMetadata(null)}
                  >
                    f/1.8
                    {hoveredMetadata === 'aperture' && (
                      <div className="absolute right-0 top-full mt-1 whitespace-nowrap text-xs text-purple-300 bg-gray-900/95 backdrop-blur-sm px-2 py-1 rounded animate-fade-in">
                        // Capturing the details
                      </div>
                    )}
                  </div>
                  <div
                    className="absolute bottom-3 left-3 font-mono text-xs text-gray-400 bg-black/50 backdrop-blur-sm px-2 py-1 rounded cursor-help transition-all hover:bg-black/70 hover:text-purple-400"
                    onMouseEnter={() => setHoveredMetadata('shutter')}
                    onMouseLeave={() => setHoveredMetadata(null)}
                  >
                    1/125s
                    {hoveredMetadata === 'shutter' && (
                      <div className="absolute left-0 bottom-full mb-1 whitespace-nowrap text-xs text-purple-300 bg-gray-900/95 backdrop-blur-sm px-2 py-1 rounded animate-fade-in">
                        // Crisp motion freeze
                      </div>
                    )}
                  </div>
                  <div
                    className="absolute bottom-3 right-3 font-mono text-xs text-gray-400 bg-black/50 backdrop-blur-sm px-2 py-1 rounded cursor-help transition-all hover:bg-black/70 hover:text-purple-400"
                    onMouseEnter={() => setHoveredMetadata('focal')}
                    onMouseLeave={() => setHoveredMetadata(null)}
                  >
                    24mm
                    {hoveredMetadata === 'focal' && (
                      <div className="absolute right-0 bottom-full mb-1 whitespace-nowrap text-xs text-purple-300 bg-gray-900/95 backdrop-blur-sm px-2 py-1 rounded animate-fade-in">
                        // Wide perspective
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default AboutMe;
