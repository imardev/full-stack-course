const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert/strict");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  console.log("beforeEach");
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
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
  const initialContent = helper.initialBlogs.length;
  await api
    .post("/api/blogs")
    .send(helper.newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const actualContent = await api.get("/api/blogs");
  assert.strictEqual(actualContent.body.length, initialContent + 1);
});
