import { useState, useEffect, useRef } from 'react';

function AboutMe() {
  const [isVisible, setIsVisible] = useState(false);
  const [highlightedKey, setHighlightedKey] = useState(null);
  const sectionRef = useRef(null);
  const dotGridRef = useRef(null);

  // Intersection Observer for fade-in animation
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

  // Parallax effect for dot grid
  useEffect(() => {
    const handleScroll = () => {
      if (dotGridRef.current && sectionRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const offset = (window.innerHeight - sectionTop) * 0.3;
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

  const handleJsonClick = (key) => {
    setHighlightedKey(key);
    setTimeout(() => setHighlightedKey(null), 2000);
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
        <div className={`lg:col-span-3 space-y-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Header */}
          <div className="space-y-2">
            <p className="text-sm font-mono text-gray-500">&gt; system_info.log</p>
            <h2 className="text-4xl md:text-5xl font-bold font-mono text-white">
              About Me
            </h2>
          </div>

          {/* System Log */}
          <div className="space-y-3 font-mono text-sm md:text-base">
            <div className={`flex transition-all duration-300 ${
              highlightedKey === 'location' ? 'glow-text' : ''
            }`}>
              <span className="text-purple-400 min-w-[140px]">[Location]:</span>
              <span className="text-gray-300">{bioData.location}</span>
            </div>

            <div className={`flex transition-all duration-300 ${
              highlightedKey === 'focus' ? 'glow-text' : ''
            }`}>
              <span className="text-purple-400 min-w-[140px]">[Focus]:</span>
              <span className="text-gray-300">{bioData.focus}</span>
            </div>

            <div className={`flex transition-all duration-300 ${
              highlightedKey === 'philosophy' ? 'glow-text' : ''
            }`}>
              <span className="text-purple-400 min-w-[140px]">[Philosophy]:</span>
              <span className="text-gray-300">{bioData.philosophy}</span>
            </div>

            <div className={`flex transition-all duration-300 ${
              highlightedKey === 'skills' ? 'glow-text' : ''
            }`}>
              <span className="text-purple-400 min-w-[140px]">[Skills]:</span>
              <span className="text-gray-300">{bioData.skills.join(', ')}</span>
            </div>

            <div className={`flex transition-all duration-300 ${
              highlightedKey === 'interests' ? 'glow-text' : ''
            }`}>
              <span className="text-purple-400 min-w-[140px]">[Interests]:</span>
              <span className="text-gray-300">{bioData.interests.join(', ')}</span>
            </div>

            <div className={`flex transition-all duration-300 ${
              highlightedKey === 'availability' ? 'glow-text' : ''
            }`}>
              <span className="text-purple-400 min-w-[140px]">[Availability]:</span>
              <span className="text-gray-300">{bioData.availability}</span>
            </div>
          </div>

          {/* Summary Paragraph */}
          <div className={`space-y-4 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="h-px w-16 bg-purple-500/50"></div>
            <p className="text-base md:text-lg font-mono text-gray-300 leading-relaxed max-w-2xl">
              I build web experiences that prioritize clarity and performance. Whether it's a
              sleek interface or a robust backend, I believe the best solutions are the ones
              that feel invisible—they just work.
            </p>
          </div>
        </div>

        {/* Right Side - JSON Code Window (40%) */}
        <div className={`lg:col-span-2 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="code-window sticky top-24">
            {/* macOS Window Controls */}
            <div className="window-header">
              <div className="window-controls">
                <div className="window-dot window-dot-red"></div>
                <div className="window-dot window-dot-yellow"></div>
                <div className="window-dot window-dot-green"></div>
              </div>
              <div className="window-title">bio.json</div>
            </div>

            {/* JSON Content */}
            <div className="code-content">
              <pre className="code-pre text-sm">
                <div className="code-line">
                  <span className="line-number">1</span>
                  <code className="code-text">
                    <span className="token-punctuation">{'{'}</span>
                  </code>
                </div>

                <div className="code-line">
                  <span className="line-number">2</span>
                  <code className="code-text">
                    <span className="token-indent">  </span>
                    <span
                      className="token-property json-clickable"
                      onClick={() => handleJsonClick('location')}
                    >
                      "location"
                    </span>
                    <span className="token-punctuation">: </span>
                    <span className="token-string">"{bioData.location}"</span>
                    <span className="token-punctuation">,</span>
                  </code>
                </div>

                <div className="code-line">
                  <span className="line-number">3</span>
                  <code className="code-text">
                    <span className="token-indent">  </span>
                    <span
                      className="token-property json-clickable"
                      onClick={() => handleJsonClick('focus')}
                    >
                      "focus"
                    </span>
                    <span className="token-punctuation">: </span>
                    <span className="token-string">"{bioData.focus}"</span>
                    <span className="token-punctuation">,</span>
                  </code>
                </div>

                <div className="code-line">
                  <span className="line-number">4</span>
                  <code className="code-text">
                    <span className="token-indent">  </span>
                    <span
                      className="token-property json-clickable"
                      onClick={() => handleJsonClick('philosophy')}
                    >
                      "philosophy"
                    </span>
                    <span className="token-punctuation">: </span>
                    <span className="token-string">"{bioData.philosophy}"</span>
                    <span className="token-punctuation">,</span>
                  </code>
                </div>

                <div className="code-line">
                  <span className="line-number">5</span>
                  <code className="code-text">
                    <span className="token-indent">  </span>
                    <span
                      className="token-property json-clickable"
                      onClick={() => handleJsonClick('skills')}
                    >
                      "skills"
                    </span>
                    <span className="token-punctuation">: [</span>
                  </code>
                </div>

                {bioData.skills.map((skill, index) => (
                  <div key={skill} className="code-line">
                    <span className="line-number">{6 + index}</span>
                    <code className="code-text">
                      <span className="token-indent">    </span>
                      <span className="token-string">"{skill}"</span>
                      {index < bioData.skills.length - 1 && <span className="token-punctuation">,</span>}
                    </code>
                  </div>
                ))}

                <div className="code-line">
                  <span className="line-number">{6 + bioData.skills.length}</span>
                  <code className="code-text">
                    <span className="token-indent">  </span>
                    <span className="token-punctuation">],</span>
                  </code>
                </div>

                <div className="code-line">
                  <span className="line-number">{7 + bioData.skills.length}</span>
                  <code className="code-text">
                    <span className="token-indent">  </span>
                    <span
                      className="token-property json-clickable"
                      onClick={() => handleJsonClick('interests')}
                    >
                      "interests"
                    </span>
                    <span className="token-punctuation">: [</span>
                  </code>
                </div>

                {bioData.interests.map((interest, index) => (
                  <div key={interest} className="code-line">
                    <span className="line-number">{8 + bioData.skills.length + index}</span>
                    <code className="code-text">
                      <span className="token-indent">    </span>
                      <span className="token-string">"{interest}"</span>
                      {index < bioData.interests.length - 1 && <span className="token-punctuation">,</span>}
                    </code>
                  </div>
                ))}

                <div className="code-line">
                  <span className="line-number">{8 + bioData.skills.length + bioData.interests.length}</span>
                  <code className="code-text">
                    <span className="token-indent">  </span>
                    <span className="token-punctuation">],</span>
                  </code>
                </div>

                <div className="code-line">
                  <span className="line-number">{9 + bioData.skills.length + bioData.interests.length}</span>
                  <code className="code-text">
                    <span className="token-indent">  </span>
                    <span
                      className="token-property json-clickable"
                      onClick={() => handleJsonClick('availability')}
                    >
                      "availability"
                    </span>
                    <span className="token-punctuation">: </span>
                    <span className="token-string">"{bioData.availability}"</span>
                  </code>
                </div>

                <div className="code-line">
                  <span className="line-number">{10 + bioData.skills.length + bioData.interests.length}</span>
                  <code className="code-text">
                    <span className="token-punctuation">{'}'}</span>
                  </code>
                </div>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
