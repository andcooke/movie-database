const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'movies_db'
  },
  console.log(`Connected to the movies_db database.`)
);

// Read all movies
app.get('/api/movies', (req, res) => {
  const sql = `SELECT id, movie_name AS title FROM movies`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});



app.get('/api/add-movie', (req, res) => {
  const sql = `SELECT id, movie_name AS title FROM movies`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({error: err.message});
      return;
    }
    res.json({
      message:'success',
      data: rows
    });
  });
});


app.post('/api/add-movie', (req, res) => {
  const sql = `INSERT INTO movies (movie_name) VALUES ("Mystic Pizza")`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({error: err.message});
      return;
    }
    res.json({
      message:'success',
      data: rows
    });
  });
});


app.delete('/api/movie/:id', (req, res) => {
  const sql = `DELETE FROM movies WHERE id = ?`;

  let id = 10

  db.query(sql, id, (err, rows) => {
    if (err) {
      res.status(500).json({error: err.message});
      return;
    }
    res.json({
      message:'success',
      data: rows
    });
  });
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
