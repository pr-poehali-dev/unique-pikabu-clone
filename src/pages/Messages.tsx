import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  time: string;
  isOwn: boolean;
  read?: boolean;
}

interface Chat {
  id: number;
  user: {
    name: string;
    avatar: string;
    username: string;
    online: boolean;
  };
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}

const Messages = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const chats: Chat[] = [
    {
      id: 1,
      user: {
        name: 'Мария Петрова',
        avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
        username: 'maria',
        online: true,
      },
      lastMessage: 'Спасибо за подсказку! Попробую сегодня',
      time: '5 мин',
      unread: 2,
      messages: [
        {
          id: 1,
          text: 'Привет! Видел твой пост про стартапы. Очень вдохновляет!',
          time: '14:30',
          isOwn: false,
        },
        {
          id: 2,
          text: 'Спасибо! Рад, что было полезно 😊',
          time: '14:32',
          isOwn: true,
        },
        {
          id: 3,
          text: 'Можешь подсказать, с чего лучше начать?',
          time: '14:33',
          isOwn: false,
        },
        {
          id: 4,
          text: 'Конечно! Главное - начать с проблемы, которую ты хочешь решить. Не с идеи продукта, а именно с проблемы.',
          time: '14:35',
          isOwn: true,
        },
        {
          id: 5,
          text: 'Спасибо за подсказку! Попробую сегодня',
          time: '14:37',
          isOwn: false,
          read: false,
        },
      ],
    },
    {
      id: 2,
      user: {
        name: 'TechGuru2024',
        avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
        username: 'techguru',
        online: false,
      },
      lastMessage: 'Отличная статья про ИИ!',
      time: '1 час',
      unread: 0,
      messages: [
        {
          id: 1,
          text: 'Отличная статья про ИИ!',
          time: '13:20',
          isOwn: false,
          read: true,
        },
      ],
    },
    {
      id: 3,
      user: {
        name: 'НаучныйПопугай',
        avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
        username: 'science',
        online: true,
      },
      lastMessage: 'Может быть как-нибудь обсудим коллаборацию?',
      time: '2 часа',
      unread: 1,
      messages: [
        {
          id: 1,
          text: 'Привет! Интересная у тебя тема блога',
          time: '12:15',
          isOwn: false,
        },
        {
          id: 2,
          text: 'Может быть как-нибудь обсудим коллаборацию?',
          time: '12:16',
          isOwn: false,
          read: false,
        },
      ],
    },
    {
      id: 4,
      user: {
        name: 'Алексей Космонавт',
        avatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
        username: 'alexey',
        online: false,
      },
      lastMessage: 'Увидимся!',
      time: '1 день',
      unread: 0,
      messages: [
        {
          id: 1,
          text: 'Эй, увидимся на конференции?',
          time: 'Вчера 18:30',
          isOwn: false,
          read: true,
        },
        {
          id: 2,
          text: 'Да, конечно! Буду там',
          time: 'Вчера 18:45',
          isOwn: true,
        },
        {
          id: 3,
          text: 'Увидимся!',
          time: 'Вчера 18:46',
          isOwn: false,
          read: true,
        },
      ],
    },
  ];

  const selectedChatData = chats.find((c) => c.id === selectedChat);
  const unreadCount = chats.reduce((sum, chat) => sum + chat.unread, 0);

  const filteredChats = chats.filter((chat) =>
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-card/90 border-b border-border shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <Icon name="ArrowLeft" size={20} />
              </Button>

              <div>
                <h1 className="text-2xl font-bold tracking-tight">Сообщения</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-muted-foreground">{unreadCount} непрочитанных</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/notifications')}
                className="relative"
              >
                <Icon name="Bell" size={20} />
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

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-full md:w-96 border-r border-border flex flex-col bg-card/30">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Icon
                name="Search"
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Поиск сообщений..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`p-4 border-b border-border cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedChat === chat.id ? 'bg-muted/70' : ''
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={chat.user.avatar} />
                      <AvatarFallback>{chat.user.name[0]}</AvatarFallback>
                    </Avatar>
                    {chat.user.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold truncate">{chat.user.name}</h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {chat.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      {chat.unread > 0 && (
                        <Badge variant="destructive" className="flex-shrink-0">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col bg-background">
          {selectedChatData ? (
            <>
              <div className="p-4 border-b border-border bg-card/30">
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center gap-3 cursor-pointer hover:opacity-80"
                    onClick={() => navigate(`/profile/${selectedChatData.user.username}`)}
                  >
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={selectedChatData.user.avatar} />
                        <AvatarFallback>{selectedChatData.user.name[0]}</AvatarFallback>
                      </Avatar>
                      {selectedChatData.user.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedChatData.user.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {selectedChatData.user.online ? 'В сети' : 'Не в сети'}
                      </p>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Icon name="MoreVertical" size={20} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Icon name="User" size={16} className="mr-2" />
                        Открыть профиль
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icon name="Archive" size={16} className="mr-2" />
                        Архивировать
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icon name="BellOff" size={16} className="mr-2" />
                        Отключить уведомления
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Icon name="Trash2" size={16} className="mr-2" />
                        Удалить переписку
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedChatData.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md px-4 py-2 rounded-2xl ${
                        message.isOwn
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border bg-card/30">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Icon name="Paperclip" size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icon name="Image" size={20} />
                  </Button>
                  <Textarea
                    placeholder="Написать сообщение..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="min-h-[44px] max-h-32 resize-none"
                    rows={1}
                  />
                  <Button
                    className="gradient-primary"
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Enter — отправить, Shift+Enter — новая строка
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-muted/50 mx-auto flex items-center justify-center mb-4">
                  <Icon name="MessageCircle" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Выберите чат</h3>
                <p className="text-muted-foreground">
                  Выберите собеседника из списка слева
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Messages;
