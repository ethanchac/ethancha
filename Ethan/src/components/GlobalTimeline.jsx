import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

function GlobalTimeline() {
  const [timelineMetrics, setTimelineMetrics] = useState({
    startY: 0,
    height: 0,
    leftX: 0
  });

  // Track scroll progress
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

  // Calculate timeline dimensions by finding actual dot positions
  useEffect(() => {
    const calculateMetrics = () => {
      // Find all timeline dots
      const dots = document.querySelectorAll('[data-timeline-dot]');

      if (dots.length === 0) return;

      // Get first and last dot
      const firstDot = dots[0];
      const lastDot = dots[dots.length - 1];

      // Get their bounding rectangles
      const firstRect = firstDot.getBoundingClientRect();
      const lastRect = lastDot.getBoundingClientRect();

      // Calculate absolute positions
      const scrollY = window.scrollY || window.pageYOffset;

      // Get the projects section to find its bottom
      const projectsSection = document.getElementById('projects');
      if (!projectsSection) return;

      const projectsBottom = projectsSection.offsetTop + projectsSection.offsetHeight;

      // Dot center positions (dots are w-3 h-3 = 12px, so center is at +6px)
      const startY = firstRect.top + scrollY + 6;
      const leftX = firstRect.left + 5; // Center of the dot horizontally

      // Extend line to the bottom of the projects section
      const height = projectsBottom - startY - 100; // -100px for bottom padding

      setTimelineMetrics({
        startY,
        height,
        leftX
      });
    };

    calculateMetrics();
    window.addEventListener('resize', calculateMetrics);
    const timer = setTimeout(calculateMetrics, 300);

    return () => {
      window.removeEventListener('resize', calculateMetrics);
      clearTimeout(timer);
    };
  }, []);

  if (timelineMetrics.height === 0) return null;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${timelineMetrics.leftX}px`,
        top: `${timelineMetrics.startY}px`,
        width: '2px',
        height: `${timelineMetrics.height}px`,
        zIndex: 1
      }}
    >
      {/* Static gray dashed line */}
      <div
        className="absolute w-full h-full"
        style={{
          left: 0,
          top: 0,
          backgroundImage: 'linear-gradient(to bottom, #27272A 50%, transparent 50%)',
          backgroundSize: '2px 8px',
          backgroundRepeat: 'repeat-y'
        }}
      />

      {/* Animated white progress line */}
      <motion.div
        className="absolute w-full"
        style={{
          left: 0,
          top: 0,
          height: progressHeight,
          backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 50%, transparent 50%)',
          backgroundSize: '2px 8px',
          backgroundRepeat: 'repeat-y'
        }}
      />

      {/* End marker dot */}
      <div
        className="absolute w-2 h-2 rounded-full bg-gray-600 border border-gray-700"
        style={{
          left: '-3px', // Center the 8px dot on the 2px line
          bottom: '-4px'
        }}
      />
    </div>
  );
}

export default GlobalTimeline;
