"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";

const ReactMediaRecorder = dynamic(
  () =>
    import("react-media-recorder").then((mod) => mod.ReactMediaRecorder),
  { ssr: false }
);

const Stt: React.FC = () => {
  const [resp, setResp] = useState<string>(""); // STT 결과 저장
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null); // 녹음된 Blob URL
  const [isUploading, setIsUploading] = useState<boolean>(false); // 업로드 상태 관리

  const handleUpload = async () => {
    if (!mediaBlobUrl) {
      alert("녹음된 파일이 없습니다.");
      return;
    }

    setIsUploading(true);
    try {
      const blob = await fetch(mediaBlobUrl).then((res) => res.blob());
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
    <div style={{ textAlign: "center" }}>
      <h2>음성 녹음 및 STT</h2>

      <ReactMediaRecorder
        audio
        onStop={(blobUrl: string) => setMediaBlobUrl(blobUrl)}
        render={({ status, startRecording, stopRecording }) => (
          <div>
            <p>녹음 상태: {status}</p>
            <button onClick={startRecording}>🎙️ 녹음 시작</button>
            <button onClick={stopRecording} style={{ marginLeft: "10px" }}>
              ⏹️ 녹음 정지
            </button>
            <br />
            <br />
            {mediaBlobUrl && (
              <>
                <audio
                  src={mediaBlobUrl}
                  controls
                  style={{ marginBottom: "10px" }}
                />
                <br />
                <button onClick={handleUpload} disabled={isUploading}>
                  {isUploading ? "업로드 중..." : "🔼 업로드"}
                </button>
              </>
            )}
          </div>
        )}
      />

      <hr />

      <h3>STT 결과:</h3>
      <p>{resp || "STT 결과가 여기에 표시됩니다."}</p>
    </div>
  );
};

export default Stt;
