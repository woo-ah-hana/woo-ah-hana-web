import { FaUserCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
export interface MemoryDetailProps {
  id: string;
  memberId: string;
  imageUrl: string;
  description: string;
  createdAt: string;
}

export function MemoryDetail({
  id,
  memberId,
  imageUrl,
  description,
  createdAt,
}: MemoryDetailProps) {
  const date = createdAt.split(" ")[0];

  return (
    <main>
      <div className="mt-5">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <FaUserCircle className="size-10" />
            <div className="text-lg mt-2 ml-3">{memberId}</div>
          </div>
          <div className="flex flex-row">
            <div className="text-base mt-2">{date}</div>
          </div>
        </div>
        <div className=" h-52 bg-red-100">이미지{`# ${imageUrl}`}</div>
        <div className="flex flex-row justify-between">
          <div className="text-lg">{description}</div>
          <RiDeleteBin6Line />
        </div>
      </div>
    </main>
  );
}
