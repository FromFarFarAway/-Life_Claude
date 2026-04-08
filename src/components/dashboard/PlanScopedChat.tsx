'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppState } from '@/lib/context';
import {
  getStarterMessage,
  getSuggestedPrompts,
  respondToPlanQuestion,
} from '@/data/coachAssistant';
import type { CoachMessage, Citation } from '@/data/models';
import { cn } from '@/lib/format';

const CITATION_TINT: Record<Citation['kind'], string> = {
  metric: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
  study: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300',
  'plan-action':
    'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
};

export function PlanScopedChat() {
  const { coachPlan, chatComposerPrefill, setChatComposerPrefill } =
    useAppState();
  const [messages, setMessages] = useState<CoachMessage[]>([getStarterMessage()]);
  const [input, setInput] = useState('');
  const [seenPrefill, setSeenPrefill] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Consume the prefill during render — see React docs "You Might Not Need
  // an Effect" → "Adjusting some state when a prop changes". This avoids the
  // set-state-in-effect lint rule and stays correct under StrictMode.
  if (chatComposerPrefill && chatComposerPrefill !== seenPrefill) {
    setSeenPrefill(chatComposerPrefill);
    setInput(`Why is "${chatComposerPrefill}" in the plan?`);
    setChatComposerPrefill('');
  }

  // Scroll to the latest message whenever the conversation grows.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus the composer once after the prefill lands.
  useEffect(() => {
    if (seenPrefill) inputRef.current?.focus();
  }, [seenPrefill]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: CoachMessage = {
      role: 'user',
      content: trimmed,
      citations: [],
    };
    const reply = respondToPlanQuestion(trimmed, { plan: coachPlan });
    setMessages((prev) => [...prev, userMsg, reply]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const suggested = getSuggestedPrompts(coachPlan);

  return (
    <section
      id="plan-scoped-chat"
      className="rounded-xl border border-[#2a2a45] bg-[#12121e] p-4 space-y-3"
    >
      <div className="flex items-center gap-2">
        <svg
          className="h-4 w-4 text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
          Ask the coach
        </h3>
        <span className="text-[10px] text-gray-500">
          scoped to your plan · cites every answer
        </span>
      </div>

      {/* Messages */}
      <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts */}
      <div className="flex flex-wrap gap-1.5">
        {suggested.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => send(q)}
            className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Composer */}
      <div className="flex gap-2">
        <textarea
          ref={inputRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask why a priority is first, request a swap, or share a worry…"
          className="flex-1 resize-none bg-[#1a1a2e] border border-[#2a2a45] rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50"
        />
        <button
          type="button"
          onClick={() => send(input)}
          disabled={!input.trim()}
          className="px-3 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Send
        </button>
      </div>
    </section>
  );
}

function MessageBubble({ msg }: { msg: CoachMessage }) {
  const isUser = msg.role === 'user';
  return (
    <div
      className={cn(
        'rounded-lg p-3 text-sm leading-relaxed',
        isUser
          ? 'bg-blue-500/10 text-blue-200 ml-6'
          : 'bg-[#1a1a2e] text-gray-300'
      )}
    >
      {msg.content.split('\n').map((line, i) => (
        <p key={i} className="whitespace-pre-wrap">
          {line || '\u00A0'}
        </p>
      ))}
      {!isUser && msg.citations.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {msg.citations.map((c, i) => (
            <span
              key={i}
              className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px]',
                CITATION_TINT[c.kind]
              )}
            >
              <span className="uppercase opacity-70">{c.kind}</span>
              <span>{c.label}</span>
            </span>
          ))}
        </div>
      )}
      {!isUser && msg.citations.length === 0 && msg.content.length > 0 && (
        <div className="mt-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] bg-gray-500/10 border-gray-500/20 text-gray-400">
            no citations · refused
          </span>
        </div>
      )}
    </div>
  );
}
