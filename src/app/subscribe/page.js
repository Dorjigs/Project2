'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import BudgetCalculator from '@/components/BudgetCalculator'
import { validateForm, showAlert } from '@/utils/helpers'

export default function SubscribePage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('subscribe');

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (validateForm(e.target)) {
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      interests: formData.get('interests'),
      wantsNews: formData.get('newsletter') === 'on',
    };

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        setFormSubmitted(true);
        showAlert(result.message, 'success');
      } else {
        showAlert(result.message || 'Subscription failed', 'error');
      }
    } catch (error) {
      showAlert('Something went wrong. Try again.', 'error');
    }
  }
};


  const handleContactSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm(e.target)) {
      showAlert('Thank you for your message! We will get back to you soon.', 'success');
      e.target.reset();
    }
  };

  return (
    <main>
      <Navbar />

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            {/* Tabs Navigation */}
            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'subscribe' ? 'active' : ''}`}
                  onClick={() => setActiveTab('subscribe')}
                >
                  Subscribe
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                  onClick={() => setActiveTab('contact')}
                >
                  Contact Us
                </button>
              </li>
            </ul>

            {/* Subscribe Form */}
            {activeTab === 'subscribe' && !formSubmitted && (
              <>
                <h1 className="mb-4">Subscribe to Our Newsletter</h1>
                <p className="mb-4">
                  Stay updated with the latest travel tips, destinations, and special offers.
                </p>

                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter your name
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email address
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="interests" className="form-label">Travel Interests</label>
                    <select className="form-select" id="interests" name="interests">
                      <option value="">Choose your main interest</option>
                      <option value="culture">Culture & Heritage</option>
                      <option value="adventure">Adventure & Trekking</option>
                      <option value="nature">Nature & Wildlife</option>
                      <option value="spiritual">Spiritual & Wellness</option>
                    </select>
                  </div>

                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="newsletter"
                      name="newsletter"
                    />
                    <label className="form-check-label" htmlFor="newsletter">
                      I want to receive travel updates and special offers
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Subscribe Now
                  </button>
                </form>
              </>
            )}

            {/* Success Message */}
            {activeTab === 'subscribe' && formSubmitted && (
              <div className="text-center">
                <h2 className="mb-4">Thank You for Subscribing!</h2>
                <p className="mb-4">
                  We've received your subscription. You'll start receiving our newsletter
                  with the latest travel updates and special offers.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="btn btn-outline-primary"
                >
                  Subscribe Another Email
                </button>
              </div>
            )}

            {/* Contact Form */}
            {activeTab === 'contact' && (
              <>
                <h1 className="mb-4">Contact Us</h1>
                <p className="mb-4">
                  Have questions about traveling to Bhutan? We're here to help!
                </p>

                <form onSubmit={handleContactSubmit} className="needs-validation" noValidate>
                  <div className="mb-3">
                    <label htmlFor="contactName" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="contactName"
                      name="name"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter your name
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="contactEmail" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="contactEmail"
                      name="email"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email address
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <select className="form-select" id="subject" name="subject" required>
                      <option value="">Select a subject</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="package">Tour Package Information</option>
                      <option value="custom">Custom Tour Request</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a subject
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="5"
                      required
                    ></textarea>
                    <div className="invalid-feedback">
                      Please enter your message
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="sticky-top" style={{ top: '2rem' }}>
              <BudgetCalculator />
              
              <div className="card mt-4">
                <div className="card-body">
                  <h3 className="h5 mb-3">Quick Contact</h3>
                  <p className="mb-2">
                    <i className="fas fa-phone me-2"></i>
                    +975 2 123 456
                  </p>
                  <p className="mb-2">
                    <i className="fas fa-envelope me-2"></i>
                    info@bhutantravel.com
                  </p>
                  <p className="mb-0">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    Thimphu, Bhutan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 