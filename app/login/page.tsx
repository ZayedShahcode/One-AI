"use client";
import NavBar from "../components/NavBar";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {login } = useAuth();

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://oneai-backend.onrender.com/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json(); // expects { username, token }
      // console.log(data)
      login(data); // Call context login here
      toast.success("Login successful!");
      setTimeout(() => {
        router.push("/chat");
      },1000);
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Login
          </h1>
          <form onSubmit={handleOnSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-1"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 rounded-md transition duration-200"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            New here?{" "}
            <a href="/signup" className="text-yellow-600 hover:underline">
              Sign up now
            </a>
          </p>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </>
  );
};

export default Login;
