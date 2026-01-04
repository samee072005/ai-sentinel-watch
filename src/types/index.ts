// Core domain types for SAMIX AI

export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type IncidentStatus = 'open' | 'investigating' | 'resolved';
export type IncidentType = 'hallucination' | 'retrieval_failure' | 'policy_violation' | 'timeout' | 'context_overflow';

export interface Incident {
  id: string;
  type: IncidentType;
  title: string;
  description: string;
  agentId: string;
  agentName: string;
  severity: Severity;
  status: IncidentStatus;
  lastSeen: Date;
  firstSeen: Date;
  eventCount: number;
  affectedUsers: number;
  rootCause?: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  modelVersion: string;
  status: 'active' | 'inactive' | 'degraded';
  lastActiveAt: Date;
  totalExecutions: number;
  failureRate: number;
}

export interface TraceStep {
  id: string;
  type: 'user_input' | 'rag_retrieval' | 'llm_call' | 'tool_call' | 'output';
  name: string;
  duration: number;
  status: 'success' | 'error' | 'warning';
  input?: string;
  output?: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
}

export interface Trace {
  id: string;
  agentId: string;
  agentName: string;
  modelVersion: string;
  status: 'success' | 'error' | 'warning';
  duration: number;
  startedAt: Date;
  completedAt: Date;
  steps: TraceStep[];
  userId?: string;
}

export interface Policy {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  type: 'content' | 'safety' | 'compliance' | 'performance';
  violationCount: number;
  lastTriggered?: Date;
}

export interface DashboardMetric {
  label: string;
  value: number;
  change?: number;
  changeType?: 'increase' | 'decrease';
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: unknown;
}
