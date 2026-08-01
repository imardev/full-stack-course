import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [status, setStatus] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      setStatus("success");
      setNotificationMessage("You have successfully logged in");
      setUser(user);
      setUsername("");
      setPassword("");
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

  const handleNewBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };

    try {
      if (!title || !author || !url) {
        setStatus("error");
        setNotificationMessage(`You must fill out all the fields`);
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
      setTitle("");
      setAuthor("");
      setUrl("");
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
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <label>
        Username
        <input
          type="text"
          placeholder="John Doe"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button type="submit">login</button>
    </form>
  );

  const addBlogForm = () => (
    <form onSubmit={handleNewBlog}>
      <label>
        Title:{" "}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </label>
      <br />
      <label>
        Author:{" "}
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </label>
      <br />
      <label>
        Url:{" "}
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </label>
      <br />
      <button type="submit">create</button>
    </form>
  );

  const blogsRender = () =>
    blogs.map((blog) => <Blog key={blog.id} blog={blog} />);

  const Notification = ({ message, status }) => {
    if (message == null) {
      return null;
    } else {
      return <div className={status}>{message}</div>;
    }
  };

  return (
    <div>
      <Notification message={notificationMessage} status={status} />
      {user && (
        <div>
          <p>
            <b>{user.username}</b> logged in
          </p>
        </div>
      )}

      <h2>blogs</h2>
      {!user && loginForm()}
      {user && addBlogForm()}
      {user && blogsRender()}
    </div>
  );
};

export default App;
