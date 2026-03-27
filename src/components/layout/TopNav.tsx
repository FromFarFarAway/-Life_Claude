'use client';

import { useState, useEffect } from 'react';
import { categories } from '@/data/categories';

export function TopNav() {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-150px 0px -60% 0px', threshold: 0 }
    );

    categories.forEach((cat) => {
      const el = document.getElementById(cat.anchorId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (anchorId: string) => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#2a2a45] bg-[#0a0a0f]/90 backdrop-blur-xl">
      {/* Brand block */}
      <div className="relative flex items-center justify-between px-6 py-4">
        <div className="relative">
          {/* Aura */}
          <div className="brand-aura absolute -inset-4 -z-10" />
          <div className="flex items-baseline gap-2">
            <h1 className="text-xl font-bold tracking-wider text-white">
              +LIFE
            </h1>
            <span className="text-sm font-medium text-gray-400">Health OS</span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">Personal health assistant</p>
        </div>
      </div>

      {/* Category nav */}
      <nav
        className="flex gap-1 overflow-x-auto px-6 pb-3 scrollbar-thin"
        role="navigation"
        aria-label="Health categories"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => scrollToSection(cat.anchorId)}
            className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
              activeSection === cat.anchorId
                ? 'bg-[#1e1e35] text-white border border-[#3a3a55]'
                : 'text-gray-400 hover:text-gray-200 hover:bg-[#1a1a2e] border border-transparent'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
