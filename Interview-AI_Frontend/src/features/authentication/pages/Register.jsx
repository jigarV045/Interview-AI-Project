import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "../../../components/UI";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    const success = await handleRegister({ username, email, password });
    if (success) navigate("/");
    else setError("Registration failed. This email or username may already be in use.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-2)] p-[40px_24px]">
      <div className="w-full max-w-[420px] animate-fade-up">

        {/* Logo */}
        <Link to="/" className="no-underline inline-flex items-center gap-2 mb-9">
          <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-['DM_Serif_Display',serif] text-xl text-[var(--text-primary)]">PrepIQ</span>
        </Link>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-8 shadow-[var(--shadow)]">
          <h1 className="text-[22px] font-bold text-[var(--text-primary)] mb-1.5 tracking-[-0.3px]">
            Create your account
          </h1>
          <p className="text-[13px] text-[var(--text-secondary)] mb-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[var(--primary)] no-underline font-medium">Sign in</Link>
          </p>

          {error && (
            <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg px-3.5 py-2.5 text-[13px] text-[var(--danger)] mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {[
              { label: "Username", type: "text", value: username, set: setUsername, placeholder: "johndoe" },
              { label: "Email address", type: "email", value: email, set: setEmail, placeholder: "you@example.com" },
              { label: "Password", type: "password", value: password, set: setPassword, placeholder: "Min. 6 characters" },
            ].map(({ label, type, value, set, placeholder }) => (
              <div key={label}>
                <label className="text-[13px] font-medium text-[var(--text-primary)] block mb-[5px]">
                  {label}
                </label>
                <input
                  type={type}
                  value={value}
                  onChange={e => set(e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-3.5 py-2.5 text-[14px] border border-[var(--border)] rounded-lg outline-none bg-[var(--surface)] text-[var(--text-primary)] transition-[border-color] duration-150 focus:border-[var(--primary)]"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-[11px] text-white border-none rounded-lg text-[14px] font-semibold flex items-center justify-center gap-2 mt-1.5"
              style={{ background: loading ? "#93aff5" : "var(--primary)", cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? <><Spinner size={16} color="white" /> Creating account...</> : "Create Account"}
            </button>
          </form>
        </div>

        <p className="text-[12px] text-[var(--text-muted)] text-center mt-[18px]">
          By creating an account you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
}
