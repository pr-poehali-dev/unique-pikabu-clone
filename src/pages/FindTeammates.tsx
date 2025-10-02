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

const FindTeammates = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedGame, setSelectedGame] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [lookingForTeamOnly, setLookingForTeamOnly] = useState(false);

  useEffect(() => {
    const gameParam = searchParams.get('game');
    if (gameParam) {
      setSelectedGame(gameParam);
    }
  }, [searchParams]);

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

  const players: Player[] = [
    {
      id: '1',
      username: 'ProGamer2024',
      avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      rating: 12845,
      level: 45,
      games: [
        { id: 'cs2', name: 'CS2', icon: '🔫', rank: 'Global Elite', hours: 2340 },
        { id: 'valorant', name: 'Valorant', icon: '🎯', rank: 'Immortal 2', hours: 890 },
      ],
      isOnline: true,
      lastSeen: 'Сейчас в сети',
      lookingForTeam: true,
      languages: ['Русский', 'English'],
      region: 'ru',
      playStyle: ['Агрессивный', 'Командный']
    },
    {
      id: '2',
      username: 'MidLaner_Pro',
      avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      rating: 9876,
      level: 38,
      games: [
        { id: 'lol', name: 'LoL', icon: '⚔️', rank: 'Diamond I', hours: 1560 },
        { id: 'dota2', name: 'Dota 2', icon: '🎮', rank: 'Ancient 5', hours: 2100 },
      ],
      isOnline: true,
      lastSeen: 'Сейчас в сети',
      lookingForTeam: true,
      languages: ['Русский'],
      region: 'ru',
      playStyle: ['Carry', 'Микроконтроль']
    },
    {
      id: '3',
      username: 'SniperKing',
      avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      rating: 8432,
      level: 32,
      games: [
        { id: 'apex', name: 'Apex', icon: '🎖️', rank: 'Predator', hours: 1234 },
        { id: 'fortnite', name: 'Fortnite', icon: '🏹', rank: 'Champion', hours: 980 },
      ],
      isOnline: false,
      lastSeen: '15 минут назад',
      lookingForTeam: true,
      languages: ['Русский', 'English'],
      region: 'eu',
      playStyle: ['Снайпер', 'Поддержка']
    },
    {
      id: '4',
      username: 'CasualGamer',
      avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      rating: 5678,
      level: 28,
      games: [
        { id: 'minecraft', name: 'Minecraft', icon: '🟫', rank: 'Builder', hours: 3400 },
        { id: 'gta5', name: 'GTA V', icon: '🚗', rank: 'Level 120', hours: 890 },
      ],
      isOnline: true,
      lastSeen: 'Сейчас в сети',
      lookingForTeam: false,
      languages: ['Русский'],
      region: 'ru',
      playStyle: ['Расслабленный', 'Строитель']
    },
    {
      id: '5',
      username: 'TacticalMaster',
      avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      rating: 11234,
      level: 42,
      games: [
        { id: 'cs2', name: 'CS2', icon: '🔫', rank: 'Legendary Eagle', hours: 1890 },
        { id: 'valorant', name: 'Valorant', icon: '🎯', rank: 'Ascendant 3', hours: 1240 },
      ],
      isOnline: false,
      lastSeen: '2 часа назад',
      lookingForTeam: true,
      languages: ['Русский', 'English'],
      region: 'ru',
      playStyle: ['Тактический', 'IGL']
    },
    {
      id: '6',
      username: 'DotaLegend',
      avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      rating: 13456,
      level: 50,
      games: [
        { id: 'dota2', name: 'Dota 2', icon: '🎮', rank: 'Divine 3', hours: 4560 },
      ],
      isOnline: true,
      lastSeen: 'Сейчас в сети',
      lookingForTeam: true,
      languages: ['Русский', 'English'],
      region: 'ru',
      playStyle: ['Hard Support', 'Капитан']
    },
    {
      id: '7',
      username: 'ApexPredator',
      avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      rating: 9987,
      level: 36,
      games: [
        { id: 'apex', name: 'Apex', icon: '🎖️', rank: 'Master', hours: 2100 },
        { id: 'fortnite', name: 'Fortnite', icon: '🏹', rank: 'Unranked', hours: 340 },
      ],
      isOnline: true,
      lastSeen: 'Сейчас в сети',
      lookingForTeam: true,
      languages: ['English'],
      region: 'na',
      playStyle: ['Агрессивный', 'Flanker']
    },
    {
      id: '8',
      username: 'MinecraftBuilder',
      avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      rating: 4321,
      level: 22,
      games: [
        { id: 'minecraft', name: 'Minecraft', icon: '🟫', rank: 'Redstone Expert', hours: 5600 },
      ],
      isOnline: false,
      lastSeen: '1 день назад',
      lookingForTeam: false,
      languages: ['Русский'],
      region: 'ru',
      playStyle: ['Креативный', 'Техничный']
    },
  ];

  const filteredPlayers = players.filter(player => {
    if (selectedGame !== 'all' && !player.games.some(g => g.id === selectedGame)) return false;
    if (selectedRegion !== 'all' && player.region !== selectedRegion) return false;
    if (onlineOnly && !player.isOnline) return false;
    if (lookingForTeamOnly && !player.lookingForTeam) return false;
    if (searchQuery && !player.username.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const onlinePlayers = players.filter(p => p.isOnline).length;
  const lookingForTeam = players.filter(p => p.lookingForTeam).length;

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
                <div className="text-2xl font-bold text-gradient">{players.length}</div>
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
                <div className="text-2xl font-bold text-accent">{onlinePlayers}</div>
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
                <div className="text-2xl font-bold text-secondary">{lookingForTeam}</div>
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
            Найдено игроков: <span className="font-bold text-foreground">{filteredPlayers.length}</span>
          </p>
          <Button variant="outline" size="sm" className="gap-2">
            <Icon name="SlidersHorizontal" size={16} />
            Дополнительные фильтры
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlayers.map((player, index) => (
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
                      {regions.find(r => r.id === player.region)?.name || player.region}
                    </div>
                    <div className="flex gap-1">
                      {player.languages.map((lang, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {lang === 'Русский' ? '🇷🇺' : '🇬🇧'}
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

        {filteredPlayers.length === 0 && (
          <Card className="p-12 gradient-card border-border/50 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">Никого не найдено</h3>
            <p className="text-muted-foreground mb-4">
              Попробуйте изменить параметры поиска
            </p>
            <Button
              onClick={() => {
                setSelectedGame('all');
                setSelectedRegion('all');
                setOnlineOnly(false);
                setLookingForTeamOnly(false);
                setSearchQuery('');
              }}
            >
              Сбросить фильтры
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FindTeammates;