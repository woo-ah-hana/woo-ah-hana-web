'use client'
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/molecule/dialog/dialog";
import { useEffect, useState } from "react";

interface MemberDetailDilogProps{
  id: string,
  communityId: string,
  memberIds: string[],
  memberNames: string[]
}

interface Member{
  id: string,
  name: string
}

export function MemberDetailDilog({id, communityId, memberIds, memberNames}: MemberDetailDilogProps){
  const [planMembers, setPlanMembers] = useState<Member[]>([]);

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
    
  },[])

  useEffect(()=>{
    
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <AchromaticButton variant={'ghost'} className="text-slate-600">수정</AchromaticButton>
      </DialogTrigger>
      <DialogContent title="참여 인원 변경">
        <div className="p-3">
          <div className="text-center">현재 참여하는 사람들</div>
          <div className="grid grid-cols-1 gap-3">
            {planMembers.map((member, index)=>{
              return (
              <div key={index}>{member.name}</div>
              )
            })}
          </div>

          <div className="text-center">모임 통장 사람들</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}