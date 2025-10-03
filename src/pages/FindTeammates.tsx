import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Player {
  id: string;
  username: string;
  avatar: string;
  rating: number;
  level: number;
  games: Array<{
    id: string;
    name: string;
    icon: string;
    rank: string;
    hours: number;
  }>;
  isOnline: boolean;
  lastSeen: string;
  lookingForTeam: boolean;
  languages: string[];
  region: string;
  playStyle: string[];
}

const API_URL = 'https://functions.poehali.dev/e351b573-d084-4c37-8be3-989db202b4ad';

const FindTeammates = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedGame, setSelectedGame] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [lookingForTeamOnly, setLookingForTeamOnly] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [stats, setStats] = useState({ total: 0, online: 0, lookingForTeam: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const gameParam = searchParams.get('game');
    if (gameParam) {
      setSelectedGame(gameParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (selectedGame !== 'all') params.append('game', selectedGame);
        if (selectedRegion !== 'all') params.append('region', selectedRegion);
        if (searchQuery) params.append('search', searchQuery);
        if (onlineOnly) params.append('online', 'true');
        if (lookingForTeamOnly) params.append('lfg', 'true');

        const response = await fetch(`${API_URL}?${params.toString()}`);
        const data = await response.json();
        setPlayers(data.players || []);
        setStats(data.stats || { total: 0, online: 0, lookingForTeam: 0 });
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [selectedGame, selectedRegion, searchQuery, onlineOnly, lookingForTeamOnly]);

  const games = [
    { id: 'all', name: 'Все игры', icon: '🎮' },
    { id: 'cs2', name: 'Counter-Strike 2', icon: '🔫' },
    { id: 'dota2', name: 'Dota 2', icon: '🎮' },
    { id: 'valorant', name: 'Valorant', icon: '🎯' },
    { id: 'lol', name: 'League of Legends', icon: '⚔️' },
    { id: 'fortnite', name: 'Fortnite', icon: '🏹' },
    { id: 'apex', name: 'Apex Legends', icon: '🎖️' },
    { id: 'gta5', name: 'GTA V', icon: '🚗' },
    { id: 'minecraft', name: 'Minecraft', icon: '🟫' },
  ];

  const regions = [
    { id: 'all', name: 'Все регионы' },
    { id: 'ru', name: '🇷🇺 Россия' },
    { id: 'eu', name: '🇪🇺 Европа' },
    { id: 'na', name: '🇺🇸 Северная Америка' },
    { id: 'asia', name: '🌏 Азия' },
    { id: 'sa', name: '🇧🇷 Южная Америка' },
  ];

  const regionMap: Record<string, string> = {
    'russia': 'ru',
    'europe': 'eu',
    'usa': 'na',
    'asia': 'asia',
    'south_america': 'sa'
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-card/90 border-b border-border shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/games')}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              
              <div>
                <h1 className="text-xl font-bold">
                  <span className="text-gradient">Поиск тиммейтов</span>
                </h1>
                <p className="text-xs text-muted-foreground">Найди напарников для игр</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
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
                <div className="text-2xl font-bold text-gradient">{stats.total}</div>
              </div>
            </div>
          </Card>

          <Card className="p-5 gradient-card border-border/50 bg-gradient-to-br from-accent/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center">
                <Icon name="CircleDot" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Онлайн сейчас</div>
                <div className="text-2xl font-bold text-accent">{stats.online}</div>
              </div>
            </div>
          </Card>

          <Card className="p-5 gradient-card border-border/50 bg-gradient-to-br from-secondary/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <Icon name="Search" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Ищут команду</div>
                <div className="text-2xl font-bold text-secondary">{stats.lookingForTeam}</div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-4 gradient-card border-border/50 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по имени..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/30"
              />
            </div>

            <Select value={selectedGame} onValueChange={setSelectedGame}>
              <SelectTrigger className="bg-muted/30">
                <SelectValue placeholder="Выберите игру" />
              </SelectTrigger>
              <SelectContent>
                {games.map(game => (
                  <SelectItem key={game.id} value={game.id}>
                    <span className="flex items-center gap-2">
                      <span>{game.icon}</span>
                      {game.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="bg-muted/30">
                <SelectValue placeholder="Регион" />
              </SelectTrigger>
              <SelectContent>
                {regions.map(region => (
                  <SelectItem key={region.id} value={region.id}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={onlineOnly ? 'default' : 'outline'}
                size="sm"
                onClick={() => setOnlineOnly(!onlineOnly)}
                className="flex-1 gap-2"
              >
                <Icon name="CircleDot" size={16} />
                Онлайн
              </Button>
              <Button
                variant={lookingForTeamOnly ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLookingForTeamOnly(!lookingForTeamOnly)}
                className="flex-1 gap-2"
              >
                <Icon name="Users" size={16} />
                LFT
              </Button>
            </div>
          </div>
        </Card>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Найдено игроков: <span className="font-bold text-foreground">{players.length}</span>
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-muted-foreground">Загрузка...</div>
          </div>
        ) : players.length === 0 ? (
          <Card className="p-12 text-center gradient-card border-border/50">
            <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-bold mb-2">Никого не найдено</h3>
            <p className="text-muted-foreground mb-6">Попробуйте изменить фильтры поиска</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {players.map((player, index) => (
            <Card
              key={player.id}
              className="gradient-card border-border/50 overflow-hidden hover-lift cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => navigate(`/profile/${player.username}`)}
            >
              <div className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16 border-2 border-border">
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback>{player.username[0]}</AvatarFallback>
                    </Avatar>
                    {player.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-card rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg truncate">{player.username}</h3>
                      {player.lookingForTeam && (
                        <Badge className="bg-accent text-white text-xs">LFT</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <span className="flex items-center gap-1">
                        <Icon name="Award" size={14} />
                        Уровень {player.level}
                      </span>
                      <span>•</span>
                      <span>{player.rating.toLocaleString()} 🔥</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{player.lastSeen}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                      <Icon name="Gamepad2" size={12} />
                      Играет в
                    </div>
                    <div className="space-y-2">
                      {player.games.map(game => (
                        <div
                          key={game.id}
                          className="flex items-center gap-2 p-2 rounded-lg bg-muted/30"
                        >
                          <div className="text-lg">{game.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold truncate">{game.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {game.rank} • {game.hours}ч
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                      <Icon name="Target" size={12} />
                      Стиль игры
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {player.playStyle.map((style, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Icon name="Globe" size={12} />
                      {regions.find(r => r.id === (regionMap[player.region] || player.region))?.name || player.region}
                    </div>
                    <div className="flex gap-1">
                      {player.languages.map((lang, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {lang === 'ru' ? '🇷🇺' : lang === 'en' ? '🇬🇧' : lang === 'de' ? '🇩🇪' : lang === 'zh' ? '🇨🇳' : lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-border">
                  <Button 
                    className="flex-1 gap-2"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/messages?user=${player.username}`);
                    }}
                  >
                    <Icon name="MessageSquare" size={16} />
                    Написать
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/profile/${player.username}`);
                    }}
                  >
                    <Icon name="User" size={16} />
                  </Button>
                </div>
              </div>
            </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindTeammates;