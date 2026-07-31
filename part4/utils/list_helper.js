const lodash = require("lodash");
const blog = require("../models/blog");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const blogFavorite = (blogs) => {
  if (blogs.length === 0) return null;

  const blog = blogs.reduce((favorite, current) =>
    favorite.likes > current.likes ? favorite : current,
  );
  return { title: blog.title, author: blog.author, likes: blog.likes };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authorsWithBlogs = lodash.groupBy(blogs, "author");
  const authors = lodash.map(authorsWithBlogs, (blogsDelAutor, autor) => {
    return {
      author: autor,
      blogs: blogsDelAutor.length,
    };
  });
  const authorsWithMostBlogs = lodash.maxBy(authors, "blogs");
  return authorsWithMostBlogs;
};

module.exports = {
  dummy,
  totalLikes,
  blogFavorite,
  mostBlogs,
};
