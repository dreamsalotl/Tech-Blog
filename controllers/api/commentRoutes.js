const router = require("express").Router();
const { Comment } = require("../../models/");
const withAuth = require("../../utils/auth");

router.post("/new-comment", withAuth, (req, res) => {
  const { body, userId } = req.body;

  Comment.create({ body, userId })
    .then(newComment => {
      res.json({
        message: "New comment created successfully!",
        comment: newComment,
      });
    })
    .catch(err => {
      res.status(500).json({
        error: "An error occurred while creating the comment.",
        details: err.message,
      });
    });
});

module.exports = router;