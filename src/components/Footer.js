"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {/* Newsletter Section */}
      <section className="newsletter-section py-5">
        <div className="container text-center">
          <h2 className="text-white mb-3">Stay Updated</h2>
          <p className="text-white mb-4">
            Subscribe to our newsletter for travel tips, seasonal updates, and exclusive offers.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link href="/subscribe" className="btn btn-light btn-lg">
              Subscribe
            </Link>
            <Link href="/auth/signin" className="btn btn-primary btn-lg">
              Sign In as User
            </Link>
            <Link href="/auth/signin?admin=1" className="btn btn-dark btn-lg">
              Sign In as Admin
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            {/* Discover Bhutan */}
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <h3>Discover Bhutan</h3>
              <p className="mb-4">Your comprehensive guide to the Land of the Thunder Dragon.</p>
              <div className="footer-social-links">
                <a href="https://facebook.com" className="footer-social-link" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://instagram.com" className="footer-social-link" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://twitter.com" className="footer-social-link" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://youtube.com" className="footer-social-link" aria-label="YouTube">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>

            {/* Explore */}
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <h3>Explore</h3>
              <ul className="list-unstyled">
                <li><Link href="/destinations" className="footer-link">Destinations</Link></li>
                <li><Link href="/culture" className="footer-link">Culture</Link></li>
                <li><Link href="/adventure" className="footer-link">Adventures</Link></li>
              </ul>
            </div>

            {/* Travel Resources */}
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <h3>Travel Resources</h3>
              <ul className="list-unstyled">
                <li><Link href="/travel-tips" className="footer-link">Travel Tips</Link></li>
                <li><Link href="/expenses-guide" className="footer-link">Expense Guide</Link></li>
                <li><Link href="/faqs" className="footer-link">FAQs</Link></li>
                <li><Link href="/blog" className="footer-link">Blog</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-lg-3 col-md-6">
              <h3>Contact</h3>
              <ul className="list-unstyled">
                <li className="footer-contact-item">
                  <i className="fas fa-envelope footer-contact-icon"></i>
                  <span>02230124.cst@rub.edu.bt</span>
                </li>
                <li className="footer-contact-item">
                  <i className="fas fa-phone footer-contact-icon"></i>
                  <span>+975 77830773</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="row align-items-center">
              <div className="col-md-6">
                <p className="mb-md-0">© 2025 Discover Bhutan. All rights reserved.</p>
              </div>
              <div className="col-md-6 text-md-end">
                <button className="btn btn-link text-white p-0" style={{ textDecoration: 'underline' }} onClick={() => setShowModal(true)}>
                  Terms & Privacy
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Modal for Terms & Privacy */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Terms & Privacy Policy</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <h6>Terms of Service</h6>
                <ul>
                  <li>This website is for informational and travel planning purposes related to Bhutan only.</li>
                  <li>Users must register and sign in to post blogs or view guide profiles.</li>
                  <li>Admins reserve the right to edit or remove any content deemed inappropriate or inaccurate.</li>
                  <li>All content submitted must be respectful, original, and not infringe on copyrights.</li>
                  <li>We may update these terms at any time. Continued use of the site means you accept the latest terms.</li>
                </ul>
                <h6 className="mt-4">Privacy Policy</h6>
                <ul>
                  <li>We collect your name, email, and password for account creation and authentication only.</li>
                  <li>Your information is never sold or shared with third parties except as required by law.</li>
                  <li>Blog posts and guide profiles are public to signed-in users, but your password is always private.</li>
                  <li>We use cookies for authentication and session management only.</li>
                  <li>You may request deletion of your account and data at any time by contacting the admin.</li>
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 