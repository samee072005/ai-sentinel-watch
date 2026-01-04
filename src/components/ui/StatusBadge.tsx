import { cn } from '@/lib/utils';
import { IncidentStatus, Severity } from '@/types';

interface StatusBadgeProps {
  status: IncidentStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusStyles: Record<IncidentStatus, string> = {
    open: 'badge-open',
    investigating: 'badge-investigating',
    resolved: 'badge-resolved',
  };

  const statusLabels: Record<IncidentStatus, string> = {
    open: 'Open',
    investigating: 'Investigating',
    resolved: 'Resolved',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
        statusStyles[status],
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
}

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const severityStyles: Record<Severity, string> = {
    critical: 'badge-critical',
    high: 'badge-high',
    medium: 'badge-medium',
    low: 'badge-low',
  };

  const severityLabels: Record<Severity, string> = {
    critical: 'Critical',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize',
        severityStyles[severity],
        className
      )}
    >
      {severityLabels[severity]}
    </span>
  );
}

interface IncidentTypeBadgeProps {
  type: string;
  className?: string;
}

export function IncidentTypeBadge({ type, className }: IncidentTypeBadgeProps) {
  const typeLabels: Record<string, string> = {
    hallucination: 'Hallucination',
    retrieval_failure: 'Retrieval Failure',
    policy_violation: 'Policy Violation',
    timeout: 'Timeout',
    context_overflow: 'Context Overflow',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground',
        className
      )}
    >
      {typeLabels[type] || type}
    </span>
  );
}
