const router = require("express").Router();
const { Post } = require("../models");
const withAuth = require("../utils/auth");

// Render all posts in the admin dashboard
router.get("/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        userId: req.session.userId
      }
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render("all-posts-admin", {
      layout: "dashboard",
      posts
    });
  } catch (err) {
    console.error(err);
    res.redirect("login");
  }
});

// Render a form for creating a new post
router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "dashboard"
  });
});

// Render a form for editing a specific post
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id);

    if (dbPostData) {
      const post = dbPostData.get({ plain: true });

      res.render("edit-post", {
        layout: "dashboard",
        post
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;