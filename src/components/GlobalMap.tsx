
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, TrendingUp } from 'lucide-react';

interface LocationData {
  city: string;
  country: string;
  region: string;
  loadTime: number;
  status: 'excellent' | 'good' | 'average' | 'poor';
  coords: { lat: number; lng: number };
}

interface GlobalMapProps {
  data: LocationData[];
}

const GlobalMap = ({ data }: GlobalMapProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'average': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'excellent': return 'Excelente';
      case 'good': return 'Bom';
      case 'average': return 'Regular';
      case 'poor': return 'Lento';
      default: return 'Desconhecido';
    }
  };

  // Função para converter coordenadas geográficas para posições no SVG
  const projectCoordinates = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 900;
    const y = ((90 - lat) / 180) * 450;
    return { x, y };
  };

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5" />
          <span>Performance Global</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Mapa mundial SVG */}
        <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg overflow-hidden mb-6 border border-gray-200">
          <svg
            viewBox="0 0 900 450"
            className="w-full h-64 md:h-80"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Continentes simplificados */}
            {/* América do Norte */}
            <path
              d="M150 80 L120 60 L100 70 L90 90 L100 120 L130 140 L170 130 L190 100 L180 80 Z"
              fill="#e2e8f0"
              stroke="#94a3b8"
              strokeWidth="1"
            />
            {/* América do Sul */}
            <path
              d="M170 180 L150 160 L140 180 L150 220 L170 260 L190 240 L185 200 Z"
              fill="#e2e8f0"
              stroke="#94a3b8"
              strokeWidth="1"
            />
            {/* Europa */}
            <path
              d="M420 80 L400 70 L390 80 L400 100 L430 110 L450 90 L440 75 Z"
              fill="#e2e8f0"
              stroke="#94a3b8"
              strokeWidth="1"
            />
            {/* África */}
            <path
              d="M420 130 L400 120 L390 140 L400 200 L430 220 L450 200 L440 150 Z"
              fill="#e2e8f0"
              stroke="#94a3b8"
              strokeWidth="1"
            />
            {/* Ásia */}
            <path
              d="M500 60 L480 50 L460 70 L480 120 L550 130 L600 100 L580 60 Z"
              fill="#e2e8f0"
              stroke="#94a3b8"
              strokeWidth="1"
            />
            {/* Oceania */}
            <path
              d="M650 220 L640 210 L630 220 L640 240 L660 245 L670 230 Z"
              fill="#e2e8f0"
              stroke="#94a3b8"
              strokeWidth="1"
            />

            {/* Linhas de grade */}
            <defs>
              <pattern id="grid" width="45" height="22.5" patternUnits="userSpaceOnUse">
                <path d="M 45 0 L 0 0 0 22.5" fill="none" stroke="#cbd5e1" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="900" height="450" fill="url(#grid)" />

            {/* Pontos de teste */}
            {data.map((location, index) => {
              const { x, y } = projectCoordinates(location.coords.lat, location.coords.lng);
              const statusColor = getStatusColor(location.status).replace('bg-', '');
              
              return (
                <g key={index}>
                  {/* Círculo pulsante */}
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill={`rgb(var(--${statusColor}-500))`}
                    className="animate-pulse"
                    opacity="0.6"
                  />
                  {/* Ponto principal */}
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill={statusColor === 'green-500' ? '#10b981' : 
                          statusColor === 'blue-500' ? '#3b82f6' :
                          statusColor === 'yellow-500' ? '#f59e0b' : '#ef4444'}
                    stroke="white"
                    strokeWidth="2"
                  />
                  {/* Label da cidade */}
                  <text
                    x={x}
                    y={y - 15}
                    textAnchor="middle"
                    className="text-xs font-medium fill-gray-700"
                    style={{ fontSize: '10px' }}
                  >
                    {location.city}
                  </text>
                  {/* Tempo de carregamento */}
                  <text
                    x={x}
                    y={y + 20}
                    textAnchor="middle"
                    className="text-xs fill-gray-600"
                    style={{ fontSize: '9px' }}
                  >
                    {location.loadTime}s
                  </text>
                </g>
              );
            })}
          </svg>
          
          {/* Legenda do mapa */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border">
            <h4 className="text-sm font-semibold mb-3 text-gray-800">Legenda de Performance</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-3 h-3 rounded-full bg-green-500 border border-white shadow-sm"></div>
                <span className="text-gray-700">Excelente (&lt; 1s)</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-3 h-3 rounded-full bg-blue-500 border border-white shadow-sm"></div>
                <span className="text-gray-700">Bom (1-2s)</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-3 h-3 rounded-full bg-yellow-500 border border-white shadow-sm"></div>
                <span className="text-gray-700">Regular (2-4s)</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-3 h-3 rounded-full bg-red-500 border border-white shadow-sm"></div>
                <span className="text-gray-700">Lento (&gt; 4s)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de resultados por localização */}
        <div className="space-y-4">
          <h4 className="font-semibold text-base text-gray-800 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Resultados Detalhados por Região</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((location, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h5 className="font-semibold text-sm text-gray-800">{location.city}</h5>
                    <p className="text-xs text-gray-600">{location.country} • {location.region}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(location.status)} text-white border-none px-2 py-1 text-xs font-medium`}
                  >
                    {getStatusLabel(location.status)}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-bold text-lg text-gray-800">{location.loadTime}s</span>
                  <span className="text-xs text-gray-500">tempo de resposta</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalMap;
