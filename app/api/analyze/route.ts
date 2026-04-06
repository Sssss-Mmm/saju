import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch('http://127.0.0.1:8000/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('FastAPI Backend Error:', errorData);
      return NextResponse.json({ error: 'Failed to fetch analysis from Python backend' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("API Proxy Error: ", error);
    return NextResponse.json({ error: 'Failed to proxy request to Python backend' }, { status: 500 });
  }
}
