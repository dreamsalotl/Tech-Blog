const express = require("express");
const router = express.Router();
const { BlogPost, User, Comment } = require("../../models/");
const checkAuth = require("../../utils/auth");

router.post("/create-post", checkAuth, (req, res) => {
  const { title, content } = req.body;
  const authorId = req.session.userId;

  BlogPost.create({ title, content, authorId })
    .then(newPost => {
      res.json({
        message: "New blog post created successfully!",
        post: newPost,
      });
    })
    .catch(err => {
      res.status(500).json({
        error: "An error occurred while creating the blog post.",
        details: err.message,
      });
    });
});

router.put("/update-post/:id", checkAuth, (req, res) => {
  const { title, content } = req.body;
  const postId = req.params.id;

  BlogPost.update({ title, content }, {
    where: {
      id: postId
    }
  })
    .then(affectedRows => {
      if (affectedRows > 0) {
        res.status(200).json({
          message: "Blog post updated successfully!",
        });
      } else {
        res.status(404).json({
          error: "Blog post not found.",
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "An error occurred while updating the blog post.",
        details: err.message,
      });
    });
});

router.delete("/delete-post/:id", checkAuth, (req, res) => {
  const postId = req.params.id;

  BlogPost.destroy({
    where: {
      id: postId
    }
  })
    .then(affectedRows => {
      if (affectedRows > 0) {
        res.status(200).json({
          message: "Blog post deleted successfully!",
        });
      } else {
        res.status(404).json({
          error: "Blog post not found.",
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "An error occurred while deleting the blog post.",
        details: err.message,
      });
    });
});

module.exports = router;