'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { sendVoiceChatApi, evaluateAnswerApi } from '@/lib/api';
import { GlassCard } from '@/components/GlassCard';
import { OrbAvatar, AIStatus } from '@/components/OrbAvatar';
import { VoiceMicButton } from '@/components/VoiceMicButton';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ChevronRight, CheckCircle2, Bot, User, Sparkles, RefreshCw } from 'lucide-react';

export const InterviewView: React.FC = () => {
  const {
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    addAnswerRecord,
    setActiveView,
    addToast,
    candidate,
    settings,
  } = useApp();

  const [aiStatus, setAiStatus] = useState<AIStatus>('idle');
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [aiSpeechBubble, setAiSpeechBubble] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const currentQ = questions[currentQuestionIndex] || {
    id: 1,
    question: "Can you walk me through your overall technical experience and your favorite project listed on your resume?",
    category: "Overview",
    difficulty: "Medium",
  };

  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  // Audio synthesis helper
  const speakResponse = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && settings.autoPlayAudio) {
      window.speechSynthesis.cancel(); // cancel any active speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = settings.playbackSpeed || 1.0;
      utterance.onstart = () => setAiStatus('speaking');
      utterance.onend = () => setAiStatus('idle');
      utterance.onerror = () => setAiStatus('idle');
      window.speechSynthesis.speak(utterance);
    } else {
      setAiStatus('speaking');
      setTimeout(() => setAiStatus('idle'), 3000);
    }
  };

  // Web Speech Recognition for live transcribing in browser
  useEffect(() => {
    let recognition: any = null;
    if (isRecording && typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onresult = (event: any) => {
          let transcriptStr = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcriptStr += event.results[i][0].transcript;
          }
          if (transcriptStr) setLiveTranscript(transcriptStr);
        };
        try {
          recognition.start();
        } catch {}
      }
    }
    return () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch {}
      }
    };
  }, [isRecording]);

  // Start audio recording
  const handleStartRecording = async () => {
    setLiveTranscript('');
    setAiSpeechBubble(null);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processAudioAnswer(audioBlob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setAiStatus('listening');
    } catch {
      // Fallback if mic permission denied or unavailable
      setIsRecording(true);
      setAiStatus('listening');
      setLiveTranscript("I designed a distributed microservice layer with FastAPI and Next.js, using Chroma DB vector index for fast retrieval.");
    }
  };

  // Stop audio recording & send to API
  const handleStopRecording = () => {
    setIsRecording(false);
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((t) => t.stop());
    } else {
      // Direct process with mock audio blob
      const dummyBlob = new Blob(['mock audio'], { type: 'audio/webm' });
      processAudioAnswer(dummyBlob);
    }
  };

  const processAudioAnswer = async (audioBlob: Blob) => {
    setAiStatus('transcribing');

    setTimeout(async () => {
      setAiStatus('thinking');

      const userText = liveTranscript.trim() || 
        "I built the core vector database retrieval engine using sentence embeddings to maintain low latency responses.";

      // Send to voice API and evaluation API
      try {
        const voiceRes = await sendVoiceChatApi(audioBlob, currentQ.question);
        const evalRes = await evaluateAnswerApi(
          currentQ.question,
          userText,
          JSON.stringify(candidate || {})
        );

        // Save answer record
        addAnswerRecord({
          question: currentQ.question,
          answer: userText,
          evaluation: evalRes,
          timestamp: new Date().toLocaleTimeString(),
        });

        // Update AI response bubble and speak
        const replyText = voiceRes.ai_response || evalRes.feedback || "Great explanation! Your architectural approach shows clear technical depth.";
        setAiSpeechBubble(replyText);
        speakResponse(replyText);
      } catch {
        const fallbackText = "Solid answer! You demonstrated strong technical depth and clear reasoning for your architecture.";
        setAiSpeechBubble(fallbackText);
        speakResponse(fallbackText);
      }
    }, 1200);
  };

  const handleNextQuestion = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAiSpeechBubble(null);
      setLiveTranscript('');
      setAiStatus('idle');
    } else {
      setActiveView('evaluation');
      addToast('success', 'Interview completed! Generating detailed scorecard...');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8 pb-16">
      {/* Top Header & Question Progress Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-gray-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Active Session: <strong className="text-white">{candidate?.role || 'AI Technical Screen'}</strong>
          </span>
          <span className="text-purple-400 bg-purple-950/80 border border-purple-500/30 px-3 py-1 rounded-full">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full h-2 rounded-full bg-gray-900 border border-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
            className="h-full gradient-bg-primary rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)]"
          />
        </div>
      </div>

      {/* Center of Screen: Glowing AI Orb Avatar */}
      <OrbAvatar status={aiStatus} size="lg" />

      {/* Current Question Display (Glass Card) */}
      <GlassCard glow="blue" className="relative p-6 sm:p-8 text-center space-y-3 border-blue-500/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-xs font-semibold text-blue-300">
          <span>{currentQ.category || 'Technical Question'}</span>
          <span>•</span>
          <span className="text-cyan-400">{currentQ.difficulty || 'Medium'}</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
          "{currentQ.question}"
        </h2>
      </GlassCard>

      {/* ChatGPT Voice Mode Microphone Controls */}
      <VoiceMicButton
        status={aiStatus}
        isRecording={isRecording}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
      />

      {/* Live Transcript Display Box */}
      <AnimatePresence>
        {(liveTranscript || isRecording) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="p-5 rounded-2xl glass-card border-cyan-500/30 bg-cyan-950/20 space-y-2"
          >
            <div className="flex items-center justify-between text-xs text-cyan-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" /> Live Candidate Transcript
              </span>
              {isRecording && <span className="animate-pulse">Listening...</span>}
            </div>
            <p className="text-sm text-gray-200 font-sans italic leading-relaxed">
              "{liveTranscript || 'Start speaking into your microphone...'}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Speech Response Bubble */}
      <AnimatePresence>
        {aiSpeechBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-3xl glass-card border-purple-500/30 bg-purple-950/30 space-y-3 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
                <Bot className="w-4 h-4 text-purple-400" />
                <span>AI Interviewer Feedback</span>
              </div>
              <button
                onClick={() => speakResponse(aiSpeechBubble)}
                className="p-1.5 rounded-lg bg-gray-900 border border-white/10 text-gray-300 hover:text-white"
                title="Replay Audio"
              >
                <Volume2 className="w-4 h-4 text-purple-400" />
              </button>
            </div>

            <p className="text-sm text-gray-100 leading-relaxed font-medium">
              "{aiSpeechBubble}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          onClick={() => {
            setLiveTranscript('');
            setAiSpeechBubble(null);
            setAiStatus('idle');
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Answer</span>
        </button>

        <button
          onClick={handleNextQuestion}
          className="px-6 py-3 rounded-xl font-bold text-sm text-white gradient-bg-primary hover:opacity-90 shadow-lg shadow-purple-500/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
        >
          <span>{currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'View Evaluation'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
