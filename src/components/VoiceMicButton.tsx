'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Loader2, Volume2, Sparkles } from 'lucide-react';
import { AIStatus } from './OrbAvatar';

interface VoiceMicButtonProps {
  status: AIStatus;
  onStartRecording: () => void;
  onStopRecording: () => void;
  isRecording: boolean;
}

export const VoiceMicButton: React.FC<VoiceMicButtonProps> = ({
  status,
  onStartRecording,
  onStopRecording,
  isRecording,
}) => {
  const [timerSeconds, setTimerSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle timer
  useEffect(() => {
    if (isRecording) {
      setTimerSeconds(0);
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMicClick = () => {
    if (isRecording) {
      onStopRecording();
    } else {
      onStartRecording();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4">
      {/* Waveform Visualizer when recording */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center gap-1.5 px-6 py-2 rounded-full bg-gray-900/80 border border-cyan-500/30 backdrop-blur-md shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping mr-2" />
            <span className="text-xs font-mono text-cyan-300 font-semibold tracking-wider">
              {formatTimer(timerSeconds)}
            </span>
            <div className="flex items-end gap-1 h-6 ml-3">
              {[40, 75, 30, 95, 60, 85, 45, 100, 50, 70].map((h, idx) => (
                <motion.div
                  key={idx}
                  animate={{ height: [`${Math.max(6, h * 0.2)}px`, `${h * 0.25}px`, `${Math.max(6, h * 0.2)}px`] }}
                  transition={{ duration: 0.5 + (idx % 3) * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1 rounded-full bg-gradient-to-t from-blue-500 to-cyan-400"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mic Trigger Container */}
      <div className="relative flex items-center justify-center">
        {/* Pulsing Ripple Rings */}
        {isRecording && (
          <>
            <motion.div
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              className="absolute w-24 h-24 rounded-full bg-cyan-500/30 border border-cyan-400/50 pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 2.1], opacity: [0.4, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
              className="absolute w-24 h-24 rounded-full bg-purple-500/20 border border-purple-400/40 pointer-events-none"
            />
          </>
        )}

        {/* ChatGPT Style Circular Mic Button */}
        <button
          onClick={handleMicClick}
          disabled={status === 'transcribing' || status === 'thinking'}
          className={`relative z-10 w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl focus:outline-none ${
            isRecording
              ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-cyan-500/50 scale-105 border-2 border-cyan-300'
              : status === 'speaking'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-purple-500/30 hover:scale-105 border border-purple-400/40'
              : 'gradient-bg-primary hover:scale-105 active:scale-95 shadow-blue-500/30 border border-white/20'
          }`}
        >
          {isRecording ? (
            <Square className="w-8 h-8 text-white fill-white animate-pulse" />
          ) : status === 'transcribing' || status === 'thinking' ? (
            <Loader2 className="w-9 h-9 text-white animate-spin" />
          ) : status === 'speaking' ? (
            <Volume2 className="w-9 h-9 text-white animate-bounce" />
          ) : (
            <Mic className="w-9 h-9 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]" />
          )}
        </button>
      </div>

      {/* Helper Click Instruction */}
      <div className="text-center">
        <p className="text-xs font-medium text-gray-300 flex items-center gap-1.5 justify-center">
          {isRecording ? (
            <span className="text-cyan-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Tap mic again to submit response
            </span>
          ) : status === 'speaking' ? (
            <span className="text-purple-300">AI response playing... Tap mic to answer</span>
          ) : (
            <span>Tap mic to speak your answer</span>
          )}
        </p>
      </div>
    </div>
  );
};
