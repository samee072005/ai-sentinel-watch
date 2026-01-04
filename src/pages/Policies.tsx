import { useState } from 'react';
import { mockPolicies } from '@/mock-data/policies';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Shield, FileText, TrendingUp, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Policy } from '@/types';

const policyTypeIcons: Record<string, React.ReactNode> = {
  safety: <Shield className="h-4 w-4" />,
  compliance: <FileText className="h-4 w-4" />,
  performance: <TrendingUp className="h-4 w-4" />,
  content: <AlertTriangle className="h-4 w-4" />,
};

export default function Policies() {
  const [policies, setPolicies] = useState<Policy[]>(mockPolicies);

  const handleToggle = (policyId: string) => {
    setPolicies((prev) =>
      prev.map((p) =>
        p.id === policyId ? { ...p, enabled: !p.enabled } : p
      )
    );
  };

  return (
    <div>
      <PageHeader
        title="AI Policies"
        description="Configure and manage AI governance policies"
        actions={
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Policy
          </Button>
        }
      />

      <div className="grid gap-4">
        {policies.map((policy) => (
          <Card key={policy.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    {policyTypeIcons[policy.type]}
                  </div>
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      {policy.name}
                      <Badge variant="outline" className="text-xs capitalize">
                        {policy.type}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {policy.description}
                    </CardDescription>
                  </div>
                </div>
                <Switch
                  checked={policy.enabled}
                  onCheckedChange={() => handleToggle(policy.id)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Violations: </span>
                  <span className="font-medium">{policy.violationCount}</span>
                </div>
                {policy.lastTriggered && (
                  <div>
                    <span className="text-muted-foreground">Last triggered: </span>
                    <span className="font-medium">
                      {formatDistanceToNow(policy.lastTriggered, { addSuffix: true })}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
