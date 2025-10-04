"use client";

import { Switch, Route } from "wouter";
import Home from "@/components/pages/Home";
import VerseTwo from "@/components/pages/VerseTwo";

export default function RootApp() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/verse-two" component={VerseTwo} />
      {/* Optional fallback:
      <Route><Home /></Route>
      */}
    </Switch>
  );
}
