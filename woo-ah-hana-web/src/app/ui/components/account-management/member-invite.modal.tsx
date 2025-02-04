"use client";

import { inquiryMember } from "@/app/business/member/member.service";
import AchromaticButton from "../../atom/button/achromatic-button";
import TextInput from "../../atom/text-input/text-input";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../molecule/dialog/dialog";
import { useRef, useState } from "react";
import {
  Member,
  registerCommunity,
} from "@/app/business/community/community.service";
import useCommunityStore from "@/app/store/community-store";

export default function MemberInviteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inquiriedMember, setInquiriedMember] = useState<Member | null>(null);
  const community = useCommunityStore((state) => {
    return state.community;
  });
  const invitedMemberPhoneNumberRef = useRef<HTMLInputElement>(null);

  const handleCancelButton = () => {
    setIsOpen(false);
  };

  const handleInviteButton = async () => {
    // setIsOpen(false);
    inquiryMember(invitedMemberPhoneNumberRef.current?.value as string).then(
      (res) => {
        if (res.data) {
          setInquiriedMember(res.data);
        } else {
          alert("조회에 실패했습니다. 다시 시도해주세요.");
        }
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <AchromaticButton className="w-full">멤버 초대하기</AchromaticButton>
      </DialogTrigger>
      <DialogContent className="p-5">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div>초대하고 싶은 사람의</div>
            <div>
              <span className="font-semibold">전화번호</span>를 입력해주세요.
            </div>
          </div>

          <TextInput ref={invitedMemberPhoneNumberRef} />
          {inquiriedMember ? (
            <div className="grid grid-cols-[7fr_3fr] w-full">
              <div className="text-lg mt-1 font-semibold">
                {inquiriedMember.name}
              </div>
              {inquiriedMember.name === "존재하지 않습니다." ? (
                <></>
              ) : (
                <AchromaticButton
                  variant={"outline"}
                  onClick={async () => {
                    if (community.id !== "0") {
                      await registerCommunity(
                        inquiriedMember.id,
                        community.id
                      ).then((response) => {
                        if (response.data?.success) {
                          window.location.reload();
                        } else {
                          alert("모임통장 초대에 실패했습니다.");
                        }
                      });
                    } else {
                      return;
                    }
                  }}
                >
                  초대하기
                </AchromaticButton>
              )}
            </div>
          ) : (
            <></>
          )}
          <div className="w-full flex items-center justify-between gap-4">
            <AchromaticButton
              className="w-full"
              variant={"outline"}
              onClick={handleCancelButton}
            >
              취소
            </AchromaticButton>
            <AchromaticButton className="w-full" onClick={handleInviteButton}>
              조회하기
            </AchromaticButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
