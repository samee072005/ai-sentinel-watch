import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockIncidents } from '@/mock-data/incidents';
import { PageHeader } from '@/components/ui/PageHeader';
import { FilterBar } from '@/components/ui/FilterBar';
import { StatusBadge, SeverityBadge, IncidentTypeBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
import { Search, RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Incident, IncidentStatus, Severity } from '@/types';

export default function IssuesFeed() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIncidents = mockIncidents.filter((incident) => {
    if (statusFilter !== 'all' && incident.status !== statusFilter) return false;
    if (severityFilter !== 'all' && incident.severity !== severityFilter) return false;
    if (
      searchQuery &&
      !incident.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !incident.agentName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleRowClick = (incident: Incident) => {
    navigate(`/incident/${incident.id}`);
  };

  return (
    <div>
      <PageHeader
        title="Feed"
        description="All AI incidents and issues across your agents"
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
            placeholder="Search incidents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="investigating">Investigating</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severity</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </FilterBar>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[400px]">Issue</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead className="text-right">Events</TableHead>
              <TableHead className="text-right">Users</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIncidents.map((incident) => (
              <TableRow
                key={incident.id}
                className="table-row-hover"
                onClick={() => handleRowClick(incident)}
              >
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-foreground">{incident.title}</span>
                    <div className="flex items-center gap-2">
                      <IncidentTypeBadge type={incident.type} />
                      <span className="text-xs text-muted-foreground">{incident.id}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{incident.agentName}</span>
                </TableCell>
                <TableCell>
                  <SeverityBadge severity={incident.severity} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={incident.status} />
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(incident.lastSeen, { addSuffix: true })}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-sm font-medium">{incident.eventCount.toLocaleString()}</span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-sm text-muted-foreground">{incident.affectedUsers}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
