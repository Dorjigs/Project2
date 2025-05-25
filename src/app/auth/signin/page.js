'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function SignInContent() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const isAdminLogin = searchParams.get('admin') === '1';
  const adminEmail = '02230124.cst@rub.edu.bt';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push(email === adminEmail ? '/admin-dashboard' : '/blog');
      }
    } else {
      const name = formData.get('name');

      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Error registering user');

        const signInResult = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (signInResult?.error) {
          setError(signInResult.error);
        } else {
          router.push(email === adminEmail ? '/admin-dashboard' : '/blog');
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <main>
      <Navbar />

      <div className="container py-5 my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">
                  {isLogin ? (isAdminLogin ? 'Admin Sign In' : 'Sign In') : 'Create Account'}
                </h2>

                {isAdminLogin && (
                  <div className="alert alert-info text-center">
                    Admin Login: Please use your admin credentials.
                  </div>
                )}

                <p className="text-center text-muted mb-4">
                  {isLogin
                    ? isAdminLogin
                      ? 'Sign in as admin to access the dashboard'
                      : 'Sign in to write blog posts and share your experiences'
                    : 'Create an account to share your Bhutan experiences'}
                </p>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} autoComplete="off">
                  {!isLogin && (
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        required
                      />
                    </div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      required
                      defaultValue={isAdminLogin ? adminEmail : ''}
                      readOnly={isAdminLogin}
                    />
                  </div>

                  <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        id="password"
                        name="password"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword((v) => !v)}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="mb-3 position-relative">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <div className="input-group">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          className="form-control"
                          id="confirmPassword"
                          name="confirmPassword"
                          required
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowConfirmPassword((v) => !v)}
                        >
                          {showConfirmPassword ? 'Hide' : 'Show'}
                        </button>
                      </div>
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary w-100 mb-3">
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </button>

                  <p className="text-center mb-0">
                    {isLogin ? (
                      <>
                        Don't have an account?{' '}
                        <button
                          type="button"
                          className="btn btn-link p-0"
                          onClick={() => setIsLogin(false)}
                        >
                          Create one
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{' '}
                        <button
                          type="button"
                          className="btn btn-link p-0"
                          onClick={() => setIsLogin(true)}
                        >
                          Sign in
                        </button>
                      </>
                    )}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
