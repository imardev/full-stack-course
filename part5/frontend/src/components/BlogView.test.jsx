import { render, screen } from "@testing-library/react";
import BlogView from "./BlogView";
import userEvent from "@testing-library/user-event";

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

const statusBlogs = false;

describe("Blog view", () => {
  test("User not identifiy can see blog info", async () => {
    render(<BlogView blogs={blog} user={blog.user} status={statusBlogs} />);
    const elementTitle = screen.getByText("React patterns");
    expect(elementTitle).toBeDefined();
  });
});
