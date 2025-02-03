"use client";

import Image from "next/image";
import {
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import ProfileImage from "@/app/assets/img/profile.jpg";

interface MemberItemProps {
  id: string; // id를 string으로 변경
  name: string;
  isSelected: boolean;
  toggleMember: (id: string) => void; // toggleMember에서 id를 string으로 변경
}

export default function MemberItem({
  id,
  name,
  isSelected,
  toggleMember,
}: MemberItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-2">
      <div className="flex justify-center items-center gap-8">
        <Image
          src={ProfileImage}
          alt={`${name} 프로필`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="text-gray-800">{name}</div>
      </div>
      <div>
        {isSelected ? (
          <IoIosCheckmarkCircle
            onClick={() => toggleMember(id)}
            className="text-wooahMain text-3xl cursor-pointer"
          />
        ) : (
          <IoIosCheckmarkCircleOutline
            onClick={() => toggleMember(id)}
            className="text-gray-400 text-3xl cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
