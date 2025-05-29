
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Globe, 
  TrendingUp,
  CheckCircle,
  XCircle,
  Info,
  Archive
} from 'lucide-react';
import { useState } from 'react';
import { CDNAnalyzer } from '@/services/cdnAnalyzer';
import { RealAnalysisService } from '@/services/realAnalysisService';

interface RealPerformanceAnalysis {
  realData: {
    compression: {
      gzip: boolean;
      brotli: boolean;
      deflate: boolean;
      contentEncoding: string | null;
    };
    responseTime: number;
    server: string | null;
    statusCode: number;
    protocol: string;
    contentType: string;
    contentLength: number;
    headers: Record<string, string>;
  };
  cdn: {
    isUsing: boolean;
    provider: string | null;
    details: {
      detected: boolean;
      cdn_name: string | null;
      cdn_domains: string[];
      analysis_method: string;
    };
  };
}

interface PerformanceRecommendationsProps {
  url: string;
}

const PerformanceRecommendations = ({ url }: PerformanceRecommendationsProps) => {
  const [analysis, setAnalysis] = useState<RealPerformanceAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const generateRealAnalysis = async (url: string): Promise<RealPerformanceAnalysis> => {
    // Análise real de CDN e servidor
    const [cdnAnalysis, serverAnalysis] = await Promise.all([
      CDNAnalyzer.analyzeCDN(url),
      RealAnalysisService.analyzeWebsite(url)
    ]);
    
    return {
      realData: {
        compression: serverAnalysis.performance.compression,
        responseTime: serverAnalysis.performance.responseTime,
        server: serverAnalysis.server.server,
        statusCode: serverAnalysis.server.statusCode,
        protocol: serverAnalysis.server.protocol,
        contentType: serverAnalysis.server.contentType,
        contentLength: serverAnalysis.server.contentLength,
        headers: serverAnalysis.server.headers,
      },
      cdn: {
        isUsing: cdnAnalysis.hasCDN,
        provider: cdnAnalysis.provider,
        details: cdnAnalysis.details,
      }
    };
  };

  const analyzePerformance = async () => {
    setIsAnalyzing(true);
    console.log(`Iniciando análise REAL de performance para: ${url}`);
    console.log('Coletando dados reais: CDN, compressão, headers do servidor...');
    
    try {
      const realAnalysis = await generateRealAnalysis(url);
      setAnalysis(realAnalysis);
      console.log('Análise REAL de performance concluída:', realAnalysis);
    } catch (error) {
      console.error('Erro na análise:', error);
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusIcon = (condition: boolean) => {
    return condition ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <XCircle className="w-4 h-4 text-red-600" />
    );
  };

  const getResponseTimeStatus = (responseTime: number) => {
    if (responseTime < 300) return { color: 'text-green-600', label: 'Excelente' };
    if (responseTime < 600) return { color: 'text-yellow-600', label: 'Bom' };
    if (responseTime < 1000) return { color: 'text-orange-600', label: 'Regular' };
    return { color: 'text-red-600', label: 'Lento' };
  };

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <span>Análise de Performance - Dados Reais</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!analysis && !isAnalyzing && (
          <div className="text-center py-6">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Análise com Dados 100% Reais</AlertTitle>
              <AlertDescription className="mt-2">
                <strong>Dados Coletados:</strong> CDN (via CDNPlanet.com), compressão GZIP/Brotli, tempo de resposta real do servidor, headers HTTP, status codes
                <br />
                <strong>Sem simulações:</strong> Todos os dados são coletados diretamente do servidor de destino
              </AlertDescription>
            </Alert>
            <Button onClick={analyzePerformance} className="mt-4" size="lg">
              <Zap className="w-4 h-4 mr-2" />
              Iniciar Análise Real
            </Button>
          </div>
        )}

        {isAnalyzing && (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-700">Coletando Dados Reais</h3>
            <p className="text-gray-600 mt-2">
              Fazendo requisições HTTP para o servidor de destino...
            </p>
            <div className="flex justify-center mt-4 space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}

        {analysis && (
          <div className="space-y-6">
            {/* Dados Reais do Servidor */}
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-3 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Dados Reais Coletados do Servidor</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Servidor:</strong> {analysis.realData.server || 'Não identificado'}
                </div>
                <div className="flex items-center space-x-2">
                  <strong>Status:</strong> 
                  <Badge variant={analysis.realData.statusCode === 200 ? 'default' : 'destructive'}>
                    {analysis.realData.statusCode}
                  </Badge>
                </div>
                <div>
                  <strong>Protocolo:</strong> {analysis.realData.protocol}
                </div>
                <div>
                  <strong>Content-Type:</strong> {analysis.realData.contentType}
                </div>
                <div className={`font-medium ${getResponseTimeStatus(analysis.realData.responseTime).color}`}>
                  <strong>Tempo de Resposta:</strong> {analysis.realData.responseTime}ms 
                  ({getResponseTimeStatus(analysis.realData.responseTime).label})
                </div>
                <div>
                  <strong>Tamanho:</strong> {analysis.realData.contentLength > 0 ? `${(analysis.realData.contentLength / 1024).toFixed(1)}KB` : 'Não informado'}
                </div>
              </div>
            </div>

            {/* Análises Detalhadas - Apenas Dados Reais */}
            <Accordion type="single" collapsible className="space-y-2">
              {/* Compressão - Dados Reais */}
              <AccordionItem value="compression">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <Archive className="w-5 h-5 text-purple-600" />
                    <span>Compressão (Dados Reais)</span>
                    {getStatusIcon(analysis.realData.compression.gzip || analysis.realData.compression.brotli)}
                    <Badge variant="default" className="text-xs bg-green-600">REAL</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <p className={`text-lg font-bold ${analysis.realData.compression.gzip ? 'text-green-600' : 'text-red-600'}`}>
                          {analysis.realData.compression.gzip ? 'Ativo' : 'Inativo'}
                        </p>
                        <p className="text-xs text-gray-600">GZIP</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <p className={`text-lg font-bold ${analysis.realData.compression.brotli ? 'text-green-600' : 'text-red-600'}`}>
                          {analysis.realData.compression.brotli ? 'Ativo' : 'Inativo'}
                        </p>
                        <p className="text-xs text-gray-600">Brotli</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <p className={`text-lg font-bold ${analysis.realData.compression.deflate ? 'text-green-600' : 'text-red-600'}`}>
                          {analysis.realData.compression.deflate ? 'Ativo' : 'Inativo'}
                        </p>
                        <p className="text-xs text-gray-600">Deflate</p>
                      </div>
                    </div>
                    {analysis.realData.compression.contentEncoding && (
                      <div className="mt-2 text-xs text-gray-600">
                        <strong>Content-Encoding detectado:</strong> {analysis.realData.compression.contentEncoding}
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium mb-2">Recomendações baseadas nos dados reais</h4>
                      <ul className="space-y-1">
                        {!analysis.realData.compression.gzip && !analysis.realData.compression.brotli && (
                          <li className="text-sm text-gray-700 flex items-start space-x-2">
                            <span className="text-red-600 mt-1">•</span>
                            <span>Nenhuma compressão detectada. Ativar GZIP ou Brotli pode reduzir o tamanho em até 70%</span>
                          </li>
                        )}
                        {!analysis.realData.compression.brotli && analysis.realData.compression.gzip && (
                          <li className="text-sm text-gray-700 flex items-start space-x-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>GZIP ativo, mas Brotli oferece melhor compressão (10-15% adicional)</span>
                          </li>
                        )}
                        {(analysis.realData.compression.gzip || analysis.realData.compression.brotli) && (
                          <li className="text-sm text-green-700 flex items-start space-x-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>Compressão configurada adequadamente! ✅</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* CDN - Dados Reais */}
              <AccordionItem value="cdn">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-green-600" />
                    <span>CDN (via CDNPlanet.com)</span>
                    {getStatusIcon(analysis.cdn.isUsing)}
                    <Badge variant="default" className="text-xs bg-green-600">REAL</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                      <p className="text-xs text-blue-700 mb-2">
                        <strong>Análise via CDNPlanet.com:</strong> {analysis.cdn.details.analysis_method}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Status do CDN</h4>
                          <p className={`text-sm ${analysis.cdn.isUsing ? 'text-green-600' : 'text-red-600'}`}>
                            {analysis.cdn.isUsing ? 
                              `CDN detectado: ${analysis.cdn.provider}` : 
                              'CDN não detectado'}
                          </p>
                          {analysis.cdn.details.cdn_domains.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-gray-600">Domínios CDN detectados:</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {analysis.cdn.details.cdn_domains.map((domain, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {domain}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Recomendações baseadas nos dados reais</h4>
                      <ul className="space-y-1">
                        {analysis.cdn.isUsing ? (
                          <>
                            <li className="text-sm text-green-700 flex items-start space-x-2">
                              <span className="text-green-600 mt-1">•</span>
                              <span>CDN detectado! Excelente para performance global ✅</span>
                            </li>
                            <li className="text-sm text-gray-700 flex items-start space-x-2">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>Verificar configuração de cache do CDN para otimização adicional</span>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="text-sm text-gray-700 flex items-start space-x-2">
                              <span className="text-red-600 mt-1">•</span>
                              <span>Implementar CDN para melhorar performance global</span>
                            </li>
                            <li className="text-sm text-gray-700 flex items-start space-x-2">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>Considerar CloudFlare, AWS CloudFront ou Fastly</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Headers de Segurança */}
              <AccordionItem value="headers">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <span>Headers HTTP (Dados Reais)</span>
                    <Badge variant="default" className="text-xs bg-green-600">REAL</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium mb-2">Headers detectados</h4>
                      <div className="space-y-1 text-xs">
                        {Object.entries(analysis.realData.headers).slice(0, 10).map(([key, value]) => (
                          <div key={key} className="flex">
                            <span className="font-mono text-blue-600 w-32 flex-shrink-0">{key}:</span>
                            <span className="font-mono text-gray-700 break-all">{value}</span>
                          </div>
                        ))}
                        {Object.keys(analysis.realData.headers).length > 10 && (
                          <p className="text-gray-500 italic">... e mais {Object.keys(analysis.realData.headers).length - 10} headers</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Análise dos headers</h4>
                      <ul className="space-y-1">
                        <li className="text-sm text-gray-700 flex items-start space-x-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Total de {Object.keys(analysis.realData.headers).length} headers HTTP detectados</span>
                        </li>
                        <li className="text-sm text-gray-700 flex items-start space-x-2">
                          <span className="text-purple-600 mt-1">•</span>
                          <span>Headers de segurança e cache podem ser analisados individualmente</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Botão para nova análise */}
            <div className="text-center pt-4 border-t">
              <Button onClick={analyzePerformance} variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                Executar Nova Análise Real
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceRecommendations;
