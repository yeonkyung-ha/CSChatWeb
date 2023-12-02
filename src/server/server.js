const express = require('express');
const cors = require('cors');
const app = express();
const groupChat = require('./routes/groupchat');
const member = require('./routes/member');
const profile = require('./routes/profile');

// Middleware to enable CORS
app.use(cors());
// Middleware to parse JSON in requests
app.use(express.json());

// Routes
app.use('/api/cschat/groupChat', groupChat);
app.use('/api/cschat/member', member);
app.use('/api/cschat/profile', profile);

// Start the server
const port = 4646;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
