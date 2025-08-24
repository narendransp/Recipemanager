import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // LOGIN
        const { data } = await API.post("/auth/login", { email, password });
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.name);
        localStorage.setItem("userId", data.userId);
        navigate("/dashboard");
      } else {
        // REGISTER
        await API.post("/auth/register", { name, email, password });
        alert("Registered successfully! You can now log in.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        {/* Decorative Icon */}
        <div className="text-5xl mb-4">
          {isLogin ? "🍽️" : "👨‍🍳"}
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          {isLogin ? "Welcome Back" : "Join Us"}
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          {isLogin
            ? "Sign in to access your delicious recipe collection"
            : "Create an account to start building your recipe library"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <span className="mr-2">👤</span>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full focus:outline-none"
                required
              />
            </div>
          )}

          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <span className="mr-2">📧</span>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <span className="mr-2">🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white hover:text-black bg-black hover:bg-white  border border-black font-medium py-2 rounded-lg transition duration-200"
          >
            {isLogin ? " Sign In" : " Create Account"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="text-black font-medium cursor-pointer "
              >
                Register here
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setIsLogin(true)}
                className="text-black font-medium cursor-pointer "
              >
                Sign in here
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
