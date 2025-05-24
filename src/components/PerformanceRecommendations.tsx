
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Globe, 
  Clock, 
  Image, 
  FileText, 
  Settings, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react';
import { useState } from 'react';

interface PerformanceAnalysis {
  score: number;
  cacheRules: {
    hasCache: boolean;
    cacheHeaders: string[];
    recommendations: string[];
  };
  cdn: {
    isUsing: boolean;
    provider: string | null;
    recommendations: string[];
  };
  images: {
    totalSize: number;
    unoptimized: number;
    recommendations: string[];
  };
  scripts: {
    totalSize: number;
    blocking: number;
    recommendations: string[];
  };
  css: {
    totalSize: number;
    unused: number;
    recommendations: string[];
  };
  serverResponse: {
    ttfb: number;
    recommendations: string[];
  };
}

interface PerformanceRecommendationsProps {
  url: string;
}

const PerformanceRecommendations = ({ url }: PerformanceRecommendationsProps) => {
  const [analysis, setAnalysis] = useState<PerformanceAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const generateMockAnalysis = (): PerformanceAnalysis => {
    return {
      score: Math.floor(Math.random() * 40) + 45, // 45-85
      cacheRules: {
        hasCache: Math.random() > 0.4,
        cacheHeaders: ['Cache-Control', 'ETag', 'Expires'].filter(() => Math.random() > 0.3),
        recommendations: [
          'Configurar Cache-Control adequado para recursos estáticos',
          'Implementar versionamento de assets',
          'Utilizar ETag para validação de cache',
          'Definir TTL apropriado para diferentes tipos de conteúdo'
        ]
      },
      cdn: {
        isUsing: Math.random() > 0.6,
        provider: Math.random() > 0.5 ? 'CloudFlare' : null,
        recommendations: [
          'Implementar CDN para distribuição global de conteúdo',
          'Configurar cache de borda otimizado',
          'Utilizar compressão Brotli/Gzip',
          'Implementar HTTP/3 para melhor performance'
        ]
      },
      images: {
        totalSize: Math.floor(Math.random() * 5000) + 1000,
        unoptimized: Math.floor(Math.random() * 15) + 5,
        recommendations: [
          'Converter imagens para formatos modernos (WebP, AVIF)',
          'Implementar lazy loading para imagens',
          'Utilizar responsive images com srcset',
          'Comprimir imagens sem perda de qualidade significativa',
          'Implementar blur placeholder durante carregamento'
        ]
      },
      scripts: {
        totalSize: Math.floor(Math.random() * 2000) + 500,
        blocking: Math.floor(Math.random() * 8) + 2,
        recommendations: [
          'Minificar e comprimir arquivos JavaScript',
          'Implementar code splitting e lazy loading',
          'Remover JavaScript não utilizado',
          'Mover scripts não críticos para async/defer',
          'Utilizar tree shaking para reduzir bundle size'
        ]
      },
      css: {
        totalSize: Math.floor(Math.random() * 500) + 100,
        unused: Math.floor(Math.random() * 40) + 10,
        recommendations: [
          'Remover CSS não utilizado',
          'Minificar arquivos CSS',
          'Utilizar CSS crítico inline',
          'Implementar purgeCSS em builds de produção',
          'Otimizar seletores CSS complexos'
        ]
      },
      serverResponse: {
        ttfb: Math.floor(Math.random() * 800) + 200,
        recommendations: [
          'Otimizar queries de banco de dados',
          'Implementar cache de aplicação (Redis/Memcached)',
          'Utilizar CDN para reduzir latência',
          'Otimizar configuração do servidor web',
          'Considerar implementar SSR/SSG quando apropriado'
        ]
      }
    };
  };

  const analyzePerformance = async () => {
    setIsAnalyzing(true);
    console.log(`Iniciando análise de performance para: ${url}`);
    
    // Simula análise de IA
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const mockAnalysis = generateMockAnalysis();
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    
    console.log('Análise de performance concluída:', mockAnalysis);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (condition: boolean) => {
    return condition ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <XCircle className="w-4 h-4 text-red-600" />
    );
  };

  const getPriorityBadge = (priority: 'high' | 'medium' | 'low') => {
    const variants = {
      high: 'destructive',
      medium: 'outline',
      low: 'secondary'
    } as const;
    
    const labels = {
      high: 'Alta',
      medium: 'Média',
      low: 'Baixa'
    };

    return <Badge variant={variants[priority]}>{labels[priority]}</Badge>;
  };

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <span>Análise de Performance & Recomendações</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!analysis && !isAnalyzing && (
          <div className="text-center py-6">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Análise de Performance com IA</AlertTitle>
              <AlertDescription className="mt-2">
                Nossa IA irá analisar o conteúdo do site, verificar regras de cache, 
                uso de CDN, otimização de imagens e fornecer recomendações personalizadas 
                para melhorar a performance.
              </AlertDescription>
            </Alert>
            <Button onClick={analyzePerformance} className="mt-4" size="lg">
              <Zap className="w-4 h-4 mr-2" />
              Iniciar Análise de Performance
            </Button>
          </div>
        )}

        {isAnalyzing && (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-700">Analisando Performance</h3>
            <p className="text-gray-600 mt-2">
              IA processando conteúdo, cache, CDN e otimizações...
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
            {/* Score Geral */}
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Score de Performance</h3>
              <div className={`text-4xl font-bold ${getScoreColor(analysis.score)}`}>
                {analysis.score}/100
              </div>
              <p className="text-gray-600 mt-2">
                {analysis.score >= 80 ? 'Excelente performance!' : 
                 analysis.score >= 60 ? 'Boa performance, mas há melhorias possíveis' :
                 'Performance precisa de otimizações significativas'}
              </p>
            </div>

            {/* Análises Detalhadas */}
            <Accordion type="single" collapsible className="space-y-2">
              {/* Cache */}
              <AccordionItem value="cache">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span>Regras de Cache</span>
                    {getStatusIcon(analysis.cacheRules.hasCache)}
                    {!analysis.cacheRules.hasCache && getPriorityBadge('high')}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Status do Cache</h4>
                        <p className={`text-sm ${analysis.cacheRules.hasCache ? 'text-green-600' : 'text-red-600'}`}>
                          {analysis.cacheRules.hasCache ? 'Cache configurado' : 'Cache não encontrado'}
                        </p>
                        {analysis.cacheRules.cacheHeaders.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs text-gray-600">Headers encontrados:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {analysis.cacheRules.cacheHeaders.map((header, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {header}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Recomendações</h4>
                      <ul className="space-y-1">
                        {analysis.cacheRules.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start space-x-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* CDN */}
              <AccordionItem value="cdn">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-green-600" />
                    <span>CDN (Content Delivery Network)</span>
                    {getStatusIcon(analysis.cdn.isUsing)}
                    {!analysis.cdn.isUsing && getPriorityBadge('high')}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <div>
                      <h4 className="font-medium mb-2">Status do CDN</h4>
                      <p className={`text-sm ${analysis.cdn.isUsing ? 'text-green-600' : 'text-red-600'}`}>
                        {analysis.cdn.isUsing ? 
                          `CDN ativo ${analysis.cdn.provider ? `(${analysis.cdn.provider})` : ''}` : 
                          'CDN não detectado'}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Recomendações</h4>
                      <ul className="space-y-1">
                        {analysis.cdn.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start space-x-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Imagens */}
              <AccordionItem value="images">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <Image className="w-5 h-5 text-orange-600" />
                    <span>Otimização de Imagens</span>
                    {analysis.images.unoptimized > 10 && getPriorityBadge('medium')}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <p className="text-lg font-bold text-orange-600">{(analysis.images.totalSize / 1024).toFixed(1)}KB</p>
                        <p className="text-xs text-gray-600">Tamanho Total</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <p className="text-lg font-bold text-red-600">{analysis.images.unoptimized}</p>
                        <p className="text-xs text-gray-600">Não Otimizadas</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <p className="text-lg font-bold text-green-600">{Math.round(((100 - analysis.images.unoptimized) / 100) * 100)}%</p>
                        <p className="text-xs text-gray-600">Otimização</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Recomendações</h4>
                      <ul className="space-y-1">
                        {analysis.images.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start space-x-2">
                            <span className="text-orange-600 mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* JavaScript */}
              <AccordionItem value="scripts">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-yellow-600" />
                    <span>Otimização JavaScript</span>
                    {analysis.scripts.blocking > 5 && getPriorityBadge('medium')}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <p className="text-lg font-bold text-yellow-600">{(analysis.scripts.totalSize / 1024).toFixed(1)}KB</p>
                        <p className="text-xs text-gray-600">Tamanho JS</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <p className="text-lg font-bold text-red-600">{analysis.scripts.blocking}</p>
                        <p className="text-xs text-gray-600">Scripts Bloqueantes</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Recomendações</h4>
                      <ul className="space-y-1">
                        {analysis.scripts.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start space-x-2">
                            <span className="text-yellow-600 mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* CSS */}
              <AccordionItem value="css">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-blue-600" />
                    <span>Otimização CSS</span>
                    {analysis.css.unused > 30 && getPriorityBadge('low')}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <p className="text-lg font-bold text-blue-600">{analysis.css.totalSize}KB</p>
                        <p className="text-xs text-gray-600">Tamanho CSS</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <p className="text-lg font-bold text-red-600">{analysis.css.unused}%</p>
                        <p className="text-xs text-gray-600">CSS Não Usado</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Recomendações</h4>
                      <ul className="space-y-1">
                        {analysis.css.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start space-x-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Server Response */}
              <AccordionItem value="server">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <span>Resposta do Servidor</span>
                    {analysis.serverResponse.ttfb > 600 && getPriorityBadge('high')}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <div className="text-center p-4 bg-gray-50 rounded">
                      <p className="text-2xl font-bold text-purple-600">{analysis.serverResponse.ttfb}ms</p>
                      <p className="text-sm text-gray-600">Time to First Byte (TTFB)</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {analysis.serverResponse.ttfb < 300 ? 'Excelente' : 
                         analysis.serverResponse.ttfb < 600 ? 'Bom' : 'Precisa melhorar'}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Recomendações</h4>
                      <ul className="space-y-1">
                        {analysis.serverResponse.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start space-x-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
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
                Executar Nova Análise
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceRecommendations;
