
import { Shield, Globe } from 'lucide-react';

const Header = () => {
  return (
    <header className="gradient-bg text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8" />
            <Globe className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold">Web Scan</h1>
        </div>
        <p className="text-center text-xl opacity-90 max-w-2xl mx-auto">
          Análise completa de performance e segurança de websites com testes globais em tempo real
        </p>
      </div>
    </header>
  );
};

export default Header;
