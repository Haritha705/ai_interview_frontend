'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Mic, Sparkles, Brain, Volume2 } from 'lucide-react';

export type AIStatus = 'idle' | 'listening' | 'transcribing' | 'thinking' | 'speaking';

interface OrbAvatarProps {
  status: AIStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const OrbAvatar: React.FC<OrbAvatarProps> = ({ status, size = 'md' }) => {
  const dimension = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48 lg:w-56 lg:h-56',
    lg: 'w-64 h-64 lg:w-72 lg:h-72',
  }[size];

  const getStatusColor = () => {
    switch (status) {
      case 'listening':
        return 'from-cyan-400 via-blue-500 to-indigo-600';
      case 'transcribing':
        return 'from-amber-400 via-orange-500 to-pink-500';
      case 'thinking':
        return 'from-purple-500 via-pink-500 to-blue-600';
      case 'speaking':
        return 'from-blue-400 via-indigo-500 to-purple-500';
      default:
        return 'from-blue-500 via-purple-600 to-indigo-700';
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'listening':
        return { text: 'Listening...', icon: <Mic className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />, color: 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300' };
      case 'transcribing':
        return { text: 'Transcribing...', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />, color: 'bg-amber-950/80 border-amber-500/40 text-amber-300' };
      case 'thinking':
        return { text: 'Thinking...', icon: <Brain className="w-3.5 h-3.5 text-purple-400 animate-pulse" />, color: 'bg-purple-950/80 border-purple-500/40 text-purple-300' };
      case 'speaking':
        return { text: 'AI Speaking...', icon: <Volume2 className="w-3.5 h-3.5 text-blue-400 animate-bounce" />, color: 'bg-blue-950/80 border-blue-500/40 text-blue-300' };
      default:
        return { text: 'HirePrep AI Ready', icon: <Bot className="w-3.5 h-3.5 text-blue-400" />, color: 'bg-gray-900/80 border-gray-700 text-gray-300' };
    }
  };

  const badge = getStatusBadge();

  return (
    <div className="relative flex flex-col items-center justify-center py-6">
      {/* Outer Glowing Energy Rings */}
      <motion.div
        animate={
          status === 'listening'
            ? { scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }
            : status === 'speaking'
            ? { scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }
            : { scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }
        }
        transition={{ duration: status === 'speaking' ? 1.2 : 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute rounded-full blur-2xl ${dimension} bg-gradient-to-r ${getStatusColor()} opacity-40 pointer-events-none`}
      />

      {/* Rotating Background Halo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: status === 'thinking' ? 4 : 12, repeat: Infinity, ease: 'linear' }}
        className={`absolute rounded-full border border-white/10 ${dimension} border-dashed pointer-events-none p-4`}
      >
        <div className="w-full h-full rounded-full border border-purple-500/20" />
      </motion.div>

      {/* Core AI Orb */}
      <motion.div
        animate={
          status === 'speaking'
            ? { scale: [1, 1.06, 0.98, 1.04, 1] }
            : status === 'listening'
            ? { scale: [1, 1.08, 1] }
            : { y: [0, -8, 0] }
        }
        transition={{ duration: status === 'speaking' ? 0.8 : 3, repeat: Infinity, ease: 'easeInOut' }}
        className={`relative ${dimension} rounded-full bg-gradient-to-tr ${getStatusColor()} p-[2px] shadow-2xl flex items-center justify-center cursor-pointer group`}
      >
        {/* Inner Glass Sphere */}
        <div className="w-full h-full rounded-full bg-gray-950/90 backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden border border-white/20 shadow-inner">
          {/* Animated Internal Liquid Gradient */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: status === 'speaking' ? [1, 1.3, 1] : [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-full blur-md"
          />

          {/* Center Icon */}
          <div className="relative z-10 p-4 rounded-full bg-gray-900/60 border border-white/10 backdrop-blur-md shadow-lg group-hover:scale-110 transition-transform">
            <Bot className="w-10 h-10 lg:w-14 lg:h-14 text-white drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
          </div>

          {/* Particle dots */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="w-2 h-2 rounded-full bg-cyan-400 absolute top-4 left-8 animate-ping" />
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 absolute bottom-6 right-8 animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Floating Dynamic Status Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-6 px-4 py-1.5 rounded-full border text-xs font-semibold backdrop-blur-md flex items-center gap-2 shadow-lg ${badge.color}`}
      >
        {badge.icon}
        <span>{badge.text}</span>
      </motion.div>
    </div>
  );
};
