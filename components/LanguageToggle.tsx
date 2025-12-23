import React from 'react';
import { Language } from '../types';
import { motion } from 'framer-motion';

interface LanguageToggleProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, onLangChange }) => {
  return (
    <div className="bg-white/50 dark:bg-black/20 backdrop-blur-sm p-1 rounded-full shadow-sm border border-white/40 dark:border-white/10 flex">
      {(['en', 'es'] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => onLangChange(lang)}
          className={`relative px-4 py-1.5 text-xs font-bold rounded-full transition-colors ${
            currentLang === lang 
              ? 'text-slate-800 dark:text-white' 
              : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
          }`}
        >
          {currentLang === lang && (
            <motion.div
              layoutId="lang-active"
              className="absolute inset-0 bg-white dark:bg-slate-700/80 shadow-sm rounded-full"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10 uppercase tracking-wide">{lang}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;