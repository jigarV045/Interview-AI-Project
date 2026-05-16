import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "../../../components/UI";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    const success = await handleLogin({ email, password });
    if (success) navigate("/");
    else setError("Invalid email or password. Please try again.");
  };

  return (
    <div className="min-h-screen flex bg-[var(--surface-2)]">
      {/* Left panel */}
      <div className="flex-1 bg-[var(--primary)] flex-col justify-center p-[60px_48px] hidden md:flex">
        <div className="text-white max-w-[380px]">
          <div className="font-['DM_Serif_Display',serif] text-[36px] leading-[1.2] mb-5 tracking-[-0.5px]">
            Prepare smarter.<br />Interview with confidence.
          </div>
          <p className="text-[15px] opacity-80 leading-[1.65]">
            PrepIQ uses AI to generate a personalized interview report — tailored questions, skill gaps, and an optimized resume.
          </p>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex flex-col justify-center items-center p-[40px_24px] min-h-screen">
        <div className="w-full max-w-[400px] animate-fade-up">

          {/* Logo */}
          <Link to="/" className="no-underline inline-flex items-center gap-2 mb-9">
            <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-['DM_Serif_Display',serif] text-xl text-[var(--text-primary)]">PrepIQ</span>
          </Link>

          <h1 className="text-[26px] font-bold text-[var(--text-primary)] mb-1.5 tracking-[-0.4px]">
            Welcome back
          </h1>
          <p className="text-[14px] text-[var(--text-secondary)] mb-7">
            Don't have an account?{" "}
            <Link to="/register" className="text-[var(--primary)] no-underline font-medium">Sign up free</Link>
          </p>

          {error && (
            <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg px-3.5 py-2.5 text-[13px] text-[var(--danger)] mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 text-[14px] border border-[var(--border)] rounded-lg outline-none bg-[var(--surface)] text-[var(--text-primary)] transition-[border-color] duration-150 focus:border-[var(--primary)]"
              />
            </div>

            <div>
              <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3.5 py-2.5 text-[14px] border border-[var(--border)] rounded-lg outline-none bg-[var(--surface)] text-[var(--text-primary)] transition-[border-color] duration-150 focus:border-[var(--primary)]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-[11px] text-white border-none rounded-lg text-[14px] font-semibold flex items-center justify-center gap-2 mt-1 transition-[background] duration-150"
              style={{ background: loading ? "#93aff5" : "var(--primary)", cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? <><Spinner size={16} color="white" /> Signing in...</> : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
