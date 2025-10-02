import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Story {
  id: number;
  author: string;
  authorAvatar: string;
  authorRating: number;
  title: string;
  content: string;
  image?: string;
  tags: string[];
  rating: number;
  views: number;
  comments: number;
  bookmarks: number;
  time: string;
  category: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('hot');
  const [storyVotes, setStoryVotes] = useState<Record<number, 'up' | 'down' | null>>({});
  const [savedStories, setSavedStories] = useState<Set<number>>(new Set());
  const [shareMenuOpen, setShareMenuOpen] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'Всё', icon: 'Sparkles' },
    { id: 'stories', name: 'Истории', icon: 'BookOpen' },
    { id: 'humor', name: 'Юмор', icon: 'Laugh' },
    { id: 'tech', name: 'Технологии', icon: 'Cpu' },
    { id: 'games', name: 'Игры', icon: 'Gamepad2' },
    { id: 'life', name: 'Жизнь', icon: 'Heart' },
    { id: 'science', name: 'Наука', icon: 'Atom' },
    { id: 'art', name: 'Творчество', icon: 'Palette' },
  ];

  const handleStoryVote = (storyId: number, type: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    if (storyVotes[storyId] === type) {
      setStoryVotes({ ...storyVotes, [storyId]: null });
    } else {
      setStoryVotes({ ...storyVotes, [storyId]: type });
    }
  };

  const handleBookmark = (storyId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSaved = new Set(savedStories);
    if (newSaved.has(storyId)) {
      newSaved.delete(storyId);
    } else {
      newSaved.add(storyId);
    }
    setSavedStories(newSaved);
  };

  const handleShare = (platform: string, story: Story, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/post/${story.id}`;
    const text = encodeURIComponent(story.title);
    
    const shareUrls: Record<string, string> = {
      vk: `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${text}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${text}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`,
      copy: url
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Ссылка скопирована в буфер обмена!');
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
    setShareMenuOpen(null);
  };

  const getBookmarkCount = (story: Story) => {
    return story.bookmarks + (savedStories.has(story.id) ? 1 : 0);
  };

  const getStoryRating = (story: Story) => {
    let rating = story.rating;
    const vote = storyVotes[story.id];
    if (vote === 'up') rating += 1;
    if (vote === 'down') rating -= 1;
    return rating;
  };

  const stories: Story[] = [
    {
      id: 1,
      author: 'Дмитрий Космонавт',
      authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      authorRating: 12845,
      title: 'Как я случайно создал стартап, который изменил мою жизнь',
      content: 'Всё началось с простой идеи, которая пришла мне в голову во время утреннего кофе. Я даже не думал, что это приведёт к чему-то большему... Но спустя год у нас уже была команда из 15 человек и первые серьёзные инвесторы.',
      image: '/img/7e9d4687-154d-41fc-a97a-06f1fa423e1f.jpg',
      tags: ['бизнес', 'истории успеха', 'стартапы'],
      rating: 2847,
      views: 45230,
      comments: 342,
      bookmarks: 892,
      time: '3 часа назад',
      category: 'stories'
    },
    {
      id: 2,
      author: 'TechGuru2024',
      authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      authorRating: 8432,
      title: 'ИИ уже не тот, каким был вчера: что изменилось за последний год',
      content: 'Искусственный интеллект развивается с невероятной скоростью. Давайте разберёмся, какие прорывы произошли за последние 12 месяцев и что это значит для нас с вами.',
      tags: ['технологии', 'ИИ', 'будущее'],
      rating: 1923,
      views: 38120,
      comments: 267,
      bookmarks: 654,
      time: '5 часов назад',
      category: 'tech'
    },
    {
      id: 3,
      author: 'СмешнойКот',
      authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      authorRating: 15234,
      title: 'Когда пытался починить компьютер и случайно стал хакером',
      content: 'Решил я как-то обновить драйвера на старом ноутбуке. Казалось бы, что может пойти не так? Спойлер: очень многое! История о том, как я случайно взломал свой собственный Wi-Fi и напугал соседей 😂',
      tags: ['юмор', 'технологии', 'жизненное'],
      rating: 3456,
      views: 67890,
      comments: 521,
      bookmarks: 1243,
      time: '8 часов назад',
      category: 'humor'
    },
    {
      id: 4,
      author: 'НаучныйПопугай',
      authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      authorRating: 9876,
      title: 'Квантовая физика простыми словами: как объяснить бабушке',
      content: 'Моя бабушка спросила меня: "Чем ты вообще занимаешься в этой своей науке?" Пришлось придумать объяснение квантовой механики через борщ и пирожки. И знаете что? Сработало!',
      tags: ['наука', 'физика', 'образование'],
      rating: 1654,
      views: 28340,
      comments: 189,
      bookmarks: 432,
      time: '12 часов назад',
      category: 'science'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-card/90 border-b border-border shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="text-gradient">PULSE</span>
              </h1>
              
              <nav className="hidden lg:flex items-center gap-1">
                {categories.slice(0, 5).map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'ghost'}
                    onClick={() => setSelectedCategory(category.id)}
                    className="gap-2"
                    size="sm"
                  >
                    <Icon name={category.icon as any} size={16} />
                    {category.name}
                  </Button>
                ))}
              </nav>
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

              <Button 
                className="hidden md:flex gradient-primary gap-2"
                onClick={() => navigate('/create')}
              >
                <Icon name="PenSquare" size={18} />
                Создать пост
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="hidden lg:block lg:col-span-3 space-y-4">
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

            <Card className="p-5 gradient-card border-border/50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={20} className="text-secondary" />
                Топ авторов дня
              </h3>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((rank) => (
                  <div key={rank} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm ${
                      rank === 1 ? 'gradient-primary text-white' : 
                      rank === 2 ? 'bg-secondary text-white' : 
                      rank === 3 ? 'gradient-accent text-white' : 
                      'bg-muted text-muted-foreground'
                    }`}>
                      {rank}
                    </div>
                    <Avatar className="w-9 h-9">
                      <AvatarImage src="/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg" />
                      <AvatarFallback>U{rank}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">User_{rank}234</div>
                      <div className="text-xs text-muted-foreground">
                        {15000 - rank * 1200} 🔥
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 gradient-card border-border/50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="Flame" size={20} className="text-accent" />
                Горячие теги
              </h3>
              <div className="flex flex-wrap gap-2">
                {['новости', 'технологии', 'юмор', 'истории', 'лайфхаки', 'наука', 'игры', 'творчество'].map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </aside>

          <main className="lg:col-span-6 space-y-4">
            <Card className="p-4 gradient-card border-border/50">
              <Tabs value={sortBy} onValueChange={setSortBy} className="w-full">
                <TabsList className="w-full grid grid-cols-3 bg-muted/30">
                  <TabsTrigger value="hot" className="gap-2">
                    <Icon name="Flame" size={16} />
                    Горячее
                  </TabsTrigger>
                  <TabsTrigger value="new" className="gap-2">
                    <Icon name="Sparkles" size={16} />
                    Новое
                  </TabsTrigger>
                  <TabsTrigger value="top" className="gap-2">
                    <Icon name="Crown" size={16} />
                    Лучшее
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </Card>

            {stories.map((story, index) => (
              <Card
                key={story.id}
                className="gradient-card border-border/50 overflow-hidden hover-lift animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/post/${story.id}`)}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex flex-col items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 transition-all ${
                          storyVotes[story.id] === 'up'
                            ? 'text-primary bg-primary/20 hover:bg-primary/30'
                            : 'hover:text-primary hover:bg-primary/10'
                        }`}
                        onClick={(e) => handleStoryVote(story.id, 'up', e)}
                      >
                        <Icon name="ArrowUp" size={20} />
                      </Button>
                      <span className={`font-bold text-lg transition-colors ${
                        storyVotes[story.id] === 'up'
                          ? 'text-primary'
                          : storyVotes[story.id] === 'down'
                          ? 'text-destructive'
                          : 'text-foreground'
                      }`}>
                        {getStoryRating(story)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 transition-all ${
                          storyVotes[story.id] === 'down'
                            ? 'text-destructive bg-destructive/20 hover:bg-destructive/30'
                            : 'hover:text-destructive hover:bg-destructive/10'
                        }`}
                        onClick={(e) => handleStoryVote(story.id, 'down', e)}
                      >
                        <Icon name="ArrowDown" size={20} />
                      </Button>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar 
                          className="w-8 h-8 border border-border cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/profile/dmitry');
                          }}
                        >
                          <AvatarImage src={story.authorAvatar} />
                          <AvatarFallback>{story.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span 
                            className="font-semibold text-sm hover:text-primary cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate('/profile/dmitry');
                            }}
                          >
                            {story.author}
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{story.time}</span>
                          <Badge variant="outline" className="text-xs">
                            {story.authorRating} 🔥
                          </Badge>
                        </div>
                      </div>

                      <h2 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
                        {story.title}
                      </h2>

                      <p className="text-muted-foreground mb-3 leading-relaxed">
                        {story.content}
                      </p>

                      {story.image && (
                        <div className="mb-4 rounded-xl overflow-hidden">
                          <img
                            src={story.image}
                            alt={story.title}
                            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mb-4">
                        {story.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="gap-2 hover:text-secondary">
                            <Icon name="MessageSquare" size={18} />
                            <span className="text-sm font-medium">{story.comments}</span>
                          </Button>

                          <Button variant="ghost" size="sm" className="gap-2 hover:text-accent">
                            <Icon name="Eye" size={18} />
                            <span className="text-sm font-medium">{story.views.toLocaleString()}</span>
                          </Button>

                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`gap-2 transition-all ${
                              savedStories.has(story.id) 
                                ? 'text-accent bg-accent/20 hover:bg-accent/30' 
                                : 'hover:text-accent'
                            }`}
                            onClick={(e) => handleBookmark(story.id, e)}
                          >
                            <Icon name={savedStories.has(story.id) ? "BookmarkCheck" : "Bookmark"} size={18} />
                            <span className="text-sm font-medium">{getBookmarkCount(story)}</span>
                          </Button>
                        </div>

                        <div className="flex items-center gap-2 relative">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:text-primary hover:bg-primary/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShareMenuOpen(shareMenuOpen === story.id ? null : story.id);
                            }}
                          >
                            <Icon name="Share2" size={16} />
                          </Button>

                          {shareMenuOpen === story.id && (
                            <Card className="absolute bottom-full right-0 mb-2 p-2 z-50 shadow-xl border-border/50 min-w-[180px] animate-fade-in">
                              <div className="flex flex-col gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="justify-start gap-2 hover:bg-primary/10"
                                  onClick={(e) => handleShare('vk', story, e)}
                                >
                                  <Icon name="Share" size={16} className="text-blue-500" />
                                  ВКонтакте
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="justify-start gap-2 hover:bg-primary/10"
                                  onClick={(e) => handleShare('telegram', story, e)}
                                >
                                  <Icon name="Send" size={16} className="text-sky-500" />
                                  Telegram
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="justify-start gap-2 hover:bg-primary/10"
                                  onClick={(e) => handleShare('twitter', story, e)}
                                >
                                  <Icon name="Twitter" size={16} className="text-blue-400" />
                                  Twitter
                                </Button>
                                <div className="h-px bg-border my-1" />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="justify-start gap-2 hover:bg-accent/10"
                                  onClick={(e) => handleShare('copy', story, e)}
                                >
                                  <Icon name="Copy" size={16} className="text-accent" />
                                  Копировать ссылку
                                </Button>
                              </div>
                            </Card>
                          )}
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Icon name="MoreHorizontal" size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            <div className="flex justify-center pt-6">
              <Button variant="outline" size="lg" className="gap-2">
                <Icon name="RefreshCw" size={18} />
                Загрузить ещё
              </Button>
            </div>
          </main>

          <aside className="lg:col-span-3 space-y-4">
            <Card className="p-5 gradient-card border-border/50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="Calendar" size={20} className="text-primary" />
                Ваша активность
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                      <Icon name="PenSquare" size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Постов</div>
                      <div className="text-2xl font-bold text-primary">24</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <Icon name="MessageSquare" size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Комментариев</div>
                      <div className="text-2xl font-bold text-secondary">156</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center">
                      <Icon name="Award" size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Рейтинг</div>
                      <div className="text-2xl font-bold text-accent">8.5K</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5 gradient-card border-border/50 glow-primary">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full gradient-primary mx-auto flex items-center justify-center">
                  <Icon name="Zap" size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-lg">Стань автором PRO</h3>
                <p className="text-sm text-muted-foreground">
                  Получи доступ к эксклюзивным функциям и увеличь свой охват
                </p>
                <Button className="w-full gradient-primary">
                  Узнать больше
                </Button>
              </div>
            </Card>

            <Card className="p-5 gradient-card border-border/50 overflow-hidden relative bg-gradient-to-br from-accent/10 via-card to-primary/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Icon name="Gift" size={20} className="text-accent" />
                  Розыгрыши
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-xs"
                  onClick={() => navigate('/giveaways')}
                >
                  Все
                  <Icon name="ChevronRight" size={14} />
                </Button>
              </div>

              <div className="space-y-3">
                <div 
                  className="p-3 rounded-lg bg-card border border-primary/20 cursor-pointer hover:border-primary/40 transition-all hover-lift"
                  onClick={() => navigate('/giveaways')}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <Icon name="Gamepad2" size={24} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-1">
                        <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                          Официальный
                        </Badge>
                      </div>
                      <h4 className="font-bold text-sm mb-1 line-clamp-2">
                        PlayStation 5 + игры
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Users" size={12} />
                          4782
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-destructive">
                          <Icon name="Clock" size={12} />
                          13 дней
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-3 rounded-lg bg-card border border-border/50 cursor-pointer hover:border-accent/40 transition-all hover-lift"
                  onClick={() => navigate('/giveaways')}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0">
                      <Icon name="DollarSign" size={24} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-1">
                        <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                          Официальный
                        </Badge>
                      </div>
                      <h4 className="font-bold text-sm mb-1 line-clamp-2">
                        5000₽ за лучший пост
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Users" size={12} />
                          234
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-destructive">
                          <Icon name="Clock" size={12} />
                          5 дней
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-3 rounded-lg bg-card border border-border/50 cursor-pointer hover:border-accent/40 transition-all hover-lift"
                  onClick={() => navigate('/giveaways')}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                      <Icon name="Headphones" size={24} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          От юзера
                        </Badge>
                      </div>
                      <h4 className="font-bold text-sm mb-1 line-clamp-2">
                        AirPods Pro
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Users" size={12} />
                          156
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-destructive">
                          <Icon name="Clock" size={12} />
                          8 дней
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full mt-4 gradient-primary gap-2"
                onClick={() => navigate('/giveaways')}
              >
                <Icon name="Gift" size={16} />
                Все розыгрыши
              </Button>
            </Card>

            <Card className="p-5 gradient-card border-border/50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="Lightbulb" size={20} className="text-accent" />
                Подсказка дня
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                💡 Используйте теги в постах для большего охвата. Посты с 3-5 релевантными тегами получают в 2 раза больше просмотров!
              </p>
            </Card>
          </aside>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-card/90 border-t border-border p-3 shadow-2xl">
        <div className="flex justify-around items-center">
          <Button variant="ghost" size="icon">
            <Icon name="Home" size={24} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/search')}
          >
            <Icon name="Search" size={24} />
          </Button>
          <Button 
            size="icon" 
            className="gradient-primary w-14 h-14 -mt-8 shadow-lg"
            onClick={() => navigate('/create')}
          >
            <Icon name="Plus" size={28} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/notifications')}
          >
            <Icon name="Bell" size={24} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/profile/dmitry')}
          >
            <Icon name="User" size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;