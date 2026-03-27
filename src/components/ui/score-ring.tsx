'use client';

import { useEffect, useState } from 'react';

interface ScoreRingProps {
  score: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function ScoreRing({
  score,
  maxScore = 100,
  size = 200,
  strokeWidth = 8,
  className,
}: ScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = animatedScore / maxScore;
  const strokeDashoffset = circumference * (1 - progress);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const runAnimation = () => {
      if (motionQuery.matches) {
        setAnimatedScore(score);
        return;
      }

      let frame: number;
      const duration = 1200;
      const start = performance.now();

      function animate(now: number) {
        const elapsed = now - start;
        const t = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setAnimatedScore(Math.round(score * eased));
        if (t < 1) {
          frame = requestAnimationFrame(animate);
        }
      }

      frame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frame);
    };

    const cleanup = runAnimation();
    const handler = () => {
      setAnimatedScore(score);
    };
    motionQuery.addEventListener('change', handler);
    return () => {
      cleanup?.();
      motionQuery.removeEventListener('change', handler);
    };
  }, [score]);

  const getScoreColor = () => {
    if (score >= 75) return '#22c55e';
    if (score >= 60) return '#f59e0b';
    if (score >= 45) return '#f97316';
    return '#ef4444';
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className ?? ''}`}>
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-full opacity-30 blur-xl"
        style={{
          background: `radial-gradient(circle, ${getScoreColor()}40, transparent 70%)`,
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="score-ring-glow -rotate-90"
        role="img"
        aria-label={`Health Score: ${score} out of ${maxScore}`}
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1e1e35"
          strokeWidth={strokeWidth}
        />

        {/* Dark core */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - strokeWidth * 2}
          fill="#0a0a0f"
        />

        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getScoreColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
        />

        {/* Outer glow ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getScoreColor()}
          strokeWidth={strokeWidth + 4}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          opacity={0.15}
          style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold tracking-tight text-white">
          {animatedScore}
        </span>
        <span className="text-sm font-medium text-gray-400 mt-1">/ {maxScore}</span>
      </div>
    </div>
  );
}
