import { cn } from '@/lib/format';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'glowing';
}

export function Card({ children, className, variant = 'default' }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[#2a2a45] p-5',
        variant === 'default' && 'bg-[#12121e]',
        variant === 'elevated' && 'bg-[#1a1a2e] shadow-lg',
        variant === 'glowing' && 'bg-[#1a1a2e] glow-indigo',
        className
      )}
    >
      {children}
    </div>
  );
}
