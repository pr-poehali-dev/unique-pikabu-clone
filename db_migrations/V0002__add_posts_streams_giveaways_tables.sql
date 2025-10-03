-- Создание таблицы постов (историй)
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(id),
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(500),
    category VARCHAR(50),
    rating INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    bookmarks_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы тегов постов
CREATE TABLE post_tags (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id),
    tag VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы голосов за посты
CREATE TABLE post_votes (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id),
    user_id INTEGER REFERENCES users(id),
    vote_type VARCHAR(10) CHECK (vote_type IN ('up', 'down')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(post_id, user_id)
);

-- Создание таблицы закладок
CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id),
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(post_id, user_id)
);

-- Создание таблицы комментариев
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id),
    user_id INTEGER REFERENCES users(id),
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 0,
    parent_comment_id INTEGER REFERENCES comments(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы стримов
CREATE TABLE streams (
    id SERIAL PRIMARY KEY,
    streamer_id INTEGER REFERENCES users(id),
    title VARCHAR(300) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    platform VARCHAR(20) CHECK (platform IN ('twitch', 'youtube', 'vk', 'kick')),
    thumbnail_url VARCHAR(500),
    stream_url VARCHAR(500) NOT NULL,
    is_live BOOLEAN DEFAULT false,
    viewers INTEGER DEFAULT 0,
    started_at TIMESTAMP,
    language VARCHAR(20) DEFAULT 'ru',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы тегов стримов
CREATE TABLE stream_tags (
    id SERIAL PRIMARY KEY,
    stream_id INTEGER REFERENCES streams(id),
    tag VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы розыгрышей
CREATE TABLE giveaways (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(id),
    title VARCHAR(300) NOT NULL,
    description TEXT NOT NULL,
    prize VARCHAR(200) NOT NULL,
    image_url VARCHAR(500),
    is_official BOOLEAN DEFAULT false,
    participants_count INTEGER DEFAULT 0,
    max_participants INTEGER,
    end_date TIMESTAMP NOT NULL,
    winner_count INTEGER DEFAULT 1,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'ended', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы требований розыгрышей
CREATE TABLE giveaway_requirements (
    id SERIAL PRIMARY KEY,
    giveaway_id INTEGER REFERENCES giveaways(id),
    requirement TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы тегов розыгрышей
CREATE TABLE giveaway_tags (
    id SERIAL PRIMARY KEY,
    giveaway_id INTEGER REFERENCES giveaways(id),
    tag VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы участников розыгрышей
CREATE TABLE giveaway_participants (
    id SERIAL PRIMARY KEY,
    giveaway_id INTEGER REFERENCES giveaways(id),
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(giveaway_id, user_id)
);

-- Создание таблицы уведомлений
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT,
    link VARCHAR(500),
    icon VARCHAR(50),
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для оптимизации
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_created ON posts(created_at DESC);
CREATE INDEX idx_post_tags_post ON post_tags(post_id);
CREATE INDEX idx_post_votes_post ON post_votes(post_id);
CREATE INDEX idx_comments_post ON comments(post_id);
CREATE INDEX idx_streams_streamer ON streams(streamer_id);
CREATE INDEX idx_streams_live ON streams(is_live);
CREATE INDEX idx_giveaways_status ON giveaways(status);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);

-- Вставка тестовых постов
INSERT INTO posts (author_id, title, content, image_url, category, rating, views, comments_count, bookmarks_count, created_at) VALUES
(1, 'Как я случайно создал стартап, который изменил мою жизнь', 'Всё началось с простой идеи, которая пришла мне в голову во время утреннего кофе. Я даже не думал, что это приведёт к чему-то большему... Но спустя год у нас уже была команда из 15 человек и первые серьёзные инвесторы.', '/img/7e9d4687-154d-41fc-a97a-06f1fa423e1f.jpg', 'stories', 2847, 45230, 342, 892, NOW() - INTERVAL '3 hours'),
(2, 'ИИ уже не тот, каким был вчера: что изменилось за последний год', 'Искусственный интеллект развивается с невероятной скоростью. Давайте разберёмся, какие прорывы произошли за последние 12 месяцев и что это значит для нас с вами.', NULL, 'tech', 1923, 38120, 267, 654, NOW() - INTERVAL '5 hours'),
(4, 'Когда пытался починить компьютер и случайно стал хакером', 'Решил я как-то обновить драйвера на старом ноутбуке. Казалось бы, что может пойти не так? Спойлер: очень многое! История о том, как я случайно взломал свой собственный Wi-Fi и напугал соседей 😂', NULL, 'humor', 3456, 67890, 521, 1243, NOW() - INTERVAL '8 hours'),
(1, 'Почему квантовые компьютеры изменят всё (но не завтра)', 'Квантовые вычисления звучат как научная фантастика, но они уже реальность. Разбираемся, что это такое и когда они действительно станут частью нашей жизни.', NULL, 'science', 1567, 29340, 189, 432, NOW() - INTERVAL '12 hours'),
(2, 'Топ-10 игр 2025 года, которые вы пропустили', 'Пока все обсуждают GTA 6, вышло несколько невероятных инди-игр, о которых почти никто не знает. Вот мой личный топ открытий этого года.', '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', 'games', 2234, 42100, 398, 876, NOW() - INTERVAL '1 day'),
(4, 'Переехал в деревню и открыл IT-компанию. Год спустя', 'Устал от городской суеты и решил кардинально изменить жизнь. Купил дом в деревне и продолжил работать удалённо. Делюсь опытом и неожиданными открытиями.', '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', 'life', 4123, 78900, 634, 1567, NOW() - INTERVAL '2 days'),
(1, 'Создаю нейросеть, которая пишет музыку. Результаты впечатляют', 'Эксперимент с AI-композитором дал неожиданные результаты. Делюсь кодом, примерами и рассуждениями о будущем музыки.', NULL, 'tech', 1876, 33450, 245, 567, NOW() - INTERVAL '3 days'),
(2, 'Как я научился рисовать за 100 дней. Прогресс в картинках', 'Решил проверить теорию о 100 днях практики. Начал с нуля, рисовал каждый день. Вот что получилось.', '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', 'art', 3890, 65400, 489, 1234, NOW() - INTERVAL '4 days');

-- Вставка тегов для постов
INSERT INTO post_tags (post_id, tag) VALUES
(1, 'бизнес'), (1, 'истории успеха'), (1, 'стартапы'),
(2, 'технологии'), (2, 'ИИ'), (2, 'будущее'),
(3, 'юмор'), (3, 'технологии'), (3, 'жизненное'),
(4, 'наука'), (4, 'квантовые компьютеры'), (4, 'физика'),
(5, 'игры'), (5, 'обзор'), (5, 'инди'),
(6, 'жизнь'), (6, 'переезд'), (6, 'удалёнка'),
(7, 'ИИ'), (7, 'музыка'), (7, 'творчество'),
(8, 'искусство'), (8, 'обучение'), (8, 'мотивация');

-- Вставка стримов
INSERT INTO streams (streamer_id, title, description, category, platform, thumbnail_url, stream_url, is_live, viewers, started_at, language) VALUES
(1, 'Разработка сайта на React в прямом эфире 🚀', 'Пишем полноценное веб-приложение с нуля. Отвечаю на вопросы, делюсь опытом. Заходите!', 'tech', 'twitch', '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', 'https://twitch.tv/dmitry_dev', true, 1247, NOW() - INTERVAL '2 hours', 'ru'),
(2, 'Counter-Strike 2 — ранкед до Global Elite', 'Играем в CS2, общаемся, поднимаем ранг. Отвечаю на вопросы о тактике и стратегии.', 'games', 'twitch', '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', 'https://twitch.tv/progamer', true, 3421, NOW() - INTERVAL '45 minutes', 'ru'),
(4, 'Рисую концепт-арт персонажа для игры', 'Создание дизайна персонажа в Photoshop с комментариями и объяснениями процесса', 'creative', 'youtube', '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', 'https://youtube.com/live/artcreator', true, 856, NOW() - INTERVAL '1 hour', 'ru'),
(1, 'Собираем игровой ПК за 150к — советы и лайфхаки', 'Помогаю выбрать комплектующие, рассказываю про совместимость и оптимизацию бюджета', 'tech', 'youtube', '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', 'https://youtube.com/live/techguru', true, 2134, NOW() - INTERVAL '30 minutes', 'ru'),
(2, 'Dota 2 — играем с подписчиками, раздаём скины', 'Катаем паблики, общаемся, разыгрываем призы для зрителей', 'games', 'twitch', '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', 'https://twitch.tv/dotalegend', true, 1890, NOW() - INTERVAL '1.5 hours', 'ru');

-- Вставка тегов стримов
INSERT INTO stream_tags (stream_id, tag) VALUES
(1, 'react'), (1, 'программирование'), (1, 'веб-разработка'),
(2, 'cs2'), (2, 'шутер'), (2, 'киберспорт'),
(3, 'арт'), (3, 'дизайн'), (3, 'photoshop'),
(4, 'железо'), (4, 'пк'), (4, 'гайд'),
(5, 'dota2'), (5, 'moba'), (5, 'розыгрыш');

-- Вставка розыгрышей
INSERT INTO giveaways (author_id, title, description, prize, image_url, is_official, participants_count, max_participants, end_date, winner_count, status) VALUES
(1, '🎮 Розыгрыш PlayStation 5 от PULSE', 'Главный розыгрыш месяца! Разыгрываем PlayStation 5 и 3 игры на выбор победителя среди всех активных участников сообщества.', 'PlayStation 5 + 3 игры', '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', true, 4782, 10000, NOW() + INTERVAL '13 days', 1, 'active'),
(1, '💰 Конкурс на лучший пост недели', 'Напиши самый интересный пост недели и получи 5000₽ на карту! Победитель определяется голосованием сообщества.', '5000₽', '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', true, 234, NULL, NOW() + INTERVAL '5 days', 1, 'active'),
(1, '🎧 Раздаю AirPods Pro за лучший комментарий', 'Разыгрываю свои старые AirPods Pro среди подписчиков. Напишите в комментариях самую смешную историю из вашей жизни!', 'Apple AirPods Pro', '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', false, 567, NULL, NOW() + INTERVAL '8 days', 1, 'active'),
(2, '🎁 Набор мерча PULSE для самых активных', 'Разыгрываем 10 наборов фирменного мерча среди участников, которые оставили больше всего качественных комментариев за месяц', 'Набор мерча PULSE', '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', true, 1234, NULL, NOW() + INTERVAL '20 days', 10, 'active'),
(4, '🖥️ Розыгрыш игровой клавиатуры Razer', 'Разыгрываю Razer BlackWidow V3 среди подписчиков канала. Просто участвуйте и ждите результатов!', 'Razer BlackWidow V3', '/img/2653dd1a-8cde-4c82-a444-5f236774ba17.jpg', false, 892, 2000, NOW() + INTERVAL '10 days', 1, 'active');

-- Вставка требований розыгрышей
INSERT INTO giveaway_requirements (giveaway_id, requirement) VALUES
(1, 'Рейтинг от 100'), (1, 'Минимум 5 постов'), (1, 'Аккаунт старше 1 месяца'),
(2, 'Создать пост с тегом #конкурс'), (2, 'Минимум 50 рейтинга поста'),
(3, 'Подписаться на автора'), (3, 'Оставить комментарий'),
(4, 'Минимум 100 комментариев за месяц'), (4, 'Рейтинг от 500'),
(5, 'Подписаться на канал'), (5, 'Поставить лайк стриму');

-- Вставка тегов розыгрышей
INSERT INTO giveaway_tags (giveaway_id, tag) VALUES
(1, 'официальный'), (1, 'игры'), (1, 'главный приз'),
(2, 'официальный'), (2, 'еженедельный'), (2, 'творчество'),
(3, 'техника'), (3, 'наушники'),
(4, 'официальный'), (4, 'мерч'), (4, 'сообщество'),
(5, 'игры'), (5, 'периферия'), (5, 'razer');

-- Вставка уведомлений
INSERT INTO notifications (user_id, type, title, message, link, icon, is_read) VALUES
(1, 'like', 'Новый лайк', 'TechGuru2024 оценил ваш пост', '/post/1', 'ThumbsUp', false),
(1, 'comment', 'Новый комментарий', 'СмешнойКот прокомментировал: "Отличная история!"', '/post/1', 'MessageSquare', false),
(1, 'follower', 'Новый подписчик', 'НаучныйПопугай подписался на вас', '/profile/scienceparrot', 'UserPlus', false),
(1, 'achievement', 'Достижение разблокировано', 'Вы получили значок "Автор месяца"', '/profile/dmitry', 'Award', false),
(1, 'system', 'Новый розыгрыш', 'Стартовал розыгрыш PlayStation 5! Успейте принять участие', '/giveaways', 'Gift', true),
(2, 'like', 'Новый лайк', 'Дмитрий Космонавт оценил ваш пост', '/post/2', 'ThumbsUp', true),
(2, 'message', 'Новое сообщение', 'ProGamer2024: Привет! Хочу обсудить сотрудничество', '/messages', 'Mail', false),
(4, 'comment', 'Новый комментарий', 'Кто-то ответил на ваш комментарий', '/post/3', 'MessageSquare', false);