import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

describe("Blog form", () => {
  test("", async () => {
    const user = userEvent.setup();
    const createBlog = vi.fn();
    const component = render(<BlogForm handleSubmit={createBlog} />);

    await user.click(screen.getByRole("button", { name: /Show blog form/i }));
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
