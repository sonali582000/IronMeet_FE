import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import styles from "../styles/signUp.module.css";

const AuthForm = ({ isLogin = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Add state for username

  const navigate = useNavigate();

  const { saveToken } = useContext(AuthContext);


  const handleEmail = (event) => setEmail(event.target.value);
  const handleUsername = (event) => setUsername(event.target.value); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reqBody = { email, password, username };
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
        navigate("/");
        console.log("signed up");
      }
      if (response.status === 200) {
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
    <form className={styles.signupForm} onSubmit={handleSubmit}>
      <label>
        Email
        <input
          className={styles.signupInput}
          type="email"
          required
          value={email}
          onChange={handleEmail}
        />
      </label>
      {!isLogin && (
        <label>
          Username
          <input
            className={styles.signupInput}
            type="text"
            required
            value={username}
            onChange={handleUsername}
          />
        </label>
      )}
      <label>
        Password
        <input
          className={styles.signupInput}
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button className={styles.signupButton} type="submit">
        {isLogin ? "Login" : "SignUp"}
      </button>
    </form>
  );
};

export default AuthForm;

