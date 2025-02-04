import Image from "next/image";
import IconNone from "../../../assets/img/icon-none.png";

export default function MemoryNone() {
  return (
    <div className="h-[600px] flex flex-col justify-center items-center gap-3 text-xl font-semibold">
      <Image
        src={IconNone}
        alt="noneIcon"
        style={{ width: "120px", height: "120px" }}
      />
      <div>추억할 모임 일정이 없습니다.</div>
      <div>일정을 생성하고, </div>
      <div>지난 일정을 추억해보세요!</div>
    </div>
  );
}
