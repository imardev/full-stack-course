import { useState, useRef } from "react";
import { TextField, Button } from "@mui/material";
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
    <>
      <h1>Create new blog</h1>
      <form onSubmit={submit}>
        <TextField
          label="Title"
          variant="outlined"
          placeholder="Enter blog title"
          value={title}
          id="create-title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField
          label="Author"
          variant="outlined"
          placeholder="Enter blog name"
          value={author}
          id="create-author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField
          label="Url"
          variant="outlined"
          placeholder="Enter blog url"
          value={url}
          id="create-url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button type="submit" variant="contained">
          create
        </Button>
      </form>
    </>
  );
}
