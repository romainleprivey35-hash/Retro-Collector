export interface Game {
  id: string;
  title: string;
  platform: 'PS5' | 'Switch' | 'PC' | 'Xbox' | 'Retro' | string;
  genre: string;
  year: number;
  imageUrl: string;
  value: number;
  change?: string;
  category: 'Jeux' | 'Consoles' | 'Accessoires';
  description?: string;
  purchasePrice?: number;
  purchaseValue?: number; // Value at the time of purchase
  condition?: string;
  format?: 'Physique' | 'Dématérialisé';
  isLoose?: boolean;
  predictedValueNextMonth?: number;
  evolution12Months?: string;
}

export interface PlatformStats {
  name: string;
  systems: number;
  games: number;
  gear: number;
  imageUrl: string;
}

export type View = 'dashboard' | 'collection' | 'analytics' | 'settings' | 'game-details';
