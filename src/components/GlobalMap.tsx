
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

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5" />
          <span>Performance Global</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Mapa simplificado visual */}
        <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg h-64 mb-6 overflow-hidden">
          <div className="absolute inset-0 bg-world-map bg-center bg-no-repeat bg-contain opacity-20"></div>
          
          {/* Pontos de teste no mapa */}
          {data.map((location, index) => (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${(location.coords.lng + 180) * (100 / 360)}%`,
                top: `${(90 - location.coords.lat) * (100 / 180)}%`,
              }}
            >
              <div className={`w-3 h-3 rounded-full ${getStatusColor(location.status)} border-2 border-white shadow-lg animate-pulse`}></div>
            </div>
          ))}
          
          {/* Legenda do mapa */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
            <h4 className="text-sm font-medium mb-2">Legenda</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>&lt; 1s</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>1-2s</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span>2-4s</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span>&gt; 4s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de resultados por localização */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-gray-700 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Resultados por Região</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.map((location, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h5 className="font-medium text-sm">{location.city}</h5>
                    <p className="text-xs text-gray-600">{location.country}</p>
                  </div>
                  <Badge variant="outline" className={`${getStatusColor(location.status)} text-white border-none`}>
                    {getStatusLabel(location.status)}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold">{location.loadTime}s</span>
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
