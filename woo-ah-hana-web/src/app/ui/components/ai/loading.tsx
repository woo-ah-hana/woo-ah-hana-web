"use client";
import Robot from "@/app/assets/img/icon-robot.png";
export function Loading() {
  return (
    <div className="bg-white">
      <div className="text-black">5초 정도 걸림</div>
      <img alt="로딩 로봇" src={Robot.src} className="animate-bounce" />
    </div>
  );
}
