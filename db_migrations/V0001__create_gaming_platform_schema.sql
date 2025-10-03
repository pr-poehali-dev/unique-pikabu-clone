-- Создание таблицы пользователей
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    avatar_url VARCHAR(500),
    level INTEGER DEFAULT 1,
    rating INTEGER DEFAULT 0,
    region VARCHAR(50) DEFAULT 'russia',
    languages TEXT[] DEFAULT ARRAY['ru'],
    is_online BOOLEAN DEFAULT false,
    last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    looking_for_team BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы игр
CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    game_key VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(10),
    category VARCHAR(50),
    players_count INTEGER DEFAULT 0,
    growth_percent DECIMAL(5,2) DEFAULT 0,
    avg_rating DECIMAL(3,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы пользовательской статистики по играм
CREATE TABLE user_game_stats (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    game_id INTEGER REFERENCES games(id),
    rank VARCHAR(50),
    hours_played INTEGER DEFAULT 0,
    matches_count INTEGER DEFAULT 0,
    win_rate DECIMAL(5,2) DEFAULT 0,
    is_main_game BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, game_id)
);

-- Создание таблицы стилей игры
CREATE TABLE play_styles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    style VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, style)
);

-- Создание таблицы сообщений
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id),
    receiver_id INTEGER REFERENCES users(id),
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов для оптимизации поиска
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_online ON users(is_online);
CREATE INDEX idx_users_lfg ON users(looking_for_team);
CREATE INDEX idx_users_region ON users(region);
CREATE INDEX idx_games_key ON games(game_key);
CREATE INDEX idx_user_game_stats_user ON user_game_stats(user_id);
CREATE INDEX idx_user_game_stats_game ON user_game_stats(game_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id, is_read);
CREATE INDEX idx_messages_sender ON messages(sender_id);

-- Вставка данных по играм
INSERT INTO games (game_key, name, icon, category, players_count, growth_percent, avg_rating) VALUES
('cs2', 'Counter-Strike 2', '🔫', 'Шутеры', 1500000, 15.5, 4.8),
('dota2', 'Dota 2', '🎮', 'MOBA', 950000, 8.2, 4.7),
('valorant', 'Valorant', '🎯', 'Шутеры', 820000, 22.3, 4.6),
('lol', 'League of Legends', '⚔️', 'MOBA', 1200000, 12.1, 4.9),
('fortnite', 'Fortnite', '🏹', 'Battle Royale', 680000, 18.7, 4.5),
('apex', 'Apex Legends', '🎖️', 'Battle Royale', 550000, 14.2, 4.4),
('pubg', 'PUBG', '🪂', 'Battle Royale', 420000, 5.8, 4.2),
('overwatch2', 'Overwatch 2', '🎭', 'Шутеры', 380000, 25.4, 4.3),
('rainbow6', 'Rainbow Six Siege', '🏢', 'Шутеры', 340000, 9.1, 4.5),
('warzone', 'Call of Duty: Warzone', '💣', 'Battle Royale', 590000, 11.3, 4.4),
('gta5', 'GTA V', '🚗', 'Экшен', 720000, 7.5, 4.6),
('minecraft', 'Minecraft', '🟫', 'Песочница', 1100000, 16.8, 4.8),
('rocketleague', 'Rocket League', '⚽', 'Спорт', 290000, 13.2, 4.5),
('rust', 'Rust', '🔨', 'Выживание', 310000, 19.6, 4.3),
('terraria', 'Terraria', '⛏️', 'Песочница', 220000, 6.4, 4.7);

-- Вставка тестовых пользователей
INSERT INTO users (username, email, avatar_url, level, rating, region, languages, is_online, looking_for_team) VALUES
('ProGamer2024', 'progamer@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamer', 45, 2450, 'russia', ARRAY['ru', 'en'], true, true),
('MidLaner_Pro', 'midlaner@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=MidLaner', 38, 2120, 'europe', ARRAY['ru', 'en'], true, false),
('SniperKing', 'sniper@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sniper', 52, 2680, 'usa', ARRAY['en'], false, true),
('DotaLegend', 'dotalegend@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dota', 41, 2350, 'russia', ARRAY['ru'], true, true),
('TacticalMaster', 'tactical@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tactical', 35, 1980, 'europe', ARRAY['en', 'de'], false, false),
('ApexPredator', 'apex@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Apex', 48, 2540, 'usa', ARRAY['en'], true, true),
('CasualGamer', 'casual@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casual', 22, 1250, 'russia', ARRAY['ru'], false, false),
('MinecraftBuilder', 'minecraft@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Builder', 28, 1560, 'asia', ARRAY['en', 'zh'], true, false);

-- Вставка статистики пользователей по играм
INSERT INTO user_game_stats (user_id, game_id, rank, hours_played, matches_count, win_rate, is_main_game) VALUES
(1, 1, 'Global Elite', 2340, 1245, 62.5, true),
(1, 3, 'Immortal 2', 890, 456, 58.3, false),
(2, 4, 'Diamond I', 1567, 892, 54.2, true),
(2, 2, 'Ancient 5', 2103, 1134, 56.8, false),
(3, 6, 'Predator', 3456, 2341, 67.4, true),
(3, 5, 'Champion', 1234, 678, 61.2, false),
(4, 2, 'Divine 3', 4560, 2456, 59.7, true),
(5, 1, 'Supreme', 1890, 1023, 55.4, true),
(5, 3, 'Ascendant 3', 1234, 678, 57.2, false),
(6, 6, 'Master', 2890, 1567, 64.3, true),
(7, 12, 'Builder Level 50', 890, 234, 0, true),
(7, 11, 'Rank 120', 456, 123, 0, false),
(8, 12, 'Redstone Expert', 1567, 456, 0, true);

-- Вставка стилей игры
INSERT INTO play_styles (user_id, style) VALUES
(1, 'Агрессивный'),
(1, 'Entry Fragger'),
(2, 'Тактический'),
(2, 'IGL'),
(3, 'Снайпер'),
(3, 'Агрессивный'),
(4, 'Support'),
(4, 'Carry'),
(5, 'Тактический'),
(5, 'IGL'),
(6, 'Агрессивный'),
(6, 'Fragging'),
(7, 'Casual'),
(7, 'PvE'),
(8, 'Творчество'),
(8, 'Строитель');