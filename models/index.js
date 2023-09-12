const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
  foreignKey: 'userId', // This associates Post with User based on userId
  onDelete: 'CASCADE', // If a User is deleted, their associated Posts are also deleted
});

Post.hasMany(Comment, {
  foreignKey: 'postId', // This associates Post with Comment based on postId
  onDelete: 'CASCADE', // If a Post is deleted, its associated Comments are also deleted
});

Comment.belongsTo(User, {
  foreignKey: 'userId', // This associates Comment with User based on userId
  onDelete: 'CASCADE', // If a User is deleted, their associated Comments are also deleted
});

module.exports = {
  User,
  Comment,
  Post,
};