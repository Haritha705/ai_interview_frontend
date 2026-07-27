'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { Sparkles, Mic, FileText, Cpu, MessageSquare, LineChart, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { Timeline } from '@/components/Timeline';
import { OrbAvatar } from '@/components/OrbAvatar';

export const LandingView: React.FC = () => {
  const { setActiveView } = useApp();

  const features = [
    { title: 'Resume Parsing', desc: 'AI automatically analyzes PDF structure, projects, education, and technical stack.', icon: <FileText className="w-6 h-6 text-blue-400" /> },
    { title: 'AI Voice Interview', desc: 'Real-time conversational speech with human-like voice synthesis and zero latency feel.', icon: <Mic className="w-6 h-6 text-purple-400" /> },
    { title: 'RAG Question Generation', desc: 'Retrieval Augmented Generation tailored specifically to your resume context.', icon: <Cpu className="w-6 h-6 text-cyan-400" /> },
    { title: 'Real-time Speech Recognition', desc: 'High accuracy speech-to-text transcript parsing as you speak.', icon: <MessageSquare className="w-6 h-6 text-indigo-400" /> },
    { title: 'AI Feedback & Critique', desc: 'Instant breakdown of technical accuracy, missing details, and communication tone.', icon: <Zap className="w-6 h-6 text-pink-400" /> },
    { title: 'Performance Analytics', desc: 'Comprehensive score visualizer, skill radar charts, and personalized learning paths.', icon: <LineChart className="w-6 h-6 text-emerald-400" /> },
  ];

  return (
    <div className="space-y-24 py-8 pb-20">
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Background glow halos */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Subtitle */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-blue-500/30 text-xs font-semibold text-blue-300">
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>Next-Gen Voice AI Interview Preparation Platform</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Master Your Next <br />
              <span className="gradient-text">Resume Interview</span> <br />
              with HirePrep AI
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl font-normal leading-relaxed">
              Practice personalized AI-powered resume interviews with real-time voice interaction, instant feedback, and detailed performance analysis.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setActiveView('interview')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-white gradient-bg-primary shadow-xl shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <Mic className="w-5 h-5" />
                <span>Start Interview</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setActiveView('upload')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-gray-200 glass-card glass-card-hover border-white/10 flex items-center justify-center gap-3"
              >
                <FileText className="w-5 h-5 text-purple-400" />
                <span>Upload Resume</span>
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 pt-6 border-t border-white/10 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>RAG Question Model</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>ChatGPT Voice Feel</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Sub-Second Latency</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Animated AI Orb Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative glass-card p-8 rounded-3xl border-purple-500/20 shadow-2xl backdrop-blur-2xl text-center w-full max-w-md">
              <OrbAvatar status="idle" size="lg" />
              <div className="mt-4 p-4 rounded-2xl bg-gray-900/80 border border-white/10 text-left space-y-1">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Live Simulation</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Active
                  </span>
                </div>
                <p className="text-sm font-semibold text-white">"Tell me about your RAG implementation experience..."</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- FEATURES SECTION ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-purple-400">Features</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Built for Modern High-Stakes Prep
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base">
            Every feature is engineered to replicate real technical screen calls with AI feedback engines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <GlassCard hoverEffect className="h-full flex flex-col justify-between p-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-900 border border-white/10 flex items-center justify-center shadow-lg">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{feat.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{feat.desc}</p>
                </div>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-purple-400">
                  <span>Learn details</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- WORKFLOW TIMELINE ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">Interactive Flow</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            How HirePrep AI Works
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            From resume upload to detailed evaluation report in 7 seamless steps.
          </p>
        </div>

        <Timeline />
      </section>
    </div>
  );
};
