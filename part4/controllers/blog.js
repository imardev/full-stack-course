const blogRouter = require("express").Router();
const { response } = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  try {
    const token = getTokenFrom(request);

    if (!token) {
      return response.status(401).json({ error: "token missing" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return response.status(401).json({ error: "user not found" });
    }

    if (!title || !url) {
      return response.status(400).json({ error: "title or url is missing" });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes ?? 0,
      user: user.id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;

  await Blog.findByIdAndDelete(id);

  return response.status(204).end();
});

blogRouter.put("/:id", async (request, response, next) => {
  const id = request.params.id;

  const { likes } = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { likes },
    {
      new: true,
    },
  );
  response.json(updatedBlog);
});

module.exports = blogRouter;
