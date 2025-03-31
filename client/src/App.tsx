import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/index";
import Core from "@/pages/core";
import Codex from "@/pages/codex";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/core" component={Core} />
      <Route path="/codex" component={Codex} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
