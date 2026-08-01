const { test, after, beforeEach } = require("node:test");
const lodash = require("lodash");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert/strict");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
  await User.deleteMany({});
});

test("blogs are returned as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  assert.strictEqual(response.body.length, 3);
});

after(async () => {
  await mongoose.connection.close();
});

test("return blogs with right unique identifier property", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((blog) => {
    assert.ok(blog.id);
    assert.strictEqual(blog._id, undefined);
  });
});

test("should add one blog that has the right content", async () => {
  const blogsAtStart = (await helper.blogsInDb()).length;
  await api.post("/api/users").send({
    username: "loginUser",
    name: "Login User",
    password: "secret",
  });
  const loggedUser = await api.post("/api/login").send(helper.loginUser);
  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${loggedUser.body.token}`)
    .send(helper.newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const newBlog = response.body;
  const blogsAtFinal = await helper.blogsInDb();
  assert.strictEqual(blogsAtFinal.length, blogsAtStart + 1);
});

test("should add a blog with zero likes if the likes property is missing", async () => {
  await api.post("/api/users").send({
    username: "loginUser",
    name: "Login User",
    password: "secret",
  });
  const loggedUser = await api.post("/api/login").send(helper.loginUser);
  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${loggedUser.body.token}`)
    .send(helper.newBlogWithoutLikes)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  assert.strictEqual(response.body.likes, 0);
});

test("fails with status code 400 if title is missing", async () => {
  await api.post("/api/users").send({
    username: "loginUser",
    name: "Login User",
    password: "secret",
  });
  const loggedUser = await api.post("/api/login").send(helper.loginUser);
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${loggedUser.body.token}`)
    .send(helper.blogWithoutTitle)
    .expect(400);
});

test("fails with status code 400 if url is missing", async () => {
  await api.post("/api/users").send({
    username: "loginUser",
    name: "Login User",
    password: "secret",
  });
  const loggedUser = await api.post("/api/login").send(helper.loginUser);
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${loggedUser.body.token}`)
    .send(helper.blogWithoutUrl)
    .expect(400);
});
