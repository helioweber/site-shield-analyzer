
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Globe } from 'lucide-react';

interface URLInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

const URLInput = ({ onAnalyze, isLoading }: URLInputProps) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  const validateURL = (inputUrl: string) => {
    try {
      new URL(inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`);
      return true;
    } catch {
      return false;
    }
  };

  const isValidURL = url === '' || validateURL(url);

  return (
    <Card className="w-full max-w-2xl mx-auto card-shadow">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Insira a URL para análise</h2>
          </div>
          
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="exemplo: google.com ou https://github.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={`text-lg py-6 ${!isValidURL ? 'border-red-300 focus:border-red-500' : ''}`}
                disabled={isLoading}
              />
              {!isValidURL && (
                <p className="text-red-500 text-sm mt-1">Por favor, insira uma URL válida</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              disabled={!url.trim() || !isValidURL || isLoading}
              className="px-8 py-6 text-lg"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analisando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span>Analisar</span>
                </div>
              )}
            </Button>
          </div>
          
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <strong>Nossa análise inclui:</strong> Performance global, segurança, vulnerabilidades, headers HTTP, 
            tempo de carregamento e muito mais.
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default URLInput;
