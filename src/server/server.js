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

app.get('/api/cschat/groupchat/:courses', function(req, res) {
  console.log("Received request for courses");
  connection.query('SELECT * FROM groupchat', (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Sending courses data:', results);
      res.json(results.map(course => course.courses));
    }
  });
});

app.post('/api/cschat/profile', async (req, res) => {
  console.log("Received profile data:", req.body);

  const { email, message, courses } = req.body;

  console.log("Received profile data:", { email, message, courses });
  
  try {
    console.log("Before executing SELECT query");
    const [user] = await connection.query('SELECT * FROM profile WHERE email = ?', [email]);
    console.log("After executing SELECT query");

    if (user.length > 0) {
      console.log("Updating existing profile.");
      console.log("Before executing UPDATE query");
      await connection.promise().query('UPDATE profile SET message = ?, courses = ? WHERE email = ?', [message, JSON.stringify(courses), email]);
      console.log("After executing UPDATE query");
    } else {
      console.log("Inserting new profile.");
      console.log("Before executing INSERT query");
      await connection.promise().query('INSERT INTO profile (email, message, courses) VALUES (?, ?, ?)', [email, message, JSON.stringify(courses)]);
      console.log("After executing INSERT query");
    }

    console.log("Profile operation successful.");
    res.status(200).send('Profile saved successfully');
  } catch (error) {
    console.error('Database operation error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/cschat/groupchat/wow/:course', async (req, res) => {
  const course = req.params.course;
  const { profileName, message } = req.body;

  try {
    const [rows] = await connection.promise().query('SELECT message FROM groupchat WHERE courses = ?', [course]);
    const message = rows[0].message;
    console.log(message)
    res.status(200).json(message);
  } catch {
    res.status(500).send("Error on loading");
  }
});
app.post('/api/cschat/groupchat/:course', async (req, res) => {
  const course = req.params.course;
  const { profileName, message } = req.body;

  console.log('Received request to add message:');
  console.log('Course:', course);
  console.log('Profile Name:', profileName);
  console.log('Message:', message);

  try {
    const [rows] = await connection.promise().query('SELECT message FROM groupchat WHERE courses = ?', [course]);
    [{}]
    
    // let messagesList = rows && rows.length > 0 && rows[0].message ? JSON.parse(rows[0].message) : [];
    let messagesList = rows[0].message
    const newMessageObject = { senderName: profileName, text: message };
    messagesList.push(newMessageObject);

    while (messagesList.length > 15) {
      messagesList.shift();
    }

    const updatedMessagesJSON = JSON.stringify(messagesList);

    await connection.promise().query('UPDATE groupchat SET message = ? WHERE courses = ?', [updatedMessagesJSON, course]);

    console.log('Message added successfully');
    res.status(200).send('Message added successfully');
  } catch (error) {
    console.error(`Error processing message for course ${course}:`, error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
