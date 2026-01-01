import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import DotBackground from './DotBackground';

function Experience() {
  const [isVisible, setIsVisible] = useState(false);
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

      // Start drawing when experience section comes into view
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

  // Track if timeline has reached the end
  const [timelineComplete, setTimelineComplete] = useState(false);

  useEffect(() => {
    const unsubscribe = progressPercentage.on('change', (latest) => {
      if (latest >= 99) {
        setTimelineComplete(true);
      }
    });
    return () => unsubscribe();
  }, [progressPercentage]);

  const experiences = [
    {
      company: "TMU BYTE",
      location: "Toronto, ON",
      position: "Frontend Engineer",
      period: "[October 2025 — Present]",
      date: "[Oct 2025]",
      highlights: [
        "Implemented real-time search for project management using TanStack React Table, integrating debounced input handling that reduced unnecessary re-renders by 75% and improved performance for datasets containing 500+ projects",
        "Developed 35+ reusable UI components using Radix UI, Tailwind CSS and Toast, reducing component development time by 50%"
      ]
    },
    {
      company: "Paris Baguette",
      location: "Markham, ON",
      position: "Freelance Software Developer",
      period: "[February 2024 — August 2024]",
      date: "[Feb 2024]",
      highlights: [
        "Developed and deployed a full-stack schedule planner for 30+ part-time workers using React, enabling managers to visually assign shifts based on time-slot availability",
        "Implemented a custom drag-and-drop scheduling algorithm (availability, max-days, and coverage rules), cutting admin work by 4–5 hours per week and improving shift coverage by 30%",
        "Fun fact: Built this while working part-time as a barista. Highly recommend."
      ]
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
      // Find all timeline dots in the experience section
      const experienceSection = sectionRef.current;
      if (!experienceSection) return;

      const dots = experienceSection.querySelectorAll('[data-timeline-dot]');
      const endMarker = experienceSection.querySelector('[data-timeline-end]');

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
      className="min-h-screen relative overflow-hidden flex items-center px-8 md:px-16 lg:px-24 py-20"
      style={{ backgroundColor: 'rgb(28, 28, 28)' }}
    >
      {/* Faint dot grid background */}
      <DotBackground />

      <div className="w-full relative z-10">
        {/* Header */}
        <div className={`mb-16 ${isVisible ? 'animate-slide-up-expo' : 'opacity-0'}`}>
          <p className="text-sm font-mono text-gray-500 mb-2">&gt; git log --experience</p>
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-white">Experience</h2>
        </div>

        {/* Experience Entries */}
        <div className="relative" ref={timelineRef}>
          {/* Simple timeline - relative positioning, starts at first dot (top-1) */}
          <div className="absolute left-[130px] top-1 bottom-0 w-px bg-gray-800 z-0"></div>
          <motion.div
            className="absolute left-[130px] top-1 w-px bg-white z-0"
            style={{
              height: progressHeight,
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
            }}
          />

          <div className="space-y-16 pb-16">
            {experiences.map((exp, index) => (
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
                  <span className="font-mono text-xs text-white">{exp.date}</span>
                </div>

                {/* Commit Node - Active/Current job gets pulse animation */}
                <div
                  data-timeline-dot
                  className={`absolute left-[124px] top-1 w-3 h-3 rounded-full transition-all duration-300 z-10 ${
                    index === 0
                      ? 'bg-white border-2 border-white animate-node-pulse'
                      : 'bg-gray-700 border-2 border-gray-800 group-hover:bg-purple-500 group-hover:border-purple-400 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                  }`}
                />

                {/* Content (Right of Timeline) */}
                <div className="ml-40">
                  <div className="space-y-3">
                    {/* Title */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-mono font-semibold group-hover:text-purple-300 transition-colors" style={{ color: '#FFFFFF' }}>
                          {exp.position}
                        </h3>
                        {index === 0 && (
                          <div className="flex items-center gap-1.5">
                            <div className="relative">
                              {/* Pulsing outer ring */}
                              <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75"></div>
                              {/* Solid inner dot */}
                              <div className="relative w-2 h-2 bg-green-400 rounded-full"></div>
                            </div>
                            <span className="text-xs font-mono text-green-400">Active</span>
                          </div>
                        )}
                      </div>
                      <p className="font-mono text-sm" style={{ color: '#A1A1AA' }}>
                        {exp.company} · {exp.location}
                      </p>
                      <p className="font-mono text-xs mt-1 text-white">{exp.period}</p>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2 text-sm font-mono leading-relaxed" style={{ color: '#71717A', listStyle: 'none', padding: 0, margin: 0 }}>
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex gap-2" style={{ border: 'none', outline: 'none', boxShadow: 'none' }}>
                          <span className="mt-1" style={{ color: '#52525B' }}>•</span>
                          <span className="group-hover:text-gray-300 transition-colors">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* End Marker */}
          <div className={`relative ${isVisible ? 'animate-slide-up-expo' : 'opacity-0'}`} style={{ animationDelay: `${experiences.length * 0.2}s` }}>
            <div className="absolute left-[130px] -translate-x-1/2 top-0">
              <div
                data-timeline-end
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  timelineComplete
                    ? 'bg-white border-2 border-white shadow-[0_0_12px_rgba(255,255,255,0.8)]'
                    : 'bg-gray-700 border-2 border-gray-800'
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
