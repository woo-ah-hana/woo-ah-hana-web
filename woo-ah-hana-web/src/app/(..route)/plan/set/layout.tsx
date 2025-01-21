import { PlanProvider } from "@/app/context/plan-context";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PlanProvider>
      <main>
        <div className="h-1/6">
          <div className="px-5 mt-5">
            <Link href={"/home"}>{"<"}</Link>
          </div>
        </div>
        <div className="h-5/6">{children}</div>
      </main>
    </PlanProvider>
  );
}
