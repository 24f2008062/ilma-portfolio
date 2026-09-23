import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { PORTFOLIO_DATA, PortfolioData } from '@/lib/content';

const REDIS_KEY = 'ilma_portfolio_data_v1';

function getRedisClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  try {
    return new Redis({ url, token });
  } catch (error) {
    console.error('Failed to initialize Upstash Redis client:', error);
    return null;
  }
}

// GET: Retrieve portfolio data from Redis (or fallback to defaults)
export async function GET() {
  const redis = getRedisClient();

  if (!redis) {
    return NextResponse.json({
      success: true,
      source: 'default',
      data: PORTFOLIO_DATA,
      message: 'Upstash Redis environment variables not configured. Using default content.'
    });
  }

  try {
    const data = await redis.get<PortfolioData>(REDIS_KEY);

    if (data && typeof data === 'object' && data.identity) {
      return NextResponse.json({
        success: true,
        source: 'redis',
        data
      });
    }

    return NextResponse.json({
      success: true,
      source: 'default',
      data: PORTFOLIO_DATA
    });
  } catch (error) {
    console.error('Error reading from Upstash Redis:', error);
    return NextResponse.json({
      success: true,
      source: 'fallback',
      data: PORTFOLIO_DATA
    });
  }
}

// POST: Save updated portfolio data to Redis
export async function POST(request: Request) {
  const redis = getRedisClient();

  if (!redis) {
    return NextResponse.json(
      {
        success: false,
        error: 'Upstash Redis env variables (UPSTASH_REDIS_REST_URL & UPSTASH_REDIS_REST_TOKEN) are missing.'
      },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const portfolioData: PortfolioData = body.data || body;

    if (!portfolioData || !portfolioData.identity) {
      return NextResponse.json({ success: false, error: 'Invalid portfolio data payload' }, { status: 400 });
    }

    // Save to Redis
    await redis.set(REDIS_KEY, portfolioData);

    return NextResponse.json({
      success: true,
      source: 'redis',
      message: 'Portfolio data updated globally in Upstash Redis!'
    });
  } catch (error) {
    console.error('Error saving to Upstash Redis:', error);
    return NextResponse.json({ success: false, error: 'Failed to save data to database' }, { status: 500 });
  }
}
