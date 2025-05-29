
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
          <p className="text-xs text-blue-600 mt-1">Dados simulados de múltiplas localizações</p>
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
          <p className="text-xs text-orange-600 mt-1">Estimativa baseada em headers</p>
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
          <p className="text-xs text-orange-600 mt-1">Estimativa (apenas HEAD request)</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
