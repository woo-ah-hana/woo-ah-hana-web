import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 클라이언트에서 FormData 받기
    const formData = await req.formData();
    const file = formData.get("uploadFile") as Blob;

    if (!file) {
      return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
    }

    // Spring Boot API 호출
    const springResponse = await fetch("http://localhost:8080/fileUpload", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (!springResponse.ok) {
      const errorText = await springResponse.text();
      console.error("Spring Boot API 오류:", errorText);
      return NextResponse.json(
        { error: "Spring Boot API에서 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    const result = await springResponse.json();
    return NextResponse.json(result); // Spring Boot API 응답 반환
  } catch (error: any) {
    console.error("파일 업로드 중 오류 발생:", error.message);
    return NextResponse.json(
      { error: "파일 업로드 중 서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
