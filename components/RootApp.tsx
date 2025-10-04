"use client";

import { Switch, Route, useLocation, Link } from "wouter";
import Home from "@/components/pages/Home";
import VerseTwo from "@/components/pages/VerseTwo";

function NotFound() {
  const [loc] = useLocation();
  return (
    <main className="min-h-screen bg-black text-white grid place-items-center p-8">
      <div className="text-center space-y-4">
        <h1 className="text-xl">No route matched: <span className="font-mono">{loc}</span></h1>
        <Link href="/" className="underline underline-offset-4">Go Home</Link>
      </div>
    </main>
  );
}

export default function RootApp() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/verse-two" component={VerseTwo} />
      <Route component={NotFound} />
    </Switch>
  );
}
