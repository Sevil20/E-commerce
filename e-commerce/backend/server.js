import express, { json } from 'express';
import { createConnection } from 'mysql';
import { hash, compare } from 'bcrypt';

const app = express();
app.use(json());

// Create a MySQL connection
const db = createConnection({
  host: '3306',
  user: 'root',
  password: 'Sevil2002*',
  database: 'MyLoginSystem',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Register route
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password
  hash(password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Store the user in the database
      const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(sql, [username, email, hashedPassword], (err) => {
        if (err) {
          res.status(500).json({ error: 'Failed to register user' });
        } else {
          res.status(200).json({ message: 'User registered successfully' });
        }
      });
    }
  });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(401).json({ error: 'Invalid username or password' });
    } else {
      const user = results[0];

      // Compare the provided password with the hashed password
      compare(password, user.password, (err, match) => {
        if (err) {
          res.status(500).json({ error: 'Internal server error' });
        } else if (match) {
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ error: 'Invalid username or password' });
        }
      });
    }
  });
});

// Start the server
const PORT = 5173;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
