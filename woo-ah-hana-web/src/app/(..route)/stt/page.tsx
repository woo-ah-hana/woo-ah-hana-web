"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";

const ReactMediaRecorder = dynamic(() => import("react-media-recorder").then((mod) => mod.ReactMediaRecorder), {
  ssr: false, // 서버사이드 렌더링 비활성화
});

const Stt: React.FC = () => {
  const [resp, setResp] = useState<string>(""); // STT 결과 저장
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null); // 녹음된 Blob URL

  const uploadRecording = async () => {
    if (!mediaBlobUrl) {
      alert("녹음된 파일이 없습니다.");
      return;
    }

    try {
      const blob = await fetch(mediaBlobUrl).then((res) => res.blob());
      const formData = new FormData();
      formData.append("uploadFile", blob, "recording.wav");

      const res = await fetch("http://localhost:8080/fileUpload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("서버 응답 오류:", errorText);
        throw new Error("녹음 파일 업로드 중 오류 발생");
      }

      const result = await res.json();
      setResp(result.text); // 서버에서 반환된 텍스트 결과 저장
      alert("녹음 파일 업로드 성공");
    } catch (error) {
      console.error("Error:", error);
      alert("녹음 파일 업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>음성 녹음 및 STT</h2>

      <ReactMediaRecorder
        audio
        onStop={(blobUrl: string) => {
          setMediaBlobUrl(blobUrl); // 녹음이 완료되면 URL 저장
        }}
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
                <button onClick={uploadRecording}>🔼 업로드</button>
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
