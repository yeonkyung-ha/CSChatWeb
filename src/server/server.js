const express = require('express');
const cors = require('cors');
const app = express();
const groupChat = require('./routes/groupchat');
const member = require('./routes/member');
const profile = require('./routes/profile');
const mysql = require('mysql');
const connection = require('./database/db');

// Middleware to enable CORS
app.use(cors());
// Middleware to parse JSON in requests
app.use(express.json());

// Routes
app.use('/api/cschat/groupChat', groupChat);
app.use('/api/cschat/member', member);
app.use('/api/cschat/profile', profile);

app.get('/api/cschat/member/:email', function(req, res) {
  const email = decodeURIComponent(req.params.email);
  console.log(`Looking up member with email: ${email}`);
  
  connection.query('SELECT * FROM member WHERE email = ?', [email], (error, results, fields) => {
    if (error) {
      console.error('Database query error:', error);
      return res.status(500).send('Internal Server Error');
    }

    if (results.length > 0) {
      console.log('Member found:', results[0]);
      res.json(results[0]);
    } else {
      console.log('Member not found for email:', email);
      res.status(404).send('Member not found');
    }
  });
});


app.post('/api/cschat/member/:email/courses', function(req, res) {
  const email = decodeURIComponent(req.params.email);
  const { courses } = req.body; 

  const coursesString = courses.join(', ');

  connection.query('UPDATE member SET courses = ? WHERE email = ?', [coursesString, email], (error, results) => {
    if (error) {
      console.error('Database update error:', error);
      return res.status(500).send('Internal Server Error');
    }
    if (results.affectedRows > 0) {
      res.status(200).send('Courses updated successfully');
    } else {
      res.status(404).send('Member not found');
    }
  });
});


// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
