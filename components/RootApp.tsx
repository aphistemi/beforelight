"use client";

import { Switch, Route } from "wouter";
import Home from "@/components/pages/Home";
import VerseTwo from "@/components/pages/VerseTwo";

export default function RootApp() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/verse-two" component={VerseTwo} />
      <Route>
        <main className="min-h-screen grid place-items-center bg-black text-white">
          <div className="text-center space-y-2">
            <p>Route not found.</p>
          </div>
        </main>
      </Route>
    </Switch>
  );
}
