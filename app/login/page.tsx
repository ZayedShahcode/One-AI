"use client";
import NavBar from "../components/NavBar";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { HiEye, HiEyeSlash, HiUser, HiLockClosed } from "react-icons/hi2";
import { FiArrowRight, FiUserPlus } from "react-icons/fi";
import Link from "next/link";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`https://oneai-backend.onrender.com/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      login(data);
      toast.success("🎉 Welcome back! Login successful!");
      setTimeout(() => {
        router.push("/chat");
      }, 1000);
    } catch (err) {
      toast.error("❌ Invalid credentials. Please try again.");
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
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiUser className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to continue your AI journey</p>
          </div>

          {/* Login Form */}
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
                    placeholder="Enter your username"
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
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
                    placeholder="Enter your password"
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
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Login
                    <FiArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                New to OneAI?{" "}
                <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors">
                  Create an account
                </Link>
              </p>
            </div>
          </div>

          {/* Features Preview */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200">
              <div className="text-2xl mb-2">🤖</div>
              <p className="text-sm text-gray-600 font-medium">AI Assistant</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200">
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-sm text-gray-600 font-medium">Lightning Fast</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200">
              <div className="text-2xl mb-2">🔒</div>
              <p className="text-sm text-gray-600 font-medium">Secure</p>
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

export default Login;
