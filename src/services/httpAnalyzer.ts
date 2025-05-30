
import { RealAnalysisService } from './realAnalysisService';

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
    try {
      console.log(`[HttpAnalyzer] Iniciando análise real do servidor com GET: ${url}`);
      
      // Usa o serviço real através das edge functions
      const realAnalysis = await RealAnalysisService.analyzeWebsite(url);
      
      console.log('[HttpAnalyzer] Análise real do servidor concluída:', realAnalysis.server);
      
      return {
        statusCode: realAnalysis.server.statusCode,
        statusText: realAnalysis.server.statusText,
        headers: realAnalysis.server.headers,
        server: realAnalysis.server.server,
        xPoweredBy: realAnalysis.server.xPoweredBy,
        remoteAddress: realAnalysis.server.remoteAddress || 'Unknown',
        responseTime: realAnalysis.server.responseTime,
        protocol: realAnalysis.server.protocol,
        contentType: realAnalysis.server.contentType,
        contentLength: realAnalysis.server.contentLength,
      };
      
    } catch (error) {
      console.error('[HttpAnalyzer] Erro na análise do servidor:', error);
      
      // Fallback em caso de erro
      return this.getDefaultResponse();
    }
  }

  private static getDefaultResponse(): ServerResponse {
    return {
      statusCode: 0,
      statusText: 'Connection Failed',
      headers: {},
      server: null,
      xPoweredBy: null,
      remoteAddress: 'Unknown',
      responseTime: 0,
      protocol: 'Unknown',
      contentType: 'Unknown',
      contentLength: 0
    };
  }
}
