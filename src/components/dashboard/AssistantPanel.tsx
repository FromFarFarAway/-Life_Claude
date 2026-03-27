'use client';

import { useState, useRef, useEffect } from 'react';
import { starterMessage, suggestedQuestions, fallbackAnswer, type AssistantMessage } from '@/data/assistant';

interface AssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export function AssistantPanel({ isOpen, onClose, onOpen }: AssistantPanelProps) {
  const [messages, setMessages] = useState<AssistantMessage[]>([starterMessage]);
  const [input, setInput] = useState('');
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleQuestion = (questionIndex: number) => {
    const qa = suggestedQuestions[questionIndex];
    setUsedQuestions(new Set([...usedQuestions, questionIndex]));
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: qa.question },
      { role: 'assistant', content: qa.answer },
    ]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');

    const matchedQA = suggestedQuestions.find(
      (qa) => userMsg.toLowerCase().includes(qa.question.toLowerCase().slice(0, 20))
    );

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: userMsg },
      { role: 'assistant', content: matchedQA?.answer ?? fallbackAnswer },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Floating button when closed (mobile or closed state)
  if (!isOpen) {
    return (
      <button
        onClick={onOpen}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-indigo-600 shadow-lg glow-indigo flex items-center justify-center hover:bg-indigo-500 transition-colors"
        aria-label="Open AI Assistant"
      >
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] max-h-[600px] flex flex-col bg-[#12121e] border border-[#2a2a45] rounded-xl shadow-2xl glow-indigo overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a45] bg-[#0f1019]">
        <div>
          <h3 className="text-sm font-semibold text-white">Ask +Life Assistant</h3>
          <p className="text-[10px] text-gray-500">AI Advisor</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-lg leading-none p-1"
          aria-label="Close assistant"
        >
          &times;
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 max-h-[380px]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`text-sm leading-relaxed ${
              msg.role === 'assistant'
                ? 'text-gray-300 bg-[#1a1a2e] rounded-lg p-3'
                : 'text-blue-300 bg-blue-500/10 rounded-lg p-3 ml-6'
            }`}
          >
            {msg.content.split('\n').map((line, j) => (
              <span key={j}>
                {line}
                {j < msg.content.split('\n').length - 1 && <br />}
              </span>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      {suggestedQuestions.some((_, i) => !usedQuestions.has(i)) && (
        <div className="px-4 py-2 border-t border-[#2a2a45] flex flex-wrap gap-1.5">
          {suggestedQuestions.map((qa, i) => {
            if (usedQuestions.has(i)) return null;
            return (
              <button
                key={i}
                onClick={() => handleQuestion(i)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 transition-colors text-left"
              >
                {qa.question}
              </button>
            );
          })}
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 border-t border-[#2a2a45] flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about your health data..."
          className="flex-1 bg-[#1a1a2e] border border-[#2a2a45] rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="px-3 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}
