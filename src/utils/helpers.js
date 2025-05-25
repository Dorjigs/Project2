'use client'

// Form validation helper
export function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    if (input.required && !input.value.trim()) {
      setInvalid(input, `Please enter your ${input.name}`);
      isValid = false;
    } else if (input.type === 'email' && !isValidEmail(input.value)) {
      setInvalid(input, 'Please enter a valid email');
      isValid = false;
    } else {
      setValid(input);
    }
  });

  return isValid;
}

// Set form field as invalid
export function setInvalid(field, message) {
  field.classList.add('is-invalid');
  const feedbackElement = field.nextElementSibling;
  if (feedbackElement?.classList.contains('invalid-feedback')) {
    feedbackElement.textContent = message;
  } else {
    const feedback = document.createElement('div');
    feedback.classList.add('invalid-feedback');
    feedback.textContent = message;
    field.parentNode.insertBefore(feedback, field.nextElementSibling);
  }
}

// Set form field as valid
export function setValid(field) {
  field.classList.remove('is-invalid');
  field.classList.add('is-valid');
}

// Validate email format
export function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Show alert message
export function showAlert(message, type) {
  const alertContainer = document.createElement('div');
  alertContainer.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-4`;
  alertContainer.style.zIndex = '9999';
  alertContainer.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  document.body.appendChild(alertContainer);

  // Auto remove after 3 seconds
  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
}

// Calculate travel budget
export function calculateBudget(formData) {
  const { days, travelers, hasTrekking, hasGuides, season } = formData;

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

  return {
    tariffCost: totalTariff,
    visaCost: visaFee,
    flightCost,
    personalCost: personalExpenses,
    totalCost
  };
}

// Currency converter
export function convertCurrency(amount, fromCurrency, toCurrency) {
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
  return ((amount / rates[fromCurrency]) * rates[toCurrency]).toFixed(2);
}

// Weather data for destinations
export const weatherData = {
  'paro': { temp: '15°C', condition: 'Partly Cloudy', icon: 'fa-cloud-sun' },
  'thimphu': { temp: '12°C', condition: 'Mostly Sunny', icon: 'fa-sun' },
  'punakha': { temp: '20°C', condition: 'Sunny', icon: 'fa-sun' },
  'bumthang': { temp: '10°C', condition: 'Cloudy', icon: 'fa-cloud' },
  'haa': { temp: '8°C', condition: 'Rain Showers', icon: 'fa-cloud-rain' },
  'phobjikha': { temp: '7°C', condition: 'Partly Cloudy', icon: 'fa-cloud-sun' }
}; 