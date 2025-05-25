'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  // Scaffold for guides
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user.role !== 'admin' || session.user.email !== '02230124.cst@rub.edu.bt') {
      router.replace('/auth/signin');
    } else {
      // Fetch users, blogs, and guides (scaffold, replace with real API later)
      fetch('/api/admin/users').then(res => res.json()).then(setUsers);
      fetch('/api/admin/blogs').then(res => res.json()).then(setBlogs);
      fetch('/api/admin/guides').then(res => res.json()).then(setGuides);
    }
  }, [session, status, router]);

  if (status === 'loading' || !session || session.user.role !== 'admin' || session.user.email !== '02230124.cst@rub.edu.bt') {
    return <div>Loading or unauthorized...</div>;
  }

  return (
    <main>
      <Navbar />
      <section className="container py-5">
        <h1 className="mb-4">Admin Dashboard</h1>
        <div className="mb-5">
          <h2 className="h4">Users</h2>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-5">
          <h2 className="h4">Blogs</h2>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map(blog => (
                  <tr key={blog.id}>
                    <td>{blog.title}</td>
                    <td>{blog.author?.name || blog.authorId}</td>
                    <td>{new Date(blog.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-5">
          <h2 className="h4">Guides (Scaffold)</h2>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {guides.map(guide => (
                  <tr key={guide.id}>
                    <td>{guide.name}</td>
                    <td>{guide.email}</td>
                    <td>{new Date(guide.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
} 