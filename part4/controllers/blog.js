const blogRouter = require("express").Router();
const { response } = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogRouter.post(
  "/",
  middleware.userExtractor,
  async (request, response, next) => {
    const { title, author, url, likes } = request.body;

    try {
      const token = request.token;

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
      const populatedBlog = await Blog.findById(savedBlog._id).populate(
        "user",
        {
          username: 1,
          name: 1,
        },
      );
      response.status(201).json(populatedBlog);
    } catch (exception) {
      next(exception);
    }
  },
);

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response, next) => {
    const id = request.params.id;
    const token = request.token;

    if (!token) {
      return response.status(401).json({ error: "token missing" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return response.status(441).json({ error: "user not found" });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(id);
    } else {
      return response.status(403).end();
    }

    return response.status(204).end();
  },
);

blogRouter.put("/:id", async (request, response, next) => {
  const id = request.params.id;

  const { title, author, url, likes, user } = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { title, author, url, likes, user },
    {
      new: true,
    },
  );

  const populatedBlog = await Blog.findById(updatedBlog._id).populate("user", {
    username: 1,
    name: 1,
  });

  response.json(populatedBlog);
});

module.exports = blogRouter;
