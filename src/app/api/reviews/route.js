import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const guideId = searchParams.get('guideId');
  if (!guideId) return NextResponse.json([]);
  const reviews = await prisma.review.findMany({
    where: { guideId },
    include: { user: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(reviews);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { guideId, rating, comment } = await req.json();
  if (!guideId || !rating || !comment) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  // Only one review per user per guide
  const existing = await prisma.review.findFirst({ where: { userId: user.id, guideId } });
  if (existing) return NextResponse.json({ error: 'You have already reviewed this guide.' }, { status: 400 });
  const review = await prisma.review.create({
    data: { userId: user.id, guideId, rating, comment },
  });
  return NextResponse.json(review, { status: 201 });
} 