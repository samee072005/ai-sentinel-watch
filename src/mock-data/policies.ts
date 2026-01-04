import { Policy } from '@/types';

export const mockPolicies: Policy[] = [
  {
    id: 'policy-1',
    name: 'PII Detection & Blocking',
    description: 'Prevents AI agents from outputting personally identifiable information including SSNs, credit cards, and addresses.',
    enabled: true,
    type: 'safety',
    violationCount: 23,
    lastTriggered: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 'policy-2',
    name: 'Financial Advice Restriction',
    description: 'Blocks AI from providing specific financial, investment, or tax advice to users.',
    enabled: true,
    type: 'compliance',
    violationCount: 8,
    lastTriggered: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: 'policy-3',
    name: 'Content Safety Filter',
    description: 'Filters harmful, inappropriate, or offensive content from AI responses.',
    enabled: true,
    type: 'safety',
    violationCount: 156,
    lastTriggered: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: 'policy-4',
    name: 'Latency Threshold Alert',
    description: 'Triggers alert when agent response time exceeds 5 seconds.',
    enabled: true,
    type: 'performance',
    violationCount: 42,
    lastTriggered: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: 'policy-5',
    name: 'Hallucination Detection',
    description: 'Uses secondary model to detect potential hallucinations in AI responses.',
    enabled: false,
    type: 'content',
    violationCount: 0,
  },
  {
    id: 'policy-6',
    name: 'GDPR Data Handling',
    description: 'Ensures AI agents comply with GDPR data handling and privacy requirements.',
    enabled: true,
    type: 'compliance',
    violationCount: 3,
    lastTriggered: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
];

export const mockGuardrails = [
  {
    id: 'guard-1',
    name: 'Input Sanitization',
    description: 'Sanitizes and validates all user inputs before processing.',
    enabled: true,
    triggersToday: 45,
  },
  {
    id: 'guard-2',
    name: 'Output Length Limit',
    description: 'Limits AI response length to prevent token overflow attacks.',
    enabled: true,
    triggersToday: 12,
  },
  {
    id: 'guard-3',
    name: 'Prompt Injection Detection',
    description: 'Detects and blocks prompt injection attempts in user inputs.',
    enabled: true,
    triggersToday: 7,
  },
  {
    id: 'guard-4',
    name: 'Rate Limiting',
    description: 'Limits requests per user to prevent abuse.',
    enabled: true,
    triggersToday: 89,
  },
];
