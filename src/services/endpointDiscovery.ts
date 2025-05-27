
interface DiscoveredEndpoint {
  path: string;
  type: 'login' | 'register' | 'search' | 'contact' | 'api' | 'form';
  method: 'GET' | 'POST';
  hasForm: boolean;
  formFields: string[];
}

export class EndpointDiscovery {
  static async discoverEndpoints(url: string): Promise<DiscoveredEndpoint[]> {
    try {
      const domain = new URL(url).hostname;
      console.log(`Descobrindo endpoints para: ${domain}`);
      
      // Simula descoberta de endpoints baseada em padrões comuns
      const commonEndpoints = [
        { path: '/login', type: 'login', method: 'POST', hasForm: true, formFields: ['username', 'password'] },
        { path: '/signin', type: 'login', method: 'POST', hasForm: true, formFields: ['email', 'password'] },
        { path: '/auth/login', type: 'login', method: 'POST', hasForm: true, formFields: ['login', 'password'] },
        { path: '/register', type: 'register', method: 'POST', hasForm: true, formFields: ['username', 'email', 'password'] },
        { path: '/signup', type: 'register', method: 'POST', hasForm: true, formFields: ['name', 'email', 'password'] },
        { path: '/create-account', type: 'register', method: 'POST', hasForm: true, formFields: ['firstName', 'lastName', 'email', 'password'] },
        { path: '/search', type: 'search', method: 'GET', hasForm: true, formFields: ['q', 'query'] },
        { path: '/contact', type: 'contact', method: 'POST', hasForm: true, formFields: ['name', 'email', 'message'] },
        { path: '/feedback', type: 'contact', method: 'POST', hasForm: true, formFields: ['rating', 'comment'] },
        { path: '/api/users', type: 'api', method: 'GET', hasForm: false, formFields: [] },
        { path: '/api/auth', type: 'api', method: 'POST', hasForm: false, formFields: [] },
        { path: '/user/profile', type: 'form', method: 'POST', hasForm: true, formFields: ['name', 'bio'] }
      ];

      // Simula verificação de existência dos endpoints (em produção seria uma varredura real)
      const discoveredEndpoints = commonEndpoints.filter(() => Math.random() > 0.6); // 40% chance de cada endpoint existir
      
      console.log('Endpoints descobertos:', discoveredEndpoints);
      return discoveredEndpoints as DiscoveredEndpoint[];
    } catch (error) {
      console.error('Erro na descoberta de endpoints:', error);
      return [];
    }
  }

  static selectTargetEndpoints(endpoints: DiscoveredEndpoint[]): DiscoveredEndpoint[] {
    // Prioriza endpoints de login, registro e formulários para testes
    const priorityOrder = ['login', 'register', 'search', 'contact', 'form', 'api'];
    
    const sorted = endpoints.sort((a, b) => {
      const aIndex = priorityOrder.indexOf(a.type);
      const bIndex = priorityOrder.indexOf(b.type);
      return aIndex - bIndex;
    });
    
    // Retorna até 3 endpoints mais relevantes
    return sorted.slice(0, 3);
  }
}
