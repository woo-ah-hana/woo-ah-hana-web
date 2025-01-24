import { PlanProvider } from "@/app/context/plan-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PlanProvider>{children}</PlanProvider>;
}
