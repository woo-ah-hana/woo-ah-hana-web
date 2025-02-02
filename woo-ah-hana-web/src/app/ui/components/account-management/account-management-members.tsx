import Image from "next/image";
import MemberInviteModdal from "@/app/ui/components/account/member-invite.modal";
import ProfileImage from "@/app/assets/img/profile.jpg"
import { Member } from "@/app/business/community/community.service";

interface AccountManagementMembersProps{
  communityMembers: Member[]
}

export function AccountManagementMembers({communityMembers}:AccountManagementMembersProps){
  return (
    <main>
        <div className="flex flex-col gap-5  text-[17px] mb-20">
          <div className="text-[20px]">모임 멤버</div>
          <div className="flex flex-col gap-2 justify-center">
            {communityMembers.map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-6 p-2"
              >
                <div className="flex justify-center items-center gap-8">
                  <Image
                    src={ProfileImage}
                    alt={`${member.name} 프로필`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-gray-800">{member.name}</div>
                </div>
              </div>
            ))}
          </div>
          <MemberInviteModdal />
        </div>
    </main>
  )
}