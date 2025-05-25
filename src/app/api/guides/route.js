import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const guides = await prisma.travelGuide.findMany();
    return res.status(200).json(guides);
  }

  if (req.method === 'POST') {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Missing title or description' });
    }

    const newGuide = await prisma.travelGuide.create({
      data: { title, description },
    });

    return res.status(201).json(newGuide);
  }

  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
