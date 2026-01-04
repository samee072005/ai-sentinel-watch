import { Incident, IncidentType, Severity, IncidentStatus } from '@/types';

const incidentTypes: IncidentType[] = ['hallucination', 'retrieval_failure', 'policy_violation', 'timeout', 'context_overflow'];
const severities: Severity[] = ['critical', 'high', 'medium', 'low'];
const statuses: IncidentStatus[] = ['open', 'investigating', 'resolved'];

const incidentTitles: Record<IncidentType, string[]> = {
  hallucination: [
    'Model generated fabricated product specifications',
    'Incorrect date references in customer response',
    'Fictional company policy cited in support chat',
  ],
  retrieval_failure: [
    'RAG failed to retrieve relevant documentation',
    'Vector search returned empty results',
    'Context window exceeded during retrieval',
  ],
  policy_violation: [
    'PII detected in model output',
    'Unauthorized financial advice generated',
    'Content safety filter bypassed',
  ],
  timeout: [
    'LLM inference exceeded 30s threshold',
    'Tool execution timed out',
    'Agent workflow hung on external API',
  ],
  context_overflow: [
    'Token limit exceeded in conversation',
    'Document chunking failed for large file',
    'History context truncation triggered',
  ],
};

const agentNames = [
  'CustomerSupport-v2',
  'SalesAssistant-prod',
  'DocumentQA-main',
  'CodeReview-beta',
  'DataAnalyst-v1',
];

function randomDate(daysAgo: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - Math.random() * daysAgo);
  return date;
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const mockIncidents: Incident[] = Array.from({ length: 25 }, (_, i) => {
  const type = randomItem(incidentTypes);
  const titles = incidentTitles[type];
  const lastSeen = randomDate(7);
  const firstSeen = new Date(lastSeen);
  firstSeen.setDate(firstSeen.getDate() - Math.random() * 30);

  return {
    id: `INC-${String(i + 1).padStart(4, '0')}`,
    type,
    title: randomItem(titles),
    description: `Detailed analysis of the ${type.replace('_', ' ')} incident affecting production systems.`,
    agentId: `agent-${Math.floor(Math.random() * 5) + 1}`,
    agentName: randomItem(agentNames),
    severity: randomItem(severities),
    status: randomItem(statuses),
    lastSeen,
    firstSeen,
    eventCount: Math.floor(Math.random() * 500) + 1,
    affectedUsers: Math.floor(Math.random() * 100) + 1,
    rootCause: 'Insufficient context provided to the model during the RAG retrieval phase, leading to hallucinated responses.',
  };
});

export function getIncidentById(id: string): Incident | undefined {
  return mockIncidents.find(inc => inc.id === id);
}

export function getIncidentsByStatus(status: IncidentStatus): Incident[] {
  return mockIncidents.filter(inc => inc.status === status);
}

export function getIncidentsBySeverity(severity: Severity): Incident[] {
  return mockIncidents.filter(inc => inc.severity === severity);
}
