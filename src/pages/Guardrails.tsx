import { useState } from 'react';
import { mockGuardrails } from '@/mock-data/policies';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Plus, Shield } from 'lucide-react';

export default function Guardrails() {
  const [guardrails, setGuardrails] = useState(mockGuardrails);

  const handleToggle = (guardrailId: string) => {
    setGuardrails((prev) =>
      prev.map((g) =>
        g.id === guardrailId ? { ...g, enabled: !g.enabled } : g
      )
    );
  };

  return (
    <div>
      <PageHeader
        title="Guardrails"
        description="Runtime protection rules for AI agents"
        actions={
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Guardrail
          </Button>
        }
      />

      <div className="grid gap-4">
        {guardrails.map((guardrail) => (
          <Card key={guardrail.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{guardrail.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {guardrail.description}
                    </CardDescription>
                  </div>
                </div>
                <Switch
                  checked={guardrail.enabled}
                  onCheckedChange={() => handleToggle(guardrail.id)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <span className="text-muted-foreground">Triggers today: </span>
                <span className="font-medium">{guardrail.triggersToday}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
