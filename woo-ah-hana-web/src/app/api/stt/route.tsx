import { NextResponse } from "next/server";
import { API_PATH } from "@/app/utils/http/api-query";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("uploadFile");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "파일이 존재하지 않거나 올바르지 않은 형식입니다." },
        { status: 400 }
      );
    }

    const springResponse = await fetch(`${API_PATH}/fileUpload`, {
      method: "POST",
      body: formData,
    });

    if (!springResponse.ok) {
      const errorText = await springResponse.text();
      return NextResponse.json(
        { error: "Spring Boot API 오류", details: errorText },
        { status: springResponse.status }
      );
    }

    const result = await springResponse.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("API 라우트 오류:", error);
    return NextResponse.json(
      { error: "파일 업로드 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}