import { useParams } from "react-router-dom";

const BlogView = ({
  blogs,
  handleLikeBlog,
  handleRemoveBlog,
  handleEditBlog,
  user,
}) => {
  let params = useParams();
  const idBlog = params.blogId;
  const blog = blogs.find((blog) => blog.id === idBlog);
  console.log(blog);
  if (!blog) {
    return "Loading...";
  }

  return (
    <main>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      {user && (
        <div className="likes">
          {blog.likes}
          <button
            onClick={() => {
              handleLikeBlog(blog);
            }}
          >
            like
          </button>
        </div>
      )}

      <p>Added by {blog.user.username}</p>
      {user && blog.user.username === user.username && (
        <button onClick={() => handleRemoveBlog(blog)}>remove</button>
      )}
    </main>
  );
};

export default BlogView;
