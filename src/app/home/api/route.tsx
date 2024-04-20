import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch('https://api.imats.se/visma-auth-service/refresh', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.json();

  console.log('data', data);

  return NextResponse.json({ data });
}
