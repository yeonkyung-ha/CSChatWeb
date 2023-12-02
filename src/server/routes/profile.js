const db = require("../database/db.js");
const express = require('express');
const router = express.Router();

const Profile = function(profile) {
  this.idNumber = profile.id;
  this.email = profile.email;
  this.image = profile.image;
  this.message = profile.message;
  this.courses = profile.courses;
};

router.get('/', (req, res) => {
  const query = 'SELECT * FROM profile';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const profileList = results.map(profile => new Profile(profile));
      res.status(200).json(profileList);
    }
  });
});

router.post('/', (req, res) => {
  const { email, image, message, courses } = req.body;
  const newProfile = new Profile({ email, image, message, courses });
  console.log(newProfile);

  // Checking if the given email already exists
  const checkQuery = 'SELECT * FROM profile WHERE email = ?';
  db.query(checkQuery, [newProfile.email], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking existing profile:', checkErr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (checkResults.length > 0) {
        // If profile exists, update it
        const updateQuery = 'UPDATE profile SET image = ?, message = ?, courses = ? WHERE email = ?';
        db.query(updateQuery, [newProfile.image, newProfile.message, newProfile.courses, newProfile.email], (updateErr, updateResults) => {
          if (updateErr) {
            console.error('Error updating profile:', updateErr);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            res.status(200).json({ message: 'Profile updated successfully', profile: newProfile });
          }
        });
      } else {
        // doesn't exist, insert it
        const insertQuery = 'INSERT INTO profile (email, image, message, courses) VALUES (?, ?, ?, ?)';
        db.query(insertQuery, [newProfile.email, newProfile.image, newProfile.message, newProfile.courses], (insertErr, insertResults) => {
          if (insertErr) {
            console.error('Error inserting profile:', insertErr);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            res.status(200).json({ message: 'Profile added successfully', profile: newProfile });
          }
        });
      }
    }
  });
});

module.exports = router;
