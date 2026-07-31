const blogRouter = require("express").Router();
const { response } = require("express");
const Blog = require("../models/blog");

blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: "title or url is missing" });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ?? 0,
  });

  try {
    const savedBlog = await blog.save();
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
