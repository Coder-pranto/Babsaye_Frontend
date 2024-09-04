import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    //   toast.success("Registration successful");
      navigate("/login"); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
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
          Register
        </button>
      </form>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      <p className="text-center mt-4 text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
