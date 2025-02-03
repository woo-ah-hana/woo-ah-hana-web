"use client";

import dynamic from "next/dynamic";
import React, { useState, useRef, useEffect } from "react";
import voice from "@/app/assets/img/voice.gif"; // GIF 파일 import
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import { MdKeyboardVoice } from "react-icons/md";
import Robot from "@/app/assets/img/icon-robot.png";

const ReactMediaRecorder = dynamic(
  () => import("react-media-recorder").then((mod) => mod.ReactMediaRecorder),
  { ssr: false }
);
interface SttProps {
  onClose: () => void;
  onResult: (text: string) => void;
}
const Stt = ({ onClose, onResult }: SttProps) => {
  const [resp, setResp] = useState<string>("");
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleUpload = async (blobUrl: string) => {
    if (!blobUrl) {
      alert("녹음된 파일이 없습니다.");
      return;
    }

    setIsUploading(true);
    try {
      const blob = await fetch(blobUrl).then((res) => res.blob());
      const formData = new FormData();
      formData.append("uploadFile", blob, "recording.wav");

      const response = await fetch("/api/stt", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error:", errorText);
        alert("파일 업로드 중 오류가 발생했습니다.");
        return;
      }

      const result = await response.json();
      setResp(result.text || "결과가 없습니다.");
      onResult(result.text || "결과가 없습니다.");
      alert("녹음 파일 업로드 성공");

      console.log("API 응답(JSON):", JSON.stringify(result, null, 2));
    } catch (error: any) {
      console.error("Error:", error.message);
      alert("녹음 파일 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ReactMediaRecorder
      audio
      onStop={(blobUrl: string) => {
        console.log("🎤 녹음 완료! Blob URL:", blobUrl);
        setMediaBlobUrl(blobUrl);
        setIsRecording(false);
        handleUpload(blobUrl);
      }}
      render={({ startRecording, stopRecording }) => {
        useEffect(() => {
          setIsRecording(true);
          startRecording();
          timerRef.current = setTimeout(() => {
            stopRecording();
            setIsRecording(false);
            alert("녹음이 종료되었습니다.");
          }, 1500000000);
          return () => {
            if (timerRef.current) {
              clearTimeout(timerRef.current);
              timerRef.current = null;
            }
          };
        }, []);
        Robot;
        return (
          <div className="flex flex-col">
            <div>
              {isRecording && (
                <div>
                  <div className="relative flex items-center justify-center pb-5">
                    <div className="absolute w-20 h-20 rounded-full bg-blue-300 opacity-30 animate-ping pointer-events-none"></div>
                    <div className="absolute w-40 h-40 rounded-full bg-blue-400 opacity-50 animate-ping pointer-events-none"></div>
                    <MdKeyboardVoice
                      className="text-white bg-wooahMain text-7xl p-3 rounded-full"
                      onClick={() => {
                        if (timerRef.current) {
                          clearTimeout(timerRef.current);
                          timerRef.current = null;
                        }
                        stopRecording();
                        setIsRecording(false);
                        onClose();
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }}
    />
  );
};
{
  /*
   */
}
export default Stt;
