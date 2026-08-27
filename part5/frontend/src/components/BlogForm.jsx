import { useState, useRef } from "react";
import Togglable from "./Togglable";
import { useNavigate } from "react-router-dom";
export default function BlogForm({ handleSubmit }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const togglableRef = useRef();

  const submit = (event) => {
    event.preventDefault();

    handleSubmit({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
    navigate("/");
  };
  return (
    <form onSubmit={submit}>
      <label>
        Title:{" "}
        <input
          type="text"
          placeholder="Enter blog title"
          value={title}
          id="create-title"
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
          id="create-author"
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
          id="create-url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </label>
      <br />
      <button type="submit">create</button>
    </form>
  );
}
