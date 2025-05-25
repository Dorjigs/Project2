// Main JavaScript file for Bhutan Travel Website

// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Set active nav link based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Initialize Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    // Handle modals
    const modalTriggerList = document.querySelectorAll('[data-bs-toggle="modal"]');
    const modalList = [...modalTriggerList].map(modalTriggerEl => new bootstrap.Modal(modalTriggerEl));

    // Initialize Interactive Map
    initBhutanMap();

    // Newsletter form validation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value.trim() === '') {
                showAlert('Please enter your email address', 'danger');
            } else if (!isValidEmail(emailInput.value)) {
                showAlert('Please enter a valid email address', 'danger');
            } else {
                showAlert('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
            }
        });
    }

    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (name.value.trim() === '') {
                setInvalid(name, 'Please enter your name');
                isValid = false;
            } else {
                setValid(name);
            }
            
            if (email.value.trim() === '') {
                setInvalid(email, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                setInvalid(email, 'Please enter a valid email');
                isValid = false;
            } else {
                setValid(email);
            }
            
            if (message.value.trim() === '') {
                setInvalid(message, 'Please enter your message');
                isValid = false;
            } else {
                setValid(message);
            }
            
            if (isValid) {
                showAlert('Your message has been sent successfully!', 'success');
                contactForm.reset();
            }
        });
    }

    // Image gallery with filtering
    initGallery();

    // Destination detail toggle
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const destinationDetails = this.parentElement.querySelector('.destination-details');
            destinationDetails.classList.toggle('show');
            this.textContent = destinationDetails.classList.contains('show') ? 'Read Less' : 'Read More';
        });
    });

    // Animate elements on scroll
    animateOnScroll();

    // Handle hash links for smooth scrolling
    if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 300);
        }
    }

    // Add offset for fixed header
    const navHeight = document.querySelector('.navbar').offsetHeight;
    document.documentElement.style.setProperty('--scroll-padding', navHeight + 20 + 'px');
});

// Function to initialize interactive map
function initBhutanMap() {
    const mapContainer = document.getElementById('bhutanMap');
    if (!mapContainer) return;

    // This would typically use a mapping library like Leaflet or Google Maps
    // For demonstration, we'll create a simple interactive map using HTML/CSS/JS
    
    // Sample destinations data
    const destinations = [
        { name: "Paro", lat: 27.4292, lng: 89.4171, desc: "Home to Tiger's Nest Monastery" },
        { name: "Thimphu", lat: 27.4712, lng: 89.6339, desc: "Capital city with Buddha Dordenma statue" },
        { name: "Punakha", lat: 27.5769, lng: 89.8456, desc: "Features the majestic Punakha Dzong" },
        { name: "Bumthang", lat: 27.6424, lng: 90.8871, desc: "Spiritual heartland of Bhutan" },
        { name: "Haa Valley", lat: 27.3875, lng: 89.2815, desc: "Picturesque valley with traditional villages" },
        { name: "Phobjikha Valley", lat: 27.4678, lng: 90.1621, desc: "Winter home of black-necked cranes" }
    ];

    // Create placeholder map (in a real implementation, this would use a map library)
    let mapHTML = '<div class="bhutan-map position-relative">';
    mapHTML += '<img src="images/bhutan-map-placeholder.jpg" class="img-fluid w-100" alt="Map of Bhutan">';
    
    // Add destination markers
    destinations.forEach((dest, index) => {
        // Calculate position (this would be more precise with a real map library)
        const posX = (dest.lng - 88.8) / 2 * 100; // Simplified position calculation
        const posY = (28.2 - dest.lat) / 1.5 * 100; // Simplified position calculation
        
        mapHTML += `<div class="map-marker" style="left: ${posX}%; top: ${posY}%;" 
                        data-bs-toggle="tooltip" data-bs-placement="top" title="${dest.name}: ${dest.desc}">
                        <span>${index + 1}</span>
                    </div>`;
    });
    
    mapHTML += '</div>';
    
    // Add legend
    mapHTML += `<div class="map-legend mt-3">
                    <div class="row g-2">
                        ${destinations.map((dest, i) => `
                            <div class="col-md-4 col-6">
                                <div class="d-flex align-items-center">
                                    <span class="legend-marker">${i + 1}</span>
                                    <span class="ms-2">${dest.name}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>`;
    
    // Insert map into container
    mapContainer.innerHTML = mapHTML;
    
    // Initialize tooltips for markers
    const markerTooltips = [].slice.call(document.querySelectorAll('.map-marker'));
    markerTooltips.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Add marker click event
    const markers = document.querySelectorAll('.map-marker');
    markers.forEach((marker, i) => {
        marker.addEventListener('click', function() {
            showDestinationInfo(destinations[i]);
        });
    });
}

// Function to show destination information when marker is clicked
function showDestinationInfo(destination) {
    // Create modal with bootstrap
    const modalHTML = `
        <div class="modal fade" id="destinationModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${destination.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="destination-preview mb-3">
                            <img src="images/${destination.name.toLowerCase()}-placeholder.jpg" class="img-fluid rounded" alt="${destination.name}">
                        </div>
                        <p>${destination.desc}</p>
                        <a href="destinations.html#${destination.name.toLowerCase()}" class="btn btn-primary">Learn More</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('destinationModal'));
    modal.show();
    
    // Remove modal from DOM after it's hidden
    document.getElementById('destinationModal').addEventListener('hidden.bs.modal', function() {
        document.body.removeChild(modalContainer);
    });
}

// Function to initialize image gallery with filtering
function initGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    if (!galleryContainer) return;
    
    const filterButtons = document.querySelectorAll('.gallery-filter button');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Function to calculate travel budget
function calculateBudget() {
    const days = parseInt(document.getElementById('travelDays').value);
    const travelers = parseInt(document.getElementById('travelers').value);
    const hasTrekking = document.getElementById('trekking').checked;
    const hasGuides = document.getElementById('guides').checked;
    const season = document.getElementById('season').value;
    
    // Base calculations
    let dailyTariff = season === 'peak' ? 250 : 200; // USD
    let totalTariff = dailyTariff * days * travelers;
    
    // Additional costs
    let visaFee = 40 * travelers; // USD
    let flightCost = 600 * travelers; // Approximate
    let personalExpenses = 30 * days * travelers; // USD
    
    // Optional add-ons
    if (hasTrekking) {
        totalTariff += 50 * days * travelers; // Trekking surcharge
    }
    
    if (hasGuides) {
        totalTariff += 30 * days; // Additional specialized guide
    }
    
    // Calculate total
    const totalCost = totalTariff + visaFee + flightCost + personalExpenses;
    
    // Display results
    document.getElementById('tariffCost').textContent = `$${totalTariff}`;
    document.getElementById('visaCost').textContent = `$${visaFee}`;
    document.getElementById('flightCost').textContent = `$${flightCost}`;
    document.getElementById('personalCost').textContent = `$${personalExpenses}`;
    document.getElementById('totalCost').textContent = `$${totalCost}`;
    
    document.getElementById('budgetResults').classList.remove('d-none');
}

// Function to set form field as invalid
function setInvalid(field, message) {
    field.classList.add('is-invalid');
    const feedbackElement = field.nextElementSibling;
    if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
        feedbackElement.textContent = message;
    } else {
        const feedback = document.createElement('div');
        feedback.classList.add('invalid-feedback');
        feedback.textContent = message;
        field.parentNode.insertBefore(feedback, field.nextElementSibling);
    }
}

// Function to set form field as valid
function setValid(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
}

// Function to validate email format
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Function to show alert message
function showAlert(message, type) {
    const alertContainer = document.createElement('div');
    alertContainer.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-4 z-index-1000`;
    alertContainer.style.zIndex = '9999';
    alertContainer.role = 'alert';
    alertContainer.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(alertContainer);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        const bsAlert = new bootstrap.Alert(alertContainer);
        bsAlert.close();
    }, 3000);
}

// Function to animate elements on scroll
function animateOnScroll() {
    const animateItems = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateItems.forEach(item => {
        observer.observe(item);
    });
}

// Weather API integration for destinations
function fetchWeatherData(destination) {
    const weatherContainer = document.getElementById(`${destination.toLowerCase()}Weather`);
    if (!weatherContainer) return;
    
    // This would typically use a weather API
    // For demonstration, we'll use simulated data
    const weatherData = {
        'paro': { temp: '15°C', condition: 'Partly Cloudy', icon: 'fa-cloud-sun' },
        'thimphu': { temp: '12°C', condition: 'Mostly Sunny', icon: 'fa-sun' },
        'punakha': { temp: '20°C', condition: 'Sunny', icon: 'fa-sun' },
        'bumthang': { temp: '10°C', condition: 'Cloudy', icon: 'fa-cloud' },
        'haa': { temp: '8°C', condition: 'Rain Showers', icon: 'fa-cloud-rain' },
        'phobjikha': { temp: '7°C', condition: 'Partly Cloudy', icon: 'fa-cloud-sun' }
    };
    
    const data = weatherData[destination.toLowerCase()];
    if (data) {
        weatherContainer.innerHTML = `
            <div class="weather-widget p-2 bg-light rounded">
                <div class="d-flex align-items-center">
                    <i class="fas ${data.icon} fa-2x text-primary me-2"></i>
                    <div>
                        <div class="fw-bold">${data.temp}</div>
                        <div class="small">${data.condition}</div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Currency converter function
function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    
    // Exchange rates (fixed for demonstration)
    const rates = {
        'USD': 1,
        'EUR': 0.85,
        'GBP': 0.73,
        'INR': 75.5,
        'BTN': 75.5, // Bhutanese Ngultrum pegged to INR
        'AUD': 1.32,
        'CAD': 1.27
    };
    
    // Calculate conversion
    const convertedAmount = (amount / rates[fromCurrency]) * rates[toCurrency];
    
    // Display result
    document.getElementById('convertedAmount').textContent = 
        `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    
    document.getElementById('conversionResult').classList.remove('d-none');
}

// Load destination-specific data when page is loaded
function loadDestinationData(destination) {
    fetchWeatherData(destination);
    
    // Load nearby attractions
    const attractionsContainer = document.getElementById(`${destination.toLowerCase()}Attractions`);
    if (attractionsContainer) {
        // This would typically come from a database
        // For demonstration, we'll use simulated data
        const attractions = {
            'paro': [
                { name: 'Paro Taktsang (Tiger\'s Nest)', distance: '10 km' },
                { name: 'Rinpung Dzong', distance: '2 km' },
                { name: 'National Museum of Bhutan', distance: '3 km' }
            ],
            'thimphu': [
                { name: 'Buddha Dordenma Statue', distance: '7 km' },
                { name: 'Tashichho Dzong', distance: '1 km' },
                { name: 'Motithang Takin Preserve', distance: '5 km' }
            ]
        };
        
        const destAttractions = attractions[destination.toLowerCase()];
        if (destAttractions) {
            let html = '<ul class="list-group">';
            destAttractions.forEach(attraction => {
                html += `<li class="list-group-item d-flex justify-content-between align-items-center">
                            ${attraction.name}
                            <span class="badge bg-primary rounded-pill">${attraction.distance}</span>
                        </li>`;
            });
            html += '</ul>';
            attractionsContainer.innerHTML = html;
        }
    }
}

// Festival calendar
function initFestivalCalendar() {
    const calendarContainer = document.getElementById('festivalCalendar');
    if (!calendarContainer) return;
    
    // This would typically come from a database
    // For demonstration, we'll use simulated data for 2025
    const festivals = [
        { name: 'Punakha Drubchen', location: 'Punakha', date: '2025-02-15', desc: 'Reenactment of the battle against Tibetan army' },
        { name: 'Punakha Tshechu', location: 'Punakha', date: '2025-02-18', desc: '3-day festival following Drubchen' },
        { name: 'Paro Tshechu', location: 'Paro', date: '2025-03-27', desc: 'One of the most popular festivals in Bhutan' },
        { name: 'Thimphu Tshechu', location: 'Thimphu', date: '2025-09-15', desc: 'Capital\'s biggest annual celebration' },
        { name: 'Jambay Lhakhang Drup', location: 'Bumthang', date: '2025-11-05', desc: 'Features the famous fire ceremony' },
        { name: 'Black-Necked Crane Festival', location: 'Phobjikha Valley', date: '2025-11-11', desc: 'Celebrates the arrival of endangered cranes' }
    ];
    
    // Sort festivals by date
    festivals.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Group festivals by month
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let calendarHTML = '';
    
    let currentMonth = -1;
    
    festivals.forEach(festival => {
        const festDate = new Date(festival.date);
        const month = festDate.getMonth();
        
        // If this is a new month, create a new month section
        if (month !== currentMonth) {
            if (currentMonth !== -1) {
                calendarHTML += '</div></div>'; // Close previous month
            }
            calendarHTML += `
                <div class="festival-month mb-4">
                    <h3>${months[month]} 2025</h3>
                    <div class="festival-list">
            `;
            currentMonth = month;
        }
        
        // Add festival to current month
        calendarHTML += `
            <div class="festival-item card mb-2">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="card-title mb-0">${festival.name}</h5>
                        <span class="badge bg-primary">${festDate.getDate()} ${months[month]}</span>
                    </div>
                    <p class="card-text mb-1"><i class="fas fa-map-marker-alt me-2"></i>${festival.location}</p>
                    <p class="card-text small text-muted">${festival.desc}</p>
                </div>
            </div>
        `;
    });
    
    // Close the last month
    if (currentMonth !== -1) {
        calendarHTML += '</div></div>';
    }
    
    calendarContainer.innerHTML = calendarHTML;
}

document.getElementById('subscribeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (this.checkValidity()) {
        this.classList.add('d-none');
        document.getElementById('successMessage').classList.remove('d-none');
    }
    this.classList.add('was-validated');
});
