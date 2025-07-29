import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signInUser } = UserAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signInUser(email, password);
      if (result.success) {
        navigate("/Home");
      } else {
        setError("Login failed: " + result.error);
      }
    } catch (err) {
      console.error("Login exception:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='form-container'>
      <div className='formWrapper'>
        <span className="logo">ChatBrew</span>
        <span className="title">Login</span>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loading}>Sign In</button>
          {error && <p>{error}</p>}
        </form>
        <p>You don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
