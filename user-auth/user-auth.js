const express = require('express');
const mysql = require('mysql');
const app = express();

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'weather'
});

// Middleware for parsing JSON in request body
app.use(express.json());

// User Registration
app.post('/api/auth/register', (req, res) => {
    
    const contentType = req.get('Content-Type');

  // Check if the content type is JSON
  if (contentType !== 'application/json') {
    return res.status(400).json({ message: 'Invalid content type' });
  }
  const { username, password } = req.body;

  console.log('Received username:', username);

  // Check if username already exists in the database
  const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkUserQuery, [username], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (result.length > 0) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Insert the new user into the database
    const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(insertUserQuery, [username, password], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// User Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user by username and password in the database
  const getUserQuery = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(getUserQuery, [username, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// MySQL database connection establishment
db.connect(err => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('Connected to MySQL database');
});
