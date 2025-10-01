import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Notification {
  id: number;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'reply' | 'award';
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  content?: string;
  post?: {
    id: number;
    title: string;
  };
  time: string;
  read: boolean;
}

const Notifications = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const notifications: Notification[] = [
    {
      id: 1,
      type: 'like',
      user: {
        name: 'Мария Петрова',
        avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
        username: 'maria',
      },
      post: {
        id: 1,
        title: 'Как я случайно создал стартап, который изменил мою жизнь',
      },
      time: '5 минут назад',
      read: false,
    },
    {
      id: 2,
      type: 'comment',
      user: {
        name: 'TechGuru2024',
        avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
        username: 'techguru',
      },
      content: 'Отличный пост! Особенно понравилась часть про монетизацию',
      post: {
        id: 1,
        title: 'Как я случайно создал стартап',
      },
      time: '15 минут назад',
      read: false,
    },
    {
      id: 3,
      type: 'follow',
      user: {
        name: 'Алексей Космонавт',
        avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
        username: 'alexey',
      },
      time: '1 час назад',
      read: false,
    },
    {
      id: 4,
      type: 'mention',
      user: {
        name: 'НаучныйПопугай',
        avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
        username: 'science',
      },
      content: 'Упомянул вас в комментарии к посту про квантовую физику',
      post: {
        id: 4,
        title: 'Квантовая физика простыми словами',
      },
      time: '2 часа назад',
      read: true,
    },
    {
      id: 5,
      type: 'reply',
      user: {
        name: 'GameDev_Pro',
        avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
        username: 'gamedev',
      },
      content: 'Ответил на ваш комментарий',
      post: {
        id: 2,
        title: 'Лучшие инди-игры 2024 года',
      },
      time: '3 часа назад',
      read: true,
    },
    {
      id: 6,
      type: 'award',
      user: {
        name: 'Александр Иванов',
        avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
        username: 'alex',
      },
      content: 'Наградил ваш пост значком "Пожар" 🔥',
      post: {
        id: 1,
        title: 'Как я случайно создал стартап',
      },
      time: '5 часов назад',
      read: true,
    },
    {
      id: 7,
      type: 'like',
      user: {
        name: 'Елена Смирнова',
        avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
        username: 'elena',
      },
      post: {
        id: 3,
        title: 'ИИ уже не тот, каким был вчера',
      },
      time: '1 день назад',
      read: true,
    },
  ];

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return { icon: 'Heart', color: 'text-red-500', bg: 'bg-red-500/10' };
      case 'comment':
        return { icon: 'MessageSquare', color: 'text-blue-500', bg: 'bg-blue-500/10' };
      case 'follow':
        return { icon: 'UserPlus', color: 'text-green-500', bg: 'bg-green-500/10' };
      case 'mention':
        return { icon: 'AtSign', color: 'text-purple-500', bg: 'bg-purple-500/10' };
      case 'reply':
        return { icon: 'Reply', color: 'text-orange-500', bg: 'bg-orange-500/10' };
      case 'award':
        return { icon: 'Award', color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
      default:
        return { icon: 'Bell', color: 'text-muted-foreground', bg: 'bg-muted/10' };
    }
  };

  const getNotificationText = (notification: Notification) => {
    switch (notification.type) {
      case 'like':
        return 'оценил ваш пост';
      case 'comment':
        return 'прокомментировал ваш пост';
      case 'follow':
        return 'подписался на вас';
      case 'mention':
        return 'упомянул вас';
      case 'reply':
        return 'ответил на ваш комментарий';
      case 'award':
        return 'наградил ваш пост';
      default:
        return '';
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'unread') return !n.read;
    if (activeTab === 'read') return n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-card/90 border-b border-border shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <Icon name="ArrowLeft" size={20} />
              </Button>

              <div>
                <h1 className="text-2xl font-bold tracking-tight">Уведомления</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {unreadCount} новых уведомлений
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="gap-2">
                <Icon name="Check" size={16} />
                Прочитать всё
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/messages')}
                className="relative"
              >
                <Icon name="Mail" size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
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

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <Card className="p-4 gradient-card border-border/50 mb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-3 bg-muted/30">
              <TabsTrigger value="all" className="gap-2">
                <Icon name="Bell" size={16} />
                Все
                <Badge variant="secondary" className="ml-1">
                  {notifications.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="unread" className="gap-2">
                <Icon name="BellDot" size={16} />
                Новые
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-1">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="read" className="gap-2">
                <Icon name="CheckCheck" size={16} />
                Прочитано
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </Card>

        <div className="space-y-2">
          {filteredNotifications.length === 0 ? (
            <Card className="p-12 gradient-card border-border/50 text-center">
              <div className="w-20 h-20 rounded-full bg-muted/50 mx-auto flex items-center justify-center mb-4">
                <Icon name="BellOff" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Нет уведомлений</h3>
              <p className="text-muted-foreground">
                {activeTab === 'unread'
                  ? 'У вас нет новых уведомлений'
                  : 'Здесь будут появляться ваши уведомления'}
              </p>
            </Card>
          ) : (
            filteredNotifications.map((notification, index) => {
              const iconConfig = getNotificationIcon(notification.type);
              return (
                <Card
                  key={notification.id}
                  className={`gradient-card border-border/50 hover-lift cursor-pointer transition-all animate-fade-in ${
                    !notification.read ? 'ring-2 ring-primary/20' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => {
                    if (notification.post) {
                      navigate(`/post/${notification.post.id}`);
                    } else if (notification.type === 'follow') {
                      navigate(`/profile/${notification.user.username}`);
                    }
                  }}
                >
                  <div className="p-4">
                    <div className="flex gap-4">
                      <div className="relative flex-shrink-0">
                        <Avatar
                          className="w-12 h-12 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/profile/${notification.user.username}`);
                          }}
                        >
                          <AvatarImage src={notification.user.avatar} />
                          <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full ${iconConfig.bg} flex items-center justify-center border-2 border-card`}
                        >
                          <Icon
                            name={iconConfig.icon as any}
                            size={14}
                            className={iconConfig.color}
                          />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <span
                              className="font-semibold hover:text-primary cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/profile/${notification.user.username}`);
                              }}
                            >
                              {notification.user.name}
                            </span>
                            <span className="text-muted-foreground ml-2">
                              {getNotificationText(notification)}
                            </span>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                          )}
                        </div>

                        {notification.content && (
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {notification.content}
                          </p>
                        )}

                        {notification.post && (
                          <div className="text-sm bg-muted/30 rounded-lg p-2 mb-2">
                            <p className="font-medium line-clamp-1">
                              {notification.post.title}
                            </p>
                          </div>
                        )}

                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
