import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface Game {
  id: string;
  name: string;
  icon: string;
  category: string;
  players: number;
}

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    selectedGames: [] as string[]
  });

  const games: Game[] = [
    { id: 'dota2', name: 'Dota 2', icon: '🎮', category: 'MOBA', players: 12845 },
    { id: 'cs2', name: 'Counter-Strike 2', icon: '🔫', category: 'Shooter', players: 18234 },
    { id: 'valorant', name: 'Valorant', icon: '🎯', category: 'Shooter', players: 9876 },
    { id: 'lol', name: 'League of Legends', icon: '⚔️', category: 'MOBA', players: 15432 },
    { id: 'minecraft', name: 'Minecraft', icon: '🟫', category: 'Sandbox', players: 8765 },
    { id: 'fortnite', name: 'Fortnite', icon: '🏹', category: 'Battle Royale', players: 11234 },
    { id: 'apex', name: 'Apex Legends', icon: '🎖️', category: 'Battle Royale', players: 7654 },
    { id: 'gta5', name: 'GTA V', icon: '🚗', category: 'Action', players: 13456 },
    { id: 'warzone', name: 'Call of Duty: Warzone', icon: '💣', category: 'Battle Royale', players: 9234 },
    { id: 'overwatch', name: 'Overwatch 2', icon: '🦸', category: 'Shooter', players: 6543 },
    { id: 'pubg', name: 'PUBG', icon: '🪂', category: 'Battle Royale', players: 5432 },
    { id: 'rocketleague', name: 'Rocket League', icon: '🚀', category: 'Sports', players: 7123 },
    { id: 'rust', name: 'Rust', icon: '🏕️', category: 'Survival', players: 4567 },
    { id: 'elden', name: 'Elden Ring', icon: '🗡️', category: 'RPG', players: 3456 },
    { id: 'wow', name: 'World of Warcraft', icon: '🐉', category: 'MMORPG', players: 8234 },
    { id: 'tarkov', name: 'Escape from Tarkov', icon: '🎖️', category: 'Shooter', players: 5678 },
    { id: 'deadlock', name: 'Deadlock', icon: '🔒', category: 'MOBA', players: 6789 },
    { id: 'hearthstone', name: 'Hearthstone', icon: '🃏', category: 'Card', players: 4321 },
    { id: 'terraria', name: 'Terraria', icon: '⛏️', category: 'Sandbox', players: 3890 },
    { id: 'stardew', name: 'Stardew Valley', icon: '🌾', category: 'Farming', players: 2987 },
  ];

  const categories = Array.from(new Set(games.map(g => g.category)));

  const toggleGame = (gameId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedGames: prev.selectedGames.includes(gameId)
        ? prev.selectedGames.filter(id => id !== gameId)
        : [...prev.selectedGames, gameId]
    }));
  };

  const handleRegister = () => {
    navigate('/');
  };

  const totalPlayers = games.reduce((sum, game) => sum + game.players, 0);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-gradient">PULSE</span>
          </h1>
          <p className="text-muted-foreground">Присоединяйся к игровому сообществу</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6 gradient-card border-border/50">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= 1 ? 'gradient-primary text-white' : 'bg-muted text-muted-foreground'
                    }`}>
                      {step > 1 ? <Icon name="Check" size={20} /> : '1'}
                    </div>
                    <div>
                      <div className="font-semibold">Основная информация</div>
                      <div className="text-xs text-muted-foreground">Имя, email, пароль</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= 2 ? 'gradient-primary text-white' : 'bg-muted text-muted-foreground'
                    }`}>
                      2
                    </div>
                    <div>
                      <div className="font-semibold">Выбор игр</div>
                      <div className="text-xs text-muted-foreground">Во что играешь?</div>
                    </div>
                  </div>
                </div>
              </div>

              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <Label htmlFor="username" className="mb-2 flex items-center gap-2">
                      <Icon name="User" size={16} />
                      Имя пользователя
                    </Label>
                    <Input
                      id="username"
                      placeholder="Введите имя пользователя"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="bg-muted/30"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="mb-2 flex items-center gap-2">
                      <Icon name="Mail" size={16} />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@mail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-muted/30"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="mb-2 flex items-center gap-2">
                      <Icon name="Lock" size={16} />
                      Пароль
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-muted/30"
                    />
                  </div>

                  <Button 
                    className="w-full gradient-primary gap-2 mt-6"
                    onClick={() => setStep(2)}
                    disabled={!formData.username || !formData.email || !formData.password}
                  >
                    Далее
                    <Icon name="ArrowRight" size={18} />
                  </Button>

                  <div className="text-center pt-4">
                    <span className="text-sm text-muted-foreground">
                      Уже есть аккаунт?{' '}
                      <button className="text-primary hover:underline font-semibold">
                        Войти
                      </button>
                    </span>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">Выбери игры, в которые играешь</h3>
                    <p className="text-sm text-muted-foreground">
                      Это поможет найти единомышленников. Можно выбрать несколько игр.
                    </p>
                  </div>

                  {formData.selectedGames.length > 0 && (
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="CheckCircle2" size={16} className="text-primary" />
                        <span className="font-semibold text-sm">
                          Выбрано игр: {formData.selectedGames.length}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.selectedGames.map(gameId => {
                          const game = games.find(g => g.id === gameId);
                          return (
                            <Badge key={gameId} className="gap-1">
                              <span>{game?.icon}</span>
                              {game?.name}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {categories.map(category => {
                      const categoryGames = games.filter(g => g.category === category);
                      return (
                        <div key={category}>
                          <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                            <Icon name="Gamepad2" size={14} />
                            {category}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {categoryGames.map(game => (
                              <div
                                key={game.id}
                                className={`p-3 rounded-lg border cursor-pointer transition-all hover-lift ${
                                  formData.selectedGames.includes(game.id)
                                    ? 'border-primary bg-primary/20'
                                    : 'border-border bg-muted/30 hover:border-primary/50'
                                }`}
                                onClick={() => toggleGame(game.id)}
                              >
                                <div className="flex items-center gap-3">
                                  <Checkbox
                                    checked={formData.selectedGames.includes(game.id)}
                                    onCheckedChange={() => toggleGame(game.id)}
                                  />
                                  <div className="text-2xl">{game.icon}</div>
                                  <div className="flex-1">
                                    <div className="font-semibold text-sm">{game.name}</div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                      <Icon name="Users" size={10} />
                                      {game.players.toLocaleString()} игроков
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={() => setStep(1)}
                    >
                      <Icon name="ArrowLeft" size={18} />
                      Назад
                    </Button>
                    <Button 
                      className="flex-1 gradient-primary gap-2"
                      onClick={handleRegister}
                      disabled={formData.selectedGames.length === 0}
                    >
                      Создать аккаунт
                      <Icon name="Check" size={18} />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-5 gradient-card border-border/50 bg-gradient-to-br from-primary/10 via-card to-accent/10">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={20} className="text-primary" />
                Топ игр на сайте
              </h3>
              <div className="space-y-3">
                {games
                  .sort((a, b) => b.players - a.players)
                  .slice(0, 8)
                  .map((game, index) => (
                    <div
                      key={game.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0 ? 'gradient-primary text-white' : 
                        index === 1 ? 'bg-secondary text-white' : 
                        index === 2 ? 'gradient-accent text-white' : 
                        'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="text-xl">{game.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">{game.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {game.players.toLocaleString()} игроков
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>

            <Card className="p-5 gradient-card border-border/50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="Users" size={20} className="text-accent" />
                Статистика
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="text-sm text-muted-foreground mb-1">Всего игроков</div>
                  <div className="text-2xl font-bold text-gradient">{totalPlayers.toLocaleString()}</div>
                </div>

                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="text-sm text-muted-foreground mb-1">Доступно игр</div>
                  <div className="text-2xl font-bold text-primary">{games.length}</div>
                </div>

                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="text-sm text-muted-foreground mb-1">Категорий</div>
                  <div className="text-2xl font-bold text-secondary">{categories.length}</div>
                </div>
              </div>
            </Card>

            <Card className="p-5 gradient-card border-border/50 bg-gradient-to-br from-destructive/10 to-accent/10">
              <div className="text-center space-y-3">
                <div className="text-4xl">🎮</div>
                <h3 className="font-bold">Присоединяйся!</h3>
                <p className="text-sm text-muted-foreground">
                  Находи друзей по интересам, смотри стримы, участвуй в розыгрышах
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
