import dynamic from "next/dynamic";

// Reuse the same client-only router for any unmatched path
const RootApp = dynamic(() => import("@/components/RootApp"), { ssr: false });

export default function CatchAll() {
  return <RootApp />;
}
