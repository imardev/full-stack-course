import { render, screen } from "@testing-library/react";
import BlogView from "./BlogView";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const blog = {
  id: 1,
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com",
  likes: 7,
  user: {
    username: "mluukkai",
    name: "Matti Luukkainen",
  },
};

const blogs = [blog];

const otherUser = {
  username: "otheruser",
  password: "Other_User",
};
const statusBlogs = false;

describe("Blog view", () => {
  test("user not authenticated can see blog info but no buttons", async () => {
    render(
      <MemoryRouter initialEntries={["/blogs/1"]}>
        <Routes>
          <Route
            path="/blogs/:blogId"
            element={<BlogView blogs={blogs} status={false} user={null} />}
          />
        </Routes>
      </MemoryRouter>,
    );
    const elementTitle = screen.getByText("React patterns");
    const elementUrl = screen.getByText("https://reactpatterns.com");
    const elementLike = screen.getAllByText("7");
    const elementLikeButton = screen.queryByRole("button", {
      name: /like/i,
    });
    expect(elementTitle).toBeDefined();
    expect(elementUrl).toBeDefined();
    expect(elementLike).toBeDefined();
    expect(elementLikeButton).toBeNull();
  });

  test("authenticated user who is not the creator can see like button", () => {
    render(
      <MemoryRouter initialEntries={["/blogs/1"]}>
        <Routes>
          <Route
            path="/blogs/:blogId"
            element={<BlogView blogs={blogs} status={false} user={otherUser} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    const likeButton = screen.getByRole("button", {
      name: /like/i,
    });

    const deleteButton = screen.queryByRole("button", {
      name: /remove/i,
    });
    expect(likeButton).toBeDefined();
    expect(deleteButton).toBeNull();
  });

  test("the creator can see remove button", () => {
    render(
      <MemoryRouter initialEntries={["/blogs/1"]}>
        <Routes>
          <Route
            path="/blogs/:blogId"
            element={<BlogView blogs={blogs} status={false} user={blog.user} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    const likeButton = screen.getByRole("button", {
      name: /like/i,
    });

    const deleteButton = screen.getByRole("button", {
      name: /remove/i,
    });

    expect(likeButton).toBeDefined();
    expect(deleteButton).toBeDefined();
  });
});
