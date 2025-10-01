import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface UserPost {
  id: number;
  title: string;
  excerpt: string;
  image?: string;
  tags: string[];
  rating: number;
  views: number;
  comments: number;
  time: string;
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts');

  const user = {
    name: 'Дмитрий Космонавт',
    avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
    banner: '/img/69c18f93-88df-4a7e-b67f-c52408dc510d.jpg',
    rating: 12845,
    level: 24,
    xp: 73,
    bio: 'Предприниматель и разработчик. Пишу о бизнесе, технологиях и личном опыте. Создал несколько успешных стартапов. Верю, что делиться знаниями — лучший способ их умножить.',
    location: 'Москва, Россия',
    website: 'example.com',
    joined: 'Сентябрь 2023',
    stats: {
      posts: 127,
      followers: 2340,
      following: 456,
      comments: 890,
      bookmarks: 234,
    },
  };

  const posts: UserPost[] = [
    {
      id: 1,
      title: 'Как я случайно создал стартап, который изменил мою жизнь',
      excerpt: 'Всё началось с простой идеи, которая пришла мне в голову во время утреннего кофе...',
      image: '/img/7e9d4687-154d-41fc-a97a-06f1fa423e1f.jpg',
      tags: ['бизнес', 'истории успеха', 'стартапы'],
      rating: 2847,
      views: 45230,
      comments: 342,
      time: '3 часа назад',
    },
    {
      id: 2,
      title: 'От нуля до первого миллиона: что я узнал за год',
      excerpt: 'Прошёл год с момента запуска моего первого продукта. Хочу поделиться реальными цифрами и инсайтами...',
      tags: ['бизнес', 'финансы', 'опыт'],
      rating: 1923,
      views: 38120,
      comments: 267,
      time: '2 дня назад',
    },
    {
      id: 3,
      title: '10 книг, которые изменили моё мышление',
      excerpt: 'Книги, которые реально повлияли на мою жизнь и карьеру. Не просто бизнес-литература...',
      tags: ['саморазвитие', 'книги', 'мотивация'],
      rating: 1654,
      views: 28340,
      comments: 189,
      time: '5 дней назад',
    },
    {
      id: 4,
      title: 'Почему я ушёл из найма и не жалею об этом',
      excerpt: 'Три года назад я принял решение, которое многие считали безумным. Сегодня могу сказать...',
      tags: ['карьера', 'предпринимательство', 'жизнь'],
      rating: 2156,
      views: 42890,
      comments: 412,
      time: '1 неделю назад',
    },
  ];

  const achievements: Achievement[] = [
    {
      id: 1,
      name: 'Первый пост',
      description: 'Опубликовать первый пост',
      icon: '📝',
      unlocked: true,
    },
    {
      id: 2,
      name: 'Автор месяца',
      description: 'Получить 10,000 просмотров за месяц',
      icon: '⭐',
      unlocked: true,
    },
    {
      id: 3,
      name: 'Популярный',
      description: 'Набрать 1000 подписчиков',
      icon: '👥',
      unlocked: true,
    },
    {
      id: 4,
      name: 'Вирусный контент',
      description: 'Пост с 1000+ лайками',
      icon: '🔥',
      unlocked: true,
    },
    {
      id: 5,
      name: 'Комментатор',
      description: 'Оставить 500 комментариев',
      icon: '💬',
      unlocked: false,
      progress: 378,
      maxProgress: 500,
    },
    {
      id: 6,
      name: 'Легенда',
      description: 'Достичь 20,000 рейтинга',
      icon: '👑',
      unlocked: false,
      progress: 12845,
      maxProgress: 20000,
    },
  ];

  const savedPosts = posts.slice(0, 2);

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

              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/search')}
              >
                <Icon name="Search" size={20} />
              </Button>

              <Button variant="ghost" size="icon">
                <Icon name="Settings" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative">
        <div className="h-64 overflow-hidden">
          <img src={user.banner} alt="Profile banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4">
          <div className="relative -mt-20 pb-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              <Avatar className="w-32 h-32 border-4 border-background shadow-2xl">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-3xl">{user.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    <Badge className="gradient-primary">LVL {user.level}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Icon name="MapPin" size={16} />
                      {user.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Link" size={16} />
                      <a href={`https://${user.website}`} className="hover:text-primary">
                        {user.website}
                      </a>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={16} />
                      {user.joined}
                    </div>
                  </div>
                  <p className="text-foreground/80 max-w-2xl leading-relaxed">{user.bio}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="cursor-pointer hover:text-primary">
                    <span className="font-bold text-lg">{user.stats.posts}</span>
                    <span className="text-muted-foreground text-sm ml-1">постов</span>
                  </div>
                  <div className="cursor-pointer hover:text-primary">
                    <span className="font-bold text-lg">{user.stats.followers}</span>
                    <span className="text-muted-foreground text-sm ml-1">читателей</span>
                  </div>
                  <div className="cursor-pointer hover:text-primary">
                    <span className="font-bold text-lg">{user.stats.following}</span>
                    <span className="text-muted-foreground text-sm ml-1">читает</span>
                  </div>
                  <div className="cursor-pointer hover:text-accent">
                    <span className="font-bold text-lg">{user.rating}</span>
                    <span className="text-muted-foreground text-sm ml-1">🔥 рейтинг</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="gradient-primary gap-2">
                  <Icon name="UserPlus" size={18} />
                  Подписаться
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="MessageCircle" size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="MoreHorizontal" size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-4 xl:col-span-3 space-y-4">
            <Card className="p-5 gradient-card border-border/50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={20} className="text-primary" />
                Прогресс уровня
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">До {user.level + 1} уровня</span>
                  <span className="text-sm font-semibold">{user.xp}%</span>
                </div>
                <Progress value={user.xp} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  Ещё {100 - user.xp}% для следующего уровня
                </p>
              </div>
            </Card>

            <Card className="p-5 gradient-card border-border/50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="BarChart3" size={20} className="text-secondary" />
                Статистика
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Icon name="MessageSquare" size={18} className="text-secondary" />
                    <span className="text-sm">Комментариев</span>
                  </div>
                  <span className="font-bold">{user.stats.comments}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Icon name="Bookmark" size={18} className="text-accent" />
                    <span className="text-sm">Закладок</span>
                  </div>
                  <span className="font-bold">{user.stats.bookmarks}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Icon name="Eye" size={18} className="text-primary" />
                    <span className="text-sm">Всего просмотров</span>
                  </div>
                  <span className="font-bold">154K</span>
                </div>
              </div>
            </Card>

            <Card className="p-5 gradient-card border-border/50 glow-primary">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full gradient-primary mx-auto flex items-center justify-center">
                  <Icon name="Crown" size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-lg">PRO аккаунт</h3>
                <p className="text-sm text-muted-foreground">
                  Расширенная аналитика, эксклюзивные функции и приоритетная поддержка
                </p>
                <Button className="w-full gradient-primary">Активировать PRO</Button>
              </div>
            </Card>
          </aside>

          <main className="lg:col-span-8 xl:col-span-9">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <Card className="p-1 gradient-card border-border/50">
                <TabsList className="w-full grid grid-cols-3 bg-transparent">
                  <TabsTrigger value="posts" className="gap-2">
                    <Icon name="FileText" size={18} />
                    <span className="hidden sm:inline">Посты</span>
                    <Badge variant="secondary" className="ml-2">
                      {user.stats.posts}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="saved" className="gap-2">
                    <Icon name="Bookmark" size={18} />
                    <span className="hidden sm:inline">Закладки</span>
                    <Badge variant="secondary" className="ml-2">
                      {user.stats.bookmarks}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="gap-2">
                    <Icon name="Award" size={18} />
                    <span className="hidden sm:inline">Достижения</span>
                    <Badge variant="secondary" className="ml-2">
                      {achievements.filter((a) => a.unlocked).length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </Card>

              <TabsContent value="posts" className="space-y-4 mt-4">
                {posts.map((post, index) => (
                  <Card
                    key={post.id}
                    className="gradient-card border-border/50 overflow-hidden hover-lift cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => navigate(`/post/${post.id}`)}
                  >
                    <div className="p-5">
                      <div className="flex gap-4">
                        {post.image && (
                          <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {post.excerpt}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4 text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Icon name="ArrowUp" size={16} className="text-primary" />
                                <span className="font-semibold text-primary">{post.rating}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="MessageSquare" size={16} />
                                {post.comments}
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="Eye" size={16} />
                                {post.views.toLocaleString()}
                              </div>
                            </div>
                            <span className="text-muted-foreground">{post.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="saved" className="space-y-4 mt-4">
                {savedPosts.map((post, index) => (
                  <Card
                    key={post.id}
                    className="gradient-card border-border/50 overflow-hidden hover-lift cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => navigate(`/post/${post.id}`)}
                  >
                    <div className="p-5">
                      <div className="flex gap-4">
                        {post.image && (
                          <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {post.excerpt}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4 text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Icon name="ArrowUp" size={16} className="text-primary" />
                                <span className="font-semibold text-primary">{post.rating}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="MessageSquare" size={16} />
                                {post.comments}
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="gap-2">
                              <Icon name="BookmarkX" size={16} />
                              Удалить
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="achievements" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <Card
                      key={achievement.id}
                      className={`gradient-card overflow-hidden animate-fade-in ${
                        achievement.unlocked
                          ? 'border-primary/50 glow-primary'
                          : 'border-border/50 opacity-70'
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="p-5">
                        <div className="flex items-start gap-4">
                          <div
                            className={`text-5xl ${
                              achievement.unlocked ? 'grayscale-0' : 'grayscale opacity-50'
                            }`}
                          >
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-lg">{achievement.name}</h3>
                              {achievement.unlocked && (
                                <Badge className="gradient-primary">Получено</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {achievement.description}
                            </p>

                            {!achievement.unlocked && achievement.progress && achievement.maxProgress && (
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-muted-foreground">Прогресс</span>
                                  <span className="font-semibold">
                                    {achievement.progress}/{achievement.maxProgress}
                                  </span>
                                </div>
                                <Progress
                                  value={(achievement.progress / achievement.maxProgress) * 100}
                                  className="h-2"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;