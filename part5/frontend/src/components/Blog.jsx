import { useState } from "react";

const Blog = ({ blog, handleLikeBlog, handleRemoveBlog, user }) => {
  const [visible, setVisible] = useState(false);

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
