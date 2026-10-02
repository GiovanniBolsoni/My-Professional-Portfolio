import { Redis } from '@upstash/redis';

export const config = {
  runtime: 'edge',
};

// Required environment variables in Vercel:
// Redis.fromEnv() aceita tanto UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN 
// quanto KV_REST_API_URL / KV_REST_API_TOKEN (Vercel KV via Upstash)
const redis = Redis.fromEnv();

export default async function handler(req: Request) {
  try {
    if (req.method === 'POST') {
      const visitorNumber = await redis.incr('visitors:total');
      return new Response(JSON.stringify({ visitorNumber, total: visitorNumber }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else if (req.method === 'GET') {
      const totalStr = await redis.get('visitors:total');
      const total = totalStr ? parseInt(String(totalStr), 10) : 0;
      return new Response(JSON.stringify({ total }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response('Method Not Allowed', { status: 405 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
