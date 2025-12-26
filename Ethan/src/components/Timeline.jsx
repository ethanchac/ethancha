import { useEffect, useState } from 'react';

function Timeline() {
  const [lineStyle, setLineStyle] = useState({ top: 0, height: 0, progressHeight: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const experienceSection = document.getElementById('experience');
      const projectsSection = document.getElementById('projects');

      if (!experienceSection || !projectsSection) return;

      // Get viewport scroll position
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Calculate absolute positions of sections
      const experienceTop = experienceSection.offsetTop;
      const experienceBottom = experienceTop + experienceSection.offsetHeight;
      const projectsTop = projectsSection.offsetTop;
      const projectsBottom = projectsTop + projectsSection.offsetHeight;

      // Timeline spans from start of experience to end of projects
      const timelineStartY = experienceTop;
      const timelineEndY = projectsBottom;
      const totalTimelineHeight = timelineEndY - timelineStartY;

      // Calculate where the timeline should appear on screen
      const timelineTopOnScreen = timelineStartY - scrollY;

      // Calculate scroll progress through the timeline
      // Progress starts when experience section starts entering viewport
      const scrollStart = experienceTop - viewportHeight;
      const scrollEnd = projectsBottom;
      const scrollRange = scrollEnd - scrollStart;

      const progress = Math.max(0, Math.min(1,
        (scrollY - scrollStart) / scrollRange
      ));

      // Calculate the white progress line height
      // It should grow from 0 to the full timeline height
      const progressHeight = progress * totalTimelineHeight;

      setLineStyle({
        top: timelineTopOnScreen,
        height: totalTimelineHeight,
        progressHeight: progressHeight
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Timeline is positioned at 124px from the left (same as the dots)
  const timelineLeftPosition = 'calc(2rem + 96px)'; // px-8 (2rem) + 96px = 124px from left edge

  return (
    <>
      {/* Static background line - gray dashed */}
      <div
        className="absolute w-[2px] pointer-events-none"
        style={{
          left: timelineLeftPosition,
          top: `${lineStyle.top}px`,
          height: `${lineStyle.height}px`,
          zIndex: 5,
          backgroundImage: 'linear-gradient(to bottom, #27272A 50%, transparent 50%)',
          backgroundSize: '2px 8px'
        }}
      />

      {/* Animated progress line - white dashed */}
      <div
        className="absolute w-[2px] pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: timelineLeftPosition,
          top: `${lineStyle.top}px`,
          height: `${lineStyle.progressHeight}px`,
          zIndex: 6,
          backgroundImage: 'linear-gradient(to bottom, white 50%, transparent 50%)',
          backgroundSize: '2px 8px'
        }}
      />
    </>
  );
}

export default Timeline;
