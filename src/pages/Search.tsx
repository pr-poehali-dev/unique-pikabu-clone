import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface SearchResult {
  id: number;
  type: 'post' | 'user';
  title?: string;
  excerpt?: string;
  author?: string;
  authorAvatar?: string;
  authorRating?: number;
  name?: string;
  avatar?: string;
  userRating?: number;
  bio?: string;
  followers?: number;
  image?: string;
  tags?: string[];
  rating?: number;
  views?: number;
  comments?: number;
  time?: string;
  category?: string;
}

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState('all');

  const categories = [
    { id: 'stories', name: 'Истории', icon: 'BookOpen' },
    { id: 'humor', name: 'Юмор', icon: 'Laugh' },
    { id: 'tech', name: 'Технологии', icon: 'Cpu' },
    { id: 'games', name: 'Игры', icon: 'Gamepad2' },
    { id: 'life', name: 'Жизнь', icon: 'Heart' },
    { id: 'science', name: 'Наука', icon: 'Atom' },
    { id: 'art', name: 'Творчество', icon: 'Palette' },
    { id: 'business', name: 'Бизнес', icon: 'Briefcase' },
  ];

  const searchResults: SearchResult[] = [
    {
      id: 1,
      type: 'post',
      title: 'Как я случайно создал стартап, который изменил мою жизнь',
      excerpt: 'Всё началось с простой идеи, которая пришла мне в голову во время утреннего кофе...',
      author: 'Дмитрий Космонавт',
      authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      authorRating: 12845,
      image: '/img/7e9d4687-154d-41fc-a97a-06f1fa423e1f.jpg',
      tags: ['бизнес', 'истории успеха', 'стартапы'],
      rating: 2847,
      views: 45230,
      comments: 342,
      time: '3 часа назад',
      category: 'stories',
    },
    {
      id: 2,
      type: 'user',
      name: 'Дмитрий Космонавт',
      avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      userRating: 12845,
      bio: 'Предприниматель и разработчик. Пишу о бизнесе, технологиях и личном опыте.',
      followers: 2340,
    },
    {
      id: 3,
      type: 'post',
      title: 'ИИ уже не тот, каким был вчера: что изменилось за последний год',
      excerpt: 'Искусственный интеллект развивается с невероятной скоростью. Давайте разберёмся...',
      author: 'TechGuru2024',
      authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      authorRating: 8432,
      tags: ['технологии', 'ИИ', 'будущее'],
      rating: 1923,
      views: 38120,
      comments: 267,
      time: '5 часов назад',
      category: 'tech',
    },
    {
      id: 4,
      type: 'post',
      title: 'Квантовая физика простыми словами: как объяснить бабушке',
      excerpt: 'Моя бабушка спросила меня: "Чем ты вообще занимаешься в этой своей науке?"',
      author: 'НаучныйПопугай',
      authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      authorRating: 9876,
      tags: ['наука', 'физика', 'образование'],
      rating: 1654,
      views: 28340,
      comments: 189,
      time: '12 часов назад',
      category: 'science',
    },
    {
      id: 5,
      type: 'user',
      name: 'TechGuru2024',
      avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      userRating: 8432,
      bio: 'Эксперт по технологиям и инновациям. Слежу за трендами в IT.',
      followers: 1890,
    },
  ];

  const trendingSearches = [
    'стартапы 2025',
    'искусственный интеллект',
    'мотивация',
    'программирование',
    'финансовая грамотность',
    'саморазвитие',
  ];

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredResults = searchResults.filter((result) => {
    if (activeTab === 'posts' && result.type !== 'post') return false;
    if (activeTab === 'users' && result.type !== 'user') return false;
    if (selectedCategories.length > 0 && result.category && !selectedCategories.includes(result.category)) {
      return false;
    }
    return true;
  });

  const postsCount = searchResults.filter((r) => r.type === 'post').length;
  const usersCount = searchResults.filter((r) => r.type === 'user').length;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-card/90 border-b border-border shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4 flex-1 max-w-3xl">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <Icon name="ArrowLeft" size={20} />
              </Button>

              <h1
                className="text-2xl font-bold tracking-tight cursor-pointer hidden sm:block"
                onClick={() => navigate('/')}
              >
                <span className="text-gradient">PULSE</span>
              </h1>

              <div className="relative flex-1">
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  placeholder="Поиск постов, людей, тегов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setSearchQuery('')}
                  >
                    <Icon name="X" size={16} />
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 ml-4">
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
          <aside className="lg:col-span-3 space-y-4">
            <Card className="p-5 gradient-card border-border/50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="Filter" size={20} className="text-primary" />
                Фильтры
              </h3>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold mb-3 block">Сортировка</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">По релевантности</SelectItem>
                      <SelectItem value="date">По дате</SelectItem>
                      <SelectItem value="rating">По рейтингу</SelectItem>
                      <SelectItem value="views">По просмотрам</SelectItem>
                      <SelectItem value="comments">По комментариям</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-3 block">Период</Label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">За всё время</SelectItem>
                      <SelectItem value="today">Сегодня</SelectItem>
                      <SelectItem value="week">За неделю</SelectItem>
                      <SelectItem value="month">За месяц</SelectItem>
                      <SelectItem value="year">За год</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-3 block">Категории</Label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.id}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleCategoryToggle(category.id)}
                        />
                        <Label
                          htmlFor={category.id}
                          className="text-sm font-normal cursor-pointer flex items-center gap-2"
                        >
                          <Icon name={category.icon as any} size={16} />
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedCategories.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setSelectedCategories([])}
                  >
                    <Icon name="X" size={16} />
                    Сбросить фильтры
                  </Button>
                )}
              </div>
            </Card>

            <Card className="p-5 gradient-card border-border/50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={20} className="text-accent" />
                Популярные запросы
              </h3>
              <div className="space-y-2">
                {trendingSearches.map((search) => (
                  <Button
                    key={search}
                    variant="ghost"
                    className="w-full justify-start text-sm"
                    onClick={() => setSearchQuery(search)}
                  >
                    <Icon name="Search" size={14} className="mr-2" />
                    {search}
                  </Button>
                ))}
              </div>
            </Card>
          </aside>

          <main className="lg:col-span-9 space-y-4">
            <Card className="p-4 gradient-card border-border/50">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-3 bg-muted/30">
                  <TabsTrigger value="all" className="gap-2">
                    <Icon name="Sparkles" size={16} />
                    Всё
                    <Badge variant="secondary" className="ml-2">
                      {searchResults.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="posts" className="gap-2">
                    <Icon name="FileText" size={16} />
                    Посты
                    <Badge variant="secondary" className="ml-2">
                      {postsCount}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="users" className="gap-2">
                    <Icon name="Users" size={16} />
                    Люди
                    <Badge variant="secondary" className="ml-2">
                      {usersCount}
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </Card>

            {!searchQuery && (
              <Card className="p-8 gradient-card border-border/50 text-center">
                <div className="w-20 h-20 rounded-full bg-muted/50 mx-auto flex items-center justify-center mb-4">
                  <Icon name="Search" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Начните поиск</h3>
                <p className="text-muted-foreground">
                  Введите запрос, чтобы найти интересные посты и авторов
                </p>
              </Card>
            )}

            {searchQuery && filteredResults.length === 0 && (
              <Card className="p-8 gradient-card border-border/50 text-center">
                <div className="w-20 h-20 rounded-full bg-muted/50 mx-auto flex items-center justify-center mb-4">
                  <Icon name="SearchX" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground mb-4">
                  Попробуйте изменить запрос или сбросить фильтры
                </p>
                <Button variant="outline" onClick={() => setSearchQuery('')}>
                  Очистить поиск
                </Button>
              </Card>
            )}

            <div className="space-y-4">
              {filteredResults.map((result, index) =>
                result.type === 'post' ? (
                  <Card
                    key={result.id}
                    className="gradient-card border-border/50 overflow-hidden hover-lift cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => navigate(`/post/${result.id}`)}
                  >
                    <div className="p-5">
                      <div className="flex gap-4">
                        {result.image && (
                          <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={result.image}
                              alt={result.title}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar
                              className="w-6 h-6 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate('/profile/dmitry');
                              }}
                            >
                              <AvatarImage src={result.authorAvatar} />
                              <AvatarFallback>{result.author?.[0]}</AvatarFallback>
                            </Avatar>
                            <span
                              className="text-sm font-semibold hover:text-primary cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate('/profile/dmitry');
                              }}
                            >
                              {result.author}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {result.authorRating} 🔥
                            </Badge>
                            <span className="text-xs text-muted-foreground">• {result.time}</span>
                          </div>

                          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                            {result.title}
                          </h3>

                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {result.excerpt}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {result.tags?.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Icon name="ArrowUp" size={16} className="text-primary" />
                              <span className="font-semibold text-primary">{result.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="MessageSquare" size={16} />
                              {result.comments}
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="Eye" size={16} />
                              {result.views?.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card
                    key={result.id}
                    className="gradient-card border-border/50 p-5 hover-lift cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => navigate('/profile/dmitry')}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16 border-2 border-primary">
                        <AvatarImage src={result.avatar} />
                        <AvatarFallback>{result.name?.[0]}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg hover:text-primary">{result.name}</h3>
                          <Badge variant="outline">{result.userRating} 🔥</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {result.bio}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Icon name="Users" size={16} />
                            {result.followers} читателей
                          </div>
                        </div>
                      </div>

                      <Button className="gradient-primary" onClick={(e) => e.stopPropagation()}>
                        <Icon name="UserPlus" size={16} />
                        Подписаться
                      </Button>
                    </div>
                  </Card>
                )
              )}
            </div>

            {filteredResults.length > 0 && (
              <div className="flex justify-center pt-6">
                <Button variant="outline" size="lg" className="gap-2">
                  <Icon name="RefreshCw" size={18} />
                  Загрузить ещё
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Search;
