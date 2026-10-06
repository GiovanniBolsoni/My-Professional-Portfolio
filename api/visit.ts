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
    const origin = req.headers.get('origin');
    const allowedOrigins = ['https://my-professional-portfolio-azure.vercel.app', 'http://localhost:5173'];
    
    if (origin && !allowedOrigins.includes(origin)) {
      return new Response('Forbidden', { status: 403 });
    }

    const commonHeaders = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Access-Control-Allow-Origin': origin || '*',
    };

    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          ...commonHeaders,
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (req.method === 'POST') {
      const ip = req.headers.get('x-forwarded-for') || 'unknown';
      const rateLimitKey = `rate_limit:${ip}`;
      
      if (ip !== 'unknown') {
        const isRateLimited = await redis.get(rateLimitKey);
        if (isRateLimited) {
          // Já visitou recentemente, apenas retorna o total atual sem incrementar
          const totalStr = await redis.get('visitors:total');
          const total = totalStr ? parseInt(String(totalStr), 10) : 0;
          return new Response(JSON.stringify({ visitorNumber: total, total, cached: true }), {
            status: 200,
            headers: commonHeaders,
          });
        }
        
        // Bloqueia pelas próximas 24 horas (86400 segundos)
        await redis.set(rateLimitKey, '1', { ex: 86400 });
      }

      const visitorNumber = await redis.incr('visitors:total');
      return new Response(JSON.stringify({ visitorNumber, total: visitorNumber }), {
        status: 200,
        headers: commonHeaders,
      });
    } else if (req.method === 'GET') {
      const totalStr = await redis.get('visitors:total');
      const total = totalStr ? parseInt(String(totalStr), 10) : 0;
      return new Response(JSON.stringify({ total }), {
        status: 200,
        headers: commonHeaders,
      });
    }

    return new Response('Method Not Allowed', { status: 405 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache',
      },
    });
  }
}
