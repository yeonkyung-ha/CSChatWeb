const db = require("../database/db.js");
const express = require('express');
const router = express.Router();

const GroupChat = function(groupChat) {
  this.idNumber = groupChat.id;
  this.courses = groupChat.courses;
  //need to add more elements here
};

router.get('/', (req, res) => {
  const query = 'SELECT * FROM groupChat';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const groupChatList = results.map(groupChat => new GroupChat(groupChat));
      res.status(200).json(groupChatList);
    }
  });
});

module.exports = router;