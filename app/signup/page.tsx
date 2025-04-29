"use client";

import NavBar from "../components/NavBar";
import { useState, } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()


  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user.username.trim() === "" || user.password.trim() === "") {
      toast.error("Please fill all fields correctly.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://oneai-backend.onrender.com/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });

      if (!res.ok) {
        let errorMessage = "Something went wrong.";

        if (res.status === 409) {
          errorMessage = "Username already exists.";
        } else if (res.status === 500) {
          errorMessage = "Internal server error. Please try again later.";
        } else if (res.status === 400) {
          errorMessage = "Invalid request data.";
        }

        throw new Error(errorMessage);
      }

      const data = await res.json();
      
      toast.success("Sign up successful! Please Login");
      
      setUser({ username: "", password: "" });
      setTimeout(() => {
        router.push("/login");
      },1000);
    } catch (err) {
      const message = (err as Error).message;
      setError(message);
      toast.error(`Sign up failed: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center  px-4">
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Sign Up
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
                onChange={(e) =>
                  setUser({ ...user, username: e.target.value })
                }
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
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 rounded-md transition duration-200"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Already a user?{" "}
            <a
              href="/login"
              className="text-yellow-600 hover:underline font-medium"
            >
              Login here
            </a>
          </p>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </>
  );
};

export default SignUp;
