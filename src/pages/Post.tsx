import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Comment {
  id: number;
  author: string;
  authorAvatar: string;
  authorRating: number;
  content: string;
  rating: number;
  time: string;
  replies?: Comment[];
}

const Post = () => {
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const [postVote, setPostVote] = useState<'up' | 'down' | null>(null);
  const [commentVotes, setCommentVotes] = useState<Record<number, 'up' | 'down' | null>>({});
  const [isPostSaved, setIsPostSaved] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  const post = {
    id: 1,
    author: 'Дмитрий Космонавт',
    authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
    authorRating: 12845,
    title: 'Как я случайно создал стартап, который изменил мою жизнь',
    content: `Всё началось с простой идеи, которая пришла мне в голову во время утреннего кофе. Я даже не думал, что это приведёт к чему-то большему...

Я работал обычным программистом в небольшой компании. Каждый день - одно и то же: дом, работа, дом. Но однажды утром, сидя в кафе и наблюдая за людьми, я заметил одну интересную деталь.

## Момент озарения

Все вокруг меня жаловались на одну и ту же проблему. Причём жаловались постоянно! И тут меня осенило: а что если создать решение для этой проблемы?

Я не был бизнесменом. У меня не было опыта в создании стартапов. Но я точно знал, как писать код. Поэтому я просто начал.

### Первые шаги

Первую версию я написал за выходные. Это был ужасный код, но он работал! Я показал его друзьям, и они были в восторге. 

Потом я разместил бесплатную версию онлайн. За первую неделю зарегистрировались 10 человек. Я был на седьмом небе от счастья!

### Рост и развитие

Но самое интересное началось потом. Люди начали делиться моим продуктом с друзьями. Через месяц у меня было уже 1000 пользователей. Через три месяца - 10000.

Я работал по ночам, дорабатывая функционал. Это было тяжело, но невероятно захватывающе. Каждое утро я просыпался и первым делом проверял статистику - сколько новых пользователей пришло за ночь.

## Поворотный момент

Через полгода мне написал инвестор. Он сказал, что следит за моим продуктом и хочет встретиться. Я был в шоке.

На встрече он предложил инвестиции. Я едва сдерживал эмоции, пытаясь выглядеть профессионально. Мы заключили сделку.

С этими деньгами я смог:
- Нанять первых сотрудников
- Арендовать небольшой офис
- Сосредоточиться на продукте полностью

### Команда

Собрать команду было непросто. Но я искал не просто профессионалов, а людей, которые верили в идею. И знаете что? Нашёл их!

Сейчас нас 15 человек. Каждый - энтузиаст своего дела. Мы работаем как единый механизм.

## Что я понял

Оглядываясь назад, я понимаю несколько важных вещей:

1. **Начинайте сейчас** - не ждите идеального момента
2. **Решайте реальные проблемы** - люди платят за решения
3. **Не бойтесь показывать несовершенный продукт** - обратная связь важнее
4. **Окружайте себя правильными людьми** - команда решает всё

## Заключение

Прошёл год с того утра в кафе. Сейчас у нас 100 000 активных пользователей, стабильный доход и большие планы на будущее.

Я не стал миллиардером. Но я построил то, чем горжусь. И самое главное - я помогаю людям решать их проблемы каждый день.

Если у вас есть идея - не откладывайте. Начните прямо сейчас. Возможно, через год вы будете писать похожую историю.`,
    image: '/img/7e9d4687-154d-41fc-a97a-06f1fa423e1f.jpg',
    tags: ['бизнес', 'истории успеха', 'стартапы', 'мотивация'],
    rating: 2847,
    views: 45230,
    comments: 342,
    bookmarks: 892,
    time: '3 часа назад',
  };

  const comments: Comment[] = [
    {
      id: 1,
      author: 'АлексейПредприниматель',
      authorAvatar: '/img/319aa334-ffa9-48d7-b686-1ee0dddb10e6.jpg',
      authorRating: 8234,
      content: 'Невероятная история! Особенно впечатляет скорость роста. А можно узнать, какую именно проблему решает ваш продукт? Интересно было бы посмотреть.',
      rating: 156,
      time: '2 часа назад',
      replies: [
        {
          id: 11,
          author: 'Дмитрий Космонавт',
          authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
          authorRating: 12845,
          content: 'Спасибо! Не хочу превращать пост в рекламу, но если интересно - напишите в личку, расскажу подробнее 🙂',
          rating: 89,
          time: '1 час назад',
        }
      ]
    },
    {
      id: 2,
      author: 'МаринаРазработчик',
      authorAvatar: '/img/319aa334-ffa9-48d7-b686-1ee0dddb10e6.jpg',
      authorRating: 5432,
      content: 'Очень мотивирует! У меня тоже есть идея, но всё время находятся отговорки. Наверное, пора начать действовать.',
      rating: 234,
      time: '2 часа назад',
      replies: [
        {
          id: 21,
          author: 'СергейМентор',
          authorAvatar: '/img/319aa334-ffa9-48d7-b686-1ee0dddb10e6.jpg',
          authorRating: 15678,
          content: 'Марина, главное - сделать первый шаг. Даже самый маленький. Завтра потратьте час на свою идею. Просто час. Увидите, как затянет!',
          rating: 123,
          time: '1 час назад',
        }
      ]
    },
    {
      id: 3,
      author: 'ИванСкептик',
      authorAvatar: '/img/319aa334-ffa9-48d7-b686-1ee0dddb10e6.jpg',
      authorRating: 3456,
      content: 'История хорошая, но звучит слишком идеально. А были ли какие-то серьёзные проблемы? Провалы? Хотелось бы услышать и о трудностях.',
      rating: 89,
      time: '1 час назад',
      replies: [
        {
          id: 31,
          author: 'Дмитрий Космонавт',
          authorAvatar: '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg',
          authorRating: 12845,
          content: 'Отличный вопрос! Проблем было море. Первые три месяца я спал по 4 часа. Был момент, когда сервер упал из-за наплыва пользователей, и я провёл 18 часов, восстанавливая работу. Несколько раз думал всё бросить. Но продолжил. Может, напишу отдельный пост о проблемах - тема важная.',
          rating: 267,
          time: '45 минут назад',
        }
      ]
    },
    {
      id: 4,
      author: 'ОльгаДизайнер',
      authorAvatar: '/img/319aa334-ffa9-48d7-b686-1ee0dddb10e6.jpg',
      authorRating: 6789,
      content: 'Круто! А как вы находили первых сотрудников? У меня есть проект, но не знаю, где искать людей, которые разделят мою страсть.',
      rating: 145,
      time: '30 минут назад',
    }
  ];

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      console.log('Отправка комментария:', commentText);
      setCommentText('');
      setIsCommenting(false);
    }
  };

  const handlePostVote = (type: 'up' | 'down') => {
    if (postVote === type) {
      setPostVote(null);
    } else {
      setPostVote(type);
    }
  };

  const handleCommentVote = (commentId: number, type: 'up' | 'down') => {
    if (commentVotes[commentId] === type) {
      setCommentVotes({ ...commentVotes, [commentId]: null });
    } else {
      setCommentVotes({ ...commentVotes, [commentId]: type });
    }
  };

  const getPostRating = () => {
    let rating = post.rating;
    if (postVote === 'up') rating += 1;
    if (postVote === 'down') rating -= 1;
    return rating;
  };

  const getCommentRating = (comment: Comment) => {
    let rating = comment.rating;
    const vote = commentVotes[comment.id];
    if (vote === 'up') rating += 1;
    if (vote === 'down') rating -= 1;
    return rating;
  };

  const handleShare = (platform: string) => {
    const url = `${window.location.origin}/post/${post.id}`;
    const text = encodeURIComponent(post.title);
    
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
    setShareMenuOpen(false);
  };

  const getBookmarkCount = () => {
    return post.bookmarks + (isPostSaved ? 1 : 0);
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-12' : ''}`}>
      <Card className="gradient-card border-border/50 p-4">
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`h-7 w-7 transition-all ${
                commentVotes[comment.id] === 'up'
                  ? 'text-primary bg-primary/20 hover:bg-primary/30'
                  : 'hover:text-primary hover:bg-primary/10'
              }`}
              onClick={() => handleCommentVote(comment.id, 'up')}
            >
              <Icon name="ArrowUp" size={16} />
            </Button>
            <span className={`font-bold text-sm transition-colors ${
              commentVotes[comment.id] === 'up'
                ? 'text-primary'
                : commentVotes[comment.id] === 'down'
                ? 'text-destructive'
                : 'text-foreground'
            }`}>
              {getCommentRating(comment)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className={`h-7 w-7 transition-all ${
                commentVotes[comment.id] === 'down'
                  ? 'text-destructive bg-destructive/20 hover:bg-destructive/30'
                  : 'hover:text-destructive hover:bg-destructive/10'
              }`}
              onClick={() => handleCommentVote(comment.id, 'down')}
            >
              <Icon name="ArrowDown" size={16} />
            </Button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Avatar className="w-7 h-7 border border-border">
                <AvatarImage src={comment.authorAvatar} />
                <AvatarFallback>{comment.author[0]}</AvatarFallback>
              </Avatar>
              <span className="font-semibold text-sm hover:text-primary cursor-pointer">
                {comment.author}
              </span>
              <Badge variant="outline" className="text-xs">
                {comment.authorRating} 🔥
              </Badge>
              <span className="text-xs text-muted-foreground">• {comment.time}</span>
            </div>

            <p className="text-sm text-foreground/90 mb-3 leading-relaxed">
              {comment.content}
            </p>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                <Icon name="MessageSquare" size={14} />
                Ответить
              </Button>
              <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                <Icon name="Share2" size={14} />
                Поделиться
              </Button>
              <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                <Icon name="Flag" size={14} />
                Пожаловаться
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-card/90 border-b border-border shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
              >
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

              <Avatar className="border-2 border-primary cursor-pointer hover-lift">
                <AvatarImage src="/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg" />
                <AvatarFallback>YOU</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <main className="lg:col-span-8 space-y-6">
            <Card className="gradient-card border-border/50 overflow-hidden">
              <div className="p-6">
                <div className="flex gap-4 mb-6">
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-10 w-10 transition-all ${
                        postVote === 'up'
                          ? 'text-primary bg-primary/20 hover:bg-primary/30'
                          : 'hover:text-primary hover:bg-primary/10'
                      }`}
                      onClick={() => handlePostVote('up')}
                    >
                      <Icon name="ArrowUp" size={24} />
                    </Button>
                    <span className={`font-bold text-2xl transition-colors ${
                      postVote === 'up'
                        ? 'text-primary'
                        : postVote === 'down'
                        ? 'text-destructive'
                        : 'text-foreground'
                    }`}>
                      {getPostRating()}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-10 w-10 transition-all ${
                        postVote === 'down'
                          ? 'text-destructive bg-destructive/20 hover:bg-destructive/30'
                          : 'hover:text-destructive hover:bg-destructive/10'
                      }`}
                      onClick={() => handlePostVote('down')}
                    >
                      <Icon name="ArrowDown" size={24} />
                    </Button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <Avatar className="w-10 h-10 border-2 border-border">
                        <AvatarImage src={post.authorAvatar} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold hover:text-primary cursor-pointer">
                          {post.author}
                        </span>
                        <Badge variant="outline">
                          {post.authorRating} 🔥
                        </Badge>
                        <span className="text-sm text-muted-foreground">• {post.time}</span>
                      </div>
                    </div>

                    <h1 className="text-3xl font-bold mb-4">
                      {post.title}
                    </h1>

                    {post.image && (
                      <div className="mb-6 rounded-xl overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-96 object-cover"
                        />
                      </div>
                    )}

                    <div className="prose prose-invert max-w-none mb-6">
                      {post.content.split('\n').map((paragraph, index) => {
                        if (paragraph.startsWith('## ')) {
                          return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{paragraph.replace('## ', '')}</h2>;
                        } else if (paragraph.startsWith('### ')) {
                          return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{paragraph.replace('### ', '')}</h3>;
                        } else if (paragraph.startsWith('- ')) {
                          return <li key={index} className="ml-4">{paragraph.replace('- ', '')}</li>;
                        } else if (paragraph.match(/^\d+\./)) {
                          return <li key={index} className="ml-4">{paragraph.replace(/^\d+\.\s/, '')}</li>;
                        } else if (paragraph.trim()) {
                          return <p key={index} className="mb-4 leading-relaxed text-foreground/90">{paragraph}</p>;
                        }
                        return null;
                      })}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-secondary">
                          <Icon name="MessageSquare" size={20} />
                          <span className="font-medium">{post.comments}</span>
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Icon name="Eye" size={20} />
                          <span className="font-medium">{post.views.toLocaleString()}</span>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className={`gap-2 transition-all ${
                            isPostSaved
                              ? 'text-accent bg-accent/20 hover:bg-accent/30'
                              : 'text-muted-foreground hover:text-accent'
                          }`}
                          onClick={() => setIsPostSaved(!isPostSaved)}
                        >
                          <Icon name={isPostSaved ? "BookmarkCheck" : "Bookmark"} size={20} />
                          <span className="font-medium">{getBookmarkCount()}</span>
                        </Button>
                      </div>

                      <div className="flex items-center gap-2 relative">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2 hover:bg-primary/10"
                          onClick={() => setShareMenuOpen(!shareMenuOpen)}
                        >
                          <Icon name="Share2" size={16} />
                          Поделиться
                        </Button>

                        {shareMenuOpen && (
                          <Card className="absolute top-full right-0 mt-2 p-2 z-50 shadow-xl border-border/50 min-w-[200px] animate-fade-in">
                            <div className="flex flex-col gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="justify-start gap-2 hover:bg-primary/10"
                                onClick={() => handleShare('vk')}
                              >
                                <Icon name="Share" size={16} className="text-blue-500" />
                                ВКонтакте
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="justify-start gap-2 hover:bg-primary/10"
                                onClick={() => handleShare('telegram')}
                              >
                                <Icon name="Send" size={16} className="text-sky-500" />
                                Telegram
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="justify-start gap-2 hover:bg-primary/10"
                                onClick={() => handleShare('twitter')}
                              >
                                <Icon name="Twitter" size={16} className="text-blue-400" />
                                Twitter
                              </Button>
                              <div className="h-px bg-border my-1" />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="justify-start gap-2 hover:bg-accent/10"
                                onClick={() => handleShare('copy')}
                              >
                                <Icon name="Copy" size={16} className="text-accent" />
                                Копировать ссылку
                              </Button>
                            </div>
                          </Card>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="gradient-card border-border/50 p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="MessageSquare" size={24} className="text-secondary" />
                Комментарии ({comments.length})
              </h2>

              <div className="mb-6">
                {!isCommenting ? (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setIsCommenting(true)}
                  >
                    <Icon name="MessageSquare" size={18} />
                    Добавить комментарий...
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Поделитесь своими мыслями..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="min-h-[120px] resize-none"
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setIsCommenting(false);
                          setCommentText('');
                        }}
                      >
                        Отмена
                      </Button>
                      <Button
                        className="gradient-primary"
                        onClick={handleSubmitComment}
                        disabled={!commentText.trim()}
                      >
                        <Icon name="Send" size={16} />
                        Отправить
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {comments.map((comment) => renderComment(comment))}
              </div>
            </Card>
          </main>

          <aside className="lg:col-span-4 space-y-4">
            <Card className="p-5 gradient-card border-border/50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="User" size={20} className="text-primary" />
                Об авторе
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar 
                    className="w-16 h-16 border-2 border-primary cursor-pointer"
                    onClick={() => navigate('/profile/dmitry')}
                  >
                    <AvatarImage src={post.authorAvatar} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div 
                      className="font-bold hover:text-primary cursor-pointer"
                      onClick={() => navigate('/profile/dmitry')}
                    >
                      {post.author}
                    </div>
                    <Badge variant="outline" className="mt-1">
                      {post.authorRating} 🔥
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Предприниматель и разработчик. Пишу о бизнесе, технологиях и личном опыте.
                </p>
                <div className="flex gap-2">
                  <Button className="flex-1 gradient-primary" size="sm">
                    <Icon name="UserPlus" size={16} />
                    Подписаться
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="MessageCircle" size={16} />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">127</div>
                    <div className="text-xs text-muted-foreground">Постов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-secondary">2.3K</div>
                    <div className="text-xs text-muted-foreground">Читателей</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-accent">890</div>
                    <div className="text-xs text-muted-foreground">Ответов</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5 gradient-card border-border/50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={20} className="text-accent" />
                Похожие посты
              </h3>
              <div className="space-y-3">
                {[
                  'От идеи до первого миллиона: честная история',
                  'Топ-10 ошибок начинающих предпринимателей',
                  '5 инструментов, без которых я не запустил бы стартап'
                ].map((title, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="font-semibold text-sm mb-1 hover:text-primary">
                      {title}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>234 👍</span>
                      <span>•</span>
                      <span>56 💬</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 gradient-card border-border/50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="Tag" size={20} className="text-secondary" />
                Популярные теги
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Post;