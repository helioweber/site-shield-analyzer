
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ServerAnalysis {
  statusCode: number;
  statusText: string;
  headers: Record<string, string>;
  server: string | null;
  xPoweredBy: string | null;
  responseTime: number;
  protocol: string;
  contentType: string;
  contentLength: number;
  remoteAddress: string | null;
  compression: {
    gzip: boolean;
    brotli: boolean;
    deflate: boolean;
    contentEncoding: string | null;
  };
}

interface SecurityHeaders {
  hsts: boolean;
  csp: boolean;
  xframe: boolean;
  xss: boolean;
  contentTypeOptions: boolean;
}

async function analyzeWebsite(url: string): Promise<{
  server: ServerAnalysis;
  security: SecurityHeaders;
  performance: {
    loadTime: number;
    pageSize: number;
    responseTime: number;
    compression: {
      gzip: boolean;
      brotli: boolean;
      deflate: boolean;
      contentEncoding: string | null;
    };
  };
}> {
  const startTime = Date.now();
  
  try {
    console.log(`Analisando website: ${url}`);
    
    // Faz requisição real para o website com headers que aceitam compressão
    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'WebSec-Analyzer/1.0 (Security Scanner)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br', // Solicita compressão
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
    });

    const responseTime = Date.now() - startTime;
    
    // Extrai headers da resposta
    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });

    console.log(`Resposta recebida em ${responseTime}ms:`, {
      status: response.status,
      headers: Object.keys(headers),
      contentEncoding: headers['content-encoding'],
    });

    // Análise de compressão
    const contentEncoding = headers['content-encoding'] || null;
    const compression = {
      gzip: contentEncoding?.includes('gzip') || false,
      brotli: contentEncoding?.includes('br') || false,
      deflate: contentEncoding?.includes('deflate') || false,
      contentEncoding,
    };

    // Análise do servidor
    const serverAnalysis: ServerAnalysis = {
      statusCode: response.status,
      statusText: response.statusText,
      headers,
      server: headers['server'] || null,
      xPoweredBy: headers['x-powered-by'] || null,
      responseTime,
      protocol: response.url.startsWith('https://') ? 'HTTPS' : 'HTTP',
      contentType: headers['content-type'] || 'unknown',
      contentLength: parseInt(headers['content-length'] || '0'),
      remoteAddress: headers['x-forwarded-for'] || headers['x-real-ip'] || null,
      compression,
    };

    // Análise de segurança dos headers
    const securityHeaders: SecurityHeaders = {
      hsts: !!headers['strict-transport-security'],
      csp: !!headers['content-security-policy'],
      xframe: !!headers['x-frame-options'],
      xss: !!headers['x-xss-protection'],
      contentTypeOptions: !!headers['x-content-type-options'],
    };

    // Análise de performance básica
    const performance = {
      loadTime: responseTime / 1000, // Converter para segundos
      pageSize: serverAnalysis.contentLength,
      responseTime,
      compression, // Inclui dados de compressão na performance
    };

    return {
      server: serverAnalysis,
      security: securityHeaders,
      performance,
    };

  } catch (error) {
    console.error('Erro na análise do website:', error);
    throw new Error(`Falha na análise: ${error.message}`);
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL é obrigatória' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validar URL
    try {
      new URL(url);
    } catch {
      return new Response(
        JSON.stringify({ error: 'URL inválida' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Iniciando análise completa para: ${url}`);
    
    const analysis = await analyzeWebsite(url);
    
    console.log('Análise concluída:', {
      server: analysis.server.server,
      security: analysis.security,
      responseTime: analysis.performance.responseTime,
      compression: analysis.performance.compression,
    });

    return new Response(
      JSON.stringify({
        url,
        timestamp: new Date().toISOString(),
        analysis,
        success: true,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Erro na edge function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
