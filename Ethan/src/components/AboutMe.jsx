import { useState, useEffect, useRef } from 'react';
import profileImage from '../assets/ethan_pfp.png';

function AboutMe() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredMetadata, setHoveredMetadata] = useState(null);
  const sectionRef = useRef(null);
  const dotGridRef = useRef(null);

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
    location: "Toronto, ON",
    focus: "Full-Stack & Creative Tech",
    philosophy: "Simple > Complex",
    skills: ["React", "Node.js", "TypeScript", "Tailwind"],
    interests: ["Open Source", "UI/UX", "Performance"],
    availability: "Open to opportunities"
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden flex items-center px-8 md:px-16 lg:px-24 py-20"
      style={{ backgroundColor: 'rgb(28, 28, 28)' }}
    >
      {/* Parallax Dot Grid Background */}
      <div ref={dotGridRef} className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 relative z-10">
        {/* Left Side - System Log (60%) */}
        <div
          className={`lg:col-span-3 space-y-8 ${
            isVisible ? 'animate-slide-up-expo' : 'opacity-0 translate-y-20'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* Header */}
          <div className="space-y-2">
            <p className="text-sm font-mono text-gray-500">&gt; system_info.log</p>
            <h2 className="text-4xl md:text-5xl font-bold font-mono text-white">
              About Me
            </h2>
          </div>

          {/* System Log */}
          <div className="space-y-4 font-mono text-sm md:text-base">
            <div className="flex transition-all duration-300">
              <span className="text-purple-400 min-w-[140px]">[Location]:</span>
              <span className="text-gray-300">{bioData.location}</span>
            </div>

            <div className="flex transition-all duration-300">
              <span className="text-purple-400 min-w-[140px]">[Focus]:</span>
              <span className="text-gray-300">{bioData.focus}</span>
            </div>

            <div className="flex transition-all duration-300">
              <span className="text-purple-400 min-w-[140px]">[Philosophy]:</span>
              <span className="text-gray-300">{bioData.philosophy}</span>
            </div>

            <div className="flex transition-all duration-300">
              <span className="text-purple-400 min-w-[140px]">[Skills]:</span>
              <span className="text-gray-300">{bioData.skills.join(', ')}</span>
            </div>

            <div className="flex transition-all duration-300">
              <span className="text-purple-400 min-w-[140px]">[Interests]:</span>
              <span className="text-gray-300">{bioData.interests.join(', ')}</span>
            </div>

            <div className="flex transition-all duration-300">
              <span className="text-purple-400 min-w-[140px]">[Availability]:</span>
              <span className="text-gray-300">{bioData.availability}</span>
            </div>
          </div>

          {/* Summary Paragraph */}
          <div className={`space-y-4 ${
            isVisible ? 'animate-slide-up-expo-delay-1' : 'opacity-0 translate-y-20'
          }`}>
            <div className="h-px w-16 bg-purple-500/50"></div>
            <p className="text-base md:text-lg font-mono text-gray-300 leading-relaxed max-w-2xl">
              I build web experiences that prioritize clarity and performance. Whether it's a
              sleek interface or a robust backend, I believe the best solutions are the ones
              that feel invisible—they just work.
            </p>
          </div>

          {/* Call to Action */}
          <div className={`mt-8 ${
            isVisible ? 'animate-slide-up-expo-delay-1' : 'opacity-0 translate-y-20'
          }`}>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 font-mono text-sm text-purple-400 hover:text-purple-300 transition-colors group"
            >
              <span className="text-gray-500">&gt;</span>
              <span className="relative">
                view_projects.sh
                <span className="absolute bottom-0 left-0 w-0 h-px bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </span>
              <span className="transform transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* Right Side - Media Inspector Window (40%) */}
        <div className={`lg:col-span-2 ${
          isVisible ? 'animate-slide-up-expo-delay-2' : 'opacity-0 translate-y-20'
        }`}>
          <div className="code-window sticky top-24">
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
                {/* Purple/Blue Backlight Glow */}
                <div className="absolute inset-0 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-violet-600 rounded-2xl"></div>
                </div>

                {/* Image Container */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 h-[400px]">
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
      </div>
    </section>
  );
}

export default AboutMe;
