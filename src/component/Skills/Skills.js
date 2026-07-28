import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Skills.css';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const skillsData = {
    frontend: [
      { name: 'HTML5', experience: '2 years', defaultIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', hoverIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg' },
      { name: 'CSS3', experience: '2 years', defaultIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', hoverIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg' },
      { name: 'JavaScript', experience: '1.5 years', defaultIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', hoverIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg' },
      { name: 'React', experience: '1 year', defaultIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', hoverIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg' },
      { name: 'Angular', experience: '1.5 years', defaultIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg', hoverIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original-wordmark.svg' }
    ],
    backend: [
      { name: 'Java', experience: '2 years', certification: 'HackerRank Java Certification', defaultIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', hoverIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original-wordmark.svg', certified: true },
      { name: 'Spring', experience: '1.5 years', defaultIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', hoverIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original-wordmark.svg' },
      { name: 'Node.js', experience: '1 year', defaultIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', hoverIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg' },
      { name: 'Python', experience: '2 years', certification: 'Python Developer', defaultIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', hoverIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original-wordmark.svg', certified: true }
    ],
    cloud: [
      { name: 'AWS', experience: '1.5 years', certification: 'AWS Certified Cloud Practitioner', defaultIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', hoverIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', certified: true },
      { name: 'Azure', experience: '6 months', defaultIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', hoverIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-plain-wordmark.svg' }
    ],
    devops: [
      { name: 'Jenkins', experience: '1.5 years', defaultIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', hoverIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-line.svg' },
      { name: 'GitHub', experience: '1 year', certification: 'GitHub Foundation & Copilot', defaultIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', hoverIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg', certified: true },
      { name: 'Docker', experience: '1 year', defaultIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', hoverIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg' }
    ]
  };

  const categories = [
    { id: 'frontend', icon: 'fas fa-laptop-code', label: 'Frontend' },
    { id: 'backend', icon: 'fas fa-database', label: 'Backend' },
    { id: 'cloud', icon: 'fas fa-cloud', label: 'Cloud' },
    { id: 'devops', icon: 'fas fa-cogs', label: 'DevOps' }
  ];

  return (
    <section id="skills" className="section">
      <div className="section-content">
        <h2 className="section-title">Skills</h2>
        
        <div className="skills-interactive-container">
          <div className="skills-categories">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`skill-category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <i className={category.icon}></i>
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          <div className="skills-display">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="skills-grid active"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {skillsData[activeCategory].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className={`skill-icon ${skill.certified ? 'certified' : ''}`}
                    data-experience={skill.experience}
                    data-certification={skill.certification}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <img
                      className="default-skill"
                      src={skill.defaultIcon}
                      alt={skill.name}
                    />
                    <img
                      className="hover-skill"
                      src={skill.hoverIcon}
                      alt={skill.name}
                    />
                    {skill.certified && (
                      <div className="certification-badge">
                        <i className="fas fa-check"></i>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 
