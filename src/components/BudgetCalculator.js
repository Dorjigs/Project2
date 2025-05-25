'use client'

import { useState } from 'react';
import { calculateBudget } from '@/utils/helpers';

export default function BudgetCalculator() {
  const [formData, setFormData] = useState({
    days: '',
    travelers: '',
    hasTrekking: false,
    hasGuides: false,
    season: 'regular'
  });

  const [budgetResult, setBudgetResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = calculateBudget({
      ...formData,
      days: parseInt(formData.days),
      travelers: parseInt(formData.travelers)
    });
    setBudgetResult(result);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title h4 mb-4">Trip Budget Calculator</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Number of Days</label>
              <input
                type="number"
                className="form-control"
                name="days"
                value={formData.days}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Number of Travelers</label>
              <input
                type="number"
                className="form-control"
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Season</label>
              <select
                className="form-select"
                name="season"
                value={formData.season}
                onChange={handleChange}
              >
                <option value="regular">Regular Season</option>
                <option value="peak">Peak Season</option>
              </select>
            </div>
            <div className="col-md-6">
              <div className="form-check mt-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="hasTrekking"
                  checked={formData.hasTrekking}
                  onChange={handleChange}
                  id="hasTrekking"
                />
                <label className="form-check-label" htmlFor="hasTrekking">
                  Include Trekking
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="hasGuides"
                  checked={formData.hasGuides}
                  onChange={handleChange}
                  id="hasGuides"
                />
                <label className="form-check-label" htmlFor="hasGuides">
                  Include Specialized Guides
                </label>
              </div>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Calculate Budget
              </button>
            </div>
          </div>
        </form>

        {budgetResult && (
          <div className="mt-4">
            <h3 className="h5 mb-3">Estimated Budget Breakdown:</h3>
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Daily Tariff & Activities</td>
                    <td>${budgetResult.tariffCost.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Visa Fees</td>
                    <td>${budgetResult.visaCost.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Estimated Flight Cost</td>
                    <td>${budgetResult.flightCost.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Personal Expenses</td>
                    <td>${budgetResult.personalCost.toLocaleString()}</td>
                  </tr>
                  <tr className="table-primary">
                    <th>Total Estimated Cost</th>
                    <th>${budgetResult.totalCost.toLocaleString()}</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <small className="text-muted">
              Note: This is an estimate. Actual costs may vary based on specific travel dates,
              flight prices, and personal preferences.
            </small>
          </div>
        )}
      </div>
    </div>
  );
} 