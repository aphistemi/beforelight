import ClientRoot from "../ClientRoot";

export default function CatchAll() {
  // Any unmatched path renders the same SPA router (so /verse-two works on refresh)
  return <ClientRoot />;
}
