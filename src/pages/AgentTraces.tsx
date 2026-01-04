import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTraces } from '@/mock-data/traces';
import { PageHeader } from '@/components/ui/PageHeader';
import { FilterBar } from '@/components/ui/FilterBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, RefreshCw, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Trace } from '@/types';

const statusIcons = {
  success: <CheckCircle className="h-4 w-4 text-emerald-500" />,
  error: <XCircle className="h-4 w-4 text-red-500" />,
  warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
};

export default function AgentTraces() {
  const navigate = useNavigate();
  const [agentFilter, setAgentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const agents = Array.from(new Set(mockTraces.map(t => t.agentName)));

  const filteredTraces = mockTraces.filter((trace) => {
    if (agentFilter !== 'all' && trace.agentName !== agentFilter) return false;
    if (statusFilter !== 'all' && trace.status !== statusFilter) return false;
    if (
      searchQuery &&
      !trace.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !trace.agentName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleRowClick = (trace: Trace) => {
    navigate(`/trace/${trace.id}`);
  };

  return (
    <div>
      <PageHeader
        title="Agent Traces"
        description="Explore execution traces across all AI agents"
        actions={
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        }
      />

      <FilterBar>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search traces..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={agentFilter} onValueChange={setAgentFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Agents" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Agents</SelectItem>
            {agents.map((agent) => (
              <SelectItem key={agent} value={agent}>
                {agent}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
      </FilterBar>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[50px]">Status</TableHead>
              <TableHead>Trace ID</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Started</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTraces.map((trace) => (
              <TableRow
                key={trace.id}
                className="table-row-hover"
                onClick={() => handleRowClick(trace)}
              >
                <TableCell>{statusIcons[trace.status]}</TableCell>
                <TableCell>
                  <span className="font-mono text-sm">{trace.id}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{trace.agentName}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{trace.modelVersion}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{(trace.duration / 1000).toFixed(2)}s</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(trace.startedAt, { addSuffix: true })}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
