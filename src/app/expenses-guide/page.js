import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ExpensesGuidePage() {
  return (
    <main>
      <Navbar />
      <section className="container py-5">
        <h1 className="section-title text-center mb-5">Bhutan Travel Expenses Guide</h1>
        <div className="row g-4">
          {/* SDF Section */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow border-0">
              <div className="card-body">
                <h3 className="h5 mb-3"><span role="img" aria-label="receipt">🧾</span> Sustainable Development Fee (SDF)</h3>
                <ul className="list-unstyled mb-2">
                  <li><strong>International tourists:</strong> <span className="text-primary">USD $100</span> <small>/person/night (2023)</small></li>
                  <li><strong>SAARC nationals:</strong> <span className="text-primary">INR 1,200</span> (~USD $15) <small>/night</small></li>
                </ul>
                <div className="mb-2">
                  <span className="badge bg-success me-2">Children &lt; 6 yrs: Free</span>
                  <span className="badge bg-warning text-dark">6–12 yrs: 50% off</span>
                </div>
                <small className="text-muted">The SDF supports Bhutan's sustainability and free education/healthcare.</small>
              </div>
            </div>
          </div>

          {/* Accommodation Section */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow border-0">
              <div className="card-body">
                <h3 className="h5 mb-3"><span role="img" aria-label="hotel">🏨</span> Accommodation</h3>
                <table className="table table-sm mb-2">
                  <thead>
                    <tr><th>Type</th><th>Price/night</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Budget Hotels</td><td>$20–$50</td></tr>
                    <tr><td>Mid-range Hotels</td><td>$50–$100</td></tr>
                    <tr><td>Luxury Resorts</td><td>$200–$1,500+</td></tr>
                  </tbody>
                </table>
                <div className="mb-2"><span className="badge bg-info text-dark">Many hotels include meals &amp; WiFi</span></div>
              </div>
            </div>
          </div>

          {/* Transportation Section */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow border-0">
              <div className="card-body">
                <h3 className="h5 mb-3"><span role="img" aria-label="car">🚗</span> Transportation</h3>
                <ul className="mb-2">
                  <li>✈️ <strong>Flight to Bhutan:</strong> $300–$600 (round trip from Bangkok, Delhi, Kathmandu)</li>
                  <li>🚖 <strong>Private car + driver:</strong> $80–$120/day</li>
                  <li>🚌 <strong>Public buses:</strong> Cheap, limited routes</li>
                  <li>🚕 <strong>Taxi (short):</strong> $2–$10 (negotiable)</li>
                </ul>
                <small className="text-muted">Book flights with Druk Air or Bhutan Airlines.</small>
              </div>
            </div>
          </div>

          {/* Food & Dining Section */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow border-0">
              <div className="card-body">
                <h3 className="h5 mb-3"><span role="img" aria-label="food">🍽️</span> Food &amp; Dining</h3>
                <ul className="mb-2">
                  <li><strong>Budget:</strong> $5–$10/day</li>
                  <li><strong>Mid-range:</strong> $10–$30/day</li>
                  <li><strong>High-end:</strong> $30–$100+/day</li>
                </ul>
                <div className="mb-2"><span className="badge bg-info text-dark">Try: Ema Datshi, Red rice, Momos, Suja (butter tea)</span></div>
              </div>
            </div>
          </div>

          {/* Entry Fees Section */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow border-0">
              <div className="card-body">
                <h3 className="h5 mb-3"><span role="img" aria-label="ticket">🎟️</span> Entry Fees (Selective)</h3>
                <table className="table table-sm mb-2">
                  <thead>
                    <tr><th>Site</th><th>Entry Fee</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Tiger's Nest</td><td>$15</td></tr>
                    <tr><td>Punakha Dzong</td><td>$10</td></tr>
                    <tr><td>Tashichho Dzong</td><td>$10</td></tr>
                  </tbody>
                </table>
                <small className="text-muted">Most sites are free; some monasteries/museums charge a small fee.</small>
              </div>
            </div>
          </div>

          {/* SIM & Internet Section */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow border-0">
              <div className="card-body">
                <h3 className="h5 mb-3"><span role="img" aria-label="sim">📱</span> SIM Card &amp; Internet</h3>
                <ul className="mb-2">
                  <li>Local SIM (TashiCell/B-Mobile): $5–$10 with data</li>
                  <li>WiFi in most hotels &amp; cafes</li>
                </ul>
                <div className="mb-2"><span className="badge bg-info text-dark">Stay connected easily!</span></div>
              </div>
            </div>
          </div>

          {/* Tour Guide Section */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow border-0">
              <div className="card-body">
                <h3 className="h5 mb-3"><span role="img" aria-label="guide">👨‍💼</span> Tour Guide (Optional)</h3>
                <ul className="mb-2">
                  <li>Certified local guide: $25–$50/day</li>
                  <li>Not mandatory for independent travelers, but highly recommended!</li>
                </ul>
                <div className="mb-2"><span className="badge bg-success">Get cultural insights &amp; local tips!</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Daily Budget Table */}
        <div className="row justify-content-center mt-5">
          <div className="col-lg-10">
            <div className="card shadow border-0">
              <div className="card-body">
                <h2 className="h4 mb-4 text-center">🧮 Sample Daily Budget (Per Person)</h2>
                <div className="table-responsive">
                  <table className="table table-bordered text-center">
                    <thead className="table-light">
                      <tr>
                        <th>Category</th>
                        <th>Budget Style</th>
                        <th>Mid-range Style</th>
                        <th>Luxury Style</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>SDF</td>
                        <td>$100</td>
                        <td>$100</td>
                        <td>$100</td>
                      </tr>
                      <tr>
                        <td>Hotel</td>
                        <td>$30</td>
                        <td>$70</td>
                        <td>$300</td>
                      </tr>
                      <tr>
                        <td>Food</td>
                        <td>$10</td>
                        <td>$20</td>
                        <td>$60</td>
                      </tr>
                      <tr>
                        <td>Transport</td>
                        <td>$15</td>
                        <td>$40</td>
                        <td>$100</td>
                      </tr>
                      <tr>
                        <td>Entry Fees</td>
                        <td>$5</td>
                        <td>$10</td>
                        <td>$10</td>
                      </tr>
                      <tr className="table-primary">
                        <th>Total/day</th>
                        <th>$160</th>
                        <th>$240</th>
                        <th>$570+</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="alert alert-info mt-3 text-center">
                  <i className="fas fa-info-circle me-2"></i>
                  <strong>Tip:</strong> Mix and match styles to fit your budget. Bhutan can be magical for every traveler!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
} 