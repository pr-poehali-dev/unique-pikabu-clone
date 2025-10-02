import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Дмитрий Космонавт',
    username: 'dmitry',
    email: 'dmitry@example.com',
    bio: 'Фулстек-разработчик, космонавт в душе 🚀 Пишу на React, Node.js, Python. Делюсь знаниями и опытом.',
    location: 'Москва, Россия',
    website: 'dmitry.dev',
    twitter: '@dmitry_dev',
    github: 'dmitry-dev',
    streamUrl: 'https://twitch.tv/dmitry_dev',
    streamPlatform: 'twitch',
    streamTitle: 'Разработка на React в прямом эфире 🚀',
    streamDescription: 'Пишем полноценное веб-приложение с нуля. Отвечаю на вопросы, делюсь опытом.',
    streamCategory: 'tech',
  });

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleChange = (field: string, value: string) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const streamPlatforms = [
    { id: 'twitch', name: 'Twitch', icon: 'Twitch', color: 'text-purple-500' },
    { id: 'youtube', name: 'YouTube', icon: 'Youtube', color: 'text-red-500' },
    { id: 'vk', name: 'VK Video', icon: 'Share', color: 'text-blue-500' },
    { id: 'kick', name: 'Kick', icon: 'Video', color: 'text-green-500' },
  ];

  const streamCategories = [
    { id: 'games', name: 'Игры', icon: 'Gamepad2' },
    { id: 'tech', name: 'Технологии', icon: 'Cpu' },
    { id: 'creative', name: 'Творчество', icon: 'Palette' },
    { id: 'talk', name: 'Разговоры', icon: 'MessageCircle' },
    { id: 'education', name: 'Обучение', icon: 'GraduationCap' },
    { id: 'music', name: 'Музыка', icon: 'Music' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-card/90 border-b border-border shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/profile/dmitry')}>
                <Icon name="ArrowLeft" size={20} />
              </Button>

              <h1 className="text-2xl font-bold tracking-tight cursor-pointer" onClick={() => navigate('/')}>
                <span className="text-gradient">PULSE</span>
              </h1>
            </div>

            <div className="flex items-center gap-3">
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

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Настройки профиля</h1>
          <p className="text-muted-foreground">
            Управляйте своим профилем и настройками стрима
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/30">
            <TabsTrigger value="profile" className="gap-2">
              <Icon name="User" size={16} />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="stream" className="gap-2">
              <Icon name="Tv" size={16} />
              Стрим
            </TabsTrigger>
            <TabsTrigger value="social" className="gap-2">
              <Icon name="Link" size={16} />
              Соцсети
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card className="gradient-card border-border/50 p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Icon name="User" size={20} className="text-primary" />
                Основная информация
              </h2>

              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24 border-4 border-primary">
                    <AvatarImage src="/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg" />
                    <AvatarFallback>{profileData.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="gap-2">
                      <Icon name="Upload" size={16} />
                      Изменить аватар
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      JPG, PNG или GIF. Макс. 2MB
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="username">Юзернейм</Label>
                    <Input
                      id="username"
                      value={profileData.username}
                      onChange={(e) => handleChange('username', e.target.value)}
                      className="mt-2"
                      disabled
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      URL: pulse.dev/profile/{profileData.username}
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">О себе</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    className="mt-2 min-h-[100px]"
                    placeholder="Расскажите о себе..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {profileData.bio.length} / 500 символов
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Местоположение</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      className="mt-2"
                      placeholder="Город, Страна"
                    />
                  </div>

                  <div>
                    <Label htmlFor="website">Веб-сайт</Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => handleChange('website', e.target.value)}
                      className="mt-2"
                      placeholder="example.com"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="stream" className="space-y-4">
            <Card className="gradient-card border-border/50 p-6 bg-gradient-to-br from-destructive/10 to-primary/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-destructive flex items-center justify-center">
                  <Icon name="Tv" size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">Настройки стрима</h2>
                  <p className="text-muted-foreground text-sm">
                    Добавьте ссылку на свой стрим, чтобы другие пользователи могли найти вас на странице стримов
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="streamUrl" className="flex items-center gap-2">
                    <Icon name="Link" size={16} />
                    Ссылка на стрим
                  </Label>
                  <Input
                    id="streamUrl"
                    value={profileData.streamUrl}
                    onChange={(e) => handleChange('streamUrl', e.target.value)}
                    className="mt-2"
                    placeholder="https://twitch.tv/username или https://youtube.com/live/..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Поддерживаемые платформы: Twitch, YouTube, VK Video, Kick
                  </p>
                </div>

                <div>
                  <Label className="mb-3 block">Платформа</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {streamPlatforms.map((platform) => (
                      <Button
                        key={platform.id}
                        variant={profileData.streamPlatform === platform.id ? 'default' : 'outline'}
                        className="justify-start gap-2"
                        onClick={() => handleChange('streamPlatform', platform.id)}
                      >
                        <Icon name={platform.icon as any} size={16} className={platform.color} />
                        {platform.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="streamTitle">Название стрима</Label>
                  <Input
                    id="streamTitle"
                    value={profileData.streamTitle}
                    onChange={(e) => handleChange('streamTitle', e.target.value)}
                    className="mt-2"
                    placeholder="Например: Разработка игры на Unity"
                  />
                </div>

                <div>
                  <Label htmlFor="streamDescription">Описание стрима</Label>
                  <Textarea
                    id="streamDescription"
                    value={profileData.streamDescription}
                    onChange={(e) => handleChange('streamDescription', e.target.value)}
                    className="mt-2 min-h-[100px]"
                    placeholder="Расскажите, чем вы занимаетесь на стриме..."
                  />
                </div>

                <div>
                  <Label className="mb-3 block">Категория</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {streamCategories.map((category) => (
                      <Button
                        key={category.id}
                        variant={profileData.streamCategory === category.id ? 'secondary' : 'outline'}
                        className="justify-start gap-2"
                        onClick={() => handleChange('streamCategory', category.id)}
                      >
                        <Icon name={category.icon as any} size={16} />
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <Card className="p-4 bg-primary/5 border-primary/20">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold mb-1">Как это работает?</p>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Добавьте ссылку на свою трансляцию</li>
                        <li>• Ваш стрим появится на странице /streams</li>
                        <li>• Пользователи смогут найти вас и подписаться</li>
                        <li>• Когда вы онлайн, появится бейдж "LIVE"</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <Card className="gradient-card border-border/50 p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Link" size={20} className="text-primary" />
                Социальные сети
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="twitter" className="flex items-center gap-2">
                    <Icon name="Twitter" size={16} className="text-blue-400" />
                    Twitter / X
                  </Label>
                  <Input
                    id="twitter"
                    value={profileData.twitter}
                    onChange={(e) => handleChange('twitter', e.target.value)}
                    className="mt-2"
                    placeholder="@username"
                  />
                </div>

                <div>
                  <Label htmlFor="github" className="flex items-center gap-2">
                    <Icon name="Github" size={16} />
                    GitHub
                  </Label>
                  <Input
                    id="github"
                    value={profileData.github}
                    onChange={(e) => handleChange('github', e.target.value)}
                    className="mt-2"
                    placeholder="username"
                  />
                </div>

                <Card className="p-4 bg-muted/30">
                  <p className="text-sm text-muted-foreground">
                    💡 Добавьте ссылки на свои социальные сети, чтобы другие пользователи могли легко с вами связаться
                  </p>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="gradient-card border-border/50 p-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold mb-1">Готово?</h3>
              <p className="text-sm text-muted-foreground">
                Сохраните изменения, чтобы они отобразились в вашем профиле
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate('/profile/dmitry')}>
                Отмена
              </Button>
              <Button className="gradient-primary gap-2" onClick={handleSave}>
                {isSaved ? (
                  <>
                    <Icon name="Check" size={16} />
                    Сохранено!
                  </>
                ) : (
                  <>
                    <Icon name="Save" size={16} />
                    Сохранить
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSettings;
