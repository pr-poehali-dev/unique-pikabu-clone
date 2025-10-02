import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface ChatMessage {
  id: number;
  author: string;
  authorAvatar: string;
  message: string;
  time: string;
  isPremium?: boolean;
}

const StreamView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [chatMessage, setChatMessage] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      author: 'Алексей_Dev',
      authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      message: 'Привет всем! Какая тема сегодня?',
      time: '14:23',
    },
    {
      id: 2,
      author: 'КодерПро',
      authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      message: 'Круто объясняешь! Спасибо за стрим 🔥',
      time: '14:25',
      isPremium: true,
    },
    {
      id: 3,
      author: 'НовичокJS',
      authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      message: 'А можно вопрос про хуки в React?',
      time: '14:27',
    },
    {
      id: 4,
      author: 'ГеймерXXX',
      authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      message: 'Кто тут новенький? Приветствую! 👋',
      time: '14:28',
    },
    {
      id: 5,
      author: 'Модератор',
      authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      message: 'Напоминаю правила чата: будьте вежливы и уважайте друг друга',
      time: '14:30',
      isPremium: true,
    },
  ]);

  const stream = {
    id: 1,
    streamer: 'Дмитрий Космонавт',
    streamerAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
    streamerRating: 12845,
    title: 'Разработка сайта на React в прямом эфире 🚀',
    description: 'Пишем полноценное веб-приложение с нуля. Отвечаю на вопросы, делюсь опытом. Заходите!',
    category: 'Технологии',
    platform: 'twitch',
    streamUrl: 'https://twitch.tv/dmitry_dev',
    isLive: true,
    viewers: 1247,
    followers: 5632,
    startedAt: '2 часа назад',
    tags: ['react', 'программирование', 'веб-разработка'],
    language: 'Русский',
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage: ChatMessage = {
      id: chatMessages.length + 1,
      author: 'Вы',
      authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
      message: chatMessage,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages([...chatMessages, newMessage]);
    setChatMessage('');
  };

  const handleShare = () => {
    const url = `${window.location.origin}/stream/${id}`;
    navigator.clipboard.writeText(url);
    alert('Ссылка на стрим скопирована!');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-card/90 border-b border-border shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/streams')}>
                <Icon name="ArrowLeft" size={20} />
              </Button>

              <h1 className="text-2xl font-bold tracking-tight cursor-pointer" onClick={() => navigate('/')}>
                <span className="text-gradient">PULSE</span>
              </h1>

              <Badge className="bg-destructive text-destructive-foreground gap-1 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-white" />
                LIVE
              </Badge>

              <div className="hidden md:flex items-center gap-2 text-sm">
                <Icon name="Eye" size={16} />
                <span className="font-semibold">{stream.viewers.toLocaleString()}</span>
                <span className="text-muted-foreground">зрителей</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
                <Icon name="Share2" size={16} />
                <span className="hidden md:inline">Поделиться</span>
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
          <main className="lg:col-span-9 space-y-4">
            <Card className="gradient-card border-border/50 overflow-hidden">
              <div className="aspect-video bg-black relative">
                <img
                  src={stream.streamerAvatar}
                  alt={stream.title}
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 mx-auto hover:bg-white/20 transition-all cursor-pointer">
                      <Icon name="Play" size={40} className="text-white ml-1" />
                    </div>
                    <p className="text-white text-sm mb-2">Видео-плеер стрима</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => window.open(stream.streamUrl, '_blank')}
                    >
                      <Icon name="ExternalLink" size={16} />
                      Открыть на {stream.platform}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="gradient-card border-border/50 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-3">{stream.title}</h1>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar 
                      className="w-12 h-12 border-2 border-primary cursor-pointer"
                      onClick={() => navigate('/profile/dmitry')}
                    >
                      <AvatarImage src={stream.streamerAvatar} />
                      <AvatarFallback>{stream.streamer[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div 
                        className="font-bold cursor-pointer hover:text-primary"
                        onClick={() => navigate('/profile/dmitry')}
                      >
                        {stream.streamer}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stream.followers.toLocaleString()} подписчиков
                      </div>
                    </div>
                    <Button
                      className={`ml-auto ${isFollowing ? 'bg-muted' : 'gradient-primary'}`}
                      onClick={() => setIsFollowing(!isFollowing)}
                    >
                      {isFollowing ? (
                        <>
                          <Icon name="Check" size={16} />
                          Подписан
                        </>
                      ) : (
                        <>
                          <Icon name="UserPlus" size={16} />
                          Подписаться
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {stream.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {stream.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Users" size={16} />
                      Категория: {stream.category}
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Globe" size={16} />
                      {stream.language}
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={16} />
                      {stream.startedAt}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="gradient-card border-border/50 p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Info" size={20} className="text-primary" />
                О стримере
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Привет! Я Дмитрий, фулстек-разработчик с 5-летним опытом. На этом канале я делюсь своими знаниями в веб-разработке, 
                разбираю интересные проекты и отвечаю на ваши вопросы. Присоединяйтесь!
              </p>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Icon name="Twitter" size={16} />
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Icon name="Github" size={16} />
                  GitHub
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Icon name="Globe" size={16} />
                  Сайт
                </Button>
              </div>
            </Card>
          </main>

          <aside className="lg:col-span-3 space-y-4">
            <Card className="gradient-card border-border/50">
              <div className="p-4 border-b border-border">
                <h3 className="font-bold flex items-center gap-2">
                  <Icon name="MessageCircle" size={18} />
                  Чат стрима
                  <Badge variant="secondary" className="ml-auto">{chatMessages.length}</Badge>
                </h3>
              </div>

              <div className="h-[600px] flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="animate-fade-in">
                      <div className="flex items-start gap-2">
                        <Avatar className="w-6 h-6 flex-shrink-0">
                          <AvatarImage src={msg.authorAvatar} />
                          <AvatarFallback>{msg.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-semibold ${msg.isPremium ? 'text-accent' : 'text-foreground'}`}>
                              {msg.author}
                            </span>
                            {msg.isPremium && (
                              <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                                PRO
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">{msg.time}</span>
                          </div>
                          <p className="text-sm leading-relaxed break-words">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Написать в чат..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="min-h-[60px] resize-none"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icon name="Smile" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icon name="Image" size={16} />
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      className="gradient-primary"
                      onClick={handleSendMessage}
                      disabled={!chatMessage.trim()}
                    >
                      <Icon name="Send" size={14} />
                      Отправить
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default StreamView;
