import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeControls.css';

const ThemeControls = () => {
  const { isDarkMode, primaryColor, toggleDarkMode, changePrimaryColor } = useTheme();
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const colorOptions = [
    { color: '#ec4899', title: 'Pink' },
    { color: '#f97316', title: 'Orange' },
    { color: '#8b5cf6', title: 'Purple' },
    { color: '#10b981', title: 'Green' },
    { color: '#d946ef', title: 'Magenta' },
    { color: '#ef4444', title: 'Red' }
  ];

  return (
    <div className="theme-controls">
      <div className="theme-switcher">
        <button 
          className="theme-toggle"
          onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
        >
          <i className="fas fa-palette"></i>
        </button>
        
        {isColorPickerOpen && (
          <div className="color-options">
            {colorOptions.map((option) => (
              <div
                key={option.color}
                className="color-option"
                style={{ backgroundColor: option.color }}
                title={option.title}
                onClick={() => {
                  changePrimaryColor(option.color);
                  setIsColorPickerOpen(false);
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      <button 
        className={`dark-mode-toggle ${isDarkMode ? 'active' : ''}`}
        onClick={toggleDarkMode}
      >
        <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
      </button>
    </div>
  );
};

export default ThemeControls; 
