"use client";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function GalleryPage() {
  const { data: session } = useSession();
  const [photos, setPhotos] = useState([]);
  const [caption, setCaption] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetch('/api/photos').then(res => res.json()).then(setPhotos);
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    setError('');
    let imageUrl = url;
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) { setError('Image upload failed.'); setUploading(false); return; }
      const data = await res.json();
      imageUrl = data.url;
    }
    if (!imageUrl) { setError('Please provide a photo URL or upload a file.'); setUploading(false); return; }
    setUploading(true);
    const res = await fetch('/api/photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: imageUrl, caption }),
    });
    setUploading(false);
    if (!res.ok) { setError('Upload failed.'); return; }
    const photo = await res.json();
    setPhotos([photo, ...photos]);
    setUrl(''); setCaption(''); setFile(null);
  };

  const handleLike = async (id) => {
    if (!session) return;
    const res = await fetch(`/api/photos/${id}/like`, { method: 'POST' });
    if (res.ok) {
      const { liked } = await res.json();
      setPhotos(photos => photos.map(p => p.id === id ? {
        ...p,
        likes: liked
          ? [...p.likes, { id: 'temp', userId: session.user.id, photoId: id }]
          : p.likes.filter(l => l.userId !== session.user.id)
      } : p));
    }
  };

  const handleComment = async (id, comment, setCommentText) => {
    if (!session || !comment) return;
    const res = await fetch(`/api/photos/${id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment }),
    });
    if (res.ok) {
      const newComment = await res.json();
      setPhotos(photos => photos.map(p => p.id === id ? {
        ...p,
        comments: [...p.comments, newComment]
      } : p));
      setCommentText('');
    }
  };

  const handleDelete = async (id) => {
    if (!session || session.user.role !== 'admin') return;
    const res = await fetch(`/api/photos/${id}`, { method: 'DELETE' });
    if (res.ok) setPhotos(photos => photos.filter(p => p.id !== id));
  };

  return (
    <main>
      <Navbar />
      <section className="container py-5">
        <h1 className="section-title text-center mb-5">Photo Gallery</h1>
        {session && (
          <form className="mb-4" onSubmit={handleUpload} encType="multipart/form-data">
            <div className="row g-2 align-items-end">
              <div className="col-md-4">
                <input type="url" className="form-control mb-2" placeholder="Photo URL (e.g. /myphoto.jpg or https://...)" value={url} onChange={e => setUrl(e.target.value)} />
                <input type="file" className="form-control" accept="image/*" onChange={e => setFile(e.target.files[0])} />
              </div>
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Caption (optional)" value={caption} onChange={e => setCaption(e.target.value)} />
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary w-100" type="submit" disabled={uploading}>{uploading ? 'Uploading...' : 'Upload'}</button>
              </div>
            </div>
            {error && <div className="alert alert-danger mt-2 py-1">{error}</div>}
          </form>
        )}
        <div className="row g-4">
          {photos.map(photo => (
            <div key={photo.id} className="col-md-4">
              <div className="card h-100 shadow-sm">
                <img src={photo.url} alt={photo.caption || 'Photo'} className="card-img-top" style={{ objectFit: 'cover', height: 250 }} />
                <div className="card-body">
                  <div className="d-flex align-items-center mb-2">
                    <b>{photo.user?.name || photo.user?.email || 'User'}</b>
                    <span className="ms-auto text-muted small">{new Date(photo.createdAt).toLocaleDateString()}</span>
                  </div>
                  {photo.caption && <div className="mb-2">{photo.caption}</div>}
                  <div className="d-flex align-items-center mb-2">
                    <button className={`btn btn-sm ${session && photo.likes.some(l => l.userId === session.user.id) ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleLike(photo.id)} disabled={!session}>
                      <i className="fas fa-thumbs-up"></i> {photo.likes.length}
                    </button>
                    {session && session.user.role === 'admin' && (
                      <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDelete(photo.id)}>Delete</button>
                    )}
                  </div>
                  <div>
                    <b>Comments:</b>
                    <ul className="list-unstyled mb-2">
                      {photo.comments.map(c => (
                        <li key={c.id}><b>{c.user?.name || 'User'}:</b> {c.comment}</li>
                      ))}
                      {photo.comments.length === 0 && <li className="text-muted">No comments yet.</li>}
                    </ul>
                    {session && (
                      <PhotoCommentForm photoId={photo.id} onComment={handleComment} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {photos.length === 0 && <div className="text-center text-muted">No photos yet.</div>}
        </div>
      </section>
      <Footer />
    </main>
  );
}

function PhotoCommentForm({ photoId, onComment }) {
  const [commentText, setCommentText] = useState('');
  return (
    <form className="d-flex mt-2" onSubmit={e => { e.preventDefault(); onComment(photoId, commentText, setCommentText); }}>
      <input type="text" className="form-control form-control-sm me-2" placeholder="Add a comment..." value={commentText} onChange={e => setCommentText(e.target.value)} required />
      <button className="btn btn-sm btn-outline-primary" type="submit">Post</button>
    </form>
  );
} 