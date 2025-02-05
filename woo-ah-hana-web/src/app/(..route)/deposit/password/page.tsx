'use client'
import VirtualPassword from "@/app/ui/components/virtual-password/virtual-password";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const accountName = searchParams.get("accountName");
  const communityId = searchParams.get("communityId");
  return (
    <div className="h-full mt-10">
      <VirtualPassword communityId={communityId as string} tranAmt={amount as string} communityAccountName={accountName as string} />
    </div>
  );
}
