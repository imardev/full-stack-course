import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com",
    likes: 7,
    user: {
      username: "mluukkai",
      name: "Matti Luukkainen",
    },
  };

  render(<Blog blog={blog} user={blog.user} />);

  const elementTitle = screen.getByText("React patterns");
  const elementAuthor = screen.getByText("Michael Chan");
  const elementUrl = screen.queryByText("https://reactpatterns.com");
  const elementLikes = screen.queryByText("7");
  elementUrl;
  expect(elementTitle).toBeDefined();
  expect(elementAuthor).toBeDefined();
  expect(elementUrl).not.toBeVisible();
  expect(elementLikes).not.toBeVisible();
});
