
interface ServerResponse {
  statusCode: number;
  statusText: string;
  headers: Record<string, string>;
  server: string | null;
  xPoweredBy: string | null;
  remoteAddress: string;
  responseTime: number;
  protocol: string;
  contentType: string;
  contentLength: number;
}

export class HttpAnalyzer {
  static async analyzeServer(url: string): Promise<ServerResponse> {
    const startTime = Date.now();
    
    try {
      console.log(`Analisando servidor: ${url}`);
      
      // Em produção, seria uma requisição real fetch()
      // Aqui simulamos com dados mais realistas baseados no domínio
      const domain = new URL(url).hostname;
      const response = this.generateRealisticServerResponse(domain, startTime);
      
      console.log('Análise do servidor concluída:', response);
      return response;
    } catch (error) {
      console.error('Erro na análise do servidor:', error);
      return this.getDefaultResponse(startTime);
    }
  }

  private static generateRealisticServerResponse(domain: string, startTime: number): ServerResponse {
    const responseTime = Date.now() - startTime + Math.floor(Math.random() * 500) + 100;
    
    // Diferentes configurações de servidor baseadas no tipo de domínio
    const serverConfigs = [
      {
        server: 'Apache/2.4.41 (Ubuntu)',
        xPoweredBy: 'PHP/8.1.12',
        protocol: 'HTTP/1.1',
        likely: domain.includes('apache') || domain.includes('php')
      },
      {
        server: 'nginx/1.20.2',
        xPoweredBy: null,
        protocol: 'HTTP/2',
        likely: domain.includes('nginx')
      },
      {
        server: 'Microsoft-IIS/10.0',
        xPoweredBy: 'ASP.NET Core',
        protocol: 'HTTP/1.1',
        likely: domain.includes('microsoft') || domain.includes('iis')
      },
      {
        server: 'cloudflare',
        xPoweredBy: null,
        protocol: 'HTTP/2',
        likely: domain.includes('cloudflare')
      },
      {
        server: 'nginx/1.21.6 (Alpine Linux)',
        xPoweredBy: 'Express.js/4.18.2',
        protocol: 'HTTP/2',
        likely: domain.includes('node') || domain.includes('express')
      },
      {
        server: 'Apache/2.4.52 (Debian)',
        xPoweredBy: 'PHP/8.0.28',
        protocol: 'HTTP/1.1',
        likely: domain.includes('debian')
      },
      {
        server: 'LiteSpeed/6.0.9',
        xPoweredBy: 'PHP/8.2.1',
        protocol: 'HTTP/3',
        likely: domain.includes('litespeed')
      }
    ];

    // Seleciona configuração mais provável ou aleatória
    const likelyConfig = serverConfigs.find(config => config.likely);
    const selectedConfig = likelyConfig || serverConfigs[Math.floor(Math.random() * serverConfigs.length)];

    // Gera IP realista baseado em ranges comuns de CDNs e hosting
    const ipRanges = [
      '104.21.', '172.67.', '185.199.', // Cloudflare
      '52.', '54.', '18.', // AWS
      '35.', '34.', '130.', // Google Cloud
      '40.', '52.', '13.', // Azure
      '192.168.', '10.0.', // Internal networks
    ];
    
    const selectedRange = ipRanges[Math.floor(Math.random() * ipRanges.length)];
    const remoteAddress = `${selectedRange}${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}:443`;

    return {
      statusCode: 200,
      statusText: 'OK',
      headers: {
        'Server': selectedConfig.server,
        'Date': new Date().toUTCString(),
        'Content-Type': 'text/html; charset=UTF-8',
        'Content-Length': `${Math.floor(Math.random() * 50000) + 5000}`,
        'Connection': 'keep-alive',
        'X-Frame-Options': Math.random() > 0.3 ? 'DENY' : 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff',
        'X-XSS-Protection': Math.random() > 0.4 ? '1; mode=block' : '0',
        ...(selectedConfig.xPoweredBy && { 'X-Powered-By': selectedConfig.xPoweredBy }),
        ...(Math.random() > 0.5 && { 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains' }),
        ...(Math.random() > 0.6 && { 'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'" })
      },
      server: selectedConfig.server,
      xPoweredBy: selectedConfig.xPoweredBy,
      remoteAddress,
      responseTime,
      protocol: selectedConfig.protocol,
      contentType: 'text/html; charset=UTF-8',
      contentLength: Math.floor(Math.random() * 50000) + 5000
    };
  }

  private static getDefaultResponse(startTime: number): ServerResponse {
    return {
      statusCode: 0,
      statusText: 'Connection Failed',
      headers: {},
      server: null,
      xPoweredBy: null,
      remoteAddress: 'Unknown',
      responseTime: Date.now() - startTime,
      protocol: 'Unknown',
      contentType: 'Unknown',
      contentLength: 0
    };
  }
}
