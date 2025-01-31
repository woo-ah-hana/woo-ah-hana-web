"use client";

import Form from "../../molecule/form/form-index";
import { deletePost } from "@/app/business/memory/memory.service";
import ProfileImage from "@/app/assets/img/profile.jpg";
import Image from "next/image";
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
            <Image
              src={ProfileImage}
              alt={"프로필 이미지"}
              className="w-12 h-12 rounded-full object-cover mb-3"
            />
            <div className="text-lg mt-2 ml-3">{memberId}</div>
          </div>
          <div className="flex flex-row">
            <div className="text-base mt-2">{date}</div>
          </div>
        </div>
        <div className="bg-red-100 rounded-lg">
          <Image
            src={imageUrl}
            alt={"추억 이미지"}
            width={500}
            height={500}

            className="mb-3 rounded-lg"/>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-lg">{description}</div>
          <Form
            id={"delete-post"}
            action={deletePost}
            failMessageControl={"alert"}
            onSuccess={() => {
              window.location.reload();
            }}
          >
            <div className="flex flex-row">
              <input id="id" name="id" value={id} className="hidden" />
              <Form.SubmitButton
                label="삭제하기"
                className="bg-white text-black shadow-none hover:bg-white"
              />
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
}
