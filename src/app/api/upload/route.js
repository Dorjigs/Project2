import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import formidable from 'formidable';

// Next.js 14 route configuration
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 10;

export async function POST(req) {
  try {
    const form = formidable({ multiples: false });
    const uploadDir = path.join(process.cwd(), 'public', 'gallery');
    await fs.mkdir(uploadDir, { recursive: true });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.file;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const ext = path.extname(file.originalFilename || file.newFilename || '');
    const filename = uuidv4() + ext;
    const dest = path.join(uploadDir, filename);
    await fs.copyFile(file.filepath, dest);
    const url = `/gallery/${filename}`;
    
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
} 