import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/index";
import Core from "@/pages/core";
import Codex from "@/pages/codex";
import Prime from "@/pages/prime";
import Relay from "@/pages/relay";
import Glyph from "@/pages/glyph";
import UI from "@/pages/ui";
import GlyphDetail from "@/pages/glyph-detail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/core" component={Core} />
      <Route path="/codex" component={Codex} />
      <Route path="/prime" component={Prime} />
      <Route path="/relay" component={Relay} />
      <Route path="/glyph" component={Glyph} />
      <Route path="/ui" component={UI} />
      <Route path="/glyph/:glyphId" component={GlyphDetail} />
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
