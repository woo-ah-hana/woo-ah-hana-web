"use client";

import AchromaticButton from "../../atom/button/achromatic-button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../molecule/dialog/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Form from "../../molecule/form/form-index";
import { useState } from "react";
import { FormTextArea } from "../../molecule/form/form-textarea";
import { FormImage } from "../../molecule/form/form-image";
import { createPost } from "@/app/business/memory/memory.service";

interface MemoryPostModalProps {
  planId: string;
}

export default function MemoryPostModal({ planId }: MemoryPostModalProps) {
  const [content, setContent] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <AchromaticButton className="h-14 w-14 rounded-full">
          <MdOutlineAddPhotoAlternate color="white" size={40} />
        </AchromaticButton>
      </DialogTrigger>
      <DialogContent className="p-6">
        <div className="flex flex-col gap-6">
          <div className="text-lg font-semibold">사진 업로드</div>
          <Form
            id="memory-post"
            action={async (prevState, formData) => {
              if (imageFile) {
                formData.append("image", imageFile);
              }
              return await createPost(prevState, formData);
            }}
            failMessageControl="alert"
            onSuccess={() => {
              alert("게시되었습니다.");
              window.location.reload();
            }}
          >
            <input
              id="id"
              name="id"
              value={planId}
              onChange={() => {}}
              className="hidden"
            />
            <div className="flex flex-col gap-4">
              <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center gap-2">
                <FormImage
                  id="image"
                  value={imageFile}
                  required
                  onImageChange={setImageFile}
                />
              </div>
              <div className="flex flex-col gap-1">
                <FormTextArea
                  label="내용"
                  id="content"
                  placeholder="남기고 싶은 말을 적어주세요."
                  required
                  value={content}
                  onValueChange={setContent}
                  maxLength={50}
                />
                <span className="text-gray-500 text-sm">
                  {content.length} / 50 자 이내 작성
                </span>
              </div>
              <div className="w-full flex justify-between items-center">
                <DialogClose>
                  <div className="inline-flex items-center justify-center bg-slate-100 text-slate-900 shadow-md hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80 w-32 h-12 px-2 text-wooahmain rounded-lg tiem">
                    취소
                  </div>
                </DialogClose>
                <Form.SubmitButton
                  label="게시하기"
                  className="w-32 h-12 px-2 bg-blue-500 text-white rounded-lg"
                />
              </div>
            </div>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
