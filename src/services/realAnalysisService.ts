
import { supabase } from '@/integrations/supabase/client';

interface RealServerAnalysis {
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

interface RealSecurityHeaders {
  hsts: boolean;
  csp: boolean;
  xframe: boolean;
  xss: boolean;
  contentTypeOptions: boolean;
}

interface RealWebsiteAnalysis {
  server: RealServerAnalysis;
  security: RealSecurityHeaders;
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
}

interface RealCDNAnalysis {
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

interface RealVulnerabilityResult {
  type: 'sql_injection' | 'xss' | 'security_headers';
  vulnerable: boolean;
  description: string;
  severity: 'high' | 'medium' | 'low' | 'safe';
  details: {
    testPerformed: string;
    payload?: string;
    requestDetails: {
      method: string;
      endpoint: string;
      headers: string;
      timestamp: string;
    };
    responseDetails: {
      statusCode: string;
      headers: string;
      responseTime: string;
      bodyPreview?: string;
    };
    recommendation: string;
    owaspReference: string;
    riskLevel: string;
  };
}

export class RealAnalysisService {
  static async analyzeWebsite(url: string): Promise<RealWebsiteAnalysis> {
    console.log(`[RealAnalysisService] Iniciando análise real para: ${url}`);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-website', {
        body: { url }
      });

      if (error) {
        console.error('[RealAnalysisService] Erro na edge function:', error);
        throw new Error(`Erro na análise: ${error.message}`);
      }

      if (!data.success) {
        throw new Error(data.error || 'Falha na análise do website');
      }

      console.log('[RealAnalysisService] Análise concluída:', data.analysis);
      return data.analysis;

    } catch (error) {
      console.error('[RealAnalysisService] Erro:', error);
      throw new Error(`Falha na análise real: ${error.message}`);
    }
  }

  static async analyzeCDN(url: string): Promise<RealCDNAnalysis> {
    console.log(`[RealAnalysisService] Iniciando análise CDN real para: ${url}`);
    
    try {
      const { data, error } = await supabase.functions.invoke('cdn-analysis', {
        body: { url }
      });

      if (error) {
        console.error('[RealAnalysisService] Erro na análise CDN:', error);
        throw new Error(`Erro na análise CDN: ${error.message}`);
      }

      if (!data.success) {
        throw new Error(data.error || 'Falha na análise CDN');
      }

      console.log('[RealAnalysisService] Análise CDN concluída:', data.cdn_analysis);
      return data.cdn_analysis;

    } catch (error) {
      console.error('[RealAnalysisService] Erro CDN:', error);
      throw new Error(`Falha na análise CDN real: ${error.message}`);
    }
  }

  static async testVulnerability(url: string, testType: 'xss' | 'sql_injection' | 'rfi' | 'security_headers'): Promise<RealVulnerabilityResult> {
    console.log(`[RealAnalysisService] Iniciando teste OWASP: ${testType} para ${url}`);
    
    try {
      const { data, error } = await supabase.functions.invoke('vulnerability-test', {
        body: { url, testType }
      });

      if (error) {
        console.error('[RealAnalysisService] Erro no teste de vulnerabilidade:', error);
        throw new Error(`Erro no teste: ${error.message}`);
      }

      if (!data.success) {
        throw new Error(data.error || 'Falha no teste de vulnerabilidade');
      }

      console.log('[RealAnalysisService] Teste OWASP concluído:', data.result);
      return data.result;

    } catch (error) {
      console.error('[RealAnalysisService] Erro no teste:', error);
      throw new Error(`Falha no teste real: ${error.message}`);
    }
  }
}
