import { Github, Linkedin, Mail } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import DotBackground from './DotBackground';

function Contact() {
  const sectionRef = useRef(null);
  const [pingStatus, setPingStatus] = useState('idle'); // idle, pinging, ponged
  const [isLoading, setIsLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  // Intersection observer to detect when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsLoading(true);
            setHasLoaded(true);
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasLoaded]);

  // Loading animation
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsLoading(false), 300);
            return 100;
          }
          return prev + 2;
        });
      }, 30);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handlePing = () => {
    setPingStatus('pinging');
    setTimeout(() => {
      setPingStatus('ponged');
      window.location.href = 'mailto:ethancha1011@gmail.com';
      setTimeout(() => setPingStatus('idle'), 2000);
    }, 600);
  };

  return (
    <motion.section
      ref={sectionRef}
      id="contact"
      className="min-h-screen py-20 relative overflow-hidden flex items-center px-8 md:px-16 lg:px-24"
      style={{ opacity, scale, y, backgroundColor: 'rgb(28, 28, 28)' }}
    >
      {/* Faint dot grid background */}
      <DotBackground />

      <div className="w-full relative z-10">
        {!hasLoaded || isLoading ? (
          /* Loading Screen */
          <div className="space-y-6">
            <div className="font-mono text-white text-xl mb-8">&gt; contact.sh</div>

            {hasLoaded && (
              <div className="space-y-2">
                <div className="font-mono text-sm text-gray-400">
                  Establishing connection...
                </div>

                {/* Loading Bar */}
                <div className="w-full max-w-md bg-gray-800 h-4 border border-gray-700">
                  <div
                    className="h-full bg-white transition-all duration-100"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>

                <div className="font-mono text-sm text-gray-500">
                  {loadProgress}%
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Main Content - After Loading */
          <>
            {/* Terminal Header */}
            <div className="mb-8">
              <div className="font-mono text-white text-xl mb-2">&gt; contact.sh</div>
              <div className="w-16 h-0.5 bg-white"></div>
            </div>

            {/* Status Line */}
            <div className="font-mono text-sm text-gray-400 mb-8 space-y-1">
              <div>[Status]: <span className="text-white">Connection established</span></div>
              <div>[Location]: <span className="text-blue-400">Markham, ON</span></div>
            </div>

            {/* Main Content */}
            <div className="mb-12">
              <p className="font-mono text-gray-300 text-lg mb-8 leading-relaxed">
                Ready to collaborate on something amazing.
              </p>

              {/* Ping Button */}
              <div className="mb-12">
                <button
                  onClick={handlePing}
                  disabled={pingStatus !== 'idle'}
                  className={`font-mono px-6 py-3 border-2 transition-all duration-300 ${
                    pingStatus === 'idle'
                      ? 'border-white text-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/25'
                      : pingStatus === 'pinging'
                      ? 'border-yellow-400 text-yellow-400 animate-pulse'
                      : 'border-blue-400 text-blue-400 bg-blue-400/10'
                  }`}
                >
                  {pingStatus === 'idle' && '> ping_ethan.exe'}
                  {pingStatus === 'pinging' && '> pinging...'}
                  {pingStatus === 'ponged' && '> pong! 24ms'}
                </button>
              </div>

              {/* Contact Links */}
              <div className="space-y-4 font-mono">
                <div className="text-gray-400">
                  <span className="text-white">&gt;</span> Available channels:
                </div>

                {/* Email */}
                <a
                  href="mailto:ethancha1011@gmail.com"
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group pl-6"
                >
                  <Mail className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  <span className="underline decoration-dotted underline-offset-4">ethancha1011@gmail.com</span>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/ethanchac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors group pl-6"
                >
                  <Github className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="underline decoration-dotted underline-offset-4">github.com/ethanchac</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="http://linkedin.com/in/ethan-cha-5692b8372"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors group pl-6"
                >
                  <Linkedin className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="underline decoration-dotted underline-offset-4">linkedin.com/in/ethan-cha-5692b8372</span>
                </a>
              </div>
            </div>

            {/* Session Footer */}
            <div className="font-mono text-sm text-gray-500 mt-16 pt-8 border-t border-gray-800">
              <div>// End of Session. System Idle.</div>
            </div>
          </>
        )}
      </div>
    </motion.section>
  );
};

export default Contact;