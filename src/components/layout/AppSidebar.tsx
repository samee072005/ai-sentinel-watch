import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from '@/components/NavLink';
import {
  AlertCircle,
  Search,
  LayoutDashboard,
  Lightbulb,
  Shield,
  Settings,
  ChevronDown,
  Activity,
  FileText,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Bot,
  ClipboardList,
  Pin,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface NavSection {
  label: string;
  icon: React.ElementType;
  items: {
    title: string;
    url: string;
    icon: React.ElementType;
  }[];
}

const navigation: NavSection[] = [
  {
    label: 'Issues',
    icon: AlertCircle,
    items: [
      { title: 'Feed', url: '/', icon: Activity },
      { title: 'AI Incidents', url: '/incidents', icon: AlertTriangle },
      { title: 'Policy Violations', url: '/violations', icon: FileText },
    ],
  },
  {
    label: 'Explore',
    icon: Search,
    items: [
      { title: 'Agent Traces', url: '/traces', icon: Activity },
      { title: 'Decision Logs', url: '/decisions', icon: BookOpen },
    ],
  },
  {
    label: 'Dashboards',
    icon: LayoutDashboard,
    items: [
      { title: 'Reliability', url: '/dashboard/reliability', icon: TrendingUp },
      { title: 'Risk', url: '/dashboard/risk', icon: AlertTriangle },
    ],
  },
  {
    label: 'Insights',
    icon: Lightbulb,
    items: [
      { title: 'Failure Types', url: '/insights/failures', icon: AlertCircle },
      { title: 'Drift Signals', url: '/insights/drift', icon: TrendingUp },
    ],
  },
  {
    label: 'Prevent',
    icon: Shield,
    items: [
      { title: 'AI Policies', url: '/policies', icon: FileText },
      { title: 'Guardrails', url: '/guardrails', icon: Shield },
    ],
  },
  {
    label: 'Settings',
    icon: Settings,
    items: [
      { title: 'Organization', url: '/settings', icon: Settings },
      { title: 'Models & Prompts', url: '/settings/models', icon: Bot },
      { title: 'Agents', url: '/settings/agents', icon: Bot },
      { title: 'Audit Log', url: '/settings/audit', icon: ClipboardList },
    ],
  },
];

export function AppSidebar() {
  const { open, setOpen, isMobile } = useSidebar();
  const [isPinned, setIsPinned] = useState(open);
  const [isHovering, setIsHovering] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

  // If the user expands/collapses via the global SidebarTrigger, treat that as a pin/unpin.
  useEffect(() => {
    if (isMobile) return;

    if (open && !isHovering && !isPinned) setIsPinned(true);
    if (!open && isPinned) setIsPinned(false);
  }, [open, isHovering, isPinned, isMobile]);

  const expanded = open;

  const isActiveSection = (section: NavSection) => {
    return section.items.some(item => currentPath === item.url);
  };

  const handlePin = () => {
    const nextPinned = !isPinned;
    setIsPinned(nextPinned);
    setOpen(nextPinned);
  };

  return (
    <Sidebar collapsible="icon" className={cn('border-r border-sidebar-border')}>
      <div
        className="flex h-full w-full flex-col"
        onMouseEnter={() => {
          if (isMobile) return;
          setIsHovering(true);
          if (!isPinned) setOpen(true);
        }}
        onMouseLeave={() => {
          if (isMobile) return;
          setIsHovering(false);
          if (!isPinned) setOpen(false);
        }}
      >
        <SidebarHeader className="border-b border-sidebar-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-primary">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              {expanded && (
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">SAMIX AI</span>
                  <span className="text-xs text-muted-foreground">Governance Platform</span>
                </div>
              )}
            </div>
            {expanded && (
              <button
                onClick={handlePin}
                className={cn(
                  'rounded-md p-1.5 transition-colors',
                  isPinned
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
                title={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
                aria-label={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
              >
                <Pin className={cn('h-4 w-4', isPinned && 'rotate-45')} />
              </button>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2 py-2">
          {navigation.map((section) => (
            <SidebarGroup key={section.label}>
              <Collapsible defaultOpen={isActiveSection(section)} className="group/collapsible">
                <CollapsibleTrigger asChild>
                  <SidebarGroupLabel className="flex cursor-pointer items-center justify-between px-2 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground">
                    <div className="flex items-center gap-2">
                      <section.icon className="h-4 w-4 flex-shrink-0" />
                      {expanded && <span>{section.label}</span>}
                    </div>
                    {expanded && (
                      <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    )}
                  </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {section.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={item.url}
                              end={item.url === '/'}
                              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                              activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            >
                              <item.icon className="h-4 w-4 flex-shrink-0" />
                              {expanded && <span>{item.title}</span>}
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
