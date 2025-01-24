"use client";

import React, { useState } from "react";
import Stt from "@/app/ui/components/stt/stt";

export const SttModalWrapper: React.FC = () => {
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
        <div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-80 z-50">
          <div className="p-5 rounded shadow-lg">
            <Stt onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};