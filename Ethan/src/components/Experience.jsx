function Experience() {
  const experiences = [
    {
      company: "Paris Baguette",
      position: "Freelance Software Developer",
      period: "February 2024 - Present",
      description: "Developed and deployed a full-stack schedule planner for part-time workers using React, enabling managers to visually assign workers based on time-slot availability. Saved 4-5 hours per week in administrative time and improved shift coverage by 30% by implementing a custom drag-and-drop scheduling algorithm based on worker availability, max-days, and required coverage rules. Designed a multi-user system using Firebase Authentication and Firestore, enabling each manager to securely manage their own workforce, availability, and schedules with persistent data tied to individual accounts.",
      technologies: ["React", "Firebase", "Firestore", "JavaScript", "Drag-and-Drop API"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-800/50 backdrop-blur-sm relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10"></div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-blue-400"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex items-start group">
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full ring-4 ring-purple-400/20 group-hover:ring-purple-400/40 transition-all duration-300"></div>
                <div className="ml-16 bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10">
                  <div className="flex flex-wrap justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-2">{exp.position}</h3>
                      <p className="text-purple-400 font-medium text-lg">{exp.company}</p>
                    </div>
                    <span className="text-gray-300 bg-gray-700/50 px-4 py-2 rounded-full text-sm border border-gray-600/50">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed text-lg">{exp.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {exp.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-500/30 rounded-full text-sm hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;