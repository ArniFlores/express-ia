import { Request, Response } from 'express';
import { AIService, ChatMessage } from '../shared/types/types';
import { groqService } from '../services/groq';
import { cerebrasService } from '../services/cerebras';
import { getNextService } from '../shared/helpers/getNextServices';

const services: AIService[] = [
  groqService,
  cerebrasService,
  // Google Gemini
  // OpenRouter
  // Other services including local
];
let currentServiceIndex = 0;


export const chatHandler = async (req: Request, res: Response) => {
  try {
    const { messages } = req.body as { messages: ChatMessage[] };

    const service = getNextService(services, currentServiceIndex);
    console.log(`Using ${service?.name} service`);

    const stream = await service?.chat(messages);

    // 🔹 Headers SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // importante

    // Case 1️⃣: AsyncIterable (recomended)
    let buffer = '';
    if (Symbol.asyncIterator in Object(stream)) {
      for await (const chunk of stream as AsyncIterable<string>) {
        buffer += chunk;
        if (buffer.includes('\n') || buffer.length > 50) {
          res.write(`data: ${buffer}\n\n`);
          buffer = '';
        }
      }
      if (buffer.length) {
        res.write(`data: ${JSON.stringify({ content: buffer })}\n\n`);
      }
      res.end();
      return;
    }

    // Case 2️⃣: ReadableStream (web)
    if (stream instanceof ReadableStream) {
      const reader = stream.getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += value;
        if (buffer.includes('\n') || buffer.length > 50) {
          res.write(`data: ${buffer}\n\n`);
          buffer = '';
        }
      }
      if (buffer.length) {
        res.write(`data: ${JSON.stringify({ content: buffer })}\n\n`);
      }

      res.end();
      return;
    }

    res.end();
  } catch (error) {
    console.error(error);
    res.end();
  }
};

