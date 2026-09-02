import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { UserRole } from "@/types";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SelectRole from "./pages/SelectRole";
import DashboardLayout from "./pages/Dashboard";
import About from "./pages/About";
import Leadership from "./pages/Leadership";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ScrollToTop from "./components/ScrollToTop";
import Legal from "./pages/Legal";

import ProjectsPage from "./features/projects/ProjectsPage";
import ProjectDetail from "./features/projects/ProjectDetail";
import TasksPage from "./features/tasks/TasksPage";
import ContractsPage from "./features/contracts/ContractsPage";
import InspectionsPage from "./features/inspections/InspectionsPage";
import UsersPage from "./features/users/UsersPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 5 * 60 * 1000, refetchOnWindowFocus: false },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Legal kind="privacy" />} />
            <Route path="/terms" element={<Legal kind="terms" />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/select-role"
              element={<ProtectedRoute><SelectRole /></ProtectedRoute>}
            />
            <Route
              path="/dashboard"
              element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}
            >
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="tasks" element={<TasksPage />} />
              <Route path="contracts" element={<ContractsPage />} />
              <Route path="inspections" element={<InspectionsPage />} />
              <Route path="users" element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]}><UsersPage /></ProtectedRoute>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
