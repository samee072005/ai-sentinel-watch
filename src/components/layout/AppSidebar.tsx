import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from '@/components/NavLink';
import {
  AlertCircle,
  Search,
  LayoutDashboard,
  Lightbulb,
  Shield,
  Settings,
  Activity,
  FileText,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Bot,
  ClipboardList,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

interface NavSection {
  id: string;
  label: string;
  icon: React.ElementType;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    id: 'issues',
    label: 'Issues',
    icon: AlertCircle,
    items: [
      { title: 'Feed', url: '/', icon: Activity },
      { title: 'AI Incidents', url: '/incidents', icon: AlertTriangle },
      { title: 'Policy Violations', url: '/violations', icon: FileText },
    ],
  },
  {
    id: 'explore',
    label: 'Explore',
    icon: Search,
    items: [
      { title: 'Agent Traces', url: '/traces', icon: Activity },
      { title: 'Decision Logs', url: '/decisions', icon: BookOpen },
    ],
  },
  {
    id: 'dashboards',
    label: 'Dashboards',
    icon: LayoutDashboard,
    items: [
      { title: 'Reliability', url: '/dashboard/reliability', icon: TrendingUp },
      { title: 'Risk', url: '/dashboard/risk', icon: AlertTriangle },
    ],
  },
  {
    id: 'insights',
    label: 'Insights',
    icon: Lightbulb,
    items: [
      { title: 'Failure Types', url: '/insights/failures', icon: AlertCircle },
      { title: 'Drift Signals', url: '/insights/drift', icon: TrendingUp },
    ],
  },
  {
    id: 'prevent',
    label: 'Prevent',
    icon: Shield,
    items: [
      { title: 'AI Policies', url: '/policies', icon: FileText },
      { title: 'Guardrails', url: '/guardrails', icon: Shield },
    ],
  },
  {
    id: 'settings',
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
  const location = useLocation();
  const currentPath = location.pathname;

  // Which section is currently pinned (clicked)
  const [pinnedSection, setPinnedSection] = useState<string | null>(() => {
    // Default to the section that contains the current route
    for (const section of navigation) {
      if (section.items.some((item) => item.url === currentPath)) {
        return section.id;
      }
    }
    return 'issues';
  });

  // Which section is being hovered (temporary)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // The active section to display in the submenu
  const activeSection = hoveredSection || pinnedSection;
  const activeSectionData = navigation.find((s) => s.id === activeSection);

  const handleIconClick = (sectionId: string) => {
    setPinnedSection(sectionId);
    setHoveredSection(null);
  };

  const handleIconMouseEnter = (sectionId: string) => {
    if (sectionId !== pinnedSection) {
      setHoveredSection(sectionId);
    }
  };

  const handleIconMouseLeave = () => {
    setHoveredSection(null);
  };

  const isActiveSection = (section: NavSection) => {
    return section.items.some((item) => currentPath === item.url);
  };

  return (
    <div className="flex h-full">
      {/* Icon Rail - Always visible */}
      <div className="flex w-16 flex-col border-r border-sidebar-border bg-sidebar">
        {/* Logo */}
        <div className="flex h-14 items-center justify-center border-b border-sidebar-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
        </div>

        {/* Navigation Icons */}
        <nav className="flex flex-1 flex-col gap-1 p-2">
          {navigation.map((section) => {
            const isActive = isActiveSection(section);
            const isPinned = pinnedSection === section.id;
            const isHovered = hoveredSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => handleIconClick(section.id)}
                onMouseEnter={() => handleIconMouseEnter(section.id)}
                onMouseLeave={handleIconMouseLeave}
                className={cn(
                  'group relative flex h-10 w-full items-center justify-center rounded-lg transition-colors',
                  isPinned
                    ? 'bg-primary text-primary-foreground'
                    : isHovered
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : isActive
                    ? 'bg-sidebar-accent/50 text-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
                title={section.label}
              >
                <section.icon className="h-5 w-5" />
                {/* Active indicator */}
                {isPinned && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary-foreground" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Submenu Panel - Always visible, shows active section */}
      <div className="flex w-48 flex-col border-r border-sidebar-border bg-sidebar">
        {/* Section Header */}
        <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
          <span className="text-sm font-semibold text-foreground">
            {activeSectionData?.label}
          </span>
          <button
            className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            title="Collapse"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Section Items */}
        <nav className="flex-1 overflow-y-auto p-2">
          {activeSectionData?.items.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              end={item.url === '/'}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium border-l-2 border-primary"
            >
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
