import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';

// Mock AI responses
const mockResponses = [
  "这是一个很好的问题！让我来帮你理解一下...",
  "根据课程内容，我建议你可以从以下几个方面来思考...",
  "这个概念确实比较复杂，让我用一个简单的例子来说明...",
  "你的理解基本正确！不过需要注意的是...",
  "这是数据挖掘中的一个重要知识点，让我详细解释一下...",
];

async function callOpenAI(message: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.AI_MODEL || 'gpt-3.5-turbo';
  const provider = process.env.AI_PROVIDER || 'openai';

  if (!apiKey) {
    throw new Error('No API key configured');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: '你是一位专业的数据挖掘课程AI助教，擅长用简单易懂的方式解释复杂的数据挖掘概念。请用中文回答问题。',
          },
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: '消息内容不能为空' }, { status: 400 });
    }

    let reply: string;
    let usingMock = false;

    // Check if API key is configured
    if (process.env.OPENAI_API_KEY) {
      try {
        reply = await callOpenAI(message);
      } catch (error) {
        console.error('Failed to call OpenAI, falling back to mock:', error);
        reply = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        usingMock = true;
      }
    } else {
      // Use mock response
      reply = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      usingMock = true;
    }

    return NextResponse.json({
      success: true,
      reply,
      usingMock,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: '处理消息失败，请稍后重试' },
      { status: 500 }
    );
  }
}
