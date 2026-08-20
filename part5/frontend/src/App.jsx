import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Button from "./components/Button";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // Funcion para el inicio de sesion
  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });
      localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setStatus("success");
      setNotificationMessage("You have successfully logged in");
      setUser(user);
      setTimeout(() => {
        setStatus(null);
        setNotificationMessage(null);
      }, 5000);
    } catch {
      setStatus("error");
      setNotificationMessage("wrong credentials");

      setTimeout(() => {
        setStatus(null);
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleLogOut = async () => {
    event.preventDefault();

    try {
      localStorage.removeItem("loggedBlogAppUser");
      setUser(null);
      blogService.setToken(null);
      setStatus("success");
      setNotificationMessage("You have successfully logged out");
      setTimeout(() => {
        setStatus(null);
        setNotificationMessage(null);
      }, 5000);
    } catch {
      setStatus("error");
      setNotificationMessage("Failed to log out");
      setTimeout(() => {
        setStatus(null);
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleLikeBlog = async (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog);
      setBlogs(
        blogs.map((likeBlog) => {
          if (likeBlog.id === blog.id) {
            return returnedBlog;
          }

          return likeBlog;
        }),
      );
      setStatus("success");
      setNotificationMessage(`Blog ${blog.title} liked successfully`);
      setTimeout(() => {
        setStatus(null);
        setNotificationMessage(null);
      }, 5000);
    } catch {
      setNotificationMessage("Failed to update blog");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleNewBlog = async ({ title, author, url }) => {
    const blogObject = {
      title,
      author,
      url,
    };

    try {
      if (!title || !author || !url) {
        setStatus("error");
        setNotificationMessage("You must fill out all the fields");
        setTimeout(() => {
          setStatus(null);
          setNotificationMessage(null);
        }, 5000);
        return;
      }
      const createdBlog = await blogService.create(blogObject);
      setBlogs([...blogs, createdBlog]);
      setStatus("success");
      setNotificationMessage(`A new blog ${title} by ${author} added`);
      setTimeout(() => {
        setStatus(null);
        setNotificationMessage(null);
      }, 5000);
    } catch {
      setNotificationMessage("Failed to create blog");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleEditBlog = async (blog, newBlog) => {
    const updatedBlog = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: blog.likes,
      user: blog.user.id,
    };

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog);
      setBlogs(
        blogs.map((blogUpdated) => {
          if (blogUpdated.id === blog.id) {
            return returnedBlog;
          }

          return blogUpdated;
        }),
      );
      setStatus("success");
      setNotificationMessage(`Blog ${blog.title} updated successfully`);
      setTimeout(() => {
        setStatus(null);
        setNotificationMessage(null);
      }, 5000);
    } catch {
      setNotificationMessage("Failed to update blog");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleRemoveBlog = async (blog) => {
    try {
      if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        return;
      }
      await blogService.remove(blog.id);
      setBlogs(blogs.filter((deleteBlog) => deleteBlog.id !== blog.id));
      setStatus("success");
      setNotificationMessage(`Blog ${blog.title} deleted successfully`);
      setTimeout(() => {
        setStatus(null);
        setNotificationMessage(null);
      }, 5000);
    } catch {
      setNotificationMessage("Failed to delete blog");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };
  const blogsRender = () => {
    const orderedBlogs = [...blogs];

    orderedBlogs.sort((a, b) => b.likes - a.likes);

    return orderedBlogs.map((blog) => (
      <Blog
        key={blog.id}
        handleLikeBlog={handleLikeBlog}
        handleRemoveBlog={handleRemoveBlog}
        blog={blog}
        user={user}
        handleEditBlog={handleEditBlog}
      />
    ));
  };

  return (
    <div>
      <Notification message={notificationMessage} status={status} />
      {user && (
        <>
          <div>
            <p>
              <b>{user.username}</b> logged in
            </p>
            <Button
              type="log out"
              text="Log out"
              handle={handleLogOut}
            ></Button>
          </div>
        </>
      )}
      {!user && <LoginForm handleSubmit={handleLogin} />}
      {user && <BlogForm handleSubmit={handleNewBlog} />}
      <h2>blogs</h2>

      {user && blogsRender()}
    </div>
  );
};

export default App;
