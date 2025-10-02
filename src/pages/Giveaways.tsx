import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Giveaway {
  id: number;
  title: string;
  description: string;
  prize: string;
  image: string;
  author: string;
  authorAvatar: string;
  authorRating: number;
  isOfficial: boolean;
  participants: number;
  maxParticipants?: number;
  endDate: string;
  daysLeft: number;
  requirements: string[];
  tags: string[];
  winnerCount: number;
  isParticipating: boolean;
}

const Giveaways = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [participatingIds, setParticipatingIds] = useState<Set<number>>(new Set([1, 3]));

  const giveaways: Giveaway[] = [
    {
      id: 1,
      title: '🎮 Розыгрыш PlayStation 5 от PULSE',
      description: 'Главный розыгрыш месяца! Разыгрываем PlayStation 5 и 3 игры на выбор победителя среди всех активных участников сообщества.',
      prize: 'PlayStation 5 + 3 игры',
      image: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      author: 'PULSE Team',
      authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      authorRating: 99999,
      isOfficial: true,
      participants: 4782,
      maxParticipants: 10000,
      endDate: '15 октября 2025',
      daysLeft: 13,
      requirements: ['Рейтинг от 100', 'Минимум 5 постов', 'Аккаунт старше 1 месяца'],
      tags: ['официальный', 'игры', 'главный приз'],
      winnerCount: 1,
      isParticipating: true,
    },
    {
      id: 2,
      title: '💰 Конкурс на лучший пост недели',
      description: 'Напиши самый интересный пост недели и получи 5000₽ на карту! Победитель определяется голосованием сообщества.',
      prize: '5000₽',
      image: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      author: 'PULSE Team',
      authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      authorRating: 99999,
      isOfficial: true,
      participants: 234,
      endDate: '7 октября 2025',
      daysLeft: 5,
      requirements: ['Создать пост с тегом #конкурс', 'Минимум 50 рейтинга поста'],
      tags: ['официальный', 'еженедельный', 'творчество'],
      winnerCount: 1,
      isParticipating: false,
    },
    {
      id: 3,
      title: '🎧 Раздаю AirPods Pro за лучший комментарий',
      description: 'Разыгрываю свои старые AirPods Pro среди подписчиков. Напишите в комментариях самую смешную историю из вашей жизни!',
      prize: 'Apple AirPods Pro',
      image: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      author: 'Дмитрий Космонавт',
      authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      authorRating: 12845,
      isOfficial: false,
      participants: 156,
      endDate: '10 октября 2025',
      daysLeft: 8,
      requirements: ['Написать комментарий на странице розыгрыша', 'Подписаться на автора'],
      tags: ['техника', 'от пользователя', 'юмор'],
      winnerCount: 1,
      isParticipating: true,
    },
    {
      id: 4,
      title: '📚 Розыгрыш 10 книг по программированию',
      description: 'Отмечаем 10к подписчиков! Разыгрываем 10 любых технических книг от O\'Reilly на выбор победителей.',
      prize: '10 книг O\'Reilly',
      image: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      author: 'Алексей DevMaster',
      authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      authorRating: 8934,
      isOfficial: false,
      participants: 523,
      maxParticipants: 1000,
      endDate: '20 октября 2025',
      daysLeft: 18,
      requirements: ['Подписаться на автора', 'Поставить лайк посту'],
      tags: ['книги', 'образование', 'программирование'],
      winnerCount: 10,
      isParticipating: false,
    },
    {
      id: 5,
      title: '🎨 Конкурс на лучший дизайн логотипа',
      description: 'PULSE ищет новый логотип! Предложи свой вариант и выиграй 10000₽ + твой логотип на главной странице.',
      prize: '10000₽ + размещение',
      image: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      author: 'PULSE Team',
      authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      authorRating: 99999,
      isOfficial: true,
      participants: 89,
      endDate: '30 октября 2025',
      daysLeft: 28,
      requirements: ['Загрузить дизайн в формате PNG/SVG', 'Описать концепцию'],
      tags: ['официальный', 'дизайн', 'большой приз'],
      winnerCount: 1,
      isParticipating: false,
    },
    {
      id: 6,
      title: '🎮 Ключи Steam: Cyberpunk 2077',
      description: 'Досталось 3 лишних ключа от игры. Разыгрываю их просто так, чтобы порадовать комьюнити!',
      prize: '3 ключа Cyberpunk 2077',
      image: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      author: 'GameLover',
      authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      authorRating: 3421,
      isOfficial: false,
      participants: 892,
      endDate: '5 октября 2025',
      daysLeft: 3,
      requirements: ['Оставить комментарий', 'Рейтинг от 50'],
      tags: ['игры', 'steam', 'от пользователя'],
      winnerCount: 3,
      isParticipating: false,
    },
  ];

  const handleParticipate = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newParticipating = new Set(participatingIds);
    if (newParticipating.has(id)) {
      newParticipating.delete(id);
    } else {
      newParticipating.add(id);
    }
    setParticipatingIds(newParticipating);
  };

  const getParticipantCount = (giveaway: Giveaway) => {
    const baseCount = giveaway.participants;
    return participatingIds.has(giveaway.id) ? baseCount + 1 : baseCount;
  };

  const getProgressPercent = (giveaway: Giveaway) => {
    if (!giveaway.maxParticipants) return 0;
    return (getParticipantCount(giveaway) / giveaway.maxParticipants) * 100;
  };

  const filteredGiveaways = giveaways.filter((g) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'official') return g.isOfficial;
    if (activeTab === 'users') return !g.isOfficial;
    if (activeTab === 'my') return participatingIds.has(g.id);
    return true;
  });

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
          <h1 className="text-4xl font-bold mb-3 text-gradient">🎁 Розыгрыши и Конкурсы</h1>
          <p className="text-muted-foreground text-lg">
            Участвуй в розыгрышах от PULSE и других пользователей. Выигрывай крутые призы!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3 space-y-4">
            <Card className="p-5 gradient-card border-border/50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="Trophy" size={20} className="text-accent" />
                Статистика
              </h3>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {giveaways.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Активных розыгрышей</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="text-3xl font-bold text-accent mb-1">
                    {participatingIds.size}
                  </div>
                  <div className="text-sm text-muted-foreground">Моих участий</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <div className="text-3xl font-bold text-secondary mb-1">
                    {giveaways.filter(g => g.isOfficial).length}
                  </div>
                  <div className="text-sm text-muted-foreground">От PULSE</div>
                </div>
              </div>
            </Card>

            <Card className="p-5 gradient-card border-border/50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="Sparkles" size={20} className="text-primary" />
                Популярные призы
              </h3>
              <div className="space-y-2">
                {['🎮 Игровая техника', '💰 Денежные призы', '📚 Книги', '🎧 Аксессуары', '🎨 Творчество'].map((prize) => (
                  <Button
                    key={prize}
                    variant="ghost"
                    className="w-full justify-start text-sm"
                  >
                    {prize}
                  </Button>
                ))}
              </div>
            </Card>

            <Card className="p-5 gradient-card border-border/50 bg-gradient-to-br from-primary/10 to-accent/10">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Icon name="Gift" size={20} className="text-primary" />
                Создать розыгрыш
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Хочешь порадовать сообщество? Создай свой розыгрыш!
              </p>
              <Button className="w-full gradient-primary">
                <Icon name="Plus" size={16} />
                Создать
              </Button>
            </Card>
          </aside>

          <main className="lg:col-span-9 space-y-4">
            <Card className="p-4 gradient-card border-border/50">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-4 bg-muted/30">
                  <TabsTrigger value="all" className="gap-2">
                    <Icon name="Sparkles" size={16} />
                    Все
                    <Badge variant="secondary" className="ml-1">{giveaways.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="official" className="gap-2">
                    <Icon name="Shield" size={16} />
                    От PULSE
                    <Badge variant="secondary" className="ml-1">{giveaways.filter(g => g.isOfficial).length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="users" className="gap-2">
                    <Icon name="Users" size={16} />
                    От юзеров
                    <Badge variant="secondary" className="ml-1">{giveaways.filter(g => !g.isOfficial).length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="my" className="gap-2">
                    <Icon name="Star" size={16} />
                    Мои
                    <Badge variant="secondary" className="ml-1">{participatingIds.size}</Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </Card>

            {filteredGiveaways.map((giveaway, index) => (
              <Card
                key={giveaway.id}
                className="gradient-card border-border/50 overflow-hidden hover-lift cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => navigate(`/giveaway/${giveaway.id}`)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-72 h-48 md:h-auto flex-shrink-0 relative overflow-hidden">
                    <img
                      src={giveaway.image}
                      alt={giveaway.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    {giveaway.isOfficial && (
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground gap-1">
                        <Icon name="Shield" size={14} />
                        Официальный
                      </Badge>
                    )}
                    <div className="absolute bottom-3 left-3 right-3">
                      <Badge className="bg-destructive text-destructive-foreground gap-1">
                        <Icon name="Clock" size={14} />
                        {giveaway.daysLeft} {giveaway.daysLeft === 1 ? 'день' : giveaway.daysLeft < 5 ? 'дня' : 'дней'} до конца
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">
                          {giveaway.title}
                        </h2>
                        <div className="flex items-center gap-2 mb-3">
                          <Avatar className="w-6 h-6 border border-border">
                            <AvatarImage src={giveaway.authorAvatar} />
                            <AvatarFallback>{giveaway.author[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-semibold">{giveaway.author}</span>
                          <Badge variant="outline" className="text-xs">
                            {giveaway.authorRating.toLocaleString()} 🔥
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {giveaway.description}
                    </p>

                    <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
                      <Icon name="Gift" size={20} className="text-accent" />
                      <div>
                        <div className="text-xs text-muted-foreground">Приз</div>
                        <div className="font-bold text-accent">{giveaway.prize}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                          <Icon name="Users" size={14} className="inline mr-1" />
                          Участников: {getParticipantCount(giveaway).toLocaleString()}
                          {giveaway.maxParticipants && ` / ${giveaway.maxParticipants.toLocaleString()}`}
                        </span>
                        <span className="text-muted-foreground">
                          <Icon name="Trophy" size={14} className="inline mr-1" />
                          Победителей: {giveaway.winnerCount}
                        </span>
                      </div>
                      {giveaway.maxParticipants && (
                        <Progress value={getProgressPercent(giveaway)} className="h-2" />
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-semibold mb-2 flex items-center gap-1">
                        <Icon name="CheckCircle" size={14} />
                        Условия участия:
                      </div>
                      <ul className="space-y-1">
                        {giveaway.requirements.map((req, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <Icon name="ChevronRight" size={14} className="mt-0.5 text-primary flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {giveaway.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <Button
                        className={`gap-2 flex-1 transition-all ${
                          participatingIds.has(giveaway.id)
                            ? 'gradient-primary'
                            : 'bg-primary/10 hover:bg-primary/20 text-primary'
                        }`}
                        onClick={(e) => handleParticipate(giveaway.id, e)}
                      >
                        <Icon name={participatingIds.has(giveaway.id) ? "CheckCircle" : "Gift"} size={18} />
                        {participatingIds.has(giveaway.id) ? 'Вы участвуете' : 'Участвовать'}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Icon name="Share2" size={18} />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Icon name="Bookmark" size={18} />
                      </Button>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        <Icon name="Calendar" size={12} className="inline mr-1" />
                        Конец: {giveaway.endDate}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {filteredGiveaways.length === 0 && (
              <Card className="p-12 text-center gradient-card border-border/50">
                <Icon name="Gift" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-bold mb-2">Розыгрышей не найдено</h3>
                <p className="text-muted-foreground">
                  {activeTab === 'my' 
                    ? 'Вы ещё не участвуете ни в одном розыгрыше'
                    : 'В этой категории пока нет активных розыгрышей'
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

export default Giveaways;
