CREATE TABLE IF NOT EXISTS models (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('basic', 'premium', 'luxury')),
    image_url TEXT NOT NULL,
    height INTEGER,
    measurements VARCHAR(100),
    experience_years INTEGER,
    price_per_hour DECIMAL(10, 2) NOT NULL,
    description TEXT,
    portfolio_images TEXT[],
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    model_id INTEGER REFERENCES models(id),
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50),
    booking_date DATE NOT NULL,
    hours INTEGER NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    payment_status VARCHAR(50) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO models (name, category, image_url, height, measurements, experience_years, price_per_hour, description) VALUES
('Анна Соколова', 'luxury', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800', 178, '90-60-90', 8, 15000.00, 'Топ-модель международного уровня. Работала с Vogue, Elle, Harper''s Bazaar.'),
('Елена Морозова', 'luxury', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800', 176, '88-58-92', 6, 12000.00, 'Профессиональная модель с опытом подиумных показов на Неделях моды.'),
('Мария Петрова', 'premium', 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800', 175, '86-60-90', 5, 8000.00, 'Опытная модель для рекламных кампаний и каталогов премиум-брендов.'),
('Дарья Волкова', 'premium', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800', 172, '85-59-88', 4, 7000.00, 'Специализируется на коммерческой съёмке и lookbook проектах.'),
('София Лебедева', 'basic', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800', 170, '84-62-90', 2, 4000.00, 'Начинающая модель с большим потенциалом для каталожных съёмок.'),
('Ксения Новикова', 'basic', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800', 168, '82-60-88', 1, 3500.00, 'Молодая модель для интернет-магазинов и коммерческих проектов.');