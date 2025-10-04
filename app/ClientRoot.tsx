"use client";

import dynamic from "next/dynamic";

// Load your SPA router only in the browser (avoids 'location' on server)
const RootApp = dynamic(() => import("@/components/RootApp"), { ssr: false });

export default function ClientRoot() {
  return <RootApp />;
}
