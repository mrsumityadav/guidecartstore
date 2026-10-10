'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, CheckSquare, BookOpen, Calendar, Sparkles } from 'lucide-react';

export default function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-35">
      {/* Soft Grid Background */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-60"
      />

      {/* Floating Outline Icons */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-24 left-[8%] text-slate-300 dark:text-slate-800"
      >
        <FileText size={48} strokeWidth={1} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -6, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[40%] right-[6%] text-indigo-200 dark:text-indigo-950/40"
      >
        <Download size={56} strokeWidth={1} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 8, 0]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[25%] left-[5%] text-slate-300 dark:text-slate-800"
      >
        <CheckSquare size={44} strokeWidth={1} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -4, 0]
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-[65%] right-[12%] text-slate-300 dark:text-slate-800"
      >
        <BookOpen size={50} strokeWidth={1} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, 6, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute top-[18%] right-[25%] text-slate-200 dark:text-slate-800/50"
      >
        <Calendar size={38} strokeWidth={1} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 16, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-[10%] right-[30%] text-indigo-200/60 dark:text-indigo-900/30"
      >
        <Sparkles size={40} strokeWidth={1} />
      </motion.div>
    </div>
  );
}
