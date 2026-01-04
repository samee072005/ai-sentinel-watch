import { useParams, useNavigate } from 'react-router-dom';
import { getIncidentById } from '@/mock-data/incidents';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge, SeverityBadge, IncidentTypeBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Bot, Clock, Users, Activity, AlertCircle, FileText, Lightbulb } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

const mockExecutionTrace = [
  { step: 1, name: 'User Input', status: 'success', content: 'What is the return policy for electronics?', duration: '5ms' },
  { step: 2, name: 'RAG Retrieval', status: 'warning', content: 'Retrieved 3 documents with avg relevance 0.72', duration: '245ms' },
  { step: 3, name: 'LLM Call', status: 'error', content: 'Model generated response with low confidence', duration: '1.2s' },
  { step: 4, name: 'Tool Call', status: 'success', content: 'Policy lookup API returned 200', duration: '180ms' },
  { step: 5, name: 'Final Output', status: 'error', content: 'Response contained fabricated policy details', duration: '12ms' },
];

const mockRetrievedContext = [
  { id: 'doc-1', title: 'Return Policy Overview', relevance: 0.89, chunk: 'Our standard return policy allows returns within 30 days...' },
  { id: 'doc-2', title: 'Electronics Guidelines', relevance: 0.76, chunk: 'Electronics must be returned in original packaging...' },
  { id: 'doc-3', title: 'Customer FAQ', relevance: 0.65, chunk: 'Common questions about returns and refunds...' },
];

export default function IncidentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const incident = id ? getIncidentById(id) : undefined;

  if (!incident) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <h2 className="mt-4 text-lg font-medium">Incident not found</h2>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/')}>
          Back to Feed
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 -ml-2 text-muted-foreground"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Feed
      </Button>

      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-xl font-semibold">{incident.title}</h1>
              <StatusBadge status={incident.status} />
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Bot className="h-4 w-4" />
                {incident.agentName}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                First seen {formatDistanceToNow(incident.firstSeen, { addSuffix: true })}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {incident.affectedUsers} affected users
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SeverityBadge severity={incident.severity} />
            <IncidentTypeBadge type={incident.type} />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Incident Type</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium capitalize">{incident.type.replace('_', ' ')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">{incident.eventCount.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Last Seen</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">{format(incident.lastSeen, 'MMM d, h:mm a')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Root Cause */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <AlertCircle className="h-4 w-4 text-destructive" />
            Root Cause Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{incident.rootCause}</p>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="trace" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="trace" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Execution Trace
          </TabsTrigger>
          <TabsTrigger value="context" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Retrieved Context
          </TabsTrigger>
          <TabsTrigger value="model" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Model Info
          </TabsTrigger>
          <TabsTrigger value="fix" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Suggested Fix
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trace">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {mockExecutionTrace.map((step, index) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                          step.status === 'success'
                            ? 'bg-emerald-100 text-emerald-700'
                            : step.status === 'warning'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {step.step}
                      </div>
                      {index < mockExecutionTrace.length - 1 && (
                        <div className="h-12 w-px bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{step.name}</span>
                        <span className="text-xs text-muted-foreground">{step.duration}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{step.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="context">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {mockRetrievedContext.map((doc) => (
                  <div key={doc.id} className="rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{doc.title}</span>
                      <span className="text-xs text-muted-foreground">
                        Relevance: {(doc.relevance * 100).toFixed(0)}%
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{doc.chunk}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="model">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-medium">gpt-4-turbo-preview</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Temperature</p>
                  <p className="font-medium">0.7</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Max Tokens</p>
                  <p className="font-medium">2048</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tokens Used</p>
                  <p className="font-medium">1,847</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fix">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Recommended Actions</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Increase RAG retrieval threshold from 0.7 to 0.85</li>
                    <li>Add explicit grounding instruction to system prompt</li>
                    <li>Enable hallucination detection guardrail for this agent</li>
                    <li>Review and update knowledge base documents for completeness</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
