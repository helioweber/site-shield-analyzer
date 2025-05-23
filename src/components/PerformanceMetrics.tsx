
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer, Zap, Shield, TrendingUp } from 'lucide-react';

interface PerformanceData {
  loadTime: number;
  pageSize: number;
  requests: number;
  performanceScore: number;
}

interface PerformanceMetricsProps {
  data: PerformanceData;
}

const PerformanceMetrics = ({ data }: PerformanceMetricsProps) => {
  const getScoreClass = (score: number) => {
    if (score >= 90) return 'performance-excellent';
    if (score >= 70) return 'performance-good';
    if (score >= 50) return 'performance-average';
    return 'performance-poor';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excelente';
    if (score >= 70) return 'Bom';
    if (score >= 50) return 'Regular';
    return 'Precisa melhorar';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="card-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tempo de Carregamento</CardTitle>
          <Timer className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.loadTime}s</div>
          <p className="text-xs text-muted-foreground">
            {data.loadTime < 2 ? 'Muito rápido' : data.loadTime < 4 ? 'Razoável' : 'Lento'}
          </p>
        </CardContent>
      </Card>

      <Card className="card-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tamanho da Página</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{(data.pageSize / 1024).toFixed(1)}MB</div>
          <p className="text-xs text-muted-foreground">
            {data.pageSize < 1024 * 1024 ? 'Otimizado' : 'Pode ser otimizado'}
          </p>
        </CardContent>
      </Card>

      <Card className="card-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Requisições HTTP</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.requests}</div>
          <p className="text-xs text-muted-foreground">
            {data.requests < 50 ? 'Ótimo' : data.requests < 100 ? 'Bom' : 'Muitas requisições'}
          </p>
        </CardContent>
      </Card>

      <Card className="card-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Score de Performance</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold inline-block px-3 py-1 rounded-lg border ${getScoreClass(data.performanceScore)}`}>
            {data.performanceScore}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {getScoreLabel(data.performanceScore)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
