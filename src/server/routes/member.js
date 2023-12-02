const db = require("../database/db.js");
const express = require('express');
const router = express.Router();

const Member = function(member) {
  this.idNumber = member.id;
  this.fullName = member.full_name;
  this.entryYear = member.entry_year;
  this.entrySemester = member.entry_semester;
  this.email = member.email;
  this.password = member.password;
};

router.get('/', (req, res) => {
  const query = 'SELECT * FROM member';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const memberList = results.map(member => new Member(member));
      res.status(200).json(memberList);
    }
  });
});

router.post('/', (req, res) => {
  const { full_name, entry_year, entry_semester, email, password } = req.body;
  const newMember = new Member({ full_name, entry_year, entry_semester, email, password });
  console.log(newMember);
  // For update
  const query = 'INSERT INTO member (full_name, entry_year, entry_semester, email, password ) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [newMember.fullName, newMember.entryYear, newMember.entrySemester, newMember.email, newMember.password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Member added successfully', member: newMember });
    }
  });
});

module.exports = router;