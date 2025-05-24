import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldCheck, AlertTriangle, ShieldOff } from 'lucide-react';
import VulnerabilityTester from './VulnerabilityTester';
import SecurityBestPractices from './SecurityBestPractices';

interface SecurityIssue {
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
}

interface SecurityData {
  overall: 'excellent' | 'good' | 'warning' | 'critical';
  https: boolean;
  headers: {
    hsts: boolean;
    csp: boolean;
    xframe: boolean;
    xss: boolean;
  };
  issues: SecurityIssue[];
}

interface SecurityAnalysisProps {
  data: SecurityData;
  url?: string;
}

const SecurityAnalysis = ({ data, url }: SecurityAnalysisProps) => {
  const getSecurityIcon = (level: string) => {
    switch (level) {
      case 'excellent': return <ShieldCheck className="w-5 h-5 text-green-600" />;
      case 'good': return <Shield className="w-5 h-5 text-blue-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'critical': return <ShieldOff className="w-5 h-5 text-red-600" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  const getSecurityClass = (level: string) => {
    switch (level) {
      case 'excellent': return 'performance-excellent';
      case 'good': return 'performance-good';
      case 'warning': return 'performance-average';
      case 'critical': return 'performance-poor';
      default: return '';
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'warning': return 'outline';
      case 'success': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Análise de Segurança existente */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {getSecurityIcon(data.overall)}
            <span>Análise de Segurança</span>
            <div className={`px-3 py-1 rounded-lg border text-sm font-medium ${getSecurityClass(data.overall)}`}>
              {data.overall === 'excellent' && 'Excelente'}
              {data.overall === 'good' && 'Boa'}
              {data.overall === 'warning' && 'Atenção'}
              {data.overall === 'critical' && 'Crítica'}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-gray-700">HTTPS & Certificados</h4>
              <div className="flex items-center space-x-2">
                {data.https ? (
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                ) : (
                  <ShieldOff className="w-4 h-4 text-red-600" />
                )}
                <span className="text-sm">
                  {data.https ? 'Conexão HTTPS ativa' : 'HTTPS não configurado'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-gray-700">Headers de Segurança</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-1">
                  {data.headers.hsts ? (
                    <ShieldCheck className="w-3 h-3 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-red-600" />
                  )}
                  <span className="text-xs">HSTS</span>
                </div>
                <div className="flex items-center space-x-1">
                  {data.headers.csp ? (
                    <ShieldCheck className="w-3 h-3 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-red-600" />
                  )}
                  <span className="text-xs">CSP</span>
                </div>
                <div className="flex items-center space-x-1">
                  {data.headers.xframe ? (
                    <ShieldCheck className="w-3 h-3 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-red-600" />
                  )}
                  <span className="text-xs">X-Frame</span>
                </div>
                <div className="flex items-center space-x-1">
                  {data.headers.xss ? (
                    <ShieldCheck className="w-3 h-3 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-red-600" />
                  )}
                  <span className="text-xs">XSS Protection</span>
                </div>
              </div>
            </div>
          </div>

          {data.issues.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-3">Problemas Identificados</h4>
              <div className="space-y-2">
                {data.issues.map((issue, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Badge variant={getBadgeVariant(issue.type)} className="mt-0.5">
                      {issue.type === 'critical' && 'Crítico'}
                      {issue.type === 'warning' && 'Atenção'}
                      {issue.type === 'info' && 'Info'}
                      {issue.type === 'success' && 'OK'}
                    </Badge>
                    <div>
                      <h5 className="font-medium text-sm">{issue.title}</h5>
                      <p className="text-xs text-gray-600">{issue.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Teste de vulnerabilidades */}
      {url && <VulnerabilityTester url={url} />}
      
      {/* Novo componente de boas práticas */}
      {url && <SecurityBestPractices url={url} />}
    </div>
  );
};

export default SecurityAnalysis;
