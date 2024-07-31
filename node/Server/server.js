const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;

// Initialize SQLite database
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the SQLite database');
    createTables();
  }
});

// Function to create necessary tables
const createTables = () => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS task (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        priority TEXT NOT NULL,
        userId INTEGER,
        FOREIGN KEY(userId) REFERENCES user(id)
      )
    `);
  });
};

// Function to fetch tasks by userId
const getTasksByUserId = (userId, callback) => {
  db.all(
    "SELECT * FROM task WHERE userId = ?",
    [userId],
    (err, rows) => {
      callback(err, rows);
    }
  );
};

// Function to add a new task
const addTask = (description, priority, userId, callback) => {
  db.run(
    "INSERT INTO task (description, priority, userId) VALUES (?, ?, ?)",
    [description, priority, userId],
    (err) => {
      callback(err);
    }
  );
};

// Function to delete a task
const deleteTask = (id, callback) => {
  db.run(
    "DELETE FROM task WHERE id = ?",
    [id],
    (err) => {
      callback(err);
    }
  );
};

// Function to update a task
const updateTask = (id, description, priority, callback) => {
  db.run(
    "UPDATE task SET description = ?, priority = ? WHERE id = ?",
    [description, priority, id],
    (err) => {
      callback(err);
    }
  );
};

// User registration endpoint
app.post('/api/register', (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.run(
    "INSERT INTO user (firstname, lastname, email, password) VALUES (?, ?, ?, ?)",
    [firstname, lastname, email, password],
    function(err) {
      if (err) {
        console.error('Error registering user:', err.message);
        return res.status(500).json({ error: 'Error registering user' });
      }
      res.status(201).json({ message: 'Registration successful' });
    }
  );
});

// User login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  db.get(
    "SELECT id FROM user WHERE email = ? AND password = ?",
    [email, password],
    (err, row) => {
      if (err) {
        console.error('Error logging in:', err.message);
        return res.status(500).json({ error: 'Error logging in' });
      }
      if (row) {
        res.status(200).json({ userId: row.id });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    }
  );
});

// Express endpoint to get tasks for a user
app.get('/api/tasks/:userId', (req, res) => {
  const { userId } = req.params;
  getTasksByUserId(userId, (err, tasks) => {
    if (err) {
      console.error('Error fetching tasks:', err.message);
      return res.status(500).json({ error: 'Error fetching tasks' });
    }
    res.status(200).json(tasks);
  });
});

// Express endpoint to add a new task
app.post('/api/add-task', (req, res) => {
  const { description, priority, userId } = req.body;

  if (!description || !priority || !userId) {
    return res.status(400).json({ error: 'Description, priority, and userId are required' });
  }

  addTask(description, priority, userId, (err) => {
    if (err) {
      console.error('Error adding task:', err.message);
      return res.status(500).json({ error: 'Error adding task' });
    }
    res.status(201).json({ message: 'Task added successfully' });
  });
});

// Express endpoint to delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  deleteTask(id, (err) => {
    if (err) {
      console.error('Error deleting task:', err.message);
      return res.status(500).json({ error: 'Error deleting task' });
    }
    res.sendStatus(204);
  });
});

// Express endpoint to update a task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { description, priority } = req.body;
  if (!description || !priority) {
    return res.status(400).json({ error: 'Description and priority are required' });
  }
  updateTask(id, description, priority, (err) => {
    if (err) {
      console.error('Error updating task:', err.message);
      return res.status(500).json({ error: 'Error updating task' });
    }
    res.sendStatus(204);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
