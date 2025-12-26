import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const [lineHeight, setLineHeight] = useState(0);
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  const experiences = [
    {
      company: "TMU BYTE",
      location: "Toronto, ON",
      position: "Frontend Engineer",
      period: "October 2025 - Present",
      date: "Oct 2025",
      highlights: [
        "Mentored 15+ junior frontend developers on React architecture and Firebase integration, reducing onboarding time by 65% and accelerating first production contribution from 21 days to 7 days",
        "Implemented real-time search for project management using TanStack React Table, integrating debounced input handling that reduced unnecessary re-renders by 75% and improved performance for datasets containing 500+ projects",
        "Developed 35+ reusable UI components using Radix UI, Tailwind CSS and Toast, reducing component development time by 50%"
      ],
      technologies: ["React", "Firebase", "TanStack Table", "Radix UI", "Tailwind CSS"]
    },
    {
      company: "Paris Baguette",
      location: "Markham, ON",
      position: "Freelance Software Developer",
      period: "February 2024 - August 2024",
      date: "Feb 2024",
      highlights: [
        "Developed and deployed a full-stack schedule planner for 30+ part-time workers using React, enabling managers to visually assign shifts based on time-slot availability",
        "Implemented a custom drag-and-drop scheduling algorithm (availability, max-days, and coverage rules), cutting admin work by 4–5 hours per week and improving shift coverage by 30%",
        "Designed a secure multi-manager system with Firebase Authentication and Firestore, allowing each manager to manage their own workforce, availability, and schedules with persistent, account-linked data"
      ],
      technologies: ["React", "Node.js", "Firebase", "Firestore"]
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

  // Timeline line drawing animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !sectionRef.current) return;

      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate how much of the section is visible
      const scrollProgress = Math.max(0, Math.min(1,
        (viewportHeight - sectionTop) / (sectionHeight + viewportHeight)
      ));

      setLineHeight(scrollProgress * 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden flex items-center px-8 md:px-16 lg:px-24 py-20"
      style={{ backgroundColor: 'rgb(28, 28, 28)', opacity, scale, y }}
    >
      {/* Dot Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className={`mb-16 ${isVisible ? 'animate-slide-up-expo' : 'opacity-0'}`}>
          <p className="text-sm font-mono text-gray-500 mb-2">&gt; git log --experience</p>
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-white">Experience</h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line - Background (full height) */}
          <div
            className="absolute left-32 top-0 w-[2px] bg-gray-800"
            style={{ height: '100%' }}
          />

          {/* Vertical Line - Animated (draws on scroll) */}
          <div
            ref={timelineRef}
            className="absolute left-32 top-0 w-[2px] bg-gray-700 transition-all duration-300 ease-out"
            style={{ height: `${lineHeight}%` }}
          />

          {/* Experience Entries */}
          <div className="space-y-16">
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
                  <span className="font-mono text-xs text-gray-500">{exp.date}</span>
                </div>

                {/* Commit Node */}
                <div className="absolute left-[124px] top-1 w-3 h-3 rounded-full bg-gray-700 border-2 border-gray-800 transition-all duration-300 group-hover:bg-purple-500 group-hover:border-purple-400 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.5)]" />

                {/* Content (Right of Timeline) */}
                <div className="ml-40">
                  <div className="space-y-3">
                    {/* Title */}
                    <div>
                      <h3 className="text-xl font-mono text-white font-semibold group-hover:text-purple-300 transition-colors">
                        {exp.position}
                      </h3>
                      <p className="font-mono text-sm text-purple-400">
                        {exp.company} · {exp.location}
                      </p>
                      <p className="font-mono text-xs text-gray-500 mt-1">{exp.period}</p>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2 text-sm font-mono text-gray-400 leading-relaxed">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-gray-600 mt-1">•</span>
                          <span className="group-hover:text-gray-300 transition-colors">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies - Code Comment Style */}
                    <div className="font-mono text-xs text-gray-600 pt-2">
                      <span className="text-gray-700">// Stack: </span>
                      {exp.technologies.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Experience;
