import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  rating: number;
  comments: number;
  coins: number;
  time: string;
  tags: string[];
}

interface Achievement {
  id: number;
  name: string;
  icon: string;
  progress: number;
  maxProgress: number;
  reward: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [userCoins, setUserCoins] = useState(1250);
  const [userLevel, setUserLevel] = useState(12);
  const [userXP, setUserXP] = useState(65);

  const posts: Post[] = [
    {
      id: 1,
      author: 'CyberWarrior',
      avatar: '/img/f61ddbb3-9e2f-461d-bd62-f58df1bbee28.jpg',
      content: 'Только что прошел новый уровень в этой безумной игре! Кто-нибудь еще играет? Делитесь тактиками! 🎮',
      image: '/img/7c8c251c-ca08-4a11-b7fe-85a6ea398171.jpg',
      rating: 342,
      comments: 47,
      coins: 25,
      time: '2 часа назад',
      tags: ['игры', 'экшн', 'гайды']
    },
    {
      id: 2,
      author: 'NeonDreamer',
      avatar: '/img/f61ddbb3-9e2f-461d-bd62-f58df1bbee28.jpg',
      content: 'Создал новую сборку для киберпанк-билда. Результаты просто космос! Кто хочет - делюсь билдом в комментах 💜',
      rating: 128,
      comments: 23,
      coins: 15,
      time: '5 часов назад',
      tags: ['киберпанк', 'билды', 'советы']
    },
    {
      id: 3,
      author: 'PixelMaster',
      avatar: '/img/f61ddbb3-9e2f-461d-bd62-f58df1bbee28.jpg',
      content: 'Топ-10 секретов, которые изменят вашу игру навсегда! Номер 7 вас удивит 😱',
      rating: 89,
      comments: 12,
      coins: 10,
      time: '8 часов назад',
      tags: ['топ', 'секреты', 'новичкам']
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 1,
      name: 'Первый пост',
      icon: '📝',
      progress: 1,
      maxProgress: 1,
      reward: 50
    },
    {
      id: 2,
      name: 'Популярный автор',
      icon: '⭐',
      progress: 15,
      maxProgress: 50,
      reward: 200
    },
    {
      id: 3,
      name: 'Комментатор',
      icon: '💬',
      progress: 47,
      maxProgress: 100,
      reward: 150
    },
    {
      id: 4,
      name: 'Щедрый',
      icon: '🎁',
      progress: 23,
      maxProgress: 30,
      reward: 100
    }
  ];

  const handleVote = (postId: number, direction: 'up' | 'down') => {
    console.log(`Voted ${direction} on post ${postId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-card/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold">
                <span className="text-gradient">GAMEHUB</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-2">
              <Button
                variant={activeTab === 'feed' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('feed')}
                className="gap-2"
              >
                <Icon name="Home" size={18} />
                Лента
              </Button>
              <Button
                variant={activeTab === 'communities' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('communities')}
                className="gap-2"
              >
                <Icon name="Users" size={18} />
                Сообщества
              </Button>
              <Button
                variant={activeTab === 'ratings' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('ratings')}
                className="gap-2"
              >
                <Icon name="Trophy" size={18} />
                Рейтинги
              </Button>
              <Button
                variant={activeTab === 'achievements' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('achievements')}
                className="gap-2"
              >
                <Icon name="Award" size={18} />
                Достижения
              </Button>
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Search" size={20} />
              </Button>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full gradient-gaming">
                <Icon name="Coins" size={18} />
                <span className="font-bold">{userCoins}</span>
              </div>
              <Avatar className="border-2 border-primary glow-purple cursor-pointer">
                <AvatarImage src="/img/f61ddbb3-9e2f-461d-bd62-f58df1bbee28.jpg" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3 space-y-4">
            <Card className="p-6 gradient-card border-primary/20 glow-purple">
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar className="w-24 h-24 border-4 border-primary">
                  <AvatarImage src="/img/f61ddbb3-9e2f-461d-bd62-f58df1bbee28.jpg" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="font-bold text-xl">ProGamer2024</h3>
                    <Badge className="gradient-gaming">LVL {userLevel}</Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>До {userLevel + 1} уровня</span>
                      <span>{userXP}%</span>
                    </div>
                    <Progress value={userXP} className="h-2" />
                  </div>
                  <div className="flex justify-around pt-4 border-t border-border">
                    <div>
                      <div className="text-2xl font-bold text-primary">342</div>
                      <div className="text-xs text-muted-foreground">Постов</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary">1.2k</div>
                      <div className="text-xs text-muted-foreground">Рейтинг</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">89</div>
                      <div className="text-xs text-muted-foreground">Друзей</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 gradient-card border-primary/20">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Icon name="Zap" size={18} className="text-accent" />
                Быстрые действия
              </h3>
              <div className="space-y-2">
                <Button className="w-full justify-start gradient-gaming" size="sm">
                  <Icon name="Plus" size={16} />
                  Создать пост
                </Button>
                <Button className="w-full justify-start" variant="outline" size="sm">
                  <Icon name="Image" size={16} />
                  Загрузить медиа
                </Button>
                <Button className="w-full justify-start" variant="outline" size="sm">
                  <Icon name="MessageSquare" size={16} />
                  Мои обсуждения
                </Button>
              </div>
            </Card>
          </aside>

          <main className="lg:col-span-6 space-y-4">
            <Card className="p-4 gradient-card border-primary/20">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src="/img/f61ddbb3-9e2f-461d-bd62-f58df1bbee28.jpg" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <Button className="flex-1 justify-start" variant="outline">
                  Поделись чем-то интересным...
                </Button>
                <Button size="icon" className="gradient-gaming">
                  <Icon name="Image" size={20} />
                </Button>
              </div>
            </Card>

            {posts.map((post, index) => (
              <Card
                key={post.id}
                className="gradient-card border-primary/20 overflow-hidden animate-fade-in hover:border-primary/40 transition-all"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="border-2 border-primary/50">
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{post.author}</div>
                        <div className="text-sm text-muted-foreground">{post.time}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Icon name="MoreHorizontal" size={20} />
                    </Button>
                  </div>

                  <p className="mb-3 text-foreground/90">{post.content}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {post.image && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img
                        src={post.image}
                        alt="Post content"
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 hover:text-primary"
                        onClick={() => handleVote(post.id, 'up')}
                      >
                        <Icon name="ArrowUp" size={18} />
                        {post.rating}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleVote(post.id, 'down')}
                      >
                        <Icon name="ArrowDown" size={18} />
                      </Button>
                    </div>

                    <Button variant="ghost" size="sm" className="gap-2">
                      <Icon name="MessageSquare" size={18} />
                      {post.comments}
                    </Button>

                    <Button variant="ghost" size="sm" className="gap-2">
                      <Icon name="Share2" size={18} />
                    </Button>

                    <div className="flex items-center gap-1 text-accent font-semibold">
                      <Icon name="Coins" size={18} />
                      +{post.coins}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </main>

          <aside className="lg:col-span-3 space-y-4">
            <Card className="p-4 gradient-card border-secondary/20 glow-pink">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Icon name="Award" size={18} className="text-secondary" />
                Достижения
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-lg bg-muted/50 border transition-all ${
                      achievement.progress === achievement.maxProgress
                        ? 'border-secondary animate-pulse-glow'
                        : 'border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{achievement.icon}</span>
                        <span className="font-semibold text-sm">{achievement.name}</span>
                      </div>
                      {achievement.progress === achievement.maxProgress && (
                        <Badge className="gradient-gaming text-xs">
                          +{achievement.reward}
                        </Badge>
                      )}
                    </div>
                    <Progress
                      value={(achievement.progress / achievement.maxProgress) * 100}
                      className="h-1.5"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      {achievement.progress}/{achievement.maxProgress}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 gradient-card border-accent/20">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Icon name="TrendingUp" size={18} className="text-accent" />
                Топ авторов
              </h3>
              <div className="space-y-3">
                {[1, 2, 3].map((rank) => (
                  <div key={rank} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      rank === 1 ? 'gradient-gaming' : rank === 2 ? 'bg-secondary' : 'bg-accent'
                    }`}>
                      {rank}
                    </div>
                    <Avatar className="w-10 h-10 border-2 border-primary/30">
                      <AvatarImage src="/img/f61ddbb3-9e2f-461d-bd62-f58df1bbee28.jpg" />
                      <AvatarFallback>U{rank}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">User{rank}234</div>
                      <div className="text-xs text-muted-foreground">
                        {3450 - rank * 200} рейтинга
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 gradient-card border-game-blue/20">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Icon name="Flame" size={18} className="text-game-blue" />
                Горячие теги
              </h3>
              <div className="flex flex-wrap gap-2">
                {['новости', 'игры', 'гайды', 'юмор', 'киберспорт', 'обзоры'].map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 backdrop-blur-lg bg-card/80 border-t border-border p-4">
        <div className="flex justify-around">
          <Button
            variant={activeTab === 'feed' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setActiveTab('feed')}
          >
            <Icon name="Home" size={24} />
          </Button>
          <Button
            variant={activeTab === 'communities' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setActiveTab('communities')}
          >
            <Icon name="Users" size={24} />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="gradient-gaming -mt-6 w-14 h-14 rounded-full shadow-lg"
          >
            <Icon name="Plus" size={28} />
          </Button>
          <Button
            variant={activeTab === 'ratings' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setActiveTab('ratings')}
          >
            <Icon name="Trophy" size={24} />
          </Button>
          <Button
            variant={activeTab === 'achievements' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setActiveTab('achievements')}
          >
            <Icon name="Award" size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
