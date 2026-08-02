import { useState } from "react";

const Blog = ({ blog, handleLikeBlog }) => {
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
          <p>
            {blog.title} {blog.author}
          </p>
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
        </div>
      </div>
    </>
  );
};

export default Blog;
