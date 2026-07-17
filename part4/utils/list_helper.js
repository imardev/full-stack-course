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

module.exports = {
  dummy,
  totalLikes,
  blogFavorite,
};
