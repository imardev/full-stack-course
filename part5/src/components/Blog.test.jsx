import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

// Declaración del blog
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

describe("Blog", () => {
  // Test para comprobar render de la nota
  test("renders content", () => {
    render(<Blog blog={blog} user={blog.user} />);

    const elementTitle = screen.getByText("React patterns");
    const elementAuthor = screen.getByText("Michael Chan");
    const elementUrl = screen.queryByText("https://reactpatterns.com");
    const elementLikes = screen.queryByText("7");

    expect(elementTitle).toBeDefined();
    expect(elementAuthor).toBeDefined();
    expect(elementUrl).not.toBeVisible();
    expect(elementLikes).not.toBeVisible();
  });

  // Test para comprobar que el boton de view funciona
  test("click view button and can see blog detail", async () => {
    const user = userEvent.setup();
    const component = render(<Blog blog={blog} user={blog.user} />);
    await user.click(screen.getByRole("button", { name: /view/i }));
    const elementUrl = screen.getByText("https://reactpatterns.com");
    const elementLikes = screen.getByText("7");
    expect(elementUrl).toBeDefined();
    expect(elementLikes).toBeDefined();
  });
});
