import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Home, 
  Library, 
  TrendingUp, 
  Settings, 
  Plus, 
  ChevronLeft, 
  MoreHorizontal,
  Gamepad2,
  Headphones,
  Monitor,
  Zap,
  TrendingUp as Insights
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { View, Game, PlatformStats } from './types';
import { PLATFORMS, GAMES, MONTHLY_DATA } from './constants';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

// --- Views ---

const DashboardView = ({ onTileClick, onStatsClick }: { onTileClick: (platform: string, category: string) => void, onStatsClick: () => void, key?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="px-6 space-y-8 pb-32"
    >
      {/* Global Stats Card */}
      <section>
        <button 
          onClick={onStatsClick}
          className="w-full glass-card rounded-3xl p-6 deep-shadow bg-white/60 flex items-center justify-between group active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <Insights size={32} />
            </div>
            <div className="text-left">
              <p className="text-xl font-black tracking-tight">Statistiques Globales</p>
              <p className="text-slate-500 text-sm font-medium">Valeur, croissance et parts</p>
            </div>
          </div>
          <div className="size-10 rounded-full bg-white/50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
            <Plus className="rotate-45" size={20} />
          </div>
        </button>
      </section>

      {PLATFORMS.map((platform) => (
        <section key={platform.name}>
          <div className="flex items-end justify-between mb-4 px-2">
            <h2 className="text-3xl font-bold tracking-tight">{platform.name}</h2>
          </div>
          <div className="glass-card rounded-3xl p-6 deep-shadow bg-white/40">
            <div className="flex flex-col gap-4">
              {/* Hero Image */}
              <div className="relative h-48 rounded-2xl overflow-hidden group shadow-inner">
                <img 
                  src={platform.imageUrl} 
                  alt={platform.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <p className="text-white text-2xl font-black tracking-tight">{platform.name}</p>
                </div>
              </div>
              
              {/* 3 Tiles Grid */}
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => onTileClick(platform.name, 'Jeux')}
                  className="bg-white/50 rounded-2xl p-3 flex flex-col gap-2 shadow-md border border-white/40 hover:shadow-lg transition-all active:scale-95 text-left"
                >
                  <Gamepad2 className="text-primary" size={20} />
                  <div>
                    <p className="font-bold text-sm leading-tight">Jeux</p>
                    <p className="text-slate-500 text-[10px]">{platform.games} Titres</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => onTileClick(platform.name, 'Consoles')}
                  className="bg-white/50 rounded-2xl p-3 flex flex-col gap-2 shadow-md border border-white/40 hover:shadow-lg transition-all active:scale-95 text-left"
                >
                  <Monitor className="text-primary" size={20} />
                  <div>
                    <p className="font-bold text-sm leading-tight">Consoles</p>
                    <p className="text-slate-500 text-[10px]">{platform.systems} Unités</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => onTileClick(platform.name, 'Accessoires')}
                  className="bg-white/50 rounded-2xl p-3 flex flex-col gap-2 shadow-md border border-white/40 hover:shadow-lg transition-all active:scale-95 text-left"
                >
                  <Zap className="text-primary" size={20} />
                  <div>
                    <p className="font-bold text-sm leading-tight">Accessoires</p>
                    <p className="text-slate-500 text-[10px]">{platform.gear} Objets</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      ))}
    </motion.div>
  );
};

const CollectionView = ({ filter, onBack, onGameClick }: { filter?: { platform?: string, category?: string }, onBack?: () => void, onGameClick: (game: Game) => void, key?: string }) => {
  const filteredGames = GAMES.filter(game => {
    if (filter?.platform && game.platform !== filter.platform && !game.platform.includes(filter.platform)) return false;
    if (filter?.category && game.category !== filter.category) return false;
    return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="px-4 pb-32"
    >
      <div className="mb-6 flex justify-between items-end px-2">
        <div className="flex flex-col gap-2">
          {onBack && (
            <button onClick={onBack} className="flex items-center gap-1 text-primary font-bold text-sm mb-1">
              <ChevronLeft size={16} /> Retour
            </button>
          )}
          <h1 className="text-3xl font-black tracking-tight text-black">
            {filter?.category ? `${filter.category} ${filter.platform || ''}` : 'My Vault'}
          </h1>
          <p className="text-sm text-gray-600 font-medium">{filteredGames.length} Éléments</p>
        </div>
        {!filter?.category && (
          <button className="text-xs font-bold bg-black text-white px-4 py-2 rounded-full uppercase tracking-widest">
            Filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {filteredGames.map((game) => (
          <button 
            key={game.id} 
            onClick={() => onGameClick(game)}
            className="flex flex-col gap-3 text-left group active:scale-[0.98] transition-all"
          >
            <div className="glass-card rounded-[2rem] p-2 shadow-2xl overflow-hidden aspect-[3/4] relative">
              <img 
                src={game.imageUrl} 
                alt={game.title} 
                className="w-full h-full object-cover rounded-[1.5rem] transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-sm">
                {game.platform}
              </div>
            </div>
            <div className="px-2">
              <h3 className="font-black text-sm uppercase tracking-tight truncate group-hover:text-primary transition-colors">{game.title}</h3>
              <p className="text-[11px] font-bold text-gray-500 uppercase">{game.genre} • {game.year}</p>
            </div>
          </button>
        ))}
        {filteredGames.length === 0 && (
          <div className="col-span-2 py-20 text-center text-slate-400 font-medium">
            Aucun élément trouvé dans cette catégorie.
          </div>
        )}
      </div>
    </motion.div>
  );
};

const GameDetailsView = ({ game, onBack }: { game: Game, onBack: () => void, key?: string }) => {
  const gainLoss = game.purchasePrice ? game.value - game.purchasePrice : 0;
  const gainLossPercent = game.purchasePrice ? ((gainLoss / game.purchasePrice) * 100).toFixed(1) : '0';

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="px-6 pb-32 space-y-6"
    >
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="glass-card size-12 flex items-center justify-center rounded-xl active:scale-95 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-black tracking-tight truncate flex-1">Fiche Info</h2>
      </div>

      {/* Main Card */}
      <div className="glass-card rounded-[3rem] overflow-hidden deep-shadow bg-white">
        <div className="aspect-[4/5] overflow-hidden">
          <img 
            src={game.imageUrl} 
            alt={game.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-start gap-4">
            <h1 className="text-4xl font-black tracking-tighter leading-[0.95] flex-1">
              {game.title}
            </h1>
            <div className="bg-primary/10 text-primary px-5 py-2 rounded-full font-black text-xl whitespace-nowrap">
              {game.value.toLocaleString()}€
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-primary font-black uppercase text-xs tracking-[0.2em]">
              {game.platform} • {game.year}
            </p>
          </div>

          <div className="flex gap-2">
            <span className="bg-black/5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">{game.category}</span>
            <span className="bg-black/5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">{game.genre}</span>
          </div>
        </div>
      </div>

      {/* Detailed Info Tiles Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card rounded-3xl p-4 flex flex-col gap-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Prix d'achat</p>
          <p className="text-lg font-black">{game.purchasePrice ? `${game.purchasePrice}€` : '--'}</p>
        </div>
        <div className="glass-card rounded-3xl p-4 flex flex-col gap-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Gain / Perte</p>
          <p className={cn("text-lg font-black", gainLoss >= 0 ? "text-emerald-500" : "text-red-500")}>
            {gainLoss >= 0 ? '+' : ''}{gainLoss}€ ({gainLossPercent}%)
          </p>
        </div>
        <div className="glass-card rounded-3xl p-4 flex flex-col gap-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">État</p>
          <p className="text-lg font-black">{game.condition || '--'}</p>
        </div>
        <div className="glass-card rounded-3xl p-4 flex flex-col gap-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Format</p>
          <p className="text-lg font-black">{game.format || '--'}</p>
        </div>
        <div className="glass-card rounded-3xl p-4 flex flex-col gap-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cote jour achat</p>
          <p className="text-lg font-black">{game.purchaseValue ? `${game.purchaseValue}€` : '--'}</p>
        </div>
        <div className="glass-card rounded-3xl p-4 flex flex-col gap-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cote actuelle</p>
          <p className="text-lg font-black">{game.value}€</p>
        </div>
        <div className="glass-card rounded-3xl p-4 flex flex-col gap-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cote + 1 mois</p>
          <p className="text-lg font-black text-primary">
            {game.predictedValueNextMonth ? `${game.predictedValueNextMonth}€` : '--'}
          </p>
        </div>
        <div className="glass-card rounded-3xl p-4 flex flex-col gap-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Évol. 12 mois</p>
          <p className="text-lg font-black text-emerald-500">{game.evolution12Months || '--'}</p>
        </div>
        <div className="glass-card rounded-3xl p-4 flex flex-col gap-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Jeux Loose</p>
          <p className="text-lg font-black">{game.isLoose ? 'Oui' : 'Non'}</p>
        </div>
        <div className="glass-card rounded-3xl p-4 flex flex-col gap-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Authenticité</p>
          <p className="text-lg font-black text-emerald-500">Vérifié</p>
        </div>
      </div>

      {/* Description */}
      <div className="glass-card rounded-3xl p-6 space-y-3">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Description</h3>
        <p className="text-slate-600 leading-relaxed font-medium">
          {game.description || "Aucune description disponible pour cet élément."}
        </p>
      </div>
    </motion.div>
  );
};

const AnalyticsView = ({ onBack }: { onBack: () => void, key?: string }) => {
  const COLORS = ['#ef4444', '#2563eb', '#22c55e'];
  const platformData = [
    { name: 'Nintendo', value: 45 },
    { name: 'PlayStation', value: 32 },
    { name: 'Xbox', value: 23 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="px-4 space-y-6 pb-32"
    >
      <div className="flex items-center gap-4 mb-2">
        <button onClick={onBack} className="glass-card size-12 flex items-center justify-center rounded-xl active:scale-95 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-black tracking-tight">Collection Analytics</h2>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 glass-card rounded-2xl p-5 flex flex-col gap-2">
          <p className="text-slate-600 text-sm font-medium">Total Value</p>
          <p className="text-primary text-2xl font-bold">$12,450</p>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
            <TrendingUp size={14} />
            <span>12%</span>
          </div>
        </div>
        <div className="flex-1 glass-card rounded-2xl p-5 flex flex-col gap-2">
          <p className="text-slate-600 text-sm font-medium">Items</p>
          <p className="text-slate-900 text-2xl font-bold">432</p>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
            <Plus size={14} />
            <span>+5</span>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-slate-600 text-sm font-medium">Monthly Growth</p>
            <p className="text-slate-900 text-3xl font-bold">+$1,200</p>
          </div>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">H1 2024</span>
        </div>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MONTHLY_DATA}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec5b13" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ec5b13" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#ec5b13" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between mt-2 px-2">
          {['JAN', 'MAR', 'MAY', 'JUL'].map(m => (
            <span key={m} className="text-slate-500 text-[10px] font-bold">{m}</span>
          ))}
        </div>
      </div>

      <section>
        <h3 className="text-lg font-bold mb-4 px-1">Platform Share</h3>
        <div className="glass-card rounded-2xl p-5 space-y-5">
          {platformData.map((p, i) => (
            <div key={p.name} className="space-y-2">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></span>
                  {p.name}
                </span>
                <span className="text-slate-500">{p.value}%</span>
              </div>
              <div className="h-3 w-full bg-black/5 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${p.value}%`, backgroundColor: COLORS[i] }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="text-lg font-bold">Most Valuable</h3>
          <button className="text-primary text-sm font-bold">See all</button>
        </div>
        <div className="space-y-3">
          {GAMES.filter(g => g.change).map((game) => (
            <div key={game.id} className="glass-card p-3 rounded-2xl flex items-center gap-4">
              <div className="size-14 rounded-xl bg-slate-200 overflow-hidden flex-shrink-0">
                <img 
                  src={game.imageUrl} 
                  alt={game.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900">{game.title}</p>
                <p className="text-xs text-slate-500 font-medium">{game.platform} • {game.year}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">${game.value.toLocaleString()}</p>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">{game.change}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [activeFilter, setActiveFilter] = useState<{ platform?: string, category?: string } | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // Sync state with browser history for back gesture support
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        setView(event.state.view || 'dashboard');
        setActiveFilter(event.state.activeFilter || null);
        setSelectedGame(event.state.selectedGame || null);
      } else {
        setView('dashboard');
        setActiveFilter(null);
        setSelectedGame(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Initial state
    if (!window.history.state) {
      window.history.replaceState({ view: 'dashboard' }, '');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (newView: View, stateUpdate?: any) => {
    const newState = {
      view: newView,
      activeFilter: stateUpdate?.activeFilter ?? activeFilter,
      selectedGame: stateUpdate?.selectedGame ?? selectedGame,
    };
    
    window.history.pushState(newState, '');
    setView(newView);
    if (stateUpdate?.activeFilter !== undefined) setActiveFilter(stateUpdate.activeFilter);
    if (stateUpdate?.selectedGame !== undefined) setSelectedGame(stateUpdate.selectedGame);
  };

  const handleTileClick = (platform: string, category: string) => {
    navigate('collection', { activeFilter: { platform, category } });
  };

  const handleStatsClick = () => {
    navigate('analytics');
  };

  const handleGameClick = (game: Game) => {
    navigate('game-details', { selectedGame: game });
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-background-light selection:bg-primary/30 pt-6 overflow-x-hidden">
      <main className="max-w-md mx-auto touch-pan-y">
        <AnimatePresence mode="wait">
          {view === 'dashboard' && (
            <DashboardView key="dashboard" onTileClick={handleTileClick} onStatsClick={handleStatsClick} />
          )}
          {view === 'collection' && (
            <CollectionView 
              key="collection" 
              filter={activeFilter || undefined} 
              onBack={handleBack} 
              onGameClick={handleGameClick}
            />
          )}
          {view === 'game-details' && selectedGame && (
            <GameDetailsView 
              key="game-details"
              game={selectedGame}
              onBack={handleBack}
            />
          )}
          {view === 'analytics' && (
            <AnalyticsView key="analytics" onBack={handleBack} />
          )}
          {view === 'settings' && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 text-center text-slate-500"
            >
              <button onClick={handleBack} className="text-primary font-bold mb-4">Retour</button>
              <p>Settings view coming soon...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
