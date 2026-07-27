'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileSearch, Target, Bot, Mic, CheckCircle2, Award } from 'lucide-react';

export interface TimelineStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const Timeline: React.FC = () => {
  const steps: TimelineStep[] = [
    { title: 'Upload Resume', description: 'Drag and drop your PDF resume to initialize analysis', icon: <Upload className="w-5 h-5 text-blue-400" /> },
    { title: 'Resume Analysis', description: 'Deep extraction of key skills, projects, and education history', icon: <FileSearch className="w-5 h-5 text-purple-400" /> },
    { title: 'Role Detection', description: 'AI automatically identifies target job role & experience level', icon: <Target className="w-5 h-5 text-cyan-400" /> },
    { title: 'AI Interview', description: 'Generates targeted RAG technical & behavioral questions', icon: <Bot className="w-5 h-5 text-indigo-400" /> },
    { title: 'Voice Conversation', description: 'Real-time interactive voice dialogue with AI speech model', icon: <Mic className="w-5 h-5 text-pink-400" /> },
    { title: 'Evaluation', description: 'Scoring across Technical, Communication & Confidence metrics', icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" /> },
    { title: 'Final Report', description: 'Comprehensive radar metrics, strengths, weaknesses & verdict', icon: <Award className="w-5 h-5 text-amber-400" /> },
  ];

  return (
    <div className="relative py-8 px-4 max-w-4xl mx-auto">
      {/* Central vertical glowing connector line */}
      <div className="absolute left-6 md:left-1/2 top-10 bottom-10 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 -translate-x-1/2 opacity-40 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />

      <div className="space-y-10">
        {steps.map((step, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Content Box */}
              <div className={`w-full md:w-[45%] pl-14 md:pl-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                <div className="glass-card p-5 glass-card-hover border border-white/10 relative">
                  <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase">Step 0{idx + 1}</span>
                  <h4 className="text-lg font-bold text-white mt-1">{step.title}</h4>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{step.description}</p>
                </div>
              </div>

              {/* Central Node Icon */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-950 border border-white/20 shadow-xl shadow-purple-500/20">
                <div className="p-2 rounded-xl bg-gray-900 border border-white/10">
                  {step.icon}
                </div>
              </div>

              {/* Empty Space filler for alternate grid */}
              <div className="hidden md:block w-[45%]" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
