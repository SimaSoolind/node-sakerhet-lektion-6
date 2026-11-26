-- tabell för användare (F6)
CREATE TABLE IF NOT EXISTS users(
    -- nytt nummer automatiskt
    id SERIAL PRIMARY KEY,
    -- namnet får bara finnas en gång
    username VARCHAR(50) NOT NULL UNIQUE,
    -- bara hash, aldrig klartext
    password_hash VARCHAR(100) NOT NULL,
    -- rollen sätts av databasen
    role VARCHAR(20) NOT NULL DEFAULT 'User' CHECK (role IN ('User', 'Admin')),
    -- tiden fylls i automatiskt
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
