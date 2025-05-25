import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const skip = (page - 1) * limit;
  const photos = await prisma.photo.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { id: true, name: true } },
      likes: { include: { user: { select: { id: true, name: true } } } },
      comments: { include: { user: { select: { id: true, name: true } } } },
    },
  });
  const total = await prisma.photo.count();
  return NextResponse.json({ photos, total, page, limit });
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  const { title, description, imageUrl } = await req.json();
  if (!title || !imageUrl) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  const photo = await prisma.photo.create({
    data: { title, description, imageUrl, userId: user.id },
    include: { user: { select: { id: true, name: true } } },
  });
  return NextResponse.json(photo, { status: 201 });
} 