
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, CheckCircle, ExternalLink, Globe, Lock, Key, Eye } from 'lucide-react';

interface SecurityBestPracticesProps {
  url: string;
}

const SecurityBestPractices = ({ url }: SecurityBestPracticesProps) => {
  const [activeSection, setActiveSection] = useState<'headers' | 'waf' | null>(null);

  const headersPractices = [
    {
      header: 'Content-Security-Policy (CSP)',
      status: 'critical',
      description: 'Previne ataques XSS definindo quais recursos podem ser carregados',
      recommendation: 'Content-Security-Policy: default-src \'self\'; script-src \'self\' \'unsafe-inline\'; style-src \'self\' \'unsafe-inline\';',
      impact: 'Reduz significativamente o risco de ataques XSS e injeção de código malicioso',
      owaspRef: 'OWASP Top 10 2021 - A03: Injection'
    },
    {
      header: 'Strict-Transport-Security (HSTS)',
      status: 'high',
      description: 'Força conexões HTTPS e previne downgrade attacks',
      recommendation: 'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
      impact: 'Protege contra ataques man-in-the-middle e session hijacking',
      owaspRef: 'OWASP Top 10 2021 - A02: Cryptographic Failures'
    },
    {
      header: 'X-Frame-Options',
      status: 'medium',
      description: 'Previne ataques de clickjacking',
      recommendation: 'X-Frame-Options: DENY ou X-Frame-Options: SAMEORIGIN',
      impact: 'Impede que o site seja carregado em iframes maliciosos',
      owaspRef: 'OWASP Top 10 2021 - A04: Insecure Design'
    },
    {
      header: 'X-Content-Type-Options',
      status: 'medium',
      description: 'Previne MIME type sniffing attacks',
      recommendation: 'X-Content-Type-Options: nosniff',
      impact: 'Força o navegador a respeitar o Content-Type declarado',
      owaspRef: 'OWASP Top 10 2021 - A03: Injection'
    },
    {
      header: 'Referrer-Policy',
      status: 'low',
      description: 'Controla informações de referrer enviadas em requests',
      recommendation: 'Referrer-Policy: strict-origin-when-cross-origin',
      impact: 'Protege informações sensíveis na URL de vazamentos',
      owaspRef: 'OWASP Top 10 2021 - A01: Broken Access Control'
    },
    {
      header: 'Permissions-Policy',
      status: 'medium',
      description: 'Controla acesso a APIs sensíveis do navegador',
      recommendation: 'Permissions-Policy: geolocation=(), microphone=(), camera=()',
      impact: 'Previne uso não autorizado de recursos do dispositivo',
      owaspRef: 'OWASP Top 10 2021 - A04: Insecure Design'
    }
  ];

  const wafPractices = [
    {
      title: 'Rate Limiting',
      status: 'critical',
      description: 'Implementar limitação de taxa para prevenir ataques DDoS e brute force',
      implementation: 'Configure limite de 100 requests por minuto por IP',
      benefit: 'Protege contra ataques automatizados e sobrecarga do servidor',
      owaspRef: 'OWASP Top 10 2021 - A07: Identification and Authentication Failures'
    },
    {
      title: 'SQL Injection Protection',
      status: 'critical',
      description: 'Filtros avançados para detectar e bloquear tentativas de SQL injection',
      implementation: 'Bloqueio de padrões como UNION SELECT, DROP TABLE, etc.',
      benefit: 'Previne acesso não autorizado ao banco de dados',
      owaspRef: 'OWASP Top 10 2021 - A03: Injection'
    },
    {
      title: 'XSS Protection',
      status: 'high',
      description: 'Detecção e sanitização de scripts maliciosos em inputs',
      implementation: 'Filtros para <script>, javascript:, data: URIs maliciosos',
      benefit: 'Impede execução de código JavaScript malicioso',
      owaspRef: 'OWASP Top 10 2021 - A03: Injection'
    },
    {
      title: 'File Upload Security',
      status: 'high',
      description: 'Validação rigorosa de tipos de arquivo e conteúdo',
      implementation: 'Verificação de MIME type, extensões permitidas e scan de malware',
      benefit: 'Previne upload de arquivos maliciosos',
      owaspRef: 'OWASP Top 10 2021 - A08: Software and Data Integrity Failures'
    },
    {
      title: 'Geographic Blocking',
      status: 'medium',
      description: 'Bloqueio baseado em localização geográfica de IPs suspeitos',
      implementation: 'Configurar lista de países/regiões bloqueadas',
      benefit: 'Reduz ataques de regiões com alta atividade maliciosa',
      owaspRef: 'OWASP Top 10 2021 - A01: Broken Access Control'
    },
    {
      title: 'Bot Detection',
      status: 'medium',
      description: 'Identificação e bloqueio de bots maliciosos',
      implementation: 'Análise de padrões de comportamento e User-Agent',
      benefit: 'Protege contra scraping e ataques automatizados',
      owaspRef: 'OWASP Top 10 2021 - A04: Insecure Design'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'critical': return 'Crítico';
      case 'high': return 'Alto';
      case 'medium': return 'Médio';
      case 'low': return 'Baixo';
      default: return 'Desconhecido';
    }
  };

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>Boas Práticas de Segurança</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
            <strong>Recomendações personalizadas</strong> para melhorar a segurança do site {url}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => setActiveSection(activeSection === 'headers' ? null : 'headers')}
              variant="outline"
              className="h-auto p-4 flex-col items-start space-y-2"
            >
              <div className="flex items-center space-x-2">
                <Lock className="w-5 h-5" />
                <span className="font-semibold">Security Headers</span>
              </div>
              <p className="text-xs text-gray-600 text-left">
                Configure headers HTTP para proteção avançada
              </p>
            </Button>

            <Button
              onClick={() => setActiveSection(activeSection === 'waf' ? null : 'waf')}
              variant="outline"
              className="h-auto p-4 flex-col items-start space-y-2"
            >
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span className="font-semibold">WAF Configuration</span>
              </div>
              <p className="text-xs text-gray-600 text-left">
                Configurações de Web Application Firewall
              </p>
            </Button>
          </div>

          {activeSection === 'headers' && (
            <div className="space-y-4 mt-6">
              <h4 className="font-semibold text-lg text-gray-800 flex items-center space-x-2">
                <Lock className="w-5 h-5" />
                <span>Security Headers Recomendados</span>
              </h4>
              
              {headersPractices.map((practice, index) => (
                <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h5 className="font-semibold text-sm">{practice.header}</h5>
                        <Badge className={`${getStatusColor(practice.status)} border-none px-2 py-1 text-xs`}>
                          {getStatusText(practice.status)}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">{practice.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-xs">
                    <div>
                      <h6 className="font-medium text-gray-700 mb-1">Implementação:</h6>
                      <code className="bg-gray-100 border p-2 rounded block text-gray-800 break-all">
                        {practice.recommendation}
                      </code>
                    </div>
                    
                    <div>
                      <h6 className="font-medium text-gray-700 mb-1">Benefício:</h6>
                      <p className="text-gray-600 bg-green-50 p-2 rounded border border-green-200">
                        {practice.impact}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-2 border-t">
                      <ExternalLink className="w-3 h-3 text-blue-600" />
                      <span className="text-blue-600 font-medium">{practice.owaspRef}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'waf' && (
            <div className="space-y-4 mt-6">
              <h4 className="font-semibold text-lg text-gray-800 flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Configurações de WAF Recomendadas</span>
              </h4>
              
              {wafPractices.map((practice, index) => (
                <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h5 className="font-semibold text-sm">{practice.title}</h5>
                        <Badge className={`${getStatusColor(practice.status)} border-none px-2 py-1 text-xs`}>
                          Prioridade {getStatusText(practice.status)}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">{practice.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-xs">
                    <div>
                      <h6 className="font-medium text-gray-700 mb-1">Como Implementar:</h6>
                      <p className="bg-blue-50 border border-blue-200 p-2 rounded text-gray-800">
                        {practice.implementation}
                      </p>
                    </div>
                    
                    <div>
                      <h6 className="font-medium text-gray-700 mb-1">Benefício de Segurança:</h6>
                      <p className="text-gray-600 bg-green-50 p-2 rounded border border-green-200">
                        {practice.benefit}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-2 border-t">
                      <ExternalLink className="w-3 h-3 text-blue-600" />
                      <span className="text-blue-600 font-medium">{practice.owaspRef}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <h6 className="font-semibold text-sm text-yellow-800">Importante</h6>
                </div>
                <p className="text-xs text-yellow-700">
                  As configurações de WAF devem ser testadas em ambiente de desenvolvimento antes da implementação em produção. 
                  Configurações muito restritivas podem bloquear tráfego legítimo.
                </p>
              </div>
            </div>
          )}

          {!activeSection && (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <Eye className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 text-sm">
                Selecione uma categoria acima para ver as recomendações detalhadas de segurança
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityBestPractices;
