import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  const { name, email, interests, wantsNews } = body;

  if (!email) {
    return new Response(JSON.stringify({ error: 'Email is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const existing = await prisma.subscriber.findUnique({ where: { email } });

    if (existing) {
      return new Response(JSON.stringify({ message: 'You are already subscribed!' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newSubscriber = await prisma.subscriber.create({
      data: {
        name,
        email,
        interests,
        wantsNews,
      },
    });

    return new Response(JSON.stringify({ message: 'Subscribed successfully', subscriber: newSubscriber }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
