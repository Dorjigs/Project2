import { NextResponse } from 'next/server';

// Define base rates (these could come from a database)
const DAILY_RATES = {
  basic: 250, // Basic package daily rate in USD
  comfort: 350, // Comfort package daily rate in USD
  luxury: 500, // Luxury package daily rate in USD
};

const ACTIVITY_COSTS = {
  trekking: 100,
  culturalTour: 80,
  festivalVisit: 120,
  meditation: 60,
  photography: 50,
  rafting: 90,
};

export async function POST(request) {
  try {
    const {
      packageType = 'basic',
      duration = 1,
      groupSize = 1,
      activities = [],
      season = 'regular'
    } = await request.json();

    // Validate inputs
    if (!DAILY_RATES[packageType]) {
      return NextResponse.json(
        { error: 'Invalid package type' },
        { status: 400 }
      );
    }

    if (duration < 1 || groupSize < 1) {
      return NextResponse.json(
        { error: 'Invalid duration or group size' },
        { status: 400 }
      );
    }

    // Calculate base cost
    let baseCost = DAILY_RATES[packageType] * duration;

    // Apply group size discount
    if (groupSize >= 4) {
      baseCost *= 0.9; // 10% discount for groups of 4 or more
    }

    // Calculate activities cost
    const activitiesCost = activities.reduce((total, activity) => {
      return total + (ACTIVITY_COSTS[activity] || 0);
    }, 0);

    // Apply seasonal adjustment
    let seasonalMultiplier = 1;
    if (season === 'peak') {
      seasonalMultiplier = 1.2; // 20% increase for peak season
    } else if (season === 'offPeak') {
      seasonalMultiplier = 0.8; // 20% decrease for off-peak season
    }

    // Calculate total cost
    const totalCost = (baseCost + activitiesCost) * seasonalMultiplier;

    // Prepare detailed breakdown
    const breakdown = {
      baseCost: baseCost,
      activitiesCost: activitiesCost,
      seasonalAdjustment: (seasonalMultiplier - 1) * 100 + '%',
      groupDiscount: groupSize >= 4 ? '10%' : '0%',
      totalCost: Math.round(totalCost)
    };

    return NextResponse.json(breakdown, { status: 200 });
  } catch (error) {
    console.error('Budget calculation error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate budget' },
      { status: 500 }
    );
  }
} 