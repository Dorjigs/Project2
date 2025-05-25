'use client'

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { weatherData, convertCurrency } from "@/utils/helpers";

export default function TravelTipsPage() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BTN');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'BTN', 'AUD', 'CAD'];

  const handleConvert = (e) => {
    e.preventDefault();
    const result = convertCurrency(parseFloat(amount), fromCurrency, toCurrency);
    setConvertedAmount(result);
  };

  return (
    <main>
      <Navbar />
      
      {/* Tips Section */}
      <section className="tips-section py-5 mt-5">
        <div className="container">
          <h1 className="text-center mb-5">Essential Travel Tips for Bhutan</h1>
          <div className="row g-4">
            {/* Tip 1 */}
            <div className="col-md-6 col-lg-4">
              <div className="tip-card card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="tip-icon mb-3">
                    <i className="fas fa-building text-primary fa-2x"></i>
                  </div>
                  <h3 className="card-title h5">Licensed Tour Operator</h3>
                  <p className="card-text">Required for most tourists; includes guide, transport, and accommodation.</p>
                </div>
              </div>
            </div>

            {/* Tip 2 */}
            <div className="col-md-6 col-lg-4">
              <div className="tip-card card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="tip-icon mb-3">
                    <i className="fas fa-passport text-primary fa-2x"></i>
                  </div>
                  <h3 className="card-title h5">Visa & SDF</h3>
                  <p className="card-text">Get your visa in advance and pay the Sustainable Development Fee (USD 100/day).</p>
                </div>
              </div>
            </div>

            {/* Tip 3 */}
            <div className="col-md-6 col-lg-4">
              <div className="tip-card card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="tip-icon mb-3">
                    <i className="fas fa-praying-hands text-primary fa-2x"></i>
                  </div>
                  <h3 className="card-title h5">Respect Local Customs</h3>
                  <p className="card-text">Cover shoulders and legs, remove shoes before entering temples.</p>
                </div>
              </div>
            </div>

            {/* Tip 4 */}
            <div className="col-md-6 col-lg-4">
              <div className="tip-card card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="tip-icon mb-3">
                    <i className="fas fa-user-friends text-primary fa-2x"></i>
                  </div>
                  <h3 className="card-title h5">Travel with a Guide</h3>
                  <p className="card-text">Foreign tourists must be accompanied by a licensed guide during the trip.</p>
                </div>
              </div>
            </div>

            {/* Tip 5 */}
            <div className="col-md-6 col-lg-4">
              <div className="tip-card card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="tip-icon mb-3">
                    <i className="fas fa-cloud-sun text-primary fa-2x"></i>
                  </div>
                  <h3 className="card-title h5">Pack for Varied Weather</h3>
                  <p className="card-text">Bring layers and warm clothes, especially for higher altitudes.</p>
                </div>
              </div>
            </div>

            {/* Tip 6 */}
            <div className="col-md-6 col-lg-4">
              <div className="tip-card card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="tip-icon mb-3">
                    <i className="fas fa-mountain text-primary fa-2x"></i>
                  </div>
                  <h3 className="card-title h5">Altitude Awareness</h3>
                  <p className="card-text">Take it slow, stay hydrated, and rest well to adjust to the elevation.</p>
                </div>
              </div>
            </div>

            {/* Tip 7 */}
            <div className="col-md-6 col-lg-4">
              <div className="tip-card card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="tip-icon mb-3">
                    <i className="fas fa-hand-holding-usd text-primary fa-2x"></i>
                  </div>
                  <h3 className="card-title h5">No Bargaining Culture</h3>
                  <p className="card-text">Bhutan doesn't follow aggressive bargaining or tipping culture.</p>
                </div>
              </div>
            </div>

            {/* Tip 8 */}
            <div className="col-md-6 col-lg-4">
              <div className="tip-card card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="tip-icon mb-3">
                    <i className="fas fa-camera text-primary fa-2x"></i>
                  </div>
                  <h3 className="card-title h5">Ask Before Photos</h3>
                  <p className="card-text">Always ask permission before taking photos of people or religious sites.</p>
                </div>
              </div>
            </div>

            {/* Tip 9 */}
            <div className="col-md-6 col-lg-4">
              <div className="tip-card card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="tip-icon mb-3">
                    <i className="fas fa-leaf text-primary fa-2x"></i>
                  </div>
                  <h3 className="card-title h5">Be Eco-Friendly</h3>
                  <p className="card-text">Use refillable water bottles and avoid littering — Bhutan is proudly eco-friendly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weather and Currency Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            {/* Weather Widget */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h2 className="card-title h4 mb-4">Current Weather</h2>
                  <div className="row g-3">
                    {Object.entries(weatherData).map(([city, data]) => (
                      <div key={city} className="col-sm-6 col-md-4">
                        <div className="weather-widget p-3 bg-light rounded text-center">
                          <h3 className="h6 text-capitalize mb-2">{city}</h3>
                          <i className={`fas ${data.icon} fa-2x text-primary mb-2`}></i>
                          <div className="fw-bold">{data.temp}</div>
                          <small>{data.condition}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Currency Guide */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h2 className="card-title h4 mb-4">Currency Guide</h2>
                  <div className="currency-info">
                    <div className="d-flex justify-content-between border-bottom py-2">
                      <span>Bhutanese Currency</span>
                      <span className="fw-bold">Ngultrum (BTN)</span>
                    </div>
                    <div className="d-flex justify-content-between border-bottom py-2">
                      <span>Exchange Rate (approx.)</span>
                      <span className="fw-bold">1 USD = 83 BTN</span>
                    </div>
                    <div className="d-flex justify-content-between border-bottom py-2">
                      <span>Indian Rupee Status</span>
                      <span className="fw-bold">Accepted & Equal to BTN</span>
                    </div>
                    <div className="d-flex justify-content-between py-2">
                      <span>Credit Cards</span>
                      <span className="fw-bold">Limited Acceptance</span>
                    </div>
                  </div>
                  <div className="alert alert-info mt-3">
                    <i className="fas fa-info-circle me-2"></i>
                    Carry sufficient cash as ATMs are limited in rural areas.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 