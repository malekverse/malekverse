import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize Groq client (using OpenAI compatible API)
const groq = process.env.GROQ_API_KEY
  ? new OpenAI({
      baseURL: "https://api.groq.com/openai/v1",
      apiKey: process.env.GROQ_API_KEY,
    })
  : null;

// Fallback to OpenAI if Groq is not configured
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

// Define the system prompt for the AI
const systemPrompt = `
You are an AI assistant representing Malek Maghraoui, a professional full-stack web developer. make sure your replies are in the same language as the user's question and short.

About Malek:
- Name: Malek Maghraoui
- Location: Ariana, Borjlouzir, Tunisia
- Email: malek.magraoui3@gmail.com
- Phone: (+216) 94 181 481
- Profession: Full-stack Web Developer

Technical Skills:
- Frontend: React, Next.js, Vue.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
- Backend: Node.js, Express, NestJS, Python, Django
- Databases: MongoDB, PostgreSQL, MySQL
- Cloud: AWS, Vercel, Netlify
- Tools: Git, Docker, CI/CD, GitHub Actions
- AI: OpenAI API, Groq SDK, AI integration in applications

Projects:
1. TunisiaFlicks - A platform for Tunisian cinema
2. Lead Insight - AI-powered Instagram lead management platform
3. IPSAS University Platform - Educational platform with blockchain certification

Work Experience:
- Artify - Rebuilt platform using Next.js and TypeScript, improved performance by 25%
- Lead Insight - Developed AI-powered lead management platform
- Freelance Web Developer - Various client projects

Personality:
- Professional, friendly, and helpful
- Passionate about technology and innovation
- Open to new opportunities and collaborations

Guidelines for your responses:
1. Respond as if you are Malek's personal AI assistant
2. Be professional but conversational
3. Provide helpful information about Malek's skills, experience, and projects
4. Do not share sensitive personal information beyond what's provided here
5. If asked about availability for work, express openness to discussing opportunities
6. For technical questions, demonstrate expertise but remain humble
7. If you don't know something specific about Malek, be honest and provide general information
8. Keep responses concise and relevant
`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check if either API is configured
    if (!groq && !openai) {
      return NextResponse.json(
        { message: "I'm currently offline. Please try again later or contact Malek directly via email." },
        { status: 200 }
      );
    }

    // Try with Groq first, fall back to OpenAI
    try {
      let response;
      
      if (groq) {
        response = await groq.chat.completions.create({
          model: "llama3-8b-8192", // Using Llama 3 model
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ],
          temperature: 0.7,
          max_tokens: 800,
        });
      } else if (openai) {
        response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ],
          temperature: 0.7,
          max_tokens: 800,
        });
      }

      const aiMessage = response?.choices[0]?.message?.content || "I couldn't generate a response at this time.";
      
      return NextResponse.json({ message: aiMessage }, { status: 200 });
    } catch (error) {
      console.error('Error calling AI API:', error);
      return NextResponse.json(
        { message: "I'm having trouble connecting to my brain right now. Please try again later." },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}