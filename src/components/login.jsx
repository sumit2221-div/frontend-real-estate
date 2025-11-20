import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authslice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  useEffect(() => {
    if (user) navigate("/profile"); // redirect after login
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        <h1 className="mb-6 text-3xl font-bold text-center">Login</h1>

        {error && (
          <p className="p-3 mb-4 text-center text-red-600 bg-red-100 rounded-lg">
            {error}
          </p>
        )}

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="p-3 text-white duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/registation" className="font-semibold text-blue-600">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
