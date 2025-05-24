
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Shield, ExternalLink, Clock, Target } from 'lucide-react';

interface SecurityData {
  overall: 'excellent' | 'good' | 'warning' | 'critical';
  https: boolean;
  headers: {
    hsts: boolean;
    csp: boolean;
    xframe: boolean;
    xss: boolean;
  };
  issues: Array<{
    type: 'critical' | 'warning' | 'info' | 'success';
    title: string;
    description: string;
  }>;
}

interface SecurityRecommendationsProps {
  data: SecurityData;
  url: string;
}

const SecurityRecommendations = ({ data, url }: SecurityRecommendationsProps) => {
  const generateRecommendations = () => {
    const recommendations = [];
    
    // Verificar HTTPS
    if (!data.https) {
      recommendations.push({
        priority: 'critical',
        title: 'Implementar HTTPS Imediatamente',
        description: 'Seu site não está usando HTTPS, expondo dados a interceptação.',
        action: 'Obtenha um certificado SSL/TLS (gratuito via Let\'s Encrypt)',
        timeToFix: '1-2 horas',
        impact: 'Crítico - Protege dados em trânsito e melhora SEO',
        owaspRef: 'A02:2021 – Cryptographic Failures',
        implementation: [
          'Configure certificado SSL no servidor',
          'Redirecione todo tráfego HTTP para HTTPS',
          'Atualize todos os links internos para HTTPS'
        ]
      });
    }

    // Verificar HSTS
    if (!data.headers.hsts && data.https) {
      recommendations.push({
        priority: 'high',
        title: 'Configurar HTTP Strict Transport Security (HSTS)',
        description: 'HSTS força conexões HTTPS e previne ataques de downgrade.',
        action: 'Adicionar header: Strict-Transport-Security: max-age=31536000; includeSubDomains',
        timeToFix: '30 minutos',
        impact: 'Alto - Previne ataques man-in-the-middle',
        owaspRef: 'A02:2021 – Cryptographic Failures',
        implementation: [
          'Adicionar header no servidor web',
          'Configurar max-age para 1 ano',
          'Incluir subdomínios na proteção'
        ]
      });
    }

    // Verificar CSP
    if (!data.headers.csp) {
      recommendations.push({
        priority: 'critical',
        title: 'Implementar Content Security Policy (CSP)',
        description: 'CSP é essencial para prevenir ataques XSS e injeção de código.',
        action: 'Configurar CSP restritivo baseado nos recursos utilizados',
        timeToFix: '2-4 horas',
        impact: 'Crítico - Principal defesa contra XSS',
        owaspRef: 'A03:2021 – Injection',
        implementation: [
          'Analisar recursos externos utilizados',
          'Criar política restritiva inicial',
          'Testar e ajustar conforme necessário',
          'Implementar em modo report-only primeiro'
        ]
      });
    }

    // Verificar X-Frame-Options
    if (!data.headers.xframe) {
      recommendations.push({
        priority: 'medium',
        title: 'Configurar X-Frame-Options',
        description: 'Previne que seu site seja incorporado em iframes maliciosos.',
        action: 'Adicionar header: X-Frame-Options: DENY ou SAMEORIGIN',
        timeToFix: '15 minutos',
        impact: 'Médio - Previne ataques de clickjacking',
        owaspRef: 'A04:2021 – Insecure Design',
        implementation: [
          'Adicionar header X-Frame-Options: DENY',
          'Use SAMEORIGIN se precisar de iframes internos',
          'Considere usar frame-ancestors no CSP também'
        ]
      });
    }

    // Verificar XSS Protection
    if (!data.headers.xss) {
      recommendations.push({
        priority: 'medium',
        title: 'Ativar X-XSS-Protection',
        description: 'Header adicional de proteção contra XSS em navegadores legados.',
        action: 'Adicionar header: X-XSS-Protection: 1; mode=block',
        timeToFix: '10 minutos',
        impact: 'Médio - Proteção adicional contra XSS',
        owaspRef: 'A03:2021 – Injection',
        implementation: [
          'Adicionar header X-XSS-Protection: 1; mode=block',
          'Verificar compatibilidade com navegadores',
          'CSP é mais importante que este header'
        ]
      });
    }

    // Headers adicionais recomendados
    recommendations.push({
      priority: 'medium',
      title: 'Adicionar Headers de Segurança Complementares',
      description: 'Headers adicionais que melhoram a postura de segurança.',
      action: 'Implementar X-Content-Type-Options, Referrer-Policy e Permissions-Policy',
      timeToFix: '30 minutos',
      impact: 'Médio - Defesa em profundidade',
      owaspRef: 'A04:2021 – Insecure Design',
      implementation: [
        'X-Content-Type-Options: nosniff',
        'Referrer-Policy: strict-origin-when-cross-origin',
        'Permissions-Policy: geolocation=(), microphone=(), camera=()'
      ]
    });

    // Baseado no score geral, adicionar recomendações específicas
    if (data.overall === 'critical' || data.overall === 'warning') {
      recommendations.push({
        priority: 'high',
        title: 'Auditoria de Segurança Completa',
        description: 'Score de segurança baixo indica necessidade de revisão completa.',
        action: 'Realizar auditoria detalhada de todas as configurações de segurança',
        timeToFix: '1-2 dias',
        impact: 'Alto - Melhoria geral da postura de segurança',
        owaspRef: 'OWASP ASVS',
        implementation: [
          'Revisar todas as configurações do servidor',
          'Implementar monitoramento de segurança',
          'Configurar logs de auditoria',
          'Estabelecer processo de atualizações'
        ]
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { 'critical': 0, 'high': 1, 'medium': 2, 'low': 3 };
      return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
    });
  };

  const recommendations = generateRecommendations();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'critical': return 'Crítica';
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return 'Indefinida';
    }
  };

  const getImpactIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'high': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'medium': return <Shield className="w-4 h-4 text-yellow-600" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default: return <Shield className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-5 h-5" />
          <span>Recomendações de Segurança Personalizadas</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
            <strong>Análise personalizada</strong> para {url} - {recommendations.length} recomendações baseadas nos problemas identificados
          </div>

          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getImpactIcon(rec.priority)}
                    <h4 className="font-semibold text-sm">{rec.title}</h4>
                    <Badge className={`${getPriorityColor(rec.priority)} border-none px-2 py-1 text-xs`}>
                      Prioridade {getPriorityText(rec.priority)}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{rec.timeToFix}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-3">{rec.description}</p>

                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-xs text-gray-700 mb-1">Ação Requerida:</h5>
                    <p className="text-xs bg-blue-50 p-2 rounded border border-blue-200 text-blue-800">
                      {rec.action}
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium text-xs text-gray-700 mb-1">Passos de Implementação:</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {rec.implementation.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start space-x-2">
                          <span className="font-medium text-blue-600 mt-0.5">•</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-xs text-gray-700 mb-1">Impacto na Segurança:</h5>
                    <p className="text-xs bg-green-50 p-2 rounded border border-green-200 text-green-800">
                      {rec.impact}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center space-x-2">
                      <ExternalLink className="w-3 h-3 text-blue-600" />
                      <span className="text-xs text-blue-600 font-medium">{rec.owaspRef}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {rec.priority === 'critical' ? '🔥 Urgente' : 
                       rec.priority === 'high' ? '⚡ Importante' :
                       rec.priority === 'medium' ? '📋 Planejado' : '💡 Melhoria'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="font-semibold text-sm text-gray-800 mb-2">Próximos Passos Recomendados:</h4>
            <ol className="text-xs text-gray-700 space-y-1">
              <li className="flex items-start space-x-2">
                <span className="font-bold text-red-600">1.</span>
                <span>Priorize items marcados como "Crítica" e "Alta" prioridade</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-orange-600">2.</span>
                <span>Teste cada implementação em ambiente de desenvolvimento primeiro</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-yellow-600">3.</span>
                <span>Monitore logs após implementação para verificar problemas</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-green-600">4.</span>
                <span>Execute nova análise após implementar as correções</span>
              </li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityRecommendations;
