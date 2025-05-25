'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function GuidesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [guides, setGuides] = useState([]);
  const [newGuide, setNewGuide] = useState({ name: '', email: '', password: '', photo: '', bio: '' });

  const isAdmin = session?.user?.role === 'admin';

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    fetch('/api/guides')
      .then(res => res.json())
      .then(data => setGuides(Array.isArray(data) ? data : []));
  }, []);

  const handleAddGuide = async (e) => {
    e.preventDefault();
    // TODO: Implement API call to add guide
    // Example: await fetch('/api/guides', { method: 'POST', body: JSON.stringify(newGuide) })
    setNewGuide({ name: '', email: '', password: '', photo: '', bio: '' });
  };

  const handleRemoveGuide = async (id) => {
    // TODO: Implement API call to remove guide
    // Example: await fetch(`/api/guides/${id}`, { method: 'DELETE' })
    setGuides(guides.filter(g => g.id !== id));
  };

  if (status === 'loading') {
    return <div className="container py-5">Loading...</div>;
  }

  if (!session) {
    return null; // This will redirect due to the useEffect
  }

  return (
    <main>
      <Navbar />
      <div className="container py-5">
        <h1 className="text-center mb-4">Our Expert Guides</h1>
        {isAdmin && (
          <form className="mb-4" onSubmit={handleAddGuide}>
            <div className="row g-2">
              <div className="col-md-3"><input type="text" className="form-control" placeholder="Name" value={newGuide.name} onChange={e => setNewGuide({ ...newGuide, name: e.target.value })} required /></div>
              <div className="col-md-3"><input type="email" className="form-control" placeholder="Email" value={newGuide.email} onChange={e => setNewGuide({ ...newGuide, email: e.target.value })} required /></div>
              <div className="col-md-2"><input type="password" className="form-control" placeholder="Password" value={newGuide.password} onChange={e => setNewGuide({ ...newGuide, password: e.target.value })} required /></div>
              <div className="col-md-2"><input type="text" className="form-control" placeholder="Photo URL" value={newGuide.photo} onChange={e => setNewGuide({ ...newGuide, photo: e.target.value })} /></div>
              <div className="col-md-2"><input type="text" className="form-control" placeholder="Bio" value={newGuide.bio} onChange={e => setNewGuide({ ...newGuide, bio: e.target.value })} /></div>
            </div>
            <button type="submit" className="btn btn-success mt-2">Add Guide</button>
          </form>
        )}
        <div className="row">
          {Array.isArray(guides) && guides.map((guide) => (
            <div key={guide.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <Image
                  src={guide.photo && guide.photo.startsWith('http') ? guide.photo : (guide.photo || '/default-guide.jpg')}
                  alt={guide.name}
                  width={400}
                  height={200}
                  style={{ objectFit: 'cover', height: '200px', width: '100%' }}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{guide.name}</h5>
                  <p className="card-text">{guide.bio?.substring(0, 100)}...</p>
                  <a
                    href={session ? `/guides/${guide.id}` : '#'}
                    className="btn btn-primary"
                    onClick={e => {
                      if (!session) {
                        e.preventDefault();
                        signIn();
                      }
                    }}
                  >
                    View Profile
                  </a>
                  {isAdmin && (
                    <button className="btn btn-danger ms-2" onClick={() => handleRemoveGuide(guide.id)}>
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}