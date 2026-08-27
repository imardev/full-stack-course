import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
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

describe("Blog form", () => {
  test("creates a new blog with the given details", async () => {
    const user = userEvent.setup();
    const createBlog = vi.fn();
    const component = render(
      <MemoryRouter initialEntries={["/create"]}>
        <Routes>
          <Route
            path="/create"
            element={<BlogForm handleSubmit={createBlog} />}
          />
          <Route path="/" element={<Blog blog={blog} user={blog.user} />} />
        </Routes>
      </MemoryRouter>,
    );
    const titleInput = screen.getByPlaceholderText("Enter blog title");
    const authorInput = screen.getByPlaceholderText("Enter blog name");
    const urlInput = screen.getByPlaceholderText("Enter blog url");
    const submitButton = screen.getByText("create");

    await user.type(titleInput, "testing a form...");
    await user.type(authorInput, "Michael Chan");
    await user.type(urlInput, "https://reactpatterns.com");

    await user.click(submitButton);
    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog).toHaveBeenCalledWith({
      title: "testing a form...",
      author: "Michael Chan",
      url: "https://reactpatterns.com",
    });
  });
});
