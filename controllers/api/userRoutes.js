const express = require("express");
const router = express.Router();
const { UserProfile } = require("../../models");

router.post("/create-profile", (req, res) => {
  const { username, password } = req.body;

  UserProfile.create({ username, password })
    .then(newProfile => {
      req.session.save(() => {
        req.session.profileId = newProfile.id;
        req.session.username = newProfile.username;
        req.session.loggedIn = true;

        res.json({
          message: "New user profile created successfully!",
          profile: newProfile,
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        error: "An error occurred while creating the user profile.",
        details: err.message,
      });
    });
});

router.post("/login", (req, res) => {
  UserProfile.findOne({
    where: {
      username: req.body.username
    }
  }).then(userProfile => {
    if (!userProfile) {
      res.status(400).json({ message: 'No user profile found!' });
      return;
    }

    const validPassword = userProfile.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.profileId = userProfile.id;
      req.session.username = userProfile.username;
      req.session.loggedIn = true;
  
      res.json({
        user: userProfile,
        message: 'You are now logged in!',
      });
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete("/delete-profile/:id", (req, res) => {
  UserProfile.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deletedProfile => {
    if (!deletedProfile) {
      res.status(404).json({ message: 'No user profile found with this id' });
      return;
    }
    res.json(deletedProfile);
  })
  .catch(err => {
    res.status(500).json({
      error: "An error occurred while deleting the user profile.",
      details: err.message,
    });
  });
});

module.exports = router;