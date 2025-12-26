import { useState, useEffect, useRef } from 'react';
import { Linkedin } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CodeWindow from './CodeWindow';

function Hero() {
  const [displayIntro, setDisplayIntro] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phase, setPhase] = useState('intro');
  const [showCursor, setShowCursor] = useState(true);
  const [pulseActive, setPulseActive] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [editableIntro, setEditableIntro] = useState("Hello world, I'm");
  const [editableName, setEditableName] = useState('Ethan Cha');
  const [editableTagline, setEditableTagline] = useState('I just like building things that work.');
  const dotsRef = useRef(null);
  const sectionRef = useRef(null);

  const introText = "Hello world, I'm";

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    let timeout;

    // Variable typing speeds for different parts
    const getTypingSpeed = (text, index) => {
      // Fast for "Hello"
      if (index < 5) return 60 + Math.random() * 30;
      // Normal for " world, I'm"
      if (index < introText.length) return 80 + Math.random() * 40;
      return 80 + Math.random() * 40;
    };

    if (phase === 'intro') {
      if (displayIntro.length < introText.length) {
        setIsTyping(true);
        timeout = setTimeout(() => {
          setDisplayIntro(introText.slice(0, displayIntro.length + 1));
        }, getTypingSpeed(introText, displayIntro.length));
      } else {
        setIsTyping(false);
        timeout = setTimeout(() => {
          setPhase('name-start');
        }, 600); // Pause with blinking cursor
      }
    } else if (phase === 'name-start') {
      if (displayName.length < 'Ethan '.length) {
        setIsTyping(true);
        timeout = setTimeout(() => {
          setDisplayName('Ethan '.slice(0, displayName.length + 1));
        }, 80 + Math.random() * 40);
      } else {
        setPhase('typo');
      }
    } else if (phase === 'typo') {
      if (displayName.length < 'Ethan Cn'.length) {
        setIsTyping(true);
        // Slower/hesitant before the typo
        const delay = displayName.length === 'Ethan C'.length ? 150 + Math.random() * 50 : 80 + Math.random() * 40;
        timeout = setTimeout(() => {
          setDisplayName('Ethan Cn'.slice(0, displayName.length + 1));
        }, delay);
      } else {
        setIsTyping(false);
        timeout = setTimeout(() => {
          setPhase('delete');
        }, 700); // Longer pause when realizing mistake
      }
    } else if (phase === 'delete') {
      if (displayName.length > 'Ethan '.length) {
        setIsTyping(true);
        timeout = setTimeout(() => {
          setDisplayName(displayName.slice(0, -1));
        }, 30); // Very fast backspace
      } else {
        setPhase('correct');
      }
    } else if (phase === 'correct') {
      if (displayName.length < 'Ethan Cha'.length) {
        setIsTyping(true);
        timeout = setTimeout(() => {
          setDisplayName('Ethan Cha'.slice(0, displayName.length + 1));
        }, 80 + Math.random() * 40);
      } else {
        setIsTyping(false);
        timeout = setTimeout(() => {
          setShowCursor(false);
          setPhase('done');
          setPulseActive(true);
        }, 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayIntro, displayName, phase]);

  const generateDots = () => {
    const dots = [];
    const spacing = 50;
    const cols = Math.ceil(window.innerWidth / spacing);
    const rows = Math.ceil(window.innerHeight / spacing);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * spacing;
        const y = i * spacing;

        // Distance from center for pulse effect
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const distanceFromCenter = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );

        // Very faint opacity
        let opacity = 0.05;

        // Pulse effect when typing is done
        if (pulseActive) {
          const pulseDelay = distanceFromCenter / 500;
          opacity = 0.05;
        }

        dots.push(
          <div
            key={`${i}-${j}`}
            className={`absolute w-1 h-1 bg-white rounded-full ${pulseActive ? 'animate-dot-pulse' : ''}`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              opacity: opacity,
              animationDelay: pulseActive ? `${distanceFromCenter / 1000}s` : '0s',
            }}
          />
        );
      }
    }
    return dots;
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center px-8 md:px-16 lg:px-24 relative overflow-hidden"
      style={{ backgroundColor: 'rgb(28, 28, 28)' }}
    >
      {/* Faint dot grid background */}
      <div ref={dotsRef} className="absolute inset-0 pointer-events-none">
        {generateDots()}
      </div>

      {/* Left side - Main text */}
      <motion.div
        className="max-w-5xl relative z-10 w-full lg:w-1/2"
        style={{ opacity, y }}
      >
        <p
          className="text-lg md:text-xl mb-4 font-mono"
          style={{ color: 'rgb(240, 240, 240)' }}
        >
          {phase === 'done' ? editableIntro : displayIntro}
          {phase === 'intro' && showCursor && (
            isTyping ? <span>█</span> : <span className="animate-blink">_</span>
          )}
        </p>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 font-mono tracking-tight"
          style={{
            color: 'rgb(240, 240, 240)',
            letterSpacing: '0.05em'
          }}
        >
          {phase === 'done' ? editableName : displayName}
          {phase !== 'intro' && phase !== 'done' && showCursor && (
            isTyping ? <span>█</span> : <span className="animate-blink">_</span>
          )}
        </h1>

        <p
          className="text-base md:text-lg font-mono mb-8"
          style={{ color: 'rgb(240, 240, 240)' }}
        >
          {editableTagline}
        </p>

        <div className="flex items-center space-x-3">
          <span
            className="text-base md:text-lg font-mono"
            style={{ color: 'rgb(240, 240, 240)' }}
          >
            &gt;
          </span>
          <a
            href="http://linkedin.com/in/ethan-cha-5692b8372"
            target="_blank"
            rel="noopener noreferrer"
            className="terminal-link text-base md:text-lg font-mono transition-all underline decoration-dotted underline-offset-4"
          >
            contact_me.sh
          </a>
        </div>
      </motion.div>

      {/* Right side - Code Window */}
      <motion.div
        className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-[500px] xl:w-[600px]"
        style={{ opacity, scale }}
      >
        <CodeWindow
          phase={phase}
          displayIntro={displayIntro}
          displayName={displayName}
          isTyping={isTyping}
          editableIntro={editableIntro}
          editableName={editableName}
          editableTagline={editableTagline}
          onIntroChange={setEditableIntro}
          onNameChange={setEditableName}
          onTaglineChange={setEditableTagline}
        />
      </motion.div>
    </section>
  );
};

export default Hero;