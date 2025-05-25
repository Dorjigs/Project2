import { NextResponse } from 'next/server';

// You would typically get this from an environment variable
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Define major cities in Bhutan
const CITIES = {
  thimphu: { lat: 27.4712, lon: 89.6339 },
  paro: { lat: 27.4292, lon: 89.4171 },
  punakha: { lat: 27.5769, lon: 89.8456 },
  bumthang: { lat: 27.6424, lon: 90.8871 },
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city')?.toLowerCase() || 'thimphu';

    if (!CITIES[city]) {
      return NextResponse.json(
        { error: 'City not found' },
        { status: 400 }
      );
    }

    if (!WEATHER_API_KEY) {
      // If no API key, return mock data
      return NextResponse.json({
        city: city,
        temperature: 18,
        condition: 'Partly Cloudy',
        humidity: 65,
        windSpeed: 12,
        icon: '04d'
      });
    }

    const { lat, lon } = CITIES[city];
    const response = await fetch(
      `${WEATHER_API_BASE_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error('Weather API request failed');
    }

    const data = await response.json();

    // Format the response
    const weatherData = {
      city: city,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed),
      icon: data.weather[0].icon
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Weather data error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
} 