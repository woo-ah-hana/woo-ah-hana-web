"use client";

import React, { useState } from "react";
import Stt from "@/app/ui/components/stt/stt";
import { MdKeyboardVoice } from "react-icons/md";

interface SttModalWrapperProps {
  onResult: (text: string) => void;
}

export const SttModalWrapper: React.FC<SttModalWrapperProps> = ({
  onResult,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  return (
    <div>
      <MdKeyboardVoice
        onClick={openModal}
        className="bg-blue-500 text-white rounded-full h-12 w-12 p-2 shadow-md"
      />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-end justify-center bg-black z-50 bg-opacity-80">
          <div className="h-full flex flex-col justify-between w-full">
            <div className="text-white p-5 text-md pt-20">
              <p>📢 예를 들어,</p>
              <p> {`설악산 등산 여행 추천`} </p>
              <p className="mt-5">이렇게 말하면 돼요.</p>
            </div>
            <Stt onClose={() => setIsModalOpen(false)} onResult={onResult} />
          </div>
        </div>
      )}
    </div>
  );
};
