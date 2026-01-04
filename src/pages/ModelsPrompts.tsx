import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const models = [
  { id: 1, name: 'gpt-4-turbo', provider: 'OpenAI', agents: 3, status: 'active' },
  { id: 2, name: 'claude-3-opus', provider: 'Anthropic', agents: 2, status: 'active' },
  { id: 3, name: 'gemini-pro', provider: 'Google', agents: 1, status: 'active' },
  { id: 4, name: 'llama-3-70b', provider: 'Meta', agents: 1, status: 'inactive' },
];

const prompts = [
  { id: 1, name: 'Customer Support System', model: 'gpt-4-turbo', version: 'v2.3', lastUpdated: '2 days ago' },
  { id: 2, name: 'Document Q&A System', model: 'claude-3-opus', version: 'v1.5', lastUpdated: '1 week ago' },
  { id: 3, name: 'Sales Assistant Persona', model: 'gpt-4-turbo', version: 'v3.0', lastUpdated: '3 days ago' },
  { id: 4, name: 'Code Review Instructions', model: 'gemini-pro', version: 'v1.0', lastUpdated: '2 weeks ago' },
];

export default function ModelsPrompts() {
  return (
    <div>
      <PageHeader
        title="Models & Prompts"
        description="View configured models and system prompts"
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Configured Models</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Agents Using</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((model) => (
                  <TableRow key={model.id}>
                    <TableCell className="font-medium">{model.name}</TableCell>
                    <TableCell>{model.provider}</TableCell>
                    <TableCell>{model.agents}</TableCell>
                    <TableCell>
                      <Badge
                        variant={model.status === 'active' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {model.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">System Prompts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Prompt Name</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prompts.map((prompt) => (
                  <TableRow key={prompt.id}>
                    <TableCell className="font-medium">{prompt.name}</TableCell>
                    <TableCell>
                      <span className="text-muted-foreground">{prompt.model}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{prompt.version}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground">{prompt.lastUpdated}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
