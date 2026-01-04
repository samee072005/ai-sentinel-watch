import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { DashboardMetric } from '@/types';

interface MetricCardProps {
  metric: DashboardMetric;
  className?: string;
}

export function MetricCard({ metric, className }: MetricCardProps) {
  const { label, value, change, changeType } = metric;

  return (
    <div className={cn('rounded-lg border border-border bg-card p-4', className)}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-foreground">
          {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value}
        </span>
        {change !== undefined && change !== 0 && (
          <span
            className={cn(
              'flex items-center text-xs font-medium',
              changeType === 'decrease' ? 'text-success' : 'text-destructive'
            )}
          >
            {changeType === 'decrease' ? (
              <TrendingDown className="mr-0.5 h-3 w-3" />
            ) : (
              <TrendingUp className="mr-0.5 h-3 w-3" />
            )}
            {Math.abs(change)}%
          </span>
        )}
        {change === 0 && (
          <span className="flex items-center text-xs text-muted-foreground">
            <Minus className="mr-0.5 h-3 w-3" />
            No change
          </span>
        )}
      </div>
    </div>
  );
}
