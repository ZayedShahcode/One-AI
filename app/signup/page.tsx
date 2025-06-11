"use client";

import NavBar from "../components/NavBar";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { HiEye, HiEyeSlash, HiUser, HiLockClosed, HiUserPlus } from "react-icons/hi2";
import { FiCheckCircle } from "react-icons/fi";
import Link from "next/link";

const SignUp = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user.username.trim() === "" || user.password.trim() === "") {
      toast.error("❌ Please fill all fields correctly.");
      return;
    }

    if (user.password.length < 6) {
      toast.error("❌ Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

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
      
      toast.success("🎉 Account created successfully! Please login to continue.");
      
      setUser({ username: "", password: "" });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      const message = (err as Error).message;
      toast.error(`❌ Sign up failed: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <NavBar />
      <div className="min-h-[90vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiUserPlus className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Join OneAI
            </h1>
            <p className="text-gray-600">Create your account and start your AI journey</p>
          </div>

          {/* Signup Form */}
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-gray-200">
            <form onSubmit={handleOnSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
                    placeholder="Choose a unique username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiLockClosed className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <HiEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <HiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">Must be at least 6 characters long</p>
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Creating account...
                  </>
                ) : (
                  <>
                    <FiCheckCircle size={18} />
                    Create Account
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8 space-y-3">
            <h3 className="text-center text-gray-700 font-semibold mb-4">What you'll get:</h3>
            <div className="grid gap-3">
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-gray-200">
                <div className="bg-green-100 p-2 rounded-lg">
                  <span className="text-lg">🤖</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Unlimited AI Conversations</p>
                  <p className="text-sm text-gray-600">Chat with our advanced AI assistant anytime</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-gray-200">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <span className="text-lg">📄</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">PDF Parser (Coming Soon)</p>
                  <p className="text-sm text-gray-600">Upload and analyze documents with AI</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-xl border border-gray-200">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <span className="text-lg">🔒</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Secure & Private</p>
                  <p className="text-sm text-gray-600">Your data is protected and encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default SignUp;
