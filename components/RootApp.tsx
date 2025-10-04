"use client";

import { Switch, Route, useLocation, Link } from "wouter";
import Home from "@/components/pages/Home";
import VerseTwo from "@/components/pages/VerseTwo";

function DebugBanner() {
  const [loc] = useLocation();
  return (
    <div className="fixed left-2 bottom-2 z-50 rounded bg-white/10 px-2 py-1 text-[10px] text-white/80">
      route: {loc}
    </div>
  );
}

export default function RootApp() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/verse-two" component={VerseTwo} />
        <Route>
          <main className="min-h-screen grid place-items-center bg-black text-white">
            <div className="text-center space-y-2">
              <p>Route not found.</p>
              <Link href="/" className="underline underline-offset-4">Go Home</Link>
            </div>
          </main>
        </Route>
      </Switch>
      {/* remove this once confirmed */}
      <DebugBanner />
    </>
  );
}
