import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const AuthForm = ({ isLogin = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { saveToken } = useContext(AuthContext);

  const handleEmail = (event) => setEmail(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reqBody = { email, password };
    console.log(import.meta.env.VITE_API_URL);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/${isLogin ? "login" : "signup"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reqBody),
        }
      );
      if (response.status === 201) {
        // The user was created successully
        navigate("/");
        console.log("signed up");
      }
      if (response.status === 200) {
        // The user was logged in successully
        navigate("/");
        const parsed = await response.json();
        console.log(parsed);
        saveToken(parsed.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input type="email" required value={email} onChange={handleEmail} />
      </label>
      <label>
        Password
        <input
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button type="submit">{isLogin ? "Login" : "Signup"}</button>
    </form>
  );
};

export default AuthForm;
