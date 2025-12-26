import { useState, useEffect } from 'react';

function TabNavigation() {
  const [activeTab, setActiveTab] = useState('hero');

  const tabs = [
    { id: 'hero', label: 'home.sh', section: '#hero' },
    { id: 'about', label: 'about_me.sh', section: '#about' },
    { id: 'projects', label: 'projects.sh', section: '#projects' },
    { id: 'contact', label: 'contact.sh', section: '#contact' },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    const element = document.querySelector(tab.section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = tabs.map(tab => ({
        id: tab.id,
        element: document.querySelector(tab.section)
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveTab(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 z-40 flex items-end" style={{ height: '36px' }}>
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab)}
          className={`
            powerline-tab
            relative font-mono text-xs h-full
            transition-all duration-300
            ${activeTab === tab.id
              ? 'powerline-tab-active text-white'
              : 'powerline-tab-inactive text-gray-400 hover:text-gray-300'
            }
          `}
          style={{
            marginLeft: index === 0 ? '0' : '-24px',
            paddingLeft: index === 0 ? '20px' : '32px',
            paddingRight: '32px',
            zIndex: activeTab === tab.id ? 10 : tabs.length - index,
          }}
        >
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

export default TabNavigation;
