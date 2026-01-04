import { PageHeader } from '@/components/ui/PageHeader';
import { MetricCard } from '@/components/ui/MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { riskMetrics, agentReliability } from '@/mock-data/dashboard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

export default function RiskDashboard() {
  return (
    <div>
      <PageHeader
        title="Risk Dashboard"
        description="Monitor policy compliance and governance risks"
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {riskMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      {/* Agent Reliability Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Agent Reliability Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Uptime</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead>Avg Latency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentReliability.map((agent) => (
                <TableRow key={agent.name}>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={agent.uptime} className="w-20" />
                      <span className="text-sm text-muted-foreground">
                        {agent.uptime}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={agent.successRate} className="w-20" />
                      <span className="text-sm text-muted-foreground">
                        {agent.successRate}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{agent.avgLatency}s</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
