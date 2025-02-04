import Robot from "@/app/assets/img/icon-robot.png";
import Image from "next/image";

export function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-lg">
        <div className="text-lg font-semibold text-gray-800 animate-pulse flex flex-col gap-1">
          <div>AI가 일정을 만드는 중입니다 ...</div>
          <div>잠시만 기다려 주세요!</div>
        </div>
        <Image
          alt="로딩 로봇"
          src={Robot.src}
          className="animate-bounce"
          height={100}
          width={100}
        />
        <p className="text-sm text-gray-500">약 10~15초 정도 소요됩니다.</p>
      </div>
    </div>
  );
}
