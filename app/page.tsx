'use client';

import { Switch, Route } from "wouter";
import Home from "@/components/pages/Home";
import VerseTwo from "@/components/pages/VerseTwo";
// import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/verse-two" component={VerseTwo} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  );
}

function App() {
  return (
    <Home />
  );
}

export default App;
