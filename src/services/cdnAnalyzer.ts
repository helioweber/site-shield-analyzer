
import { RealAnalysisService } from './realAnalysisService';

interface CDNAnalysisResult {
  hasCDN: boolean;
  provider: string | null;
  details: {
    detected: boolean;
    cdn_name: string | null;
    cdn_domains: string[];
    analysis_method: string;
  };
}

export class CDNAnalyzer {
  static async analyzeCDN(url: string): Promise<CDNAnalysisResult> {
    try {
      console.log(`[CDNAnalyzer] Iniciando análise CDN real para: ${url}`);
      
      // Usa o serviço real através das edge functions
      const realAnalysis = await RealAnalysisService.analyzeCDN(url);
      
      console.log('[CDNAnalyzer] Análise CDN real concluída:', realAnalysis);
      
      return {
        hasCDN: realAnalysis.hasCDN,
        provider: realAnalysis.provider,
        details: {
          detected: realAnalysis.details.detected,
          cdn_name: realAnalysis.details.cdn_name,
          cdn_domains: realAnalysis.details.cdn_domains,
          analysis_method: realAnalysis.details.analysis_method,
        }
      };
      
    } catch (error) {
      console.error('[CDNAnalyzer] Erro na análise CDN:', error);
      
      // Fallback em caso de erro
      return {
        hasCDN: false,
        provider: null,
        details: {
          detected: false,
          cdn_name: null,
          cdn_domains: [],
          analysis_method: 'error'
        }
      };
    }
  }
}
