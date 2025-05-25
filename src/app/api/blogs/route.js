import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
  const blogs = await prisma.blog.findMany({
    include: { author: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(blogs);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { title, content, image } = await req.json();
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const blog = await prisma.blog.create({
    data: {
      title,
      content,
      image,
      authorId: user.id,
    },
  });
  return NextResponse.json(blog, { status: 201 });
} 