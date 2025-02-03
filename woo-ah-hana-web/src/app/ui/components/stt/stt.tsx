"use client";

import dynamic from "next/dynamic";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { MdKeyboardVoice } from "react-icons/md";

const ReactMediaRecorder = dynamic(
  () => import("react-media-recorder").then((mod) => mod.ReactMediaRecorder),
  { ssr: false }
);
interface SttProps {
  onClose: () => void;
  onResult: (text: string) => void;
}

const Stt = ({ onClose, onResult }: SttProps) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [selectedMic, setSelectedMic] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getAvailableMicrophone = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioDevices = devices.filter(
        (device) => device.kind === "audioinput"
      );

      if (audioDevices.length > 0) {
        setSelectedMic(audioDevices[0].deviceId);
      } else {
        console.warn("사용할 수 있는 마이크가 없습니다.");
      }
    } catch (error) {
      console.error("마이크 검색 중 오류 발생:", error);
    }
  }, []);

  useEffect(() => {
    getAvailableMicrophone();
  }, [getAvailableMicrophone]);

  const handleUpload = async (blobUrl: string) => {
    if (!blobUrl) {
      alert("녹음된 파일이 없습니다.");
      return;
    }

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
      onResult(result.text || "결과가 없습니다.");

      console.log("API 응답(JSON):", JSON.stringify(result, null, 2));
    } catch (error) {
      console.error("Error:", error);
      alert("음성인식 중 오류가 발생했습니다.");
    } finally {
    }
  };

  // TODO: 컴포넌트안에서 useEffect 호출하는거 바꿔야합니다...
  return (
    <ReactMediaRecorder
      audio={selectedMic ? { deviceId: { exact: selectedMic } } : true}
      onStop={(blobUrl: string) => {
        console.log("🎤 녹음 완료! Blob URL:", blobUrl);
        setIsRecording(false);
        handleUpload(blobUrl);
      }}
      render={({ startRecording, stopRecording }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          setIsRecording(true);
          startRecording();
          timerRef.current = setTimeout(() => {
            stopRecording();
            setIsRecording(false);
            alert("녹음이 종료되었습니다.");
          }, 15000);
          return () => {
            if (timerRef.current) {
              clearTimeout(timerRef.current);
              timerRef.current = null;
            }
          };
        }, []);
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

export default Stt;
