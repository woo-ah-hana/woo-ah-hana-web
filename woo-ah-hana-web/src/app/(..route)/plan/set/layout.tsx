import { PlanProvider } from "@/app/context/plan-context";
import Header from "@/app/ui/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <>
        <Header title='모임 일정 생성' link='/home'/>
        <PlanProvider>{children}</PlanProvider>;
      </>
  )
}
