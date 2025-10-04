import type { Metadata } from "next";
import dynamic from "next/dynamic";

// Prevent static prerendering, but more importantly we avoid importing the router on the server.
export const metadata: Metadata = {
  title: "Before Light",
  description: "Before Light",
};

// 👇 Load the SPA router only in the browser (no SSR = no 'location' on server)
const RootApp = dynamic(() => import("@/components/RootApp"), { ssr: false });

export default function Page() {
  return <RootApp />;
}
