import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
  const photos = await prisma.photo.findMany({
    include: {
      user: { select: { id: true, name: true, email: true } },
      likes: true,
      comments: { include: { user: { select: { id: true, name: true } } } },
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(photos);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { url, caption } = await req.json();
  if (!url) return NextResponse.json({ error: 'Missing photo URL' }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  const photo = await prisma.photo.create({
    data: { userId: user.id, url, caption },
  });
  return NextResponse.json(photo, { status: 201 });
} 