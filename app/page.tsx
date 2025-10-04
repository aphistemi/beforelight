import type { Metadata } from "next";
import ClientRoot from "./ClientRoot";

export const metadata: Metadata = {
  title: "Before Light",
  description: "Before Light",
};

export default function Page() {
  // Server component that mounts the client-only SPA
  return <ClientRoot />;
}
