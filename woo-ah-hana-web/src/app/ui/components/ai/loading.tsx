"use client";
import Robot from "@/app/assets/img/icon-robot.png";

export function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-lg">
        <p className="text-lg font-semibold text-gray-800 animate-pulse">
          AI가 생각 중... 잠시만 기다려 주세요!
        </p>
        <img
          alt="로딩 로봇"
          src={Robot.src}
          className="h-40 w-40 animate-bounce"
        />
        <p className="text-sm text-gray-500">약 5초 정도 소요될 수 있습니다.</p>
      </div>
    </div>
  );
}
