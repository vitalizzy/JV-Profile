import React from 'react';
import { motion } from 'framer-motion';

interface ShareButtonProps {
  icon: React.ReactNode;
  url: string;
  label: string;
  colorClass: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ icon, url, label, colorClass }) => {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${colorClass} w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md transition-all`}
      whileHover={{ 
        scale: 1.1, 
        rotate: 5,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      {icon}
    </motion.a>
  );
};

export default ShareButton;