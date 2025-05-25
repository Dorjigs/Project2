import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function POST(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  const photoId = params.id;
  const { comment } = await req.json();
  if (!comment) return NextResponse.json({ error: 'Missing comment' }, { status: 400 });
  const photoComment = await prisma.photoComment.create({
    data: { userId: user.id, photoId, comment },
    include: { user: { select: { id: true, name: true } } },
  });
  return NextResponse.json(photoComment, { status: 201 });
} 