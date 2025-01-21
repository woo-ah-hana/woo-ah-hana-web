import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import ToggleButton from "@/app/ui/atom/toggle/toggle-button";
import Bankbook from "@/app/ui/components/bankbook";
import Image from "next/image";
import ProfileImage from "../../assets/img/profile.jpg";
import FeeSettingModal from "@/app/ui/components/account/fee-setting.modal";
import MemberInviteModdal from "@/app/ui/components/account/member-invite.modal";
import Header from "@/app/ui/components/header";

//임시 멤버 데이터
const members = [
  { name: "김하나" },
  { name: "홍창기" },
  { name: "문보경" },
  { name: "박해민" },
  { name: "김현수" },
];

export default function AccountManagement() {
  return (
    <div className="h-full flex flex-col">
      <Header title="계좌 관리하기" link="/home" />
      <div className="p-5 flex flex-col gap-7">
        <div className="flex flex-col gap-5">
          <div className="text-[20px]">내 출금 계좌</div>
          <Bankbook
            title={"하나은행"}
            accountNumber={"12-3456-78-1029"}
            balance={23450000}
            footer={
              <div className="w-[100%] flex justify-between">
                <AchromaticButton variant={"secondary"} className="w-[45%]">
                  자동이체
                </AchromaticButton>
                <AchromaticButton variant={"secondary"} className="w-[45%]">
                  계좌변경
                </AchromaticButton>
              </div>
            }
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
        <div className="flex flex-col gap-5  text-[17px]">
          <div className="text-[20px]">계주 관리</div>
          <div className="flex items-center justify-between align-baseline">
            <div>회비 금액</div>
            <div>100,000원</div>
          </div>
          <div className="flex items-center justify-between align-baseline">
            <div>회비 주기</div>
            <div>매월 30일</div>
          </div>
          <FeeSettingModal />
        </div>
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
                <AchromaticButton variant={"outline"}>
                  계주로 지정
                </AchromaticButton>
              </div>
            ))}
          </div>
          <MemberInviteModdal />
        </div>
      </div>
    </div>
  );
}
