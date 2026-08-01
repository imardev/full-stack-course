import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
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
          type="text"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button type="submit">login</button>
    </form>
  );

  const blogsRender = () =>
    blogs.map((blog) => <Blog key={blog.id} blog={blog} />);

  const Notification = ({ status, message }) => {
    if (message == null) {
      return null;
    } else {
      return <div className={status}>{message}</div>;
    }
  };

  return (
    <div>
      {user && (
        <div>
          <p>
            <b>{user.username}</b> logged in
          </p>
        </div>
      )}

      <h2>blogs</h2>
      {!user && loginForm()}
      {user && blogsRender()}
      <Notification message={errorMessage} status="error" />
    </div>
  );
};

export default App;
