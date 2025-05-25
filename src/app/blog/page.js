'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const isAdmin = session?.user?.role === 'admin';

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    image: null
  });

  const [previewImage, setPreviewImage] = useState(null);

  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: '', author: '', content: '', image: null });
  const [editPreviewImage, setEditPreviewImage] = useState(null);

  const [blogs, setBlogs] = useState([]);

  // Fetch blogs from API on mount
  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      router.push('/auth/signin');
      return;
    }
    // Upload blog to API
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
        image: previewImage || '/placeholder.jpg',
      }),
    });
    if (res.ok) {
      const newBlog = await res.json();
      setBlogs(prev => [newBlog, ...prev]);
      setFormData({ title: '', author: '', content: '', image: null });
      setPreviewImage(null);
      e.target.reset();
    }
  };

  const handleEditClick = (blog) => {
    setEditingBlogId(blog.id);
    setEditFormData({
      title: blog.title,
      author: blog.author,
      content: blog.content,
      image: blog.image
    });
    setEditPreviewImage(blog.image);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFormData(prev => ({ ...prev, image: file }));
      setEditPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleEditSave = async (id) => {
    // Send PUT request to API
    const res = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editFormData.title,
        content: editFormData.content,
        image: editPreviewImage || editFormData.image,
      }),
    });
    if (res.ok) {
      const updated = await res.json();
      setBlogs(blogs.map(blog => blog.id === id ? { ...blog, ...updated } : blog));
      setEditingBlogId(null);
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  const handleEditCancel = () => {
    setEditingBlogId(null);
  };

  return (
    <main>
      <Navbar />

      {/* Blog Hero Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h1 className="text-center mb-2">Travel Blog</h1>
          <p className="text-center text-muted mb-5">Share your Bhutan travel experiences</p>
        </div>
      </section>

      <div className="container py-5">
        {/* Show blog writing form only for non-admin users */}
        {!isAdmin && (
          <div className="row">
            <div className="col-lg-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h3 className="card-title mb-4">Share Your Story</h3>
                  {session ? (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">Blog Title</label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="author" className="form-label">Your Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="author"
                          name="author"
                          value={formData.author}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="content" className="form-label">Your Story</label>
                        <textarea
                          className="form-control"
                          id="content"
                          name="content"
                          rows="6"
                          value={formData.content}
                          onChange={handleInputChange}
                          required
                        ></textarea>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="image" className="form-label">Upload Image</label>
                        <input
                          type="file"
                          className="form-control"
                          id="image"
                          name="image"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>

                      {previewImage && (
                        <div className="mb-3">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="img-fluid rounded"
                            style={{ maxHeight: '200px' }}
                          />
                        </div>
                      )}

                      <button type="submit" className="btn btn-primary w-100">
                        Publish Blog
                      </button>
                    </form>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Show edit/delete options only for admin */}
        {isAdmin && (
          <div className="admin-controls">
            <h2>Blog Management</h2>
            {blogs.map((blog) => (
              <div key={blog.id} className="blog-item">
                <h3>{blog.title}</h3>
                <button onClick={() => handleEditClick(blog)}>Edit</button>
                <button onClick={() => handleDelete(blog.id)}>Delete</button>
              </div>
            ))}
          </div>
        )}

        {/* Blog List */}
        <div className="row g-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="col-12">
              <div className="card shadow-sm h-100">
                <div className="row g-0">
                  <div className="col-md-4">
                    <div className="position-relative h-100" style={{ minHeight: '200px' }}>
                      <Image
                        src={
                          editingBlogId === blog.id
                            ? (
                                editPreviewImage ||
                                (typeof blog.image === 'string' && blog.image.trim().startsWith('/')
                                  ? blog.image
                                  : '/placeholder.jpg')
                              )
                            : (
                                typeof blog.image === 'string' && blog.image.trim().startsWith('/')
                                  ? blog.image
                                  : '/placeholder.jpg'
                              )
                        }
                        alt={blog.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-start"
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      {session && session.user.role === 'admin' && editingBlogId === blog.id ? (
                        <form onSubmit={e => { e.preventDefault(); handleEditSave(blog.id); }}>
                          <div className="mb-2">
                            <input type="text" className="form-control mb-2" name="title" value={editFormData.title} onChange={handleEditInputChange} required />
                            <input type="text" className="form-control mb-2" name="author" value={editFormData.author} onChange={handleEditInputChange} required />
                            <textarea className="form-control mb-2" name="content" rows="4" value={editFormData.content} onChange={handleEditInputChange} required />
                            <input type="file" className="form-control mb-2" accept="image/*" onChange={handleEditImageChange} />
                            {editPreviewImage && <img src={editPreviewImage} alt="Preview" className="img-fluid rounded mb-2" style={{ maxHeight: '120px' }} />}
                          </div>
                          <button type="submit" className="btn btn-success btn-sm me-2">Save</button>
                          <button type="button" className="btn btn-secondary btn-sm" onClick={handleEditCancel}>Cancel</button>
                        </form>
                      ) : (
                        <>
                          <h5 className="card-title">{blog.title}</h5>
                          <p className="card-text text-muted small">
                            By {blog.author?.name || blog.author?.email || 'Unknown'} | {new Date(blog.createdAt || blog.date).toLocaleDateString()}
                          </p>
                          <p className="card-text">
                            {blog.content.length > 200
                              ? `${blog.content.substring(0, 200)}...`
                              : blog.content}
                          </p>
                          <button className="btn btn-link text-primary p-0">
                            Read More
                          </button>
                          {session && session.user.role === 'admin' && (
                            <div className="mt-2">
                              <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditClick(blog)}>Edit</button>
                              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(blog.id)}>Delete</button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
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