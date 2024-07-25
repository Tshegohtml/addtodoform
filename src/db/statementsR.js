const sqlite3 = require('sqlite3').verbose();

// Function to initialize SQLite database
const initializeDatabase = () => {
  return new sqlite3.Database('./path/to/your/database.db', (err) => {
    if (err) {
      console.error('Error connecting to database:', err.message);
    } else {
      console.log('Connected to the SQLite database');
    }
  });
};

// Function to register a new user
const registerUser = (username, password) => {
  const db = initializeDatabase();

  db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL)");

    db.run("INSERT INTO users (username, password) VALUES (?, ?)", username, password, (err) => {
      if (err) {
        console.error('Error registering user:', err.message);
      } else {
        console.log('User registered successfully');
      }
    });
  });

  db.close();
};

module.exports = { registerUser, initializeDatabase };