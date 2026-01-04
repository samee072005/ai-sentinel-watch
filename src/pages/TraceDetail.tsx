import { useParams, useNavigate } from 'react-router-dom';
import { getTraceById } from '@/mock-data/traces';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, Clock, Bot, User } from 'lucide-react';
import { format } from 'date-fns';
import { TraceStep } from '@/types';

const statusIcons = {
  success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
  error: <XCircle className="h-5 w-5 text-red-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
};

const stepTypeIcons: Record<string, React.ReactNode> = {
  user_input: <User className="h-4 w-4" />,
  rag_retrieval: <Bot className="h-4 w-4" />,
  llm_call: <Bot className="h-4 w-4" />,
  tool_call: <Bot className="h-4 w-4" />,
  output: <CheckCircle className="h-4 w-4" />,
};

export default function TraceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const trace = id ? getTraceById(id) : undefined;

  if (!trace) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertTriangle className="h-12 w-12 text-muted-foreground" />
        <h2 className="mt-4 text-lg font-medium">Trace not found</h2>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/traces')}>
          Back to Traces
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
        onClick={() => navigate('/traces')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Traces
      </Button>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          {statusIcons[trace.status]}
          <h1 className="text-xl font-semibold font-mono">{trace.id}</h1>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Bot className="h-4 w-4" />
            {trace.agentName}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {(trace.duration / 1000).toFixed(2)}s
          </span>
          <span>{format(trace.startedAt, 'MMM d, yyyy h:mm:ss a')}</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Model</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">{trace.modelVersion}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">{trace.steps.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">{(trace.duration / 1000).toFixed(2)}s</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">User</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium font-mono">{trace.userId || 'Anonymous'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Execution Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Execution Trace</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trace.steps.map((step, index) => (
              <div key={step.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      step.status === 'success'
                        ? 'bg-emerald-100 text-emerald-700'
                        : step.status === 'warning'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {stepTypeIcons[step.type]}
                  </div>
                  {index < trace.steps.length - 1 && (
                    <div className="h-16 w-px bg-border" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{step.name}</span>
                    <span className="text-xs text-muted-foreground">{step.duration.toFixed(0)}ms</span>
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    {step.type.replace('_', ' ')}
                  </p>
                  {step.input && (
                    <div className="mb-2 rounded bg-muted p-2">
                      <p className="text-xs text-muted-foreground mb-1">Input</p>
                      <p className="text-sm">{step.input}</p>
                    </div>
                  )}
                  {step.output && (
                    <div className="rounded bg-muted p-2">
                      <p className="text-xs text-muted-foreground mb-1">Output</p>
                      <p className="text-sm">{step.output}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
