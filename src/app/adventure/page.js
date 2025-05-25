'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import { calculateBudget, showAlert } from '@/utils/helpers'

const activities = [
  {
    name: "Trekking",
    image: "/snowmen-trek.jpg",
    description: "Experience breathtaking mountain trails and stunning landscapes.",
    difficulty: "Moderate to Hard",
    duration: "3-15 days",
    bestSeason: "March-May, September-November",
    price: "From $200/day",
    category: "hiking",
    features: [
      "Professional guides",
      "Camping equipment",
      "Meals included",
      "Porter service"
    ]
  },
  {
    name: "Mountain Biking",
    image: "/mountain-bike.jpg",
    description: "Explore Bhutan's diverse terrain on two wheels.",
    difficulty: "Moderate",
    duration: "1-7 days",
    bestSeason: "March-May, October-November",
    price: "From $150/day",
    category: "cycling",
    features: [
      "Quality bikes provided",
      "Safety equipment",
      "Support vehicle",
      "Trail snacks"
    ]
  },
  {
    name: "Rock Climbing",
    image: "/rock-climbing.jpg",
    description: "Challenge yourself on natural rock faces and cliffs.",
    difficulty: "Hard",
    duration: "1-3 days",
    bestSeason: "March-May, September-October",
    price: "From $180/day",
    category: "climbing",
    features: [
      "Professional instructors",
      "All gear provided",
      "Safety briefing",
      "Various difficulty levels"
    ]
  },
  {
    name: "River Rafting",
    image: "/raftingpunakha.jpg",
    description: "Navigate thrilling rapids on Bhutan's pristine rivers.",
    difficulty: "Moderate to Hard",
    duration: "1-2 days",
    bestSeason: "March-April, November",
    price: "From $160/day",
    category: "water",
    features: [
      "Professional guides",
      "Safety equipment",
      "Wet suits provided",
      "Rapids grade III-IV"
    ]
  },
  {
    name: "Cultural Hiking",
    image: "/taktshang.jpg",
    description: "Combine hiking with visits to remote temples and villages.",
    difficulty: "Easy to Moderate",
    duration: "1-5 days",
    bestSeason: "Year-round",
    price: "From $120/day",
    category: "hiking",
    features: [
      "Local guide",
      "Cultural insights",
      "Village homestays",
      "Traditional meals"
    ]
  },
  {
    name: "Photography Tours",
    image: "/birdwatching.jpg",
    description: "Capture Bhutan's stunning landscapes and culture.",
    difficulty: "Easy",
    duration: "3-10 days",
    bestSeason: "Year-round",
    price: "From $180/day",
    category: "photography",
    features: [
      "Professional photographer guide",
      "Location scouting",
      "Post-processing workshops",
      "All skill levels welcome"
    ]
  }
];

export default function AdventurePage() {
  const [budgetResults, setBudgetResults] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState(null);

  const categories = [
    { id: 'all', name: 'All Activities' },
    { id: 'hiking', name: 'Hiking & Trekking' },
    { id: 'cycling', name: 'Cycling' },
    { id: 'climbing', name: 'Climbing' },
    { id: 'water', name: 'Water Sports' },
    { id: 'photography', name: 'Photography' }
  ];

  const filteredActivities = selectedCategory === 'all'
    ? activities
    : activities.filter(activity => activity.category === selectedCategory);

  const getImagePath = (imagePath) => {
    // Remove leading slash if present
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return imagePath;
  };

  const handleBudgetCalculation = (e) => {
    e.preventDefault();
    const formData = {
      days: parseInt(e.target.travelDays.value),
      travelers: parseInt(e.target.travelers.value),
      hasTrekking: e.target.trekking.checked,
      hasGuides: e.target.guides.checked,
      season: e.target.season.value
    };
    
    setBudgetResults(calculateBudget(formData));
    showAlert('Budget calculation completed!', 'success');
  };

  const handleBooking = (activity) => {
    setSelectedActivity(activity);
    document.getElementById('bookingModal').classList.add('show');
    document.getElementById('bookingModal').style.display = 'block';
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    document.getElementById('bookingModal').classList.remove('show');
    document.getElementById('bookingModal').style.display = 'none';
    document.body.classList.remove('modal-open');
    setSelectedActivity(null);
  };

  const handleScroll = (e) => {
    e.preventDefault();
    const activitiesSection = document.getElementById('activities');
    if (activitiesSection) {
      activitiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <Image
          src="/adventures.jpg"
          alt="Adventure in Bhutan"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div className="hero-content">
          <h1>Adventure Activities</h1>
          <p>Discover thrilling experiences in the Land of the Thunder Dragon</p>
          <button 
            onClick={handleScroll}
            className="btn btn-primary btn-lg"
            aria-label="Explore activities"
          >
            Explore Activities <i className="fas fa-chevron-down ms-2"></i>
          </button>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Popular Adventures</h2>
          
          {/* Category Filter */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="row g-4">
            {filteredActivities.map((activity, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card h-100">
                  <div className="position-relative" style={{ height: '250px' }}>
                    <Image
                      src={getImagePath(activity.image)}
                      alt={activity.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-body">
                    <h3 className="h5 mb-3">{activity.name}</h3>
                    <p className="card-text mb-3">{activity.description}</p>
                    <ul className="list-unstyled mb-4">
                      <li className="mb-2"><strong>Difficulty:</strong> {activity.difficulty}</li>
                      <li className="mb-2"><strong>Duration:</strong> {activity.duration}</li>
                      <li className="mb-2"><strong>Best Season:</strong> {activity.bestSeason}</li>
                      <li><strong>Price:</strong> {activity.price}</li>
                    </ul>
                    <button 
                      className="btn btn-primary w-100"
                      onClick={() => handleBooking(activity)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Calculator Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2 className="text-center mb-4">Adventure Budget Calculator</h2>
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleBudgetCalculation}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="travelDays" className="form-label">Number of Days</label>
                        <input
                          type="number"
                          className="form-control"
                          id="travelDays"
                          min="1"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="travelers" className="form-label">Number of Travelers</label>
                        <input
                          type="number"
                          className="form-control"
                          id="travelers"
                          min="1"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="season" className="form-label">Travel Season</label>
                        <select className="form-select" id="season" required>
                          <option value="peak">Peak Season</option>
                          <option value="offpeak">Off-Peak Season</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <div className="h-100 d-flex flex-column justify-content-center">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="trekking"
                            />
                            <label className="form-check-label" htmlFor="trekking">
                              Include Trekking
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="guides"
                            />
                            <label className="form-check-label" htmlFor="guides">
                              Specialized Guides
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-4">
                      Calculate Budget
                    </button>
                  </form>

                  {budgetResults && (
                    <div className="mt-4">
                      <h4 className="text-center mb-3">Estimated Budget Breakdown</h4>
                      <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between">
                          <span>Daily Tariff Total:</span>
                          <strong>${budgetResults.tariffCost.toLocaleString()}</strong>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                          <span>Visa Fees:</span>
                          <strong>${budgetResults.visaCost.toLocaleString()}</strong>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                          <span>Flight Cost (Approximate):</span>
                          <strong>${budgetResults.flightCost.toLocaleString()}</strong>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                          <span>Personal Expenses:</span>
                          <strong>${budgetResults.personalCost.toLocaleString()}</strong>
                        </li>
                        <li className="list-group-item d-flex justify-content-between bg-light">
                          <span>Total Estimated Cost:</span>
                          <strong>${budgetResults.totalCost.toLocaleString()}</strong>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <div 
        className="modal fade" 
        id="bookingModal" 
        tabIndex="-1"
        style={{ background: 'rgba(0,0,0,0.5)' }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {selectedActivity ? `Book ${selectedActivity.name}` : 'Book Activity'}
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              {selectedActivity && (
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Preferred Date</label>
                      <input type="date" className="form-control" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Number of Participants</label>
                      <input type="number" className="form-control" min="1" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Special Requirements</label>
                      <textarea className="form-control" rows="3"></textarea>
                    </div>
                  </div>
                  <div className="alert alert-info mt-3">
                    <h6 className="mb-2">Package Details:</h6>
                    <p className="mb-1">Duration: {selectedActivity.duration}</p>
                    <p className="mb-1">Price: {selectedActivity.price}</p>
                    <p className="mb-0">Best Season: {selectedActivity.bestSeason}</p>
                  </div>
                </form>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Close
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => {
                  showAlert('Booking request sent! We will contact you soon.', 'success');
                  closeModal();
                }}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 