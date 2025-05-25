import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'guides.json');

const ensureFile = () => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, '[]');
  }
};

export default function handler(req, res) {
  ensureFile();

  const {
    query: { id },
    method,
  } = req;

  if (method === 'DELETE') {
    const guides = JSON.parse(fs.readFileSync(filePath));
    const updated = guides.filter((guide) => guide.id !== id);

    if (updated.length === guides.length) {
      return res.status(404).json({ error: 'Guide not found' });
    }

    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
    return res.status(200).json({ message: 'Guide deleted successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
