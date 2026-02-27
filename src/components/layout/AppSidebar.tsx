import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  color: string;
  bgColor: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    id: 'issues',
    label: 'Issues',
    icon: AlertCircle,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10 hover:bg-rose-500/20',
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
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10 hover:bg-violet-500/20',
    items: [
      { title: 'Agent Traces', url: '/traces', icon: Activity },
      { title: 'Decision Logs', url: '/decisions', icon: BookOpen },
    ],
  },
  {
    id: 'dashboards',
    label: 'Dashboards',
    icon: LayoutDashboard,
    color: 'text-sky-500',
    bgColor: 'bg-sky-500/10 hover:bg-sky-500/20',
    items: [
      { title: 'Reliability', url: '/dashboard/reliability', icon: TrendingUp },
      { title: 'Risk', url: '/dashboard/risk', icon: AlertTriangle },
    ],
  },
  {
    id: 'insights',
    label: 'Insights',
    icon: Lightbulb,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10 hover:bg-amber-500/20',
    items: [
      { title: 'Failure Types', url: '/insights/failures', icon: AlertCircle },
      { title: 'Drift Signals', url: '/insights/drift', icon: TrendingUp },
    ],
  },
  {
    id: 'prevent',
    label: 'Prevent',
    icon: Shield,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10 hover:bg-emerald-500/20',
    items: [
      { title: 'AI Policies', url: '/policies', icon: FileText },
      { title: 'Guardrails', url: '/guardrails', icon: Shield },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    color: 'text-slate-500',
    bgColor: 'bg-slate-500/10 hover:bg-slate-500/20',
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
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Which section is currently pinned (clicked). Start unpinned so submenu stays closed until user interacts.
  const [pinnedSection, setPinnedSection] = useState<string | null>(null);

  // Which section is being hovered (temporary)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // The active section to display in the submenu
  const activeSection = hoveredSection || pinnedSection;
  const activeSectionData = navigation.find((s) => s.id === activeSection);

  // Show submenu panel only when hovering or when a section is pinned by click
  const showSubmenu = hoveredSection !== null || pinnedSection !== null;

  const handleIconClick = (sectionId: string) => {
    setPinnedSection(sectionId);
    setHoveredSection(null);
    // Navigate to first page in the section
    const section = navigation.find((s) => s.id === sectionId);
    if (section && section.items.length > 0) {
      navigate(section.items[0].url);
    }
  };

  const handleIconMouseEnter = (sectionId: string) => {
    setHoveredSection(sectionId);
  };

  const handleSidebarMouseLeave = () => {
    setHoveredSection(null);
  };

  const handleCollapseClick = () => {
    setPinnedSection(null);
    setHoveredSection(null);
  };

  const isActiveSection = (section: NavSection) => {
    return section.items.some((item) => currentPath === item.url);
  };

  return (
    <div className="flex h-full" onMouseLeave={handleSidebarMouseLeave}>
      {/* Icon Rail - Always visible */}
      <div className="flex w-[72px] flex-col border-r border-sidebar-border bg-sidebar">
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b border-sidebar-border">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>

        {/* Navigation Icons */}
        <nav className="flex flex-1 flex-col gap-2 p-3">
          {navigation.map((section) => {
            const isActive = isActiveSection(section);
            const isPinned = pinnedSection === section.id;
            const isHovered = hoveredSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => handleIconClick(section.id)}
                onMouseEnter={() => handleIconMouseEnter(section.id)}
                className={cn(
                  'group relative flex h-12 w-full items-center justify-center rounded-xl transition-all duration-200',
                  isPinned
                    ? cn(section.bgColor, section.color, 'ring-2 ring-offset-2 ring-offset-sidebar', `ring-current`)
                    : isHovered
                    ? cn(section.bgColor, section.color)
                    : isActive
                    ? cn(section.bgColor, section.color, 'opacity-70')
                    : cn('text-muted-foreground hover:text-foreground', section.bgColor)
                )}
                title={section.label}
              >
                <section.icon className={cn(
                  'h-6 w-6 transition-transform duration-200',
                  (isPinned || isHovered) && 'scale-110'
                )} />
                
                {/* Active indicator bar */}
                {isPinned && (
                  <span 
                    className={cn(
                      'absolute -left-3 top-1/2 h-8 w-1.5 -translate-y-1/2 rounded-r-full transition-all duration-200',
                      section.color.replace('text-', 'bg-')
                    )} 
                  />
                )}

                {/* Label tooltip on hover */}
                <span className={cn(
                  'absolute left-full ml-3 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium opacity-0 transition-all duration-200 pointer-events-none',
                  'bg-foreground text-background',
                  'group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2'
                )}>
                  {section.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Submenu Panel - Slides in */}
      <div 
        className={cn(
          'flex flex-col border-r border-sidebar-border bg-sidebar overflow-hidden transition-all duration-300 ease-out',
          showSubmenu
            ? 'w-52 opacity-100 translate-x-0'
            : 'w-0 opacity-0 -translate-x-2 pointer-events-none'
        )}
      >
        {/* Section Header */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <div className="flex items-center gap-2">
            {activeSectionData && (
              <>
                <activeSectionData.icon className={cn('h-5 w-5', activeSectionData.color)} />
                <span className="text-sm font-semibold text-foreground">
                  {activeSectionData.label}
                </span>
              </>
            )}
          </div>
          <button
            onClick={handleCollapseClick}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title="Collapse"
            aria-label="Collapse sidebar submenu"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Section Items */}
        {activeSectionData && (
          <nav key={activeSectionData.id} className="flex-1 overflow-y-auto p-3">
            <div className="space-y-1">
              {activeSectionData.items.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <NavLink
                    key={`${activeSectionData.id}-${item.url}`}
                    to={item.url}
                    end={item.url === '/'}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:translate-x-1"
                    activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium border-l-2 border-primary"
                    onClick={() => {
                      setPinnedSection(activeSectionData.id);
                      setHoveredSection(null);
                    }}
                  >
                    <ItemIcon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </NavLink>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
