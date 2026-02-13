import { useState, useEffect } from 'react';

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  category: string;
}

const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Novo Ransomware "BlackCat" ataca servidores Linux em escala global',
    source: 'The Hacker News',
    date: 'Hoje, 10:30',
    url: '#',
    severity: 'HIGH',
    category: 'Ransomware'
  },
  {
    id: '2',
    title: 'Falha crítica no Chrome (Zero-Day) exige atualização imediata',
    source: 'Google Security',
    date: 'Ontem',
    url: '#',
    severity: 'HIGH',
    category: 'Vulnerabilidade'
  },
  {
    id: '3',
    title: 'Golpe do "Emprego Falso" no LinkedIn triplica em 2024',
    source: 'TecMundo',
    date: '2 dias atrás',
    url: '#',
    severity: 'MEDIUM',
    category: 'Phishing'
  },
  {
    id: '4',
    title: 'IA Generativa está sendo usada para criar deepfakes de CEOs',
    source: 'BleepingComputer',
    date: '3 dias atrás',
    url: '#',
    severity: 'LOW',
    category: 'AI Threat'
  }
];

export function useThreatFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        // AQUI VOCÊ TROCA PELA CHAMADA REAL DA SUA API
        // const response = await fetch('/api/threat-feed');
        // const data = await response.json();
        
        // Simulando delay de rede
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setNews(MOCK_NEWS);
      } catch (err) {
        setError('Falha ao carregar o feed de ameaças.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { news, isLoading, error };
}