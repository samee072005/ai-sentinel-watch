import { ChartDataPoint, DashboardMetric } from '@/types';

export const incidentMetrics: DashboardMetric[] = [
  { label: 'Open Incidents', value: 12, change: -15, changeType: 'decrease' },
  { label: 'Critical Issues', value: 3, change: 50, changeType: 'increase' },
  { label: 'Avg Resolution Time', value: 4.2, change: -20, changeType: 'decrease' },
  { label: 'Affected Agents', value: 4, change: 0 },
];

export const incidentsOverTime: ChartDataPoint[] = [
  { name: 'Mon', value: 8, critical: 2, high: 3, medium: 2, low: 1 },
  { name: 'Tue', value: 12, critical: 3, high: 4, medium: 3, low: 2 },
  { name: 'Wed', value: 6, critical: 1, high: 2, medium: 2, low: 1 },
  { name: 'Thu', value: 15, critical: 4, high: 5, medium: 4, low: 2 },
  { name: 'Fri', value: 9, critical: 2, high: 3, medium: 3, low: 1 },
  { name: 'Sat', value: 4, critical: 1, high: 1, medium: 1, low: 1 },
  { name: 'Sun', value: 3, critical: 0, high: 1, medium: 1, low: 1 },
];

export const failureTypeDistribution: ChartDataPoint[] = [
  { name: 'Hallucination', value: 35 },
  { name: 'Retrieval Failure', value: 28 },
  { name: 'Policy Violation', value: 18 },
  { name: 'Timeout', value: 12 },
  { name: 'Context Overflow', value: 7 },
];

export const topFailingAgents: ChartDataPoint[] = [
  { name: 'CustomerSupport-v2', value: 23, failureRate: 4.2 },
  { name: 'DocumentQA-main', value: 18, failureRate: 3.8 },
  { name: 'SalesAssistant-prod', value: 12, failureRate: 2.1 },
  { name: 'CodeReview-beta', value: 8, failureRate: 5.6 },
  { name: 'DataAnalyst-v1', value: 5, failureRate: 1.2 },
];

export const riskMetrics: DashboardMetric[] = [
  { label: 'Policy Violations (24h)', value: 7, change: 40, changeType: 'increase' },
  { label: 'Hallucination Rate', value: 2.3, change: -10, changeType: 'decrease' },
  { label: 'Data Leakage Attempts', value: 0, change: 0 },
  { label: 'Guardrail Triggers', value: 156, change: 12, changeType: 'increase' },
];

export interface AgentReliabilityData {
  name: string;
  uptime: number;
  successRate: number;
  avgLatency: number;
}

export const agentReliability: AgentReliabilityData[] = [
  { name: 'CustomerSupport-v2', uptime: 99.2, successRate: 95.8, avgLatency: 1.2 },
  { name: 'SalesAssistant-prod', uptime: 99.8, successRate: 97.2, avgLatency: 0.9 },
  { name: 'DocumentQA-main', uptime: 98.5, successRate: 94.1, avgLatency: 1.8 },
  { name: 'CodeReview-beta', uptime: 97.2, successRate: 91.5, avgLatency: 2.4 },
  { name: 'DataAnalyst-v1', uptime: 99.9, successRate: 98.7, avgLatency: 0.7 },
];
