import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Game {
  id: string;
  name: string;
  icon: string;
  category: string;
  players: number;
  growth: number;
  rating: number;
}

const API_URL = 'https://functions.poehali.dev/c2ff7781-17a8-4ace-828d-ca746d8838ee';

const GameStats = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('players');
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const params = selectedCategory !== 'all' ? `?category=${selectedCategory}` : '';
        const response = await fetch(`${API_URL}${params}`);
        const data = await response.json();
        setGames(data.games || []);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [selectedCategory]);

  const oldGames: Game[] = [
    {
      id: 'cs2',
      name: 'Counter-Strike 2',
      icon: '🔫',
      category: 'Shooter',
      players: 18234,
      growth: 15.3,
      topStreamers: [
        { name: 's1mple', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 12500 },
        { name: 'NiKo', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 8900 },
      ]
    },
    {
      id: 'lol',
      name: 'League of Legends',
      icon: '⚔️',
      category: 'MOBA',
      players: 15432,
      growth: 8.7,
      topStreamers: [
        { name: 'Faker', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 15200 },
        { name: 'TheShy', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 9800 },
      ]
    },
    {
      id: 'gta5',
      name: 'GTA V',
      icon: '🚗',
      category: 'Action',
      players: 13456,
      growth: 12.1,
      topStreamers: [
        { name: 'xQc', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 18700 },
        { name: 'Summit1g', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 11200 },
      ]
    },
    {
      id: 'dota2',
      name: 'Dota 2',
      icon: '🎮',
      category: 'MOBA',
      players: 12845,
      growth: 5.4,
      topStreamers: [
        { name: 'Gorgc', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 8500 },
        { name: 'AdmiralBulldog', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 7200 },
      ]
    },
    {
      id: 'fortnite',
      name: 'Fortnite',
      icon: '🏹',
      category: 'Battle Royale',
      players: 11234,
      growth: 18.9,
      topStreamers: [
        { name: 'Ninja', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 22000 },
        { name: 'Tfue', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 14500 },
      ]
    },
    {
      id: 'valorant',
      name: 'Valorant',
      icon: '🎯',
      category: 'Shooter',
      players: 9876,
      growth: 22.5,
      topStreamers: [
        { name: 'TenZ', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 16800 },
        { name: 'Shroud', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 13400 },
      ]
    },
    {
      id: 'warzone',
      name: 'Call of Duty: Warzone',
      icon: '💣',
      category: 'Battle Royale',
      players: 9234,
      growth: 6.8,
      topStreamers: [
        { name: 'DrDisrespect', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 19500 },
        { name: 'TimTheTatman', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 12800 },
      ]
    },
    {
      id: 'minecraft',
      name: 'Minecraft',
      icon: '🟫',
      category: 'Sandbox',
      players: 8765,
      growth: 11.2,
      topStreamers: [
        { name: 'Dream', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 28000 },
        { name: 'Technoblade', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 15600 },
      ]
    },
    {
      id: 'wow',
      name: 'World of Warcraft',
      icon: '🐉',
      category: 'MMORPG',
      players: 8234,
      growth: 3.2,
      topStreamers: [
        { name: 'Asmongold', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 24500 },
        { name: 'Sodapoppin', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 11900 },
      ]
    },
    {
      id: 'apex',
      name: 'Apex Legends',
      icon: '🎖️',
      category: 'Battle Royale',
      players: 7654,
      growth: 14.6,
      topStreamers: [
        { name: 'aceu', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 10200 },
        { name: 'ImperialHal', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 8700 },
      ]
    },
    {
      id: 'rocketleague',
      name: 'Rocket League',
      icon: '🚀',
      category: 'Sports',
      players: 7123,
      growth: 9.4,
      topStreamers: [
        { name: 'SquishyMuffinz', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 6800 },
        { name: 'Lethamyr', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 5200 },
      ]
    },
    {
      id: 'deadlock',
      name: 'Deadlock',
      icon: '🔒',
      category: 'MOBA',
      players: 6789,
      growth: 45.8,
      topStreamers: [
        { name: 'Yatoro', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 7500 },
        { name: 'Grubby', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 4900 },
      ]
    },
    {
      id: 'overwatch',
      name: 'Overwatch 2',
      icon: '🦸',
      category: 'Shooter',
      players: 6543,
      growth: 7.3,
      topStreamers: [
        { name: 'Flats', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 8900 },
        { name: 'ML7', avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', viewers: 5600 },
      ]
    },
  ];

  const categories = ['all', ...Array.from(new Set(games.map(g => g.category)))];

  const sortedGames = [...games].sort((a, b) => {
    if (sortBy === 'players') return b.players - a.players;
    if (sortBy === 'growth') return b.growth - a.growth;
    return 0;
  });

  const totalPlayers = games.reduce((sum, game) => sum + game.players, 0);
  const avgGrowth = games.reduce((sum, game) => sum + game.growth, 0) / games.length;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-card/90 border-b border-border shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              
              <div>
                <h1 className="text-xl font-bold">
                  <span className="text-gradient">Статистика игр</span>
                </h1>
                <p className="text-xs text-muted-foreground">Популярные игры сообщества</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                className="gap-2 gradient-primary hidden md:flex"
                onClick={() => navigate('/teammates')}
              >
                <Icon name="Users" size={18} />
                Найти тиммейтов
              </Button>

              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/notifications')}
              >
                <Icon name="Bell" size={20} />
              </Button>
              
              <Avatar 
                className="border-2 border-primary cursor-pointer hover-lift"
                onClick={() => navigate('/profile/dmitry')}
              >
                <AvatarImage src="/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg" />
                <AvatarFallback>YOU</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-5 gradient-card border-border/50 bg-gradient-to-br from-primary/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                <Icon name="Users" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Всего игроков</div>
                <div className="text-2xl font-bold text-gradient">{totalPlayers.toLocaleString()}</div>
              </div>
            </div>
          </Card>

          <Card className="p-5 gradient-card border-border/50 bg-gradient-to-br from-accent/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center">
                <Icon name="Gamepad2" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Игр в базе</div>
                <div className="text-2xl font-bold text-accent">{games.length}</div>
              </div>
            </div>
          </Card>

          <Card className="p-5 gradient-card border-border/50 bg-gradient-to-br from-secondary/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <Icon name="TrendingUp" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Средний рост</div>
                <div className="text-2xl font-bold text-secondary">+{avgGrowth.toFixed(1)}%</div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-4 gradient-card border-border/50 mb-6">
          <Tabs value={sortBy} onValueChange={setSortBy} className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-muted/30">
              <TabsTrigger value="players" className="gap-2">
                <Icon name="Users" size={16} />
                По игрокам
              </TabsTrigger>
              <TabsTrigger value="growth" className="gap-2">
                <Icon name="TrendingUp" size={16} />
                По росту
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </Card>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="whitespace-nowrap"
            >
              {cat === 'all' ? 'Все' : cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedGames.map((game, index) => (
            <Card
              key={game.id}
              className="gradient-card border-border/50 overflow-hidden hover-lift cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => navigate(`/teammates?game=${game.id}`)}
            >
              <div className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-5xl">{game.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{game.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {game.category}
                    </Badge>
                  </div>
                  {index < 3 && (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'gradient-primary text-white' : 
                      index === 1 ? 'bg-secondary text-white' : 
                      'gradient-accent text-white'
                    }`}>
                      {index + 1}
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Icon name="Users" size={16} className="text-primary" />
                      <span className="text-sm font-medium">Игроков</span>
                    </div>
                    <span className="text-lg font-bold text-primary">
                      {game.players.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon name="TrendingUp" size={16} className="text-accent" />
                        <span className="text-sm font-medium">Рост за месяц</span>
                      </div>
                      <span className={`text-sm font-bold ${
                        game.growth > 10 ? 'text-green-500' : 'text-accent'
                      }`}>
                        +{game.growth}%
                      </span>
                    </div>
                    <Progress value={game.growth * 2} className="h-2" />
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                    <Icon name="Star" size={12} />
                    Рейтинг
                  </div>
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className={i < Math.floor(game.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}
                      />
                    ))}
                    <span className="text-sm font-bold ml-1">{game.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameStats;