import { useState, useRef } from "react";
import Togglable from "./Togglable";
export default function BlogForm({ handleSubmit }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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
    togglableRef.current.toggleVisibility();
  };
  return (
    <Togglable buttonLabel="Show blog form" ref={togglableRef}>
      <form onSubmit={submit}>
        <label>
          Title:{" "}
          <input
            type="text"
            placeholder="Enter blog title"
            value={title}
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
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
        <br />
        <button type="submit">create</button>
      </form>
    </Togglable>
  );
}
