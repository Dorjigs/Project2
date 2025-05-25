'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useSession, signOut, signIn } from 'next-auth/react';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-brand-container">
          <Link href="/" className="navbar-brand text-white" style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src="/logo.png"
              alt="Bhutan Travel Logo"
              width={40}
              height={40}
              priority
            />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '12px' }}>
              <span style={{ fontWeight: 700, fontSize: '1.3rem', color: 'black', lineHeight: 1 }}>Druk Discoveries</span>
              <span style={{ fontWeight: 600, fontSize: '1.1rem', color: 'black', lineHeight: 1 }}>Discover Bhutan</span>
            </div>
          </Link>
        </div>

        <button 
          className="navbar-toggler d-lg-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        <div className={`navbar-nav-container ${isMenuOpen ? 'show' : ''}`}>
          <ul className="nav">
            <li className="nav-item">
              <Link 
                href="/" 
                className={`nav-link ${pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                href="/destinations" 
                className={`nav-link ${pathname === '/destinations' ? 'active' : ''}`}
              >
                Destinations
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                href="/adventure" 
                className={`nav-link ${pathname === '/adventure' ? 'active' : ''}`}
              >
                Adventures
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                href="/travel-tips" 
                className={`nav-link ${pathname === '/travel-tips' ? 'active' : ''}`}
              >
                Travel-Tips
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                href="/expenses-guide" 
                className={`nav-link ${pathname === '/expenses-guide' ? 'active' : ''}`}
              >
                Expenses-Guide
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/guides" className="nav-link">
                Our Guides
              </Link>
            </li>
            {session ? (
              <>
                {session.user.role === 'admin' && (
                  <li className="nav-item">
                    <Link href="/admin" className="nav-link">
                      Admin
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button onClick={() => signOut()} className="nav-link btn btn-link">
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button onClick={() => signIn()} className="nav-link btn btn-link">
                  Sign In
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}