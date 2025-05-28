
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CDNAnalysisResult {
  hasCDN: boolean;
  provider: string | null;
  details: {
    detected: boolean;
    cdn_name: string | null;
    cdn_domains: string[];
    analysis_method: string;
    headers: Record<string, string>;
    cname_records: string[];
  };
}

async function analyzeCDN(url: string): Promise<CDNAnalysisResult> {
  try {
    const domain = new URL(url).hostname;
    console.log(`Analisando CDN para domínio: ${domain}`);
    
    // Faz requisição real para analisar headers CDN
    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'CDN-Analyzer/1.0',
        'Accept': '*/*',
      },
    });

    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });

    console.log('Headers recebidos:', Object.keys(headers));

    // Detecta CDN pelos headers conhecidos
    const cdnIndicators = {
      'cloudflare': ['cf-ray', 'cf-cache-status', 'cf-request-id', 'server'],
      'fastly': ['fastly-debug-digest', 'x-served-by', 'x-cache'],
      'aws-cloudfront': ['x-amz-cf-id', 'x-amz-cf-pop', 'x-cache'],
      'akamai': ['akamai-origin-hop', 'x-akamai-transformed', 'x-cache-key'],
      'maxcdn': ['x-cache', 'x-edge-location'],
      'keycdn': ['x-edge-location', 'x-cache'],
      'bunnycdn': ['bunnycdn-cache-status', 'x-bunnycdn-edge'],
      'jsdelivr': ['x-served-by'],
      'unpkg': ['x-served-by'],
    };

    let detectedCDN: string | null = null;
    let cdnDomains: string[] = [];

    // Verifica CloudFlare especificamente
    if (headers['cf-ray'] || headers['cf-cache-status'] || 
        (headers['server'] && headers['server'].toLowerCase().includes('cloudflare'))) {
      detectedCDN = 'CloudFlare';
      cdnDomains = [domain];
    }
    // Verifica Fastly
    else if (headers['fastly-debug-digest'] || headers['x-served-by']?.includes('fastly')) {
      detectedCDN = 'Fastly';
      cdnDomains = [domain];
    }
    // Verifica AWS CloudFront
    else if (headers['x-amz-cf-id'] || headers['x-amz-cf-pop']) {
      detectedCDN = 'AWS CloudFront';
      cdnDomains = [domain];
    }
    // Verifica Akamai
    else if (headers['akamai-origin-hop'] || headers['x-akamai-transformed']) {
      detectedCDN = 'Akamai';
      cdnDomains = [domain];
    }
    // Verifica outros CDNs pelos headers genéricos
    else if (headers['x-cache'] && (headers['x-served-by'] || headers['x-edge-location'])) {
      // Tenta identificar pelo padrão do x-served-by
      const servedBy = headers['x-served-by'] || '';
      if (servedBy.includes('cache')) {
        detectedCDN = 'CDN Genérico';
        cdnDomains = [domain];
      }
    }

    const hasCDN = detectedCDN !== null;

    console.log(`CDN detectado: ${detectedCDN || 'Nenhum'}`);

    return {
      hasCDN,
      provider: detectedCDN,
      details: {
        detected: hasCDN,
        cdn_name: detectedCDN,
        cdn_domains: cdnDomains,
        analysis_method: 'http_headers_analysis',
        headers: headers,
        cname_records: [], // Placeholder para análise DNS futura
      }
    };

  } catch (error) {
    console.error('Erro na análise CDN:', error);
    return {
      hasCDN: false,
      provider: null,
      details: {
        detected: false,
        cdn_name: null,
        cdn_domains: [],
        analysis_method: 'error',
        headers: {},
        cname_records: [],
      }
    };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL é obrigatória' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Iniciando análise CDN para: ${url}`);
    const analysis = await analyzeCDN(url);

    return new Response(
      JSON.stringify({
        url,
        timestamp: new Date().toISOString(),
        cdn_analysis: analysis,
        success: true,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Erro na edge function CDN:', error);
    return new Response(
      JSON.stringify({ error: error.message, success: false }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
