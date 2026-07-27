'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/GlassCard';
import { Settings, Volume2, Gauge, Globe, Moon, Sparkles, Check } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings, addToast } = useApp();

  const voiceOptions = [
    'Nova (AI English - Natural)',
    'Echo (AI English - Professional)',
    'Alloy (AI Neutral)',
    'Onyx (Deep Voice)',
    'Shimmer (Clarity Focus)'
  ];

  const languages = [
    'English (US)',
    'English (UK)',
    'English (India)',
    'Spanish',
    'German',
    'French'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Preferences</span>
        <h1 className="text-3xl font-extrabold text-white">Platform Settings</h1>
        <p className="text-xs text-gray-400">Customize AI voice synthesized speed, active language model, and visual theme.</p>
      </div>

      {/* Voice Selection */}
      <GlassCard className="space-y-4">
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <div className="p-2 rounded-xl bg-purple-950/80 border border-purple-500/30">
            <Volume2 className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">AI Interviewer Voice</h3>
            <p className="text-xs text-gray-400">Choose synthesized text-to-speech voice voice model</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {voiceOptions.map((voice, idx) => {
            const isSelected = settings.voice === voice;
            return (
              <button
                key={idx}
                onClick={() => updateSettings({ voice })}
                className={`p-3.5 rounded-xl text-xs font-semibold text-left border flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-purple-950/60 border-purple-500/50 text-white shadow-md shadow-purple-500/10'
                    : 'bg-gray-900/60 border-white/5 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                <span>{voice}</span>
                {isSelected && <Check className="w-4 h-4 text-purple-400" />}
              </button>
            );
          })}
        </div>
      </GlassCard>

      {/* Playback Speed */}
      <GlassCard className="space-y-4">
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <div className="p-2 rounded-xl bg-blue-950/80 border border-blue-500/30">
            <Gauge className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Playback Speed</h3>
            <p className="text-xs text-gray-400">Adjust AI speaking cadence rate</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          {[0.8, 1.0, 1.2, 1.5].map((speed) => (
            <button
              key={speed}
              onClick={() => updateSettings({ playbackSpeed: speed })}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                settings.playbackSpeed === speed
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/20'
                  : 'bg-gray-900 border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Language */}
      <GlassCard className="space-y-4">
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30">
            <Globe className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Interview Language</h3>
            <p className="text-xs text-gray-400">Preferred primary language for RAG questions & speech recognition</p>
          </div>
        </div>

        <select
          value={settings.language}
          onChange={(e) => updateSettings({ language: e.target.value })}
          className="w-full max-w-sm px-4 py-3 rounded-xl bg-gray-900 border border-white/10 text-xs font-medium text-white focus:outline-none focus:border-purple-500/50"
        >
          {languages.map((lang, idx) => (
            <option key={idx} value={lang} className="bg-gray-950 text-white">
              {lang}
            </option>
          ))}
        </select>
      </GlassCard>

      {/* Theme Option */}
      <GlassCard className="space-y-4">
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <div className="p-2 rounded-xl bg-amber-950/80 border border-amber-500/30">
            <Moon className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Platform Aesthetic</h3>
            <p className="text-xs text-gray-400">Elegant black (#0B0F19) glassmorphism default</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <div className="px-4 py-2 rounded-xl bg-gray-900 border border-purple-500/40 text-xs font-bold text-purple-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Elegant Obsidian Dark Theme (#0B0F19)</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
