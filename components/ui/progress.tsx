import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-neutral-200',
        className
      )}
      {...props}
    >
      <div
        className="h-full bg-neutral-900 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  )
);
Progress.displayName = 'Progress';
