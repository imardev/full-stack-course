import { useState } from "react";
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
    <div>
      <div>
        <form onSubmit={submit}>
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
      </div>
    </div>
  );
}
