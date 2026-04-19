import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch('http://127.0.0.1:8000/api/analyze/solo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('FastAPI Backend Error (Solo):', errorData);
      return NextResponse.json(
        { error: '솔로 탈출 예측 백엔드 오류' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Solo API Proxy Error:', error);
    return NextResponse.json(
      { error: '솔로 탈출 API 프록시 오류' },
      { status: 500 }
    );
  }
}
