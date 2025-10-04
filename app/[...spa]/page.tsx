import ClientRoot from "../ClientRoot";

export default function CatchAll() {
  // Any unmatched path renders the same SPA router
  return <ClientRoot />;
}
