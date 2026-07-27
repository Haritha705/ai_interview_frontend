'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ResumeParseResult, EvaluationResult } from '@/lib/api';

export type PageView = 'landing' | 'dashboard' | 'upload' | 'interview' | 'evaluation' | 'report' | 'history' | 'settings';

export interface QuestionItem {
  id: number | string;
  question: string;
  category?: string;
  difficulty?: string;
  context?: string;
}

export interface QuestionAnswerRecord {
  question: string;
  answer: string;
  evaluation?: EvaluationResult;
  timestamp: string;
}

export interface InterviewHistorySession {
  id: string;
  date: string;
  role: string;
  score: number;
  duration: string;
  status: 'Completed' | 'In Progress' | 'Evaluated';
  questionsCount: number;
}

export interface AppSettings {
  voice: string;
  playbackSpeed: number;
  language: string;
  theme: 'dark' | 'glass';
  autoPlayAudio: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  activeView: PageView;
  setActiveView: (view: PageView) => void;
  candidate: ResumeParseResult['resume'] | null;
  setCandidate: (data: ResumeParseResult['resume']) => void;
  questions: QuestionItem[];
  setQuestions: (q: QuestionItem[]) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (idx: number | ((prev: number) => number)) => void;
  answers: QuestionAnswerRecord[];
  addAnswerRecord: (record: QuestionAnswerRecord) => void;
  history: InterviewHistorySession[];
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'error' | 'info', message: string) => void;
  removeToast: (id: string) => void;
  resetInterview: () => void;
  backendStatus: 'connected' | 'offline' | 'checking';
  setBackendStatus: (status: 'connected' | 'offline' | 'checking') => void;
}

const defaultSettings: AppSettings = {
  voice: 'Nova (AI English)',
  playbackSpeed: 1.0,
  language: 'English (US)',
  theme: 'dark',
  autoPlayAudio: true,
};

const defaultQuestions: QuestionItem[] = [
  { id: 1, question: "Can you walk me through your overall technical experience and your favorite project listed on your resume?", category: "Overview", difficulty: "Easy" },
  { id: 2, question: "How did you design the backend API architecture and handle high concurrency or data persistence?", category: "System Architecture", difficulty: "Medium" },
  { id: 3, question: "What approach do you take when troubleshooting complex runtime errors or front-end state synchronization issues?", category: "Debugging & State", difficulty: "Medium" },
  { id: 4, question: "How do you ensure web application performance, accessibility, and code quality in a fast-paced environment?", category: "Best Practices", difficulty: "Hard" },
  { id: 5, question: "Describe a situation where you had to quickly learn a new framework or technology to deliver a critical feature.", category: "Adaptability", difficulty: "Medium" },
];

const initialHistory: InterviewHistorySession[] = [
  { id: 'sess-101', date: '2026-07-20', role: 'Senior AI Full-Stack Developer', score: 92, duration: '18 min', status: 'Completed', questionsCount: 5 },
  { id: 'sess-102', date: '2026-07-15', role: 'Frontend Engineer', score: 85, duration: '14 min', status: 'Completed', questionsCount: 5 },
  { id: 'sess-103', date: '2026-07-08', role: 'Python Software Engineer', score: 78, duration: '12 min', status: 'Completed', questionsCount: 4 },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<PageView>('landing');
  const [candidate, setCandidate] = useState<ResumeParseResult['resume'] | null>({
    name: 'Alex Morgan',
    role: 'Senior Full Stack & AI Engineer',
    skills: ['React', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'Tailwind CSS', 'LangChain', 'PostgreSQL', 'Docker'],
    projects: [
      { title: 'HirePrep AI Platform', description: 'Real-time AI voice interview platform with RAG questions and evaluations.', tech_stack: ['Next.js', 'FastAPI', 'Framer Motion'] },
      { title: 'Cloud Vector Pipeline', description: 'Scalable document embedding and hybrid retrieval architecture.', tech_stack: ['Python', 'ChromaDB', 'Redis'] }
    ],
    education: [{ degree: 'B.S. Computer Science', institution: 'Tech University', year: '2020 - 2024' }],
    experience: [{ title: 'Senior Software Engineer', company: 'Nexus AI Systems', duration: '2024 - Present', details: 'Built interactive web platforms & LLM tools.' }],
    readiness_score: 90,
  });
  const [questions, setQuestions] = useState<QuestionItem[]>(defaultQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<QuestionAnswerRecord[]>([]);
  const [history, setHistory] = useState<InterviewHistorySession[]>(initialHistory);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [backendStatus, setBackendStatus] = useState<'connected' | 'offline' | 'checking'>('checking');

  // Local storage persistence
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('hireprep_history');
      if (savedHistory) setHistory(JSON.parse(savedHistory));
      const savedSettings = localStorage.getItem('hireprep_settings');
      if (savedSettings) setSettings(JSON.parse(savedSettings));
    } catch {
      // ignore
    }
  }, []);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('hireprep_settings', JSON.stringify(updated));
      } catch { }
      return updated;
    });
    addToast('info', 'Settings updated');
  };

  const addAnswerRecord = (record: QuestionAnswerRecord) => {
    setAnswers((prev) => [...prev, record]);
  };

  const resetInterview = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        candidate,
        setCandidate,
        questions,
        setQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        answers,
        addAnswerRecord,
        history,
        settings,
        updateSettings,
        toasts,
        addToast,
        removeToast,
        resetInterview,
        backendStatus,
        setBackendStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
