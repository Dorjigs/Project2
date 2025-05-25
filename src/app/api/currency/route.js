import { NextResponse } from 'next/server';

// You would typically get this from an environment variable
const EXCHANGE_API_KEY = process.env.EXCHANGE_API_KEY;
const EXCHANGE_API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

// Cache exchange rates for 1 hour
let exchangeRatesCache = {
  timestamp: 0,
  rates: null
};

const CACHE_DURATION = 3600000; // 1 hour in milliseconds

async function getExchangeRates() {
  const now = Date.now();

  // Return cached rates if they're still valid
  if (exchangeRatesCache.rates && (now - exchangeRatesCache.timestamp) < CACHE_DURATION) {
    return exchangeRatesCache.rates;
  }

  try {
    if (!EXCHANGE_API_KEY) {
      // Return mock data if no API key
      return {
        BTN: 83.2, // Bhutanese Ngultrum
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
        AUD: 1.52,
        SGD: 1.34,
        INR: 83.2, // Indian Rupee (pegged to BTN)
      };
    }

    const response = await fetch(EXCHANGE_API_BASE_URL);
    if (!response.ok) {
      throw new Error('Exchange rate API request failed');
    }

    const data = await response.json();
    
    // Update cache
    exchangeRatesCache = {
      timestamp: now,
      rates: data.rates
    };

    return data.rates;
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    throw error;
  }
}

// Add dynamic configuration
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const amount = parseFloat(searchParams.get('amount')) || 1;
    const from = (searchParams.get('from') || 'USD').toUpperCase();
    const to = (searchParams.get('to') || 'BTN').toUpperCase();

    const rates = await getExchangeRates();

    if (!rates[from] || !rates[to]) {
      return NextResponse.json(
        { error: 'Invalid currency code' },
        { status: 400 }
      );
    }

    // Convert to USD first (base currency), then to target currency
    const amountInUSD = amount / rates[from];
    const convertedAmount = amountInUSD * rates[to];

    return NextResponse.json({
      from,
      to,
      amount,
      result: Math.round(convertedAmount * 100) / 100,
      rate: rates[to] / rates[from]
    });
  } catch (error) {
    console.error('Currency conversion error:', error);
    return NextResponse.json(
      { error: 'Failed to convert currency' },
      { status: 500 }
    );
  }
} 