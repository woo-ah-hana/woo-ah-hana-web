import ToggleButton from "@/app/ui/atom/toggle/toggle-button";
import Image from "next/image";
import ProfileImage from "../../assets/img/profile.jpg";
import MemberInviteModdal from "@/app/ui/components/account/member-invite.modal";
import Header from "@/app/ui/components/header";
import { getCommunity} from "@/app/business/community/community.service";
import { AccountManagementMain } from "@/app/ui/components/account-management/account-management-main";
import { getMyAccount } from "@/app/business/account/account.service";
import { AccountManagementManager } from "@/app/ui/components/account-management/account-management-manager";

//임시 멤버 데이터
const members = [
  { name: "김하나" },
  { name: "홍창기" },
  { name: "문보경" },
  { name: "박해민" },
  { name: "김현수" },
];

export default async function AccountManagement({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  
  const community = (await getCommunity(searchParams.id as string)).data;
  const myAccount   = (await getMyAccount()).data;
  
  return (
    <div className="h-full flex flex-col">
      <Header title="계좌 관리하기" link="/home" />
      <div className="p-5 flex flex-col gap-7">
        <div className="flex flex-col gap-5">
          <div className="text-[20px]">내 출금 계좌</div>
          <AccountManagementMain 
            bankName={myAccount?.name as string}
            accountNumber={myAccount?.accountNumber as string}
            accountBalance={myAccount?.amount as number} 
            fee={community?.fee as number} 
            feePeriod={community?.feePeriod as number}
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="text-[20px]">모임 설정</div>
          <div className="flex items-center justify-between">
            <div>모임 알림</div>
            <ToggleButton text={""} />
          </div>
          <div className="flex items-center justify-between">
            <div>입출금 알림</div>
            <ToggleButton text={""} />
          </div>
        </div>
        <hr className="bg-gray-800 my-3" />
        <AccountManagementManager 
          fee={community?.fee as number} 
          feePeriod={community?.feePeriod as number}
        />
        <hr className="bg-gray-800 my-3" />
        <div className="flex flex-col gap-5  text-[17px] mb-20">
          <div className="text-[20px]">모임 멤버</div>
          <div className="flex flex-col gap-2 justify-center">
            {members.map((member, index) => (
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
      </div>
    </div>
  );
}
