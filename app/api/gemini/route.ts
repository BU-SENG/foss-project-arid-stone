import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, model = 'gemini-pro' } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured' },
        { status: 500 }
      );
    }

    const genModel = genAI.getGenerativeModel({ model });
    const result = await genModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      text,
      model,
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate content',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Gemini API endpoint is running',
    availableModels: ['gemini-pro', 'gemini-pro-vision'],
  });
}