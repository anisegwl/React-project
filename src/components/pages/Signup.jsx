import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredential((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = credential.name.trim();
    const email = credential.email.trim();
    const password = credential.password;

    if (!name || !email || !password) {
      toast.error("⚠️ All fields are required");
      return;
    }
    if (password.length < 5) {
      toast.error("🔑 Password must be at least 5 characters");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.authToken) {
        toast.error(data.message || "❌ Signup failed");
        return;
      }

      localStorage.setItem("token", data.authToken);
      toast.success("✅ Account created successfully");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("🚨 Server error. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT SIDE (Brand / Info) */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet-500/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="relative flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-slate-900 font-extrabold text-xl">
              F
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg">Fitify</h2>
              <p className="text-white/70 text-sm">Start your journey today</p>
            </div>
          </div>

          <div className="relative mt-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Create your account
            </h1>
            <p className="mt-3 text-white/75 leading-relaxed max-w-md">
              Track progress, stay consistent, and level up your fitness with a clean dashboard.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-white/85">
                ⚡ Fast
              </span>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-white/85">
                🔒 Secure
              </span>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-white/85">
                📈 Progress
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (Form) */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <div>
            <h3 className="text-white text-2xl font-semibold">Sign up</h3>
            <p className="mt-1 text-white/70 text-sm">
              Fill in your details to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Name */}
            <div>
              <label className="text-white/80 text-sm">Full name</label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 focus-within:ring-4 focus-within:ring-violet-500/20 focus-within:border-violet-400/50 transition">
                <FaUser className="text-white/70" />
                <input
                  type="text"
                  name="name"
                  value={credential.name}
                  onChange={handleChange}
                  placeholder="e.g. Biraj Shrestha"
                  autoComplete="name"
                  className="w-full bg-transparent outline-none text-white placeholder:text-white/35"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-white/80 text-sm">Email</label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 focus-within:ring-4 focus-within:ring-violet-500/20 focus-within:border-violet-400/50 transition">
                <FaEnvelope className="text-white/70" />
                <input
                  type="email"
                  name="email"
                  value={credential.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full bg-transparent outline-none text-white placeholder:text-white/35"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-white/80 text-sm">Password</label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 focus-within:ring-4 focus-within:ring-violet-500/20 focus-within:border-violet-400/50 transition">
                <FaLock className="text-white/70" />
                <input
                  type={showPwd ? "text" : "password"}
                  name="password"
                  value={credential.password}
                  onChange={handleChange}
                  placeholder="Minimum 5 characters"
                  autoComplete="new-password"
                  className="w-full bg-transparent outline-none text-white placeholder:text-white/35"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="text-white/80 hover:text-white transition"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 text-slate-900 font-bold py-3 shadow-lg shadow-violet-500/20 hover:brightness-110 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create account"}
            </button>

            {/* Terms */}
            <p className="text-xs text-white/70 leading-relaxed">
              By signing up, you agree to our{" "}
              <Link to="#" className="text-white underline underline-offset-4">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="#" className="text-white underline underline-offset-4">
                Privacy Policy
              </Link>
              .
            </p>

            {/* Footer */}
            <p className="text-sm text-white/80">
              Already have an account?{" "}
              <Link to="/login" className="text-white font-semibold underline underline-offset-4">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
