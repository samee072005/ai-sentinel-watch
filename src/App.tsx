import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import IncidentDetail from "./pages/IncidentDetail";
import AgentTraces from "./pages/AgentTraces";
import TraceDetail from "./pages/TraceDetail";
import ReliabilityDashboard from "./pages/ReliabilityDashboard";
import RiskDashboard from "./pages/RiskDashboard";
import Policies from "./pages/Policies";
import Guardrails from "./pages/Guardrails";
import Settings from "./pages/Settings";
import ModelsPrompts from "./pages/ModelsPrompts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/incidents" element={<Index />} />
            <Route path="/incident/:id" element={<IncidentDetail />} />
            <Route path="/violations" element={<Index />} />
            <Route path="/traces" element={<AgentTraces />} />
            <Route path="/trace/:id" element={<TraceDetail />} />
            <Route path="/decisions" element={<AgentTraces />} />
            <Route path="/dashboard/reliability" element={<ReliabilityDashboard />} />
            <Route path="/dashboard/risk" element={<RiskDashboard />} />
            <Route path="/insights/failures" element={<ReliabilityDashboard />} />
            <Route path="/insights/drift" element={<RiskDashboard />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/guardrails" element={<Guardrails />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/models" element={<ModelsPrompts />} />
            <Route path="/settings/agents" element={<ModelsPrompts />} />
            <Route path="/settings/audit" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
