CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
);

-- Example of inserting initial data (optional)
INSERT INTO users (username, password) VALUES ('admin', 'adminpassword');