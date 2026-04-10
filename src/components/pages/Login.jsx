import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/auth/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setCredential((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = credential.email.trim();
    const password = credential.password;

    if (!email || !password) {
      toast.error("⚠️ Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);

      const resp = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await resp.json();

      // ✅ handle backend errors
      if (!resp.ok) {
        toast.error(data?.message || data?.error || "Invalid credentials.");
        return;
      }

      // ✅ must have token
      if (!data?.authToken) {
        toast.error("Login failed: token not returned from server.");
        return;
      }

      // ✅ IMPORTANT: store with same key everywhere
      localStorage.setItem("token", data.authToken);

      // ✅ update AuthContext (your context can also store user later)
      login(data.authToken, data.user);

      toast.success("Login successful!");

      // ✅ optional redirect based on role
      if (data?.user?.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("⚠️ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-600 mt-1">Sign in to access your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Email
              </label>
              <div className="relative mt-2">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={credential.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative mt-2">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPwd ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={credential.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPwd ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

          
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" disabled />
                Remember me
              </label>
              <Link to="#" className="text-blue-600 hover:text-blue-700">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gray-900 text-white py-3 font-semibold hover:bg-black transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>

        <div className="text-center mt-5 text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-700">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
