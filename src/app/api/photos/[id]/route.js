import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const photo = await prisma.photo.findUnique({
    where: { id: params.id },
    include: {
      user: { select: { id: true, name: true } },
      likes: { include: { user: { select: { id: true, name: true } } } },
      comments: { include: { user: { select: { id: true, name: true } } } },
    },
  });
  if (!photo) return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
  return NextResponse.json(photo);
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  const photo = await prisma.photo.findUnique({ where: { id: params.id } });
  if (!photo) return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
  if (photo.userId !== user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await prisma.photo.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
} 