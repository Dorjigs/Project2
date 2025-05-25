'use client'

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <Image
          src="/homepagebg.jpg"
          alt="Punakha Dzong"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div className="hero-content">
          <h1>Discover Bhutan's<br />Hidden Treasures</h1>
          <p>From ancient monasteries to pristine valleys</p>
          <div className="hero-buttons">
            <Link 
              href="/destinations" 
              className="btn btn-primary btn-lg"
            >
              Explore Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section id="welcome" className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="welcome-image">
            <Image
                src="/tigers-nest.jpg"
                alt="Tiger's Nest Monastery"
                width={600}
                height={400}
                className="rounded shadow"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <h2 className="section-title">Welcome to Bhutan</h2>
            <p className="lead mb-4">
              Experience the last Shangri-La, where ancient traditions blend seamlessly with modern progress.
            </p>
            <p className="mb-4">
              Bhutan, the Land of the Thunder Dragon, is a kingdom where happiness is measured in GNH (Gross National Happiness) rather than GDP. Nestled in the Eastern Himalayas, this Buddhist kingdom has preserved its rich cultural heritage while embracing sustainable development.
            </p>
            <div className="row g-4">
              <div className="col-sm-6">
                <div className="d-flex align-items-center">
                  <i className="fas fa-landmark text-primary fa-2x me-3"></i>
                  <div>
                    <h5 className="mb-1">Rich Culture</h5>
                    <p className="mb-0">Ancient traditions & festivals</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex align-items-center">
                  <i className="fas fa-mountain text-primary fa-2x me-3"></i>
                  <div>
                    <h5 className="mb-1">Natural Beauty</h5>
                    <p className="mb-0">Pristine landscapes</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex align-items-center">
                  <i className="fas fa-pray text-primary fa-2x me-3"></i>
                  <div>
                    <h5 className="mb-1">Spirituality</h5>
                    <p className="mb-0">Buddhist heritage</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex align-items-center">
                  <i className="fas fa-heart text-primary fa-2x me-3"></i>
                  <div>
                    <h5 className="mb-1">Happiness</h5>
                    <p className="mb-0">GNH philosophy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Featured Destinations</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="position-relative" style={{ height: '250px' }}>
                  <Image
                    src="/taktshang.jpg"
                    alt="Paro Taktsang"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body text-center">
                  <h3 className="h4 mb-4">Paro</h3>
                  <Link href="/destinations#paro" className="btn btn-primary">
                    Explore Paro
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="position-relative" style={{ height: '250px' }}>
                  <Image
                    src="/buddha-point.jpg"
                    alt="Buddha Dordenma"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body text-center">
                  <h3 className="h4 mb-4">Thimphu</h3>
                  <Link href="/destinations#thimphu" className="btn btn-primary">
                    Explore Thimphu
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="position-relative" style={{ height: '250px' }}>
          <Image
                    src="/punakha.jpg"
                    alt="Punakha Dzong"
                    fill
                    style={{ objectFit: 'cover' }}
          />
                </div>
                <div className="card-body text-center">
                  <h3 className="h4 mb-4">Punakha</h3>
                  <Link href="/destinations#punakha" className="btn btn-primary">
                    Explore Punakha
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <Link href="/destinations" className="btn btn-primary">
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Culture & Festivals */}
      <section className="container my-5">
        <div className="row align-items-center">
          <div className="col-lg-6 order-lg-2">
            <h2 className="section-title">Culture & Festivals</h2>
            <p>Bhutan's rich cultural heritage is evident in its architecture, festivals, arts, and daily life. Experience the vibrant Tshechu festivals featuring colorful mask dances, visit ancient monasteries, and witness traditional arts and crafts.</p>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <span className="badge bg-secondary">Tshechu Festivals</span>
              <span className="badge bg-secondary">Buddhism</span>
              <span className="badge bg-secondary">Traditional Arts</span>
              <span className="badge bg-secondary">Architecture</span>
              <span className="badge bg-secondary">Local Customs</span>
            </div>
            <Link href="/culture" className="btn btn-outline-primary">
              EXPLORE BHUTANESE CULTURE
            </Link>
          </div>
          <div className="col-lg-6 order-lg-1">
            <div className="position-relative" style={{ height: '400px' }}>
          <Image
                src="/taktshang.jpg"
                alt="Bhutanese Culture"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Adventure Section */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Adventure Awaits</h2>
          <div className="row g-4">
            <div className="col-md-3 col-6">
              <div className="adventure-card text-center">
                <div className="adventure-icon mb-3">
                  <i className="fas fa-hiking fa-3x"></i>
                </div>
                <h5>Trekking</h5>
                <p className="small">From the challenging Snowman Trek to easier day hikes</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="adventure-card text-center">
                <div className="adventure-icon mb-3">
                  <i className="fas fa-mountain fa-3x"></i>
                </div>
                <h5>Mountain Biking</h5>
                <p className="small">Ride through scenic valleys and mountain trails</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="adventure-card text-center">
                <div className="adventure-icon mb-3">
                  <i className="fas fa-water fa-3x"></i>
                </div>
                <h5>River Rafting</h5>
                <p className="small">Navigate the rapids of Bhutan's pristine rivers</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="adventure-card text-center">
                <div className="adventure-icon mb-3">
                  <i className="fas fa-camera fa-3x"></i>
                </div>
                <h5>Photography</h5>
                <p className="small">Capture breathtaking landscapes and cultural moments</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link href="/adventure" className="btn btn-primary">
              EXPLORE ADVENTURES
            </Link>
          </div>
        </div>
      </section>

      {/* Travel Tips Section */}
      <section className="container my-5">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card border-0 shadow h-100">
              <div className="card-body">
                <h2 className="section-title">Essential Travel Tips</h2>
                <p>Planning a trip to Bhutan requires knowledge of its unique travel policies and requirements.</p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item ps-0">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    All tourists must obtain a visa and book through licensed tour operators
                  </li>
                  <li className="list-group-item ps-0">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    Daily tourist tariff covers accommodations, meals, guide, and internal transport
                  </li>
                  <li className="list-group-item ps-0">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    Best seasons to visit: Spring (Mar-May) and Autumn (Sep-Nov)
                  </li>
                  <li className="list-group-item ps-0">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    Pack for varying climates and altitudes
                  </li>
                </ul>
                <Link href="/travel-tips" className="btn btn-outline-primary mt-3">
                  View All Travel Tips
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="position-relative" style={{ height: '100%', minHeight: '400px' }}>
          <Image
                src="/punakha.jpg"
                alt="Travel Tips"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="section-title text-center">Start Your Journey</h2>
          <p className="lead mb-4">
            Ready to experience the magic of Bhutan? Let us help you plan your trip.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg">
            Contact Us
          </Link>
    </div>
      </section>

      <Footer />
    </main>
  );
}
