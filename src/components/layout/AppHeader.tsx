import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Bell, HelpCircle } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search incidents, agents, traces..."
            className="w-80 pl-9 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          Docs
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <HelpCircle className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="relative text-muted-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
        </Button>
        <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
          SA
        </div>
      </div>
    </header>
  );
}
