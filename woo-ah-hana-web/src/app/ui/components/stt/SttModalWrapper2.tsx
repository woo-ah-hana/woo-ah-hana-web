"use client";

import React, { useState } from "react";
import Stt from "@/app/ui/components/stt/stt2";
interface SttModalWrapperProps {
  onResult: (text: string) => void;
}

export const SttModalWrapper: React.FC<SttModalWrapperProps> = ({
  onResult,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        stt 모달 열기인데 열지 마요
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-end justify-center bg-white z-50">
          <div className="h-full flex flex-col justify-between w-full">
            <div className="text-black m-5 p-3 text-lg bg-gray-100 rounded-2xl">
              예를 들어, '설악산 등산 가서 순두부찌개 먹고 내려오려고! 친구
              셋이랑 1박 2일 일정으로 가볼까 해.' 이렇게 말하면 돼요.
            </div>
            <Stt onClose={() => setIsModalOpen(false)} onResult={onResult} />
          </div>
        </div>
      )}
    </div>
  );
};
