import { useState } from "react";
import { TextField, Button } from "@mui/material";
import "../css/loginForm.css";

export default function LoginForm({ handleSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (event) => {
    event.preventDefault();

    handleSubmit({
      username,
      password,
    });

    setUsername("");
    setPassword("");
  };
  return (
    <>
      <h1>Log in to application</h1>
      <form onSubmit={submit}>
        <TextField
          id="usernameInput"
          label="Username"
          variant="outlined"
          placeholder="John Doe"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          id="passwordInput"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button type="submit" variant="contained">
          login
        </Button>
      </form>
    </>
  );
}
