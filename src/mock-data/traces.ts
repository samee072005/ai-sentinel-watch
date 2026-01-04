import { Trace, TraceStep } from '@/types';

const agentNames = [
  'CustomerSupport-v2',
  'SalesAssistant-prod',
  'DocumentQA-main',
  'CodeReview-beta',
  'DataAnalyst-v1',
];

const modelVersions = ['gpt-4-turbo', 'claude-3-opus', 'gemini-pro', 'llama-3-70b'];

function randomDate(hoursAgo: number): Date {
  const date = new Date();
  date.setHours(date.getHours() - Math.random() * hoursAgo);
  return date;
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateTraceSteps(startTime: Date): TraceStep[] {
  let currentTime = new Date(startTime);
  
  const steps: TraceStep[] = [
    {
      id: 'step-1',
      type: 'user_input',
      name: 'User Query Received',
      duration: 5,
      status: 'success',
      input: 'What are the return policies for my recent order?',
      timestamp: new Date(currentTime),
    },
    {
      id: 'step-2',
      type: 'rag_retrieval',
      name: 'Document Retrieval',
      duration: 120 + Math.random() * 200,
      status: Math.random() > 0.1 ? 'success' : 'warning',
      input: 'Query embedding generated',
      output: 'Retrieved 5 relevant documents from knowledge base',
      metadata: { documentsRetrieved: 5, avgRelevanceScore: 0.87 },
      timestamp: new Date(currentTime.setMilliseconds(currentTime.getMilliseconds() + 5)),
    },
    {
      id: 'step-3',
      type: 'llm_call',
      name: 'LLM Inference',
      duration: 800 + Math.random() * 1500,
      status: Math.random() > 0.05 ? 'success' : 'error',
      input: 'Context + Query prompt constructed',
      output: 'Response generated successfully',
      metadata: { tokensUsed: 2450, model: 'gpt-4-turbo' },
      timestamp: new Date(currentTime.setMilliseconds(currentTime.getMilliseconds() + 150)),
    },
    {
      id: 'step-4',
      type: 'tool_call',
      name: 'Order Lookup API',
      duration: 200 + Math.random() * 300,
      status: 'success',
      input: 'order_id: ORD-12345',
      output: 'Order details retrieved',
      metadata: { endpoint: '/api/orders/ORD-12345' },
      timestamp: new Date(currentTime.setMilliseconds(currentTime.getMilliseconds() + 1200)),
    },
    {
      id: 'step-5',
      type: 'output',
      name: 'Final Response',
      duration: 10,
      status: 'success',
      output: 'Based on your order from 3 days ago, you have 30 days to initiate a return...',
      timestamp: new Date(currentTime.setMilliseconds(currentTime.getMilliseconds() + 300)),
    },
  ];

  return steps;
}

export const mockTraces: Trace[] = Array.from({ length: 50 }, (_, i) => {
  const startedAt = randomDate(48);
  const duration = 1000 + Math.random() * 3000;
  const completedAt = new Date(startedAt.getTime() + duration);
  const hasError = Math.random() > 0.85;
  const hasWarning = !hasError && Math.random() > 0.8;

  return {
    id: `trace-${String(i + 1).padStart(6, '0')}`,
    agentId: `agent-${Math.floor(Math.random() * 5) + 1}`,
    agentName: randomItem(agentNames),
    modelVersion: randomItem(modelVersions),
    status: hasError ? 'error' : hasWarning ? 'warning' : 'success',
    duration,
    startedAt,
    completedAt,
    steps: generateTraceSteps(startedAt),
    userId: `user-${Math.floor(Math.random() * 1000)}`,
  };
});

export function getTraceById(id: string): Trace | undefined {
  return mockTraces.find(t => t.id === id);
}

export function getTracesByAgent(agentName: string): Trace[] {
  return mockTraces.filter(t => t.agentName === agentName);
}
