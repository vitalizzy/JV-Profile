import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { ThemeMode } from '../types';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="bg-white/50 dark:bg-black/20 backdrop-blur-sm p-1 rounded-full shadow-sm border border-white/40 dark:border-white/10 flex gap-1 items-center">
      {(['light', 'system', 'dark'] as ThemeMode[]).map((mode) => (
        <button
          key={mode}
          onClick={() => onThemeChange(mode)}
          className={`relative p-2 rounded-full transition-all duration-300 ${
            currentTheme === mode ? 'text-slate-800 dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
          }`}
          aria-label={`Switch to ${mode} mode`}
        >
          {currentTheme === mode && (
            <motion.div
              layoutId="theme-active"
              className="absolute inset-0 bg-white dark:bg-slate-700/80 shadow-sm rounded-full"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">
            {mode === 'light' && <Sun size={16} strokeWidth={2} />}
            {mode === 'dark' && <Moon size={16} strokeWidth={2} />}
            {mode === 'system' && <Monitor size={16} strokeWidth={2} />}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;