'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [guides, setGuides] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [guideInput, setGuideInput] = useState({ title: '', description: '' });
  const [blogInput, setBlogInput] = useState({ title: '', content: '' });

  // Fetch guides and blogs
  useEffect(() => {
    fetchGuides();
    fetchBlogs();
  }, []);

  const fetchGuides = async () => {
    const res = await fetch('/api/guides');
    const data = await res.json();
    setGuides(data);
  };

  const fetchBlogs = async () => {
    const res = await fetch('/api/blogs');
    const data = await res.json();
    setBlogs(data);
  };

  const handleAddGuide = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/guides', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(guideInput),
    });
    if (res.ok) {
      setGuideInput({ title: '', description: '' });
      fetchGuides();
    }
  };

  const handleDeleteGuide = async (id) => {
    await fetch(`/api/guides/${id}`, { method: 'DELETE' });
    fetchGuides();
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogInput),
    });
    if (res.ok) {
      setBlogInput({ title: '', content: '' });
      fetchBlogs();
    }
  };

  const handleDeleteBlog = async (id) => {
    await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    fetchBlogs();
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Admin Dashboard</h1>

      {/* Travel Guides */}
      <section className="mb-5">
        <h2>Travel Guides</h2>
        <form onSubmit={handleAddGuide} className="mb-3">
          <input
            type="text"
            placeholder="Guide Title"
            value={guideInput.title}
            onChange={(e) => setGuideInput({ ...guideInput, title: e.target.value })}
            className="form-control mb-2"
            required
          />
          <textarea
            placeholder="Guide Description"
            value={guideInput.description}
            onChange={(e) => setGuideInput({ ...guideInput, description: e.target.value })}
            className="form-control mb-2"
            rows="3"
            required
          />
          <button type="submit" className="btn btn-primary">Add Guide</button>
        </form>
        <ul className="list-group">
          {guides.map((guide) => (
            <li key={guide.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{guide.title}</strong>
                <p className="mb-0">{guide.description}</p>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteGuide(guide.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Blogs */}
      <section>
        <h2>Blogs</h2>
        <form onSubmit={handleAddBlog} className="mb-3">
          <input
            type="text"
            placeholder="Blog Title"
            value={blogInput.title}
            onChange={(e) => setBlogInput({ ...blogInput, title: e.target.value })}
            className="form-control mb-2"
            required
          />
          <textarea
            placeholder="Blog Content"
            value={blogInput.content}
            onChange={(e) => setBlogInput({ ...blogInput, content: e.target.value })}
            className="form-control mb-2"
            rows="3"
            required
          />
          <button type="submit" className="btn btn-primary">Add Blog</button>
        </form>
        <ul className="list-group">
          {blogs.map((blog) => (
            <li key={blog.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{blog.title}</strong>
                <p className="mb-0">{blog.content}</p>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteBlog(blog.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
