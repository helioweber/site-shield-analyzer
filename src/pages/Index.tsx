
import { useState } from 'react';
import { Shield } from 'lucide-react';
import Header from '@/components/Header';
import URLInput from '@/components/URLInput';
import SecurityAnalysis from '@/components/SecurityAnalysis';
import GlobalMap from '@/components/GlobalMap';
import PDFExporter from '@/components/PDFExporter';
import VulnerabilityTester from '@/components/VulnerabilityTester';
import PerformanceRecommendations from '@/components/PerformanceRecommendations';

// Dados simulados para demonstração com localizações do WebPageTest.org
const generateMockData = (url: string) => {
  const locations = [
    // Américas
    { city: 'Dulles, VA', country: 'EUA', region: 'NA', coords: { lat: 38.9445, lng: -77.4558 } },
    { city: 'São Paulo', country: 'Brasil', region: 'SA', coords: { lat: -23.5505, lng: -46.6333 } },
    { city: 'Toronto', country: 'Canadá', region: 'NA', coords: { lat: 43.6532, lng: -79.3832 } },
    { city: 'Los Angeles', country: 'EUA', region: 'NA', coords: { lat: 34.0522, lng: -118.2437 } },
    { city: 'Miami', country: 'EUA', region: 'NA', coords: { lat: 25.7617, lng: -80.1918 } },
    
    // Europa
    { city: 'Londres', country: 'Reino Unido', region: 'EU', coords: { lat: 51.5074, lng: -0.1278 } },
    { city: 'Frankfurt', country: 'Alemanha', region: 'EU', coords: { lat: 50.1109, lng: 8.6821 } },
    { city: 'Paris', country: 'França', region: 'EU', coords: { lat: 48.8566, lng: 2.3522 } },
    { city: 'Amsterdam', country: 'Holanda', region: 'EU', coords: { lat: 52.3676, lng: 4.9041 } },
    { city: 'Estocolmo', country: 'Suécia', region: 'EU', coords: { lat: 59.3293, lng: 18.0686 } },
    
    // Ásia-Pacífico
    { city: 'Tóquio', country: 'Japão', region: 'AS', coords: { lat: 35.6762, lng: 139.6503 } },
    { city: 'Sydney', country: 'Austrália', region: 'OC', coords: { lat: -33.8688, lng: 151.2093 } },
    { city: 'Singapura', country: 'Singapura', region: 'AS', coords: { lat: 1.3521, lng: 103.8198 } },
    { city: 'Mumbai', country: 'Índia', region: 'AS', coords: { lat: 19.0760, lng: 72.8777 } },
    { city: 'Hong Kong', country: 'China', region: 'AS', coords: { lat: 22.3193, lng: 114.1694 } },
    { city: 'Seul', country: 'Coreia do Sul', region: 'AS', coords: { lat: 37.5665, lng: 126.9780 } },
  ];

  const getRandomLoadTime = () => (Math.random() * 4 + 0.5).toFixed(1);
  const getStatus = (time: number) => {
    if (time < 1) return 'excellent';
    if (time < 2) return 'good';
    if (time < 4) return 'average';
    return 'poor';
  };

  const locationData = locations.map(loc => {
    const loadTime = parseFloat(getRandomLoadTime());
    return {
      ...loc,
      loadTime,
      status: getStatus(loadTime) as 'excellent' | 'good' | 'average' | 'poor',
    };
  });

  const avgLoadTime = locationData.reduce((acc, loc) => acc + loc.loadTime, 0) / locationData.length;

  return {
    security: {
      overall: avgLoadTime < 2 ? 'excellent' : avgLoadTime < 3 ? 'good' : avgLoadTime < 4 ? 'warning' : 'critical' as 'excellent' | 'good' | 'warning' | 'critical',
      https: Math.random() > 0.2,
      headers: {
        hsts: Math.random() > 0.3,
        csp: Math.random() > 0.4,
        xframe: Math.random() > 0.3,
        xss: Math.random() > 0.2,
      },
      issues: [
        {
          type: 'warning' as const,
          title: 'Content Security Policy ausente',
          description: 'O header CSP ajuda a prevenir ataques XSS e injeção de código.',
        },
        {
          type: 'info' as const,
          title: 'Certificado SSL válido',
          description: 'O site utiliza HTTPS com certificado válido.',
        },
      ],
    },
    locations: locationData,
  };
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [analyzedUrl, setAnalyzedUrl] = useState('');

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    setAnalyzedUrl(url);
    
    // Simula tempo de análise
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockData = generateMockData(url);
    setAnalysisData(mockData);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <URLInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-700">Analisando {analyzedUrl}</h3>
              <p className="text-gray-600 mt-2">
                Executando testes de performance e segurança em múltiplas localizações...
              </p>
              <div className="flex justify-center mt-4 space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
          
          {analysisData && !isLoading && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Relatório de Análise: {analyzedUrl}
                </h2>
                <p className="text-gray-600 mb-4">
                  Análise completa finalizada em {new Date().toLocaleString('pt-BR')}
                </p>
                
                {/* Botão de exportação PDF */}
                <div className="flex justify-center mb-6">
                  <PDFExporter analysisData={analysisData} url={analyzedUrl} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SecurityAnalysis data={analysisData.security} url={analyzedUrl} />
                <GlobalMap data={analysisData.locations} />
              </div>

              {/* Componentes de análise avançada */}
              <div className="space-y-8">
                <VulnerabilityTester url={analyzedUrl} />
                <PerformanceRecommendations url={analyzedUrl} />
              </div>
              
              <div className="text-center py-8 bg-white rounded-lg card-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Quer analisar outro site?
                </h3>
                <p className="text-gray-600 mb-4">
                  Insira uma nova URL acima para iniciar uma nova análise.
                </p>
              </div>
            </div>
          )}
          
          {!analysisData && !isLoading && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 gradient-bg rounded-full flex items-center justify-center">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Pronto para começar!
                </h3>
                <p className="text-gray-600">
                  Insira a URL do site que você deseja analisar no formulário acima. 
                  Nossa ferramenta irá testar a performance e segurança em múltiplas localizações globais.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            © 2024 WebSec Analyzer - Análise profissional de performance e segurança web
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
