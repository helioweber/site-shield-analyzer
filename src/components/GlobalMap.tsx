
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, TrendingUp, Globe } from 'lucide-react';

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

  // Função melhorada para converter coordenadas
  const projectCoordinates = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 800 + 50;
    const y = ((90 - lat) / 180) * 400 + 50;
    return { x, y };
  };

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="w-5 h-5" />
          <span>Performance Global</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Mapa mundial melhorado */}
        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl overflow-hidden mb-6 border-2 border-blue-200">
          <svg
            viewBox="0 0 900 500"
            className="w-full h-80"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Fundo do oceano */}
            <rect width="900" height="500" fill="url(#oceanGradient)" />
            
            {/* Gradientes */}
            <defs>
              <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#bfdbfe" />
                <stop offset="100%" stopColor="#93c5fd" />
              </linearGradient>
              <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <filter id="dropShadow">
                <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.3)"/>
              </filter>
            </defs>

            {/* Continentes redesenhados com mais detalhes */}
            {/* América do Norte */}
            <path
              d="M 100 80 L 80 60 L 60 70 L 50 90 L 45 120 L 60 150 L 90 170 L 130 160 L 170 140 L 200 120 L 220 100 L 210 80 L 180 70 L 150 75 Z"
              fill="url(#landGradient)"
              stroke="#047857"
              strokeWidth="2"
              filter="url(#dropShadow)"
            />
            
            {/* América do Sul */}
            <path
              d="M 150 200 L 130 180 L 120 200 L 125 240 L 140 280 L 160 320 L 180 340 L 200 320 L 210 280 L 205 240 L 190 200 Z"
              fill="url(#landGradient)"
              stroke="#047857"
              strokeWidth="2"
              filter="url(#dropShadow)"
            />
            
            {/* Europa */}
            <path
              d="M 420 80 L 400 70 L 380 75 L 385 95 L 400 110 L 430 120 L 460 115 L 480 100 L 475 85 L 450 75 Z"
              fill="url(#landGradient)"
              stroke="#047857"
              strokeWidth="2"
              filter="url(#dropShadow)"
            />
            
            {/* África */}
            <path
              d="M 420 140 L 400 130 L 380 140 L 375 180 L 385 220 L 400 260 L 430 280 L 460 270 L 485 250 L 490 210 L 480 170 L 460 150 Z"
              fill="url(#landGradient)"
              stroke="#047857"
              strokeWidth="2"
              filter="url(#dropShadow)"
            />
            
            {/* Ásia */}
            <path
              d="M 500 60 L 480 50 L 460 65 L 470 90 L 490 120 L 530 140 L 580 150 L 630 130 L 680 120 L 720 110 L 740 90 L 730 70 L 700 60 L 650 55 L 600 50 Z"
              fill="url(#landGradient)"
              stroke="#047857"
              strokeWidth="2"
              filter="url(#dropShadow)"
            />
            
            {/* Oceania */}
            <path
              d="M 700 280 L 680 270 L 670 280 L 675 300 L 690 310 L 720 315 L 750 310 L 760 295 L 750 280 Z"
              fill="url(#landGradient)"
              stroke="#047857"
              strokeWidth="2"
              filter="url(#dropShadow)"
            />

            {/* Grid lines sutis */}
            <defs>
              <pattern id="grid" width="50" height="25" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 25" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="900" height="500" fill="url(#grid)" />

            {/* Pontos de localização melhorados */}
            {data.map((location, index) => {
              const { x, y } = projectCoordinates(location.coords.lat, location.coords.lng);
              const colors = {
                'excellent': '#10b981',
                'good': '#3b82f6',
                'average': '#f59e0b',
                'poor': '#ef4444'
              };
              
              return (
                <g key={index}>
                  {/* Círculo pulsante */}
                  <circle
                    cx={x}
                    cy={y}
                    r="15"
                    fill={colors[location.status]}
                    opacity="0.2"
                    className="animate-pulse"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="10"
                    fill={colors[location.status]}
                    opacity="0.4"
                    className="animate-pulse"
                    style={{ animationDelay: '0.5s' }}
                  />
                  
                  {/* Ponto principal */}
                  <circle
                    cx={x}
                    cy={y}
                    r="6"
                    fill={colors[location.status]}
                    stroke="white"
                    strokeWidth="3"
                    filter="url(#dropShadow)"
                  />
                  
                  {/* Label da cidade com fundo */}
                  <rect
                    x={x - 25}
                    y={y - 35}
                    width="50"
                    height="16"
                    fill="rgba(0,0,0,0.8)"
                    rx="8"
                  />
                  <text
                    x={x}
                    y={y - 25}
                    textAnchor="middle"
                    className="text-xs font-bold fill-white"
                    style={{ fontSize: '11px' }}
                  >
                    {location.city}
                  </text>
                  
                  {/* Tempo de carregamento */}
                  <rect
                    x={x - 15}
                    y={y + 10}
                    width="30"
                    height="14"
                    fill="rgba(255,255,255,0.9)"
                    rx="7"
                    stroke={colors[location.status]}
                    strokeWidth="1"
                  />
                  <text
                    x={x}
                    y={y + 20}
                    textAnchor="middle"
                    className="text-xs font-bold"
                    style={{ fontSize: '10px', fill: colors[location.status] }}
                  >
                    {location.loadTime}s
                  </text>
                </g>
              );
            })}
          </svg>
          
          {/* Legenda aprimorada */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border-2 border-white/50">
            <h4 className="text-sm font-bold mb-3 text-gray-800 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Performance por Região
            </h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-md"></div>
                <span className="text-gray-700 font-medium">Excelente (&lt; 1s)</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-md"></div>
                <span className="text-gray-700 font-medium">Bom (1-2s)</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-white shadow-md"></div>
                <span className="text-gray-700 font-medium">Regular (2-4s)</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-md"></div>
                <span className="text-gray-700 font-medium">Lento (&gt; 4s)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de resultados melhorada */}
        <div className="space-y-4">
          <h4 className="font-bold text-lg text-gray-800 flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Resultados Detalhados por Região</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((location, index) => (
              <div key={index} className="bg-white rounded-xl p-5 border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h5 className="font-bold text-base text-gray-800">{location.city}</h5>
                    <p className="text-sm text-gray-600">{location.country} • {location.region}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(location.status)} text-white border-none px-3 py-1 text-xs font-bold shadow-md`}
                  >
                    {getStatusLabel(location.status)}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="font-bold text-2xl text-gray-800">{location.loadTime}s</span>
                    <p className="text-xs text-gray-500">tempo de resposta</p>
                  </div>
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
