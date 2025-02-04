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
              <p className="mt-5 text-lg">
                | 음성이 자동으로 녹음되고 있습니다.
              </p>
              <p className="text-lg">| 궁금한 걸 자유롭게 질문할 수 있어요! </p>
              <p className="text-blue-300 text-2xl flex h-full items-end justify-center">
                ‘강남의 맛집 추천해줘’
              </p>
            </div>
            <Stt onClose={() => setIsModalOpen(false)} onResult={onResult} />
          </div>
        </div>
      )}
    </div>
  );
};
