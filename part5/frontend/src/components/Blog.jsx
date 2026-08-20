import { useState } from "react";
import Togglable from "./Togglable";

const Blog = ({
  blog,
  handleLikeBlog,
  handleRemoveBlog,
  user,
  handleEditBlog,
}) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState(blog.title);
  const [author, setAuthor] = useState(blog.author);
  const [url, setUrl] = useState(blog.url);
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const submit = (event) => {
    event.preventDefault();

    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    handleEditBlog(blog, newBlog);
  };
  return (
    <>
      <div style={blogStyle}>
        <div>
          <div className="info">
            <p>{blog.title}</p>
            <p>{blog.author}</p>
          </div>
          <button onClick={toggleVisible}>{visible ? "hide" : "view"}</button>
        </div>
        <div style={showWhenVisible} className="details">
          <p>{blog.url}</p>
          <div className="likes">
            {blog.likes}{" "}
            <button
              onClick={() => {
                handleLikeBlog(blog);
              }}
            >
              like
            </button>
          </div>
          <Togglable buttonLabel="edit">
            <form onSubmit={submit}>
              <label>
                Title:{" "}
                <input
                  type="text"
                  placeholder="Enter blog title"
                  value={title}
                  id="edit-title"
                  onChange={({ target }) => setTitle(target.value)}
                />
              </label>
              <br />
              <label>
                Author:{" "}
                <input
                  type="text"
                  placeholder="Enter blog name"
                  value={author}
                  id="edit-author"
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </label>
              <br />
              <label>
                Url:{" "}
                <input
                  type="text"
                  placeholder="Enter blog url"
                  value={url}
                  id="edit-url"
                  onChange={({ target }) => setUrl(target.value)}
                />
              </label>
              <br />
              <button type="submit">create</button>
            </form>
          </Togglable>
          <p>{blog.user.username}</p>
          {blog.user.username === user.username && (
            <button onClick={() => handleRemoveBlog(blog)}>remove</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
