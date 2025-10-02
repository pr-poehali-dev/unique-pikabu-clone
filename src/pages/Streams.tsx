import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Stream {
  id: number;
  streamer: string;
  streamerAvatar: string;
  streamerRating: number;
  title: string;
  description: string;
  category: string;
  platform: 'twitch' | 'youtube' | 'vk' | 'kick';
  thumbnail: string;
  streamUrl: string;
  isLive: boolean;
  viewers: number;
  startedAt: string;
  tags: string[];
  language: string;
}

const Streams = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Все', icon: 'Tv' },
    { id: 'games', name: 'Игры', icon: 'Gamepad2' },
    { id: 'tech', name: 'Технологии', icon: 'Cpu' },
    { id: 'creative', name: 'Творчество', icon: 'Palette' },
    { id: 'talk', name: 'Разговоры', icon: 'MessageCircle' },
    { id: 'education', name: 'Обучение', icon: 'GraduationCap' },
    { id: 'music', name: 'Музыка', icon: 'Music' },
  ];

  const streams: Stream[] = [
    {
      id: 1,
      streamer: 'Дмитрий Космонавт',
      streamerAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      streamerRating: 12845,
      title: 'Разработка сайта на React в прямом эфире 🚀',
      description: 'Пишем полноценное веб-приложение с нуля. Отвечаю на вопросы, делюсь опытом. Заходите!',
      category: 'tech',
      platform: 'twitch',
      thumbnail: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      streamUrl: 'https://twitch.tv/dmitry_dev',
      isLive: true,
      viewers: 1247,
      startedAt: '2 часа назад',
      tags: ['react', 'программирование', 'веб-разработка'],
      language: 'Русский',
    },
    {
      id: 2,
      streamer: 'GameMaster Pro',
      streamerAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      streamerRating: 8934,
      title: 'Cyberpunk 2077 — прохождение на максималках',
      description: 'Проходим все сюжетные миссии, собираем легендарки, общаемся с чатом',
      category: 'games',
      platform: 'youtube',
      thumbnail: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      streamUrl: 'https://youtube.com/live/gamemaster',
      isLive: true,
      viewers: 3421,
      startedAt: '45 минут назад',
      tags: ['cyberpunk', 'rpg', 'прохождение'],
      language: 'Русский',
    },
    {
      id: 3,
      streamer: 'АртКреатор',
      streamerAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      streamerRating: 6234,
      title: 'Рисую концепт-арт персонажа для игры',
      description: 'Создание дизайна персонажа в Photoshop с комментариями и объяснениями процесса',
      category: 'creative',
      platform: 'twitch',
      thumbnail: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      streamUrl: 'https://twitch.tv/artcreator',
      isLive: true,
      viewers: 856,
      startedAt: '1 час назад',
      tags: ['арт', 'дизайн', 'photoshop'],
      language: 'Русский',
    },
    {
      id: 4,
      streamer: 'TechGuru',
      streamerAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      streamerRating: 15432,
      title: 'Собираем игровой ПК за 150к — советы и лайфхаки',
      description: 'Подбираем комплектующие, обсуждаем совместимость, делимся опытом сборки',
      category: 'tech',
      platform: 'youtube',
      thumbnail: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      streamUrl: 'https://youtube.com/live/techguru',
      isLive: true,
      viewers: 2134,
      startedAt: '30 минут назад',
      tags: ['пк', 'железо', 'обзор'],
      language: 'Русский',
    },
    {
      id: 5,
      streamer: 'MusicWave',
      streamerAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      streamerRating: 4567,
      title: 'Вечерний Lo-Fi Hip-Hop сет 🎵',
      description: 'Расслабляющая музыка для работы и учёбы. Принимаем заявки!',
      category: 'music',
      platform: 'vk',
      thumbnail: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      streamUrl: 'https://vk.com/video/musicwave',
      isLive: true,
      viewers: 567,
      startedAt: '3 часа назад',
      tags: ['lofi', 'hip-hop', 'музыка'],
      language: 'Русский',
    },
    {
      id: 6,
      streamer: 'CodeAcademy',
      streamerAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      streamerRating: 9876,
      title: 'Изучаем Python с нуля — урок 5: функции',
      description: 'Бесплатный курс по Python для начинающих. Разбираем функции, аргументы, return',
      category: 'education',
      platform: 'youtube',
      thumbnail: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      streamUrl: 'https://youtube.com/live/codeacademy',
      isLive: true,
      viewers: 1823,
      startedAt: '1 час назад',
      tags: ['python', 'обучение', 'программирование'],
      language: 'Русский',
    },
    {
      id: 7,
      streamer: 'TalkShow',
      streamerAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      streamerRating: 7234,
      title: 'Обсуждаем новости IT-мира за неделю',
      description: 'Разбираем главные события в сфере технологий, отвечаем на вопросы',
      category: 'talk',
      platform: 'kick',
      thumbnail: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      streamUrl: 'https://kick.com/talkshow',
      isLive: true,
      viewers: 423,
      startedAt: '20 минут назад',
      tags: ['новости', 'обсуждение', 'it'],
      language: 'Русский',
    },
    {
      id: 8,
      streamer: 'ProGamer2077',
      streamerAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      streamerRating: 11234,
      title: 'CS:GO ранговые игры — путь к глобалу',
      description: 'Катаем ранговые, разбираем ошибки, учим тактикам',
      category: 'games',
      platform: 'twitch',
      thumbnail: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      streamUrl: 'https://twitch.tv/progamer2077',
      isLive: false,
      viewers: 0,
      startedAt: 'Завтра в 18:00',
      tags: ['csgo', 'киберспорт', 'ранговые'],
      language: 'Русский',
    },
  ];

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      twitch: 'Twitch',
      youtube: 'Youtube',
      vk: 'Share',
      kick: 'Video',
    };
    return icons[platform] || 'Video';
  };

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      twitch: 'text-purple-500',
      youtube: 'text-red-500',
      vk: 'text-blue-500',
      kick: 'text-green-500',
    };
    return colors[platform] || 'text-muted-foreground';
  };

  const filteredStreams = streams.filter((stream) => {
    if (activeTab === 'live' && !stream.isLive) return false;
    if (activeTab === 'offline' && stream.isLive) return false;
    if (selectedCategory !== 'all' && stream.category !== selectedCategory) return false;
    return true;
  });

  const liveCount = streams.filter(s => s.isLive).length;
  const totalViewers = streams.filter(s => s.isLive).reduce((sum, s) => sum + s.viewers, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-card/90 border-b border-border shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <Icon name="ArrowLeft" size={20} />
              </Button>

              <h1 className="text-2xl font-bold tracking-tight cursor-pointer" onClick={() => navigate('/')}>
                <span className="text-gradient">PULSE</span>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/giveaways')}
                className="relative"
              >
                <Icon name="Gift" size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center font-bold">
                  3
                </span>
              </Button>

              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => navigate('/notifications')}
              >
                <Icon name="Bell" size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>

              <Button variant="ghost" size="icon" onClick={() => navigate('/search')}>
                <Icon name="Search" size={20} />
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
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 text-gradient">📺 Стримы сообщества</h1>
          <p className="text-muted-foreground text-lg">
            Смотри прямые трансляции от участников PULSE. Общайся, учись, развлекайся!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3 space-y-4">
            <Card className="p-5 gradient-card border-border/50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="BarChart3" size={20} className="text-accent" />
                Статистика
              </h3>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
                    <span className="text-xs font-semibold text-destructive">LIVE</span>
                  </div>
                  <div className="text-3xl font-bold text-destructive mb-1">
                    {liveCount}
                  </div>
                  <div className="text-sm text-muted-foreground">Активных стримов</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {totalViewers.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Зрителей онлайн</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="text-3xl font-bold text-accent mb-1">
                    {streams.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Всего стримеров</div>
                </div>
              </div>
            </Card>

            <Card className="p-5 gradient-card border-border/50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="Compass" size={20} className="text-primary" />
                Категории
              </h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'secondary' : 'ghost'}
                    className="w-full justify-start gap-3"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <Icon name={category.icon as any} size={18} />
                    {category.name}
                  </Button>
                ))}
              </div>
            </Card>

            <Card className="p-5 gradient-card border-border/50 bg-gradient-to-br from-primary/10 to-accent/10">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Icon name="Video" size={20} className="text-primary" />
                Твой стрим
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Добавь ссылку на свой стрим в профиле и появись в этом списке!
              </p>
              <Button 
                className="w-full gradient-primary"
                onClick={() => navigate('/profile/dmitry')}
              >
                <Icon name="Settings" size={16} />
                Настроить профиль
              </Button>
            </Card>
          </aside>

          <main className="lg:col-span-9 space-y-4">
            <Card className="p-4 gradient-card border-border/50">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-3 bg-muted/30">
                  <TabsTrigger value="all" className="gap-2">
                    <Icon name="Tv" size={16} />
                    Все
                    <Badge variant="secondary" className="ml-1">{streams.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="live" className="gap-2">
                    <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                    В эфире
                    <Badge variant="secondary" className="ml-1">{liveCount}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="offline" className="gap-2">
                    <Icon name="Clock" size={16} />
                    Скоро
                    <Badge variant="secondary" className="ml-1">{streams.length - liveCount}</Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredStreams.map((stream, index) => (
                <Card
                  key={stream.id}
                  className="gradient-card border-border/50 overflow-hidden hover-lift cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => navigate(`/stream/${stream.id}`)}
                >
                  <div className="relative">
                    <img
                      src={stream.thumbnail}
                      alt={stream.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {stream.isLive ? (
                      <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground gap-1 animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-white" />
                        LIVE
                      </Badge>
                    ) : (
                      <Badge className="absolute top-3 left-3 bg-muted/80 text-foreground gap-1">
                        <Icon name="Clock" size={14} />
                        Скоро
                      </Badge>
                    )}

                    {stream.isLive && (
                      <Badge className="absolute top-3 right-3 bg-black/60 text-white gap-1">
                        <Icon name="Eye" size={14} />
                        {stream.viewers.toLocaleString()}
                      </Badge>
                    )}

                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8 border-2 border-white">
                          <AvatarImage src={stream.streamerAvatar} />
                          <AvatarFallback>{stream.streamer[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-semibold text-sm">
                            {stream.streamer}
                          </div>
                          <div className="text-white/80 text-xs">
                            {stream.startedAt}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
                      {stream.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                      {stream.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {stream.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Icon 
                          name={getPlatformIcon(stream.platform) as any} 
                          size={16} 
                          className={getPlatformColor(stream.platform)} 
                        />
                        <span className="text-xs text-muted-foreground capitalize">
                          {stream.platform}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {stream.streamerRating.toLocaleString()} 🔥
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredStreams.length === 0 && (
              <Card className="p-12 text-center gradient-card border-border/50">
                <Icon name="Tv" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-bold mb-2">Стримов не найдено</h3>
                <p className="text-muted-foreground">
                  {activeTab === 'live' 
                    ? 'Сейчас никто не ведёт трансляцию в этой категории'
                    : 'В этой категории пока нет запланированных стримов'
                  }
                </p>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Streams;