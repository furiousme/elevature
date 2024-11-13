import { CohereClient } from 'cohere-ai';
import { constructPromptMessage } from 'utils';

import { ReadableStream } from 'node:stream/web';
import { NextResponse } from 'next/server';

const cohere = new CohereClient({
  token: process.env.AI_API_KEY,
});

export const POST = async (request: Request) => {
  const answers = await request.json();
  const { message, systemMessage } = constructPromptMessage(answers);

  const cohereStream = await cohere.chatStream({
    model: 'command-r-08-2024',
    preamble: systemMessage,
    message: message,
    temperature: 0.7,
  });

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chat of cohereStream) {
          if (chat.eventType === 'text-generation' && chat.text) {
            controller.enqueue(new TextEncoder().encode(chat.text));
          }
        }
        controller.close();
      } catch (e) {
        console.error(e);
        controller.error(e);
      }
    },
  });

  // @ts-expect-error
  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache',
    },
  });
};
