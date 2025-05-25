'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { weatherData } from '@/utils/helpers'

const destinations = [
  {
    id: 'paro',
    name: 'Paro',
    image: '/taktshang.jpg',
    description: 'Home to the iconic Tiger\'s Nest Monastery, Paro is a valley rich in history and culture.',
    highlights: [
      { icon: 'landmark', text: 'Tiger\'s Nest Monastery' },
      { icon: 'museum', text: 'National Museum' },
      { icon: 'fort-awesome', text: 'Rinpung Dzong' }
    ],
    category: ['cultural', 'spiritual'],
    bestTime: 'March to May, September to November',
    altitude: '2,200m'
  },
  {
    id: 'thimphu',
    name: 'Thimphu',
    image: '/buddha-point.jpg',
    description: 'The capital city blends traditional Bhutanese culture with modern development.',
    highlights: [
      { icon: 'buddha', text: 'Buddha Dordenma' },
      { icon: 'landmark', text: 'Tashichho Dzong' },
      { icon: 'history', text: 'Folk Heritage Museum' }
    ],
    category: ['cultural', 'urban'],
    bestTime: 'Year-round',
    altitude: '2,334m'
  },
  {
    id: 'punakha',
    name: 'Punakha',
    image: '/punakha.jpg',
    description: 'Former capital featuring the majestic Punakha Dzong at the confluence of two rivers.',
    highlights: [
      { icon: 'landmark', text: 'Punakha Dzong' },
      { icon: 'bridge', text: 'Suspension Bridge' },
      { icon: 'pray', text: 'Chimi Lhakhang' }
    ],
    category: ['cultural', 'nature'],
    bestTime: 'March to May',
    altitude: '1,200m'
  },
  {
    id: 'phobjikha',
    name: 'Phobjikha Valley',
    image: '/phobjikha.jpg',
    description: 'A beautiful U-shaped glacial valley, winter home to black-necked cranes.',
    highlights: [
      { icon: 'feather-alt', text: 'Black-Necked Crane Center' },
      { icon: 'landmark', text: 'Gangtey Monastery' },
      { icon: 'mountain', text: 'Nature Trails' }
    ],
    category: ['nature', 'wildlife'],
    bestTime: 'October to February (for crane viewing)',
    altitude: '3,000m'
  },
  {
    id: 'haa',
    name: 'Haa Valley',
    image: '/haa.jpg',
    description: 'One of Bhutan\'s most picturesque and least visited valleys.',
    highlights: [
      { icon: 'landmark', text: 'Lhakhang Karpo' },
      { icon: 'landmark', text: 'Lhakhang Nagpo' },
      { icon: 'landmark', text: 'Haa Dzong' },
      { icon: 'hiking', text: 'Hiking Trails' }
    ],
    category: ['adventure', 'nature'],
    bestTime: 'July to September',
    altitude: '2,670m'
  }
];

export default function DestinationsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleScroll = (e) => {
    e.preventDefault();
    const destinationsSection = document.getElementById('destinations');
    if (destinationsSection) {
      destinationsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredDestinations = activeFilter === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.category.includes(activeFilter));

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <header className="destination-hero">
        <Image
          src="/destinations.webp"
          alt="Bhutan Destinations"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div className="hero-content">
          <h1>Discover Bhutan's<br />Hidden Treasures</h1>
          <p>From ancient monasteries to pristine valleys</p>
          <button 
            onClick={handleScroll}
            className="btn btn-primary btn-lg"
            aria-label="Explore destinations"
          >
            Explore Destinations <i className="fas fa-chevron-down ms-2"></i>
          </button>
        </div>
      </header>

      {/* Destinations Section */}
      <section id="destinations" className="container my-5">
        {/* Filter Buttons */}
        <div className="text-center mb-4">
          <div className="btn-group" role="group">
            <button 
              className={`btn ${activeFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`btn ${activeFilter === 'cultural' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveFilter('cultural')}
            >
              Cultural
            </button>
            <button 
              className={`btn ${activeFilter === 'nature' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveFilter('nature')}
            >
              Nature
            </button>
            <button 
              className={`btn ${activeFilter === 'spiritual' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveFilter('spiritual')}
            >
              Spiritual
            </button>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="row g-4">
          {filteredDestinations.map((destination) => (
            <div key={destination.id} className="col-md-6" id={destination.id}>
              <div className="destination-card card h-100 border-0 shadow-sm">
                <div className="position-relative" style={{ height: '300px' }}>
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body">
                  <h3 className="card-title">
                    {destination.name} <i className={`fas fa-mountain text-primary`}></i>
                  </h3>
                  <div className="mb-3">
                    <h5 className="text-primary">Highlights:</h5>
                    <ul className="list-unstyled">
                      {destination.highlights.map((highlight, index) => (
                        <li key={index}>
                          <i className={`fas fa-${highlight.icon} me-2`}></i>
                          {highlight.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="card-text">{destination.description}</p>
                  <a 
                    href={`https://www.tourism.gov.bt/attraction/${destination.id}`} 
                    className="btn btn-primary w-100"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More <i className="fas fa-external-link-alt ms-1"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
} 