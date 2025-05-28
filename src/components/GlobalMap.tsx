
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
        {/* Mapa mundial com SVG da Wikimedia */}
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

            {/* SVG do mapa mundial da Wikimedia simplificado */}
            <g transform="scale(0.45) translate(100, 50)" fill="url(#landGradient)" stroke="#047857" strokeWidth="3" filter="url(#dropShadow)">
              {/* América do Norte */}
              <path d="M 200 150 L 180 120 L 150 110 L 120 120 L 100 140 L 90 170 L 100 200 L 130 230 L 170 250 L 220 240 L 270 220 L 320 200 L 350 180 L 340 160 L 310 140 L 280 135 L 240 140 Z" />
              
              {/* América do Sul */}
              <path d="M 250 280 L 230 260 L 220 280 L 225 340 L 240 400 L 270 460 L 300 480 L 330 460 L 345 400 L 340 340 L 325 280 Z" />
              
              {/* Groenlândia */}
              <path d="M 350 80 L 330 70 L 320 85 L 325 105 L 340 120 L 365 115 L 380 100 L 375 85 Z" />
              
              {/* Europa */}
              <path d="M 480 160 L 460 140 L 440 145 L 445 170 L 460 190 L 490 200 L 520 195 L 540 180 L 535 165 L 510 150 Z" />
              
              {/* África */}
              <path d="M 480 220 L 460 210 L 440 220 L 435 280 L 445 340 L 460 400 L 490 420 L 520 410 L 545 390 L 550 330 L 540 270 L 520 230 Z" />
              
              {/* Ásia */}
              <path d="M 560 100 L 540 90 L 520 105 L 530 140 L 560 170 L 620 190 L 680 200 L 740 190 L 800 180 L 840 170 L 860 150 L 850 130 L 820 120 L 780 110 L 720 100 L 680 95 L 620 90 Z" />
              
              {/* Índia */}
              <path d="M 680 240 L 660 230 L 650 250 L 655 280 L 670 300 L 700 305 L 720 295 L 715 275 L 700 250 Z" />
              
              {/* China */}
              <path d="M 740 160 L 720 150 L 700 165 L 710 190 L 730 210 L 770 215 L 810 205 L 830 185 L 825 170 L 800 155 Z" />
              
              {/* Austrália */}
              <path d="M 780 360 L 760 350 L 750 365 L 755 385 L 770 395 L 810 400 L 850 395 L 870 380 L 865 365 L 840 355 Z" />
              
              {/* Japão */}
              <path d="M 880 190 L 870 180 L 865 195 L 870 210 L 885 215 L 895 205 L 890 190 Z" />
              
              {/* Reino Unido */}
              <path d="M 445 150 L 435 140 L 430 155 L 435 170 L 450 175 L 460 165 L 455 150 Z" />
              
              {/* Escandinávia */}
              <path d="M 500 100 L 485 85 L 480 110 L 490 140 L 510 145 L 525 130 L 520 105 Z" />
              
              {/* Madagascar */}
              <path d="M 580 380 L 575 370 L 570 385 L 575 405 L 585 410 L 590 395 L 585 380 Z" />
              
              {/* Nova Zelândia */}
              <path d="M 920 420 L 910 410 L 905 425 L 910 440 L 925 445 L 935 435 L 930 420 Z" />
            </g>

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
