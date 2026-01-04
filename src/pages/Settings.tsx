import { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function Settings() {
  const [settings, setSettings] = useState({
    aiGovernance: true,
    policyEnforcement: true,
    auditLogs: true,
    alertNotifications: true,
    slackIntegration: false,
    emailDigest: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <PageHeader
        title="Organization Settings"
        description="Configure global settings for your AI governance platform"
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Governance</CardTitle>
            <CardDescription>
              Control the core governance features for your AI systems
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="ai-governance" className="font-medium">
                  Enable AI Governance
                </Label>
                <p className="text-sm text-muted-foreground">
                  Monitor and govern all AI agent behavior across your organization
                </p>
              </div>
              <Switch
                id="ai-governance"
                checked={settings.aiGovernance}
                onCheckedChange={() => handleToggle('aiGovernance')}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="policy-enforcement" className="font-medium">
                  Enable Policy Enforcement
                </Label>
                <p className="text-sm text-muted-foreground">
                  Automatically enforce AI policies and block violations in real-time
                </p>
              </div>
              <Switch
                id="policy-enforcement"
                checked={settings.policyEnforcement}
                onCheckedChange={() => handleToggle('policyEnforcement')}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="audit-logs" className="font-medium">
                  Enable Audit Logs
                </Label>
                <p className="text-sm text-muted-foreground">
                  Keep detailed logs of all AI agent actions for compliance
                </p>
              </div>
              <Switch
                id="audit-logs"
                checked={settings.auditLogs}
                onCheckedChange={() => handleToggle('auditLogs')}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure how you receive alerts and updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="alert-notifications" className="font-medium">
                  Alert Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for critical incidents and policy violations
                </p>
              </div>
              <Switch
                id="alert-notifications"
                checked={settings.alertNotifications}
                onCheckedChange={() => handleToggle('alertNotifications')}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="slack-integration" className="font-medium">
                  Slack Integration
                </Label>
                <p className="text-sm text-muted-foreground">
                  Send alerts and reports to your Slack workspace
                </p>
              </div>
              <Switch
                id="slack-integration"
                checked={settings.slackIntegration}
                onCheckedChange={() => handleToggle('slackIntegration')}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-digest" className="font-medium">
                  Daily Email Digest
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive a daily summary of incidents and system health
                </p>
              </div>
              <Switch
                id="email-digest"
                checked={settings.emailDigest}
                onCheckedChange={() => handleToggle('emailDigest')}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
