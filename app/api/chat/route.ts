import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_KEY, dangerouslyAllowBrowser: true });

async function getGroqChatCompletion(message: string) {
    // Call the Groq SDK to get the chat completion response
    return await groq.chat.completions.create({
        messages: [
            { role: "system", content: "you are a helpful assistant." },
            { role: "user", content: message },
        ],
        model: "llama3-8b-8192",
        temperature: 0.5,
        max_tokens: 1024,
        top_p: 1,
        stop: null,
        stream: false,
    });
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const response = await getGroqChatCompletion(body.message);
    console.log(response)
    return NextResponse.json({data:response.choices[0].message.content})
      
}

export async function GET(req: NextRequest) {
    return NextResponse.json({ message: "Hey there" });
}

// Handle unsupported methods
export async function OPTIONS(req: NextRequest) {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
