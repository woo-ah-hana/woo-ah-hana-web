'use client'
import { Member } from "@/app/business/community/community.service";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/molecule/dialog/dialog";
import { useEffect, useState } from "react";

interface MemberDetailDilogProps{
  id: string,
  communityId: string,
  memberIds: string[],
  memberNames: string[],
  communityMemberIds: string[],
  communityMemberNames: string[]
}

export function MemberDetailDilog({id, communityId, memberIds, memberNames, communityMemberIds, communityMemberNames}: MemberDetailDilogProps){
  const [planMembers, setPlanMembers] = useState<Member[]>([]);
  const [communityMembers, setCommunityMembers] = useState<Member[]>([]);

  function handleAddMember(addedMember: Member){
    const members = [addedMember, ...planMembers]
    setPlanMembers(members);
  };

  function handleRemoveMember(removedMember: Member){
    const members = planMembers.map((member)=>{
      if(member.id !== removedMember.id){
        return member;
      }
    }).filter((member)=>{return member})
    setPlanMembers(members as Member[]);
  };

  useEffect(()=>{
    const members: Member[] = [];
    if(memberIds.length!== memberNames.length) return;
    for(let i=0; i<memberIds.length; i++){
      const member: Member = {id:memberIds[i], name: memberNames[i]}
      members.push(member);
    }
    setPlanMembers(members);
  }, [])
  
  useEffect(()=>{
    const members: Member[] = [];
    if(communityMemberIds.length!==communityMemberNames.length) return;
    for(let i=0; i<communityMemberIds.length; i++){
      const member: Member = {id:communityMemberIds[i], name: communityMemberNames[i]}
      members.push(member);

      setCommunityMembers(members);
    }
  },[])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <AchromaticButton variant={'ghost'} className="text-slate-600">수정</AchromaticButton>
      </DialogTrigger>
      <DialogContent title="참여 인원 변경">
        <div className="grid grid-cols1 gap-7 p-3">
          <div>
            <div className="text-center">현재 참여하는 사람들</div>
            <div className="grid grid-cols-1 gap-3 mx-3">
              {planMembers.map((member, index)=>{
                return (
                  <div key={index} className="grid grid-cols-[9fr_1fr]">
                    <div className="mt-2">{member.name}</div>
                    <AchromaticButton variant={'ghost'} onClick={()=>{handleRemoveMember(member)}}>삭제</AchromaticButton>
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <div className="text-center">모임 통장의 사람들</div>
            <div className="grid grid-cols-1 gap-3 mx-3">
              {communityMembers.map((member, index)=>{
                if(!planMembers.map((member)=>{return member.id}).includes(member.id)){
                  return (
                    <div key={index} className="grid grid-cols-[9fr_1fr]">
                      <div className="mt-2">{member.name}</div>
                      <AchromaticButton variant={'ghost'} onClick={()=>{handleAddMember(member)}}>추가</AchromaticButton>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}