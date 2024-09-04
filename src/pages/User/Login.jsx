import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showReset, setShowReset] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset email sent");
      setResetEmail("");
      setShowReset(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setShowReset(!showReset)}
          className="text-blue-500 hover:underline"
        >
          Forgot Password?
        </button>
        <Link to="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </div>
      {showReset && (
        <form onSubmit={handleResetPassword} className="mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          >
            Reset Password
          </button>
        </form>
      )}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default Login;
