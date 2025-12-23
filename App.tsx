import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Briefcase, 
  Trophy, 
  ArrowRight,
} from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';
import LanguageToggle from './components/LanguageToggle';
import ShareButton from './components/ShareButton';
import { XIcon, WhatsAppIcon, LinkedInIcon, GithubIcon } from './components/Icons';
import { APP_DATA } from './constants';
import { Language, ThemeMode } from './types';

const App: React.FC = () => {
  // --- State Management ---
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  // --- Derived Data ---
  const t = APP_DATA.content[lang];
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://jesusvita.site';

  // --- Theme Logic ---
  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = () => {
      let isDark = false;

      if (theme === 'system') {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else if (theme === 'schedule') {
        const hour = new Date().getHours();
        isDark = hour < 7 || hour >= 19;
      } else {
        isDark = theme === 'dark';
      }

      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme();

    // Optional: Listen for system changes if in system mode
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyTheme();
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // --- Helper Functions for Sharing ---
  const getWhatsAppLink = () => `https://wa.me/?text=${encodeURIComponent(`${t.shareMessages.whatsapp} ${currentUrl}`)}`;
  const getTwitterLink = () => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t.shareMessages.twitter)}&url=${encodeURIComponent(currentUrl)}`;
  const getMailLink = () => `mailto:?subject=${encodeURIComponent(t.shareMessages.emailSubject)}&body=${encodeURIComponent(t.shareMessages.emailBody)}`;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 bg-[length:400%_400%] animate-gradient-slow text-slate-800 dark:text-slate-100 transition-colors duration-500 overflow-x-hidden font-sans selection:bg-primary-200 dark:selection:bg-primary-900 flex items-center justify-center p-4 sm:p-8">
      
      {/* Main Container - Constrained Width for "App" Feel */}
      <main className="w-full max-w-md md:max-w-[480px]">
        
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Smooth ease-out-quint
          className="w-full relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-slate-700/50 p-6 sm:p-8 overflow-hidden"
        >
          {/* Decorative Glow */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-200/30 dark:bg-orange-900/20 rounded-full blur-3xl pointer-events-none" />

          {/* Controls Row (Integrated) */}
          <div className="flex justify-between items-center w-full mb-6 relative z-20">
            <LanguageToggle currentLang={lang} onLangChange={setLang} />
            <ThemeToggle currentTheme={theme} onThemeChange={setTheme} />
          </div>

          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-8 relative z-10">
            <motion.div 
              className="relative mb-4 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="w-28 h-28 rounded-full p-[3px] bg-white dark:bg-slate-700 relative overflow-hidden">
                <img 
                  src={APP_DATA.avatarUrl} 
                  alt={APP_DATA.name} 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </motion.div>

            <motion.h1 
              className="font-serif text-3xl font-bold text-slate-900 dark:text-white mb-2"
              layout
            >
              {APP_DATA.name}
            </motion.h1>

            <motion.div 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/60 text-primary-700 dark:text-primary-100 text-sm font-medium mb-4 border border-primary-200 dark:border-primary-700/50"
              layout
            >
              <Briefcase size={14} strokeWidth={1.5} />
              {t.role}
            </motion.div>

            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-xs mx-auto">
              {t.bio}
            </p>
          </div>

          {/* Work Experience Card (Nested Card) */}
          <motion.div 
            className="bg-[#fcf6f4] dark:bg-slate-900/50 rounded-2xl border border-orange-100 dark:border-slate-700 p-5 mb-6 shadow-sm relative overflow-hidden group"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100">
                {t.experienceTitle}
              </h3>
              <LinkedInIcon className="text-primary-500" size={20} />
            </div>

            <div className="border-l-2 border-primary-200 dark:border-primary-800 pl-4 mb-4">
              <h4 className="font-bold text-slate-800 dark:text-white">{t.experience.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                {t.experience.company} • {t.experience.period}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-snug">
                {t.experience.description}
              </p>
            </div>

            {/* Key Achievement Box */}
            <div className="bg-accent-light dark:bg-emerald-900/30 rounded-lg p-3 border border-emerald-100 dark:border-emerald-800/50 flex gap-3">
              <Trophy className="text-accent-text dark:text-emerald-400 shrink-0 mt-0.5" size={18} strokeWidth={1.5} />
              <div>
                <p className="text-xs font-bold text-accent-text dark:text-emerald-300 uppercase tracking-wide mb-1">
                  {t.experience.keyAchievementTitle}
                </p>
                <p className="text-xs text-slate-700 dark:text-emerald-100/80 leading-snug">
                  {t.experience.keyAchievementDesc}
                </p>
              </div>
            </div>
            
            <a 
              href={APP_DATA.socialUrls.linkedin} 
              target="_blank" 
              className="absolute top-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="View on LinkedIn"
            >
              <div className="absolute inset-0" />
            </a>
          </motion.div>

          {/* Action Buttons */}
          <div className="space-y-3 mb-8">
            <motion.a
              href={APP_DATA.socialUrls.website}
              target="_blank"
              className="flex items-center justify-center w-full py-3.5 px-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium shadow-lg shadow-primary-500/20 relative overflow-hidden group"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(162, 124, 107, 0.4), 0 8px 10px -6px rgba(162, 124, 107, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center">
                <Briefcase className="mr-2 group-hover:-rotate-12 transition-transform duration-300" size={18} strokeWidth={1.5} />
                {t.buttons.primary}
              </span>
              {/* Shine effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            </motion.a>
            
            <motion.a
              href="#"
              className="flex items-center justify-center w-full py-3.5 px-6 bg-white dark:bg-slate-700 border border-orange-100 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl font-medium shadow-sm transition-all relative overflow-hidden group"
              whileHover={{ 
                scale: 1.02,
                backgroundColor: "rgba(255, 248, 246, 0.8)", // Light tint
                borderColor: "rgba(162, 124, 107, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center">
                {t.buttons.secondary}
                <motion.span
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowRight className="ml-2 opacity-50 group-hover:opacity-100 text-primary-500" size={18} strokeWidth={1.5} />
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-orange-50/50 dark:bg-slate-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          </div>

          {/* Social Large Buttons */}
          <div className="flex gap-4 mb-8">
            <motion.a 
              href={APP_DATA.socialUrls.linkedin}
              target="_blank"
              className="flex-1 flex items-center justify-center py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-md transition-all relative overflow-hidden"
              whileHover={{ 
                y: -3,
                boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <LinkedInIcon className="mr-2" size={20} />
              <span className="font-medium">{t.socialLabels.linkedin}</span>
            </motion.a>
            
            <motion.a 
              href={APP_DATA.socialUrls.github}
              target="_blank"
              className="flex-1 flex items-center justify-center py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-lg shadow-md transition-all relative overflow-hidden"
              whileHover={{ 
                y: -3,
                boxShadow: "0 10px 15px -3px rgba(51, 65, 85, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <GithubIcon className="mr-2" size={20} />
              <span className="font-medium">{t.socialLabels.github}</span>
            </motion.a>
          </div>

          {/* Sharing Section */}
          <div className="text-center relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4 opacity-70">
              <div className="h-px w-8 bg-slate-300 dark:bg-slate-600" />
              <span className="font-serif italic text-slate-500 dark:text-slate-400">{t.shareTitle}</span>
              <div className="h-px w-8 bg-slate-300 dark:bg-slate-600" />
            </div>
            
            <div className="flex justify-center gap-4">
              <ShareButton 
                icon={<WhatsAppIcon size={20} />} 
                url={getWhatsAppLink()} 
                label="Share on WhatsApp"
                colorClass="bg-[#25D366] hover:bg-[#20bd5a]" 
              />
              <ShareButton 
                icon={<Mail size={20} strokeWidth={1.5} />} 
                url={getMailLink()} 
                label="Share via Email"
                colorClass="bg-[#D08F79] hover:bg-[#b07865]" 
              />
               <ShareButton 
                icon={<XIcon size={18} />} 
                url={getTwitterLink()} 
                label="Share on X"
                colorClass="bg-black hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200" 
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-700/50 flex flex-col items-center gap-3">
            <div className="flex gap-4 text-slate-400 dark:text-slate-500">
              <a href={`mailto:${APP_DATA.socialUrls.email}`} className="hover:text-primary-500 transition-colors"><Mail size={18} strokeWidth={1.5} /></a>
              <a href={APP_DATA.socialUrls.github} className="hover:text-primary-500 transition-colors"><GithubIcon size={18} /></a>
              <a href={APP_DATA.socialUrls.linkedin} className="hover:text-primary-500 transition-colors"><LinkedInIcon size={18} /></a>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              © {t.footerRights}
            </p>
          </div>

        </motion.div>
      </main>
    </div>
  );
};

export default App;