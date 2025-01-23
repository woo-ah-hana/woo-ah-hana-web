import {
  getMembers,
  GetMembersDto,
} from "@/app/business/community/community.service";
import SetMembers from "@/app/ui/components/plan/set-members";

export default async function SetMembersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const communityId = (searchParams.id as string) || "";
  const membersResponse = await getMembers(communityId);
  const members: GetMembersDto[] = membersResponse.data ?? [];

  return <SetMembers members={members} />;
}
