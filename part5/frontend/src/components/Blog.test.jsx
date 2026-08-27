import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import BlogView from "./BlogView";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";

// Declaración del blog
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

const blogs = [
  {
    id: 1,
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com",
    likes: 7,
    user: {
      username: "mluukkai",
      name: "Matti Luukkainen",
    },
  },
];

describe("Blog", () => {
  // Test para comprobar render de la nota
  test("renders content", () => {
    render(
      <MemoryRouter>
        <Blog blog={blog} user={blog.user} />
      </MemoryRouter>,
    );

    const element = screen.getByText("React patterns by Michael Chan");

    expect(element).toBeDefined();
  });

  // Test para comprobar que el boton de view funciona
  test("click view button and can see blog detail", async () => {
    const user = userEvent.setup();
    const component = render(
      <MemoryRouter>
        <Routes>
          <Route path="/blogs/:blogId" element={<BlogView blogs={blogs} />} />
          <Route path="/" element={<Blog blog={blog} user={blog.user} />} />
        </Routes>
      </MemoryRouter>,
    );
    await user.click(
      screen.getByRole("link", {
        name: /React patterns by Michael Chan/i,
      }),
    );
    const elementUrl = screen.getByText("https://reactpatterns.com");
    const elementLikes = screen.getByText("7");
    expect(elementUrl).toBeDefined();
    expect(elementLikes).toBeDefined();
  });

  test("click like button twice and likes will plus two", async () => {
    const user = userEvent.setup();
    const mockHandler = vi.fn();
    const component = render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/blogs/:blogId"
            element={
              <BlogView
                blogs={blogs}
                user={blog.user}
                handleLikeBlog={mockHandler}
              />
            }
          />
          <Route path="/" element={<Blog blog={blog} user={blog.user} />} />
        </Routes>
      </MemoryRouter>,
    );
    await user.click(
      screen.getByRole("link", {
        name: /React patterns by Michael Chan/i,
      }),
    );
    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
