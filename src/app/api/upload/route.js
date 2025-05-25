import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const form = formidable({ multiples: false });
  const uploadDir = path.join(process.cwd(), 'public', 'gallery');
  await fs.mkdir(uploadDir, { recursive: true });

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) return resolve(NextResponse.json({ error: 'Upload failed' }, { status: 500 }));
      const file = files.file;
      if (!file) return resolve(NextResponse.json({ error: 'No file uploaded' }, { status: 400 }));
      const ext = path.extname(file.originalFilename || file.newFilename || '');
      const filename = uuidv4() + ext;
      const dest = path.join(uploadDir, filename);
      await fs.copyFile(file.filepath, dest);
      const url = `/gallery/${filename}`;
      resolve(NextResponse.json({ url }));
    });
  });
} 