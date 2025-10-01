import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);

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

  const handleAddTag = () => {
    if (tagInput.trim() && tags.length < 5 && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = () => {
    console.log('Публикация поста:', { title, content, category, tags, uploadedImage });
    navigate('/');
  };

  const handleSaveDraft = () => {
    console.log('Сохранение черновика:', { title, content, category, tags, uploadedImage });
  };

  const formatText = (format: string) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'heading':
        formattedText = `## ${selectedText}`;
        break;
      case 'list':
        formattedText = `- ${selectedText}`;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
  };

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

              <span className="text-muted-foreground hidden sm:inline">/ Создание поста</span>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={handleSaveDraft} className="gap-2">
                <Icon name="Save" size={18} />
                <span className="hidden sm:inline">Черновик</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => setIsPreview(!isPreview)}
                className="gap-2"
              >
                <Icon name={isPreview ? 'Edit' : 'Eye'} size={18} />
                <span className="hidden sm:inline">{isPreview ? 'Редактор' : 'Превью'}</span>
              </Button>

              <Button
                className="gradient-primary gap-2"
                onClick={handlePublish}
                disabled={!title.trim() || !content.trim() || !category}
              >
                <Icon name="Send" size={18} />
                Опубликовать
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <main className="lg:col-span-8 space-y-6">
            {!isPreview ? (
              <>
                <Card className="gradient-card border-border/50 p-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-base font-semibold">
                        Заголовок поста
                      </Label>
                      <Input
                        id="title"
                        placeholder="Напишите цепляющий заголовок..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-xl font-bold h-14"
                        maxLength={120}
                      />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Хороший заголовок привлекает внимание</span>
                        <span>{title.length}/120</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-base font-semibold">
                        Категория
                      </Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              <div className="flex items-center gap-2">
                                <Icon name={cat.icon as any} size={16} />
                                {cat.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {uploadedImage && (
                      <div className="relative rounded-xl overflow-hidden group">
                        <img
                          src={uploadedImage}
                          alt="Uploaded"
                          className="w-full h-64 object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => setUploadedImage(null)}
                        >
                          <Icon name="X" size={18} />
                        </Button>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-semibold">Форматирование</Label>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => formatText('bold')}
                            title="Жирный (Ctrl+B)"
                          >
                            <Icon name="Bold" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => formatText('italic')}
                            title="Курсив (Ctrl+I)"
                          >
                            <Icon name="Italic" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => formatText('heading')}
                            title="Заголовок"
                          >
                            <Icon name="Heading" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => formatText('list')}
                            title="Список"
                          >
                            <Icon name="List" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => formatText('link')}
                            title="Ссылка"
                          >
                            <Icon name="Link" size={16} />
                          </Button>
                          <div className="w-px h-6 bg-border mx-1" />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => document.getElementById('image-upload')?.click()}
                            title="Добавить изображение"
                          >
                            <Icon name="Image" size={16} />
                          </Button>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </div>
                      </div>

                      <Textarea
                        id="content"
                        placeholder="Расскажите свою историю... Поддерживается Markdown форматирование"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="min-h-[400px] resize-none font-mono text-sm"
                      />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Markdown поддерживается</span>
                        <span>{content.length} символов</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Теги (до 5)</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Добавьте тег..."
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTag();
                            }
                          }}
                          disabled={tags.length >= 5}
                        />
                        <Button
                          onClick={handleAddTag}
                          disabled={!tagInput.trim() || tags.length >= 5}
                        >
                          <Icon name="Plus" size={18} />
                        </Button>
                      </div>
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="gap-2 cursor-pointer hover:bg-destructive/20"
                              onClick={() => handleRemoveTag(tag)}
                            >
                              #{tag}
                              <Icon name="X" size={12} />
                            </Badge>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Теги помогут людям найти ваш пост
                      </p>
                    </div>
                  </div>
                </Card>
              </>
            ) : (
              <Card className="gradient-card border-border/50 p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <Avatar className="w-12 h-12 border-2 border-primary">
                      <AvatarImage src="/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg" />
                      <AvatarFallback>YOU</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">Ваше имя</div>
                      <div className="text-sm text-muted-foreground">Только что</div>
                    </div>
                  </div>

                  <h1 className="text-4xl font-bold">{title || 'Заголовок поста'}</h1>

                  {category && (
                    <Badge variant="secondary">
                      {categories.find((c) => c.id === category)?.name}
                    </Badge>
                  )}

                  {uploadedImage && (
                    <div className="rounded-xl overflow-hidden">
                      <img
                        src={uploadedImage}
                        alt="Preview"
                        className="w-full h-96 object-cover"
                      />
                    </div>
                  )}

                  <div className="prose prose-invert max-w-none">
                    {content.split('\n').map((paragraph, index) => {
                      if (paragraph.startsWith('## ')) {
                        return (
                          <h2 key={index} className="text-2xl font-bold mt-6 mb-3">
                            {paragraph.replace('## ', '')}
                          </h2>
                        );
                      } else if (paragraph.startsWith('### ')) {
                        return (
                          <h3 key={index} className="text-xl font-bold mt-4 mb-2">
                            {paragraph.replace('### ', '')}
                          </h3>
                        );
                      } else if (paragraph.startsWith('- ')) {
                        return (
                          <li key={index} className="ml-4">
                            {paragraph.replace('- ', '')}
                          </li>
                        );
                      } else if (paragraph.match(/\*\*(.*?)\*\*/)) {
                        return (
                          <p key={index} className="mb-4 leading-relaxed">
                            {paragraph.split(/(\*\*.*?\*\*)/).map((part, i) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return (
                                  <strong key={i}>{part.slice(2, -2)}</strong>
                                );
                              }
                              return part;
                            })}
                          </p>
                        );
                      } else if (paragraph.trim()) {
                        return (
                          <p key={index} className="mb-4 leading-relaxed text-foreground/90">
                            {paragraph}
                          </p>
                        );
                      }
                      return null;
                    })}
                  </div>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            )}
          </main>

          <aside className="lg:col-span-4 space-y-4">
            <Card className="p-5 gradient-card border-border/50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="Lightbulb" size={20} className="text-accent" />
                Советы по написанию
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <Icon name="CheckCircle" size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">Цепляющий заголовок</div>
                    <div className="text-muted-foreground text-xs">
                      Используйте числа, вопросы или интригу
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon name="CheckCircle" size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">Структура текста</div>
                    <div className="text-muted-foreground text-xs">
                      Разбивайте на абзацы и подзаголовки
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon name="CheckCircle" size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">Визуальный контент</div>
                    <div className="text-muted-foreground text-xs">
                      Добавьте изображение для большего охвата
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon name="CheckCircle" size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">Релевантные теги</div>
                    <div className="text-muted-foreground text-xs">
                      3-5 тегов помогут людям найти пост
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5 gradient-card border-border/50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="BookOpen" size={20} className="text-secondary" />
                Markdown шпаргалка
              </h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2 rounded bg-muted/30">
                  <span className="text-muted-foreground">**жирный**</span>
                  <span className="font-bold">жирный</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-muted/30">
                  <span className="text-muted-foreground">*курсив*</span>
                  <span className="italic">курсив</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-muted/30">
                  <span className="text-muted-foreground">## Заголовок</span>
                  <span className="font-bold">Заголовок</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-muted/30">
                  <span className="text-muted-foreground">- Список</span>
                  <span>• Список</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-muted/30">
                  <span className="text-muted-foreground">[текст](url)</span>
                  <span className="text-primary underline">ссылка</span>
                </div>
              </div>
            </Card>

            <Card className="p-5 gradient-card border-border/50">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={20} className="text-accent" />
                Популярные темы
              </h3>
              <div className="flex flex-wrap gap-2">
                {['технологии', 'истории', 'советы', 'мотивация', 'юмор', 'бизнес'].map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => {
                      if (tags.length < 5 && !tags.includes(tag)) {
                        setTags([...tags, tag]);
                      }
                    }}
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

export default CreatePost;
