'use client'

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function FAQPage() {
  const [openQuestion, setOpenQuestion] = useState(null);

  // Handle clicks outside of FAQ items
  useEffect(() => {
    const handleClickOutside = (event) => {
      const accordionItems = document.querySelectorAll('.accordion-item');
      let clickedOutside = true;
      
      accordionItems.forEach(item => {
        if (item.contains(event.target)) {
          clickedOutside = false;
        }
      });

      if (clickedOutside) {
        setOpenQuestion(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleQuestion = (questionId) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  const faqItems = [
    {
      id: 'faq1',
      question: 'Is it compulsory to have a tourist guide to visit Bhutan?',
      answer: (
        <>
          <p><strong>International tourists (non-SAARC countries):</strong> Yes, a licensed tour operator and guide are required.</p>
          <p><strong>SAARC nationals (India, Bangladesh, Maldives):</strong> No, but a guide is required for restricted areas. It's recommended to hire one for cultural and logistical support.</p>
        </>
      )
    },
    {
      id: 'faq2',
      question: 'What is the Sustainable Development Fee (SDF)?',
      answer: (
        <ul className="list-unstyled">
          <li><strong>International tourists:</strong> USD $100 per person per night.</li>
          <li><strong>SAARC nationals:</strong> INR 1,200 (≈ USD $15) per person per night.</li>
          <li><strong>Discounts:</strong> Children under 6 are exempt; those aged 6–12 get 50% off.</li>
        </ul>
      )
    },
    {
      id: 'faq3',
      question: 'Do I need a visa to enter Bhutan?',
      answer: (
        <>
          <p>Yes for most countries. Apply via a Bhutanese tour operator.</p>
          <p>No for Indians, Bangladeshis, and Maldivians (valid passport or voter ID required).</p>
        </>
      )
    },
    {
      id: 'faq4',
      question: 'When is the best time to visit Bhutan?',
      answer: (
        <p>Spring (March–May) and Autumn (September–November) for clear skies, colorful festivals, and trekking.</p>
      )
    },
    {
      id: 'faq5',
      question: 'Can I travel independently in Bhutan?',
      answer: (
        <>
          <p><strong>SAARC nationals:</strong> Yes.</p>
          <p><strong>Others:</strong> No, you must follow a pre-booked itinerary via a tour operator.</p>
        </>
      )
    },
    {
      id: 'faq6',
      question: 'What currency is used in Bhutan?',
      answer: (
        <ul className="list-unstyled">
          <li>Bhutanese Ngultrum (BTN) is the official currency.</li>
          <li>Indian Rupees (INR) are accepted almost everywhere.</li>
          <li>Credit/debit cards work in major hotels; carry cash for rural areas.</li>
        </ul>
      )
    },
    {
      id: 'faq7',
      question: 'Is Bhutan safe for tourists?',
      answer: (
        <ul className="list-unstyled">
          <li>Yes, Bhutan is among the safest countries in the world.</li>
          <li>Petty crime is rare, but travel insurance is advised.</li>
        </ul>
      )
    },
    {
      id: 'faq8',
      question: 'How do I get to Bhutan?',
      answer: (
        <>
          <p><strong>By air:</strong> Paro International Airport (via Druk Air or Bhutan Airlines).</p>
          <p><strong>By land:</strong> Entry from India at Phuentsholing, Gelephu, or Samdrup Jongkhar.</p>
        </>
      )
    },
    {
      id: 'faq9',
      question: 'Do I need vaccinations or health precautions?',
      answer: (
        <ul className="list-unstyled">
          <li>No mandatory vaccines.</li>
          <li>Altitude sickness may be a concern in higher regions.</li>
          <li>Ensure you're up-to-date on routine vaccinations.</li>
        </ul>
      )
    },
    {
      id: 'faq10',
      question: 'Is internet access available?',
      answer: (
        <ul className="list-unstyled">
          <li>Yes. Most hotels, cafes, and even remote areas offer Wi-Fi.</li>
          <li>Local SIM cards are available with mobile data plans.</li>
        </ul>
      )
    }
  ];

  return (
    <main>
      <Navbar />

      {/* FAQ Hero Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h1 className="text-center mb-2">Frequently Asked Questions</h1>
          <p className="text-center text-muted mb-5">Everything you need to know about traveling to Bhutan</p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="accordion">
              {faqItems.map((item) => (
                <div key={item.id} className="accordion-item">
                  <h2 className="accordion-header">
                    <button 
                      className={`accordion-button ${openQuestion !== item.id ? 'collapsed' : ''}`}
                      type="button"
                      onClick={() => toggleQuestion(item.id)}
                    >
                      {item.question}
                    </button>
                  </h2>
                  <div 
                    className={`accordion-collapse ${openQuestion === item.id ? 'show' : ''}`}
                    style={{
                      height: openQuestion === item.id ? 'auto' : '0',
                      overflow: 'hidden',
                      transition: 'height 0.3s ease-out'
                    }}
                  >
                    <div className="accordion-body">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 