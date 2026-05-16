// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router";
import { useAuth } from "../features/authentication/hooks/useAuth";

export function Navbar() {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <nav className="bg-[var(--surface)] border-b border-[var(--border)] shadow-[var(--shadow-sm)] sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="no-underline flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-['DM_Serif_Display',serif] text-xl text-[var(--text-primary)] tracking-[-0.3px]">
            PrepIQ
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-[var(--text-secondary)]">
                Hi, <strong className="text-[var(--text-primary)]">{user.username}</strong>
              </span>
              <button
                onClick={onLogout}
                className="text-[13px] font-medium text-[var(--text-secondary)] bg-transparent border border-[var(--border)] rounded-lg px-3.5 py-1.5 cursor-pointer transition-all duration-150 hover:border-[var(--border-strong)]"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[13px] font-medium text-[var(--text-secondary)] no-underline px-3.5 py-1.5"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="text-[13px] font-semibold text-white no-underline bg-[var(--primary)] rounded-lg px-4 py-[7px] transition-[background] duration-150"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export function Spinner({ size = 20, color = "var(--primary)" }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `2px solid ${color}30`,
        borderTopColor: color,
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }}
    />
  );
}

export function Badge({ children, color = "blue" }) {
  const colors = {
    blue:   { bg: "#ebf2ff", text: "#1a56db", border: "#c7d9f8" },
    green:  { bg: "#f0fdf4", text: "#0e9f6e", border: "#bbf7d0" },
    orange: { bg: "#fff7ed", text: "#c2570a", border: "#fed7aa" },
    red:    { bg: "#fef2f2", text: "#e02424", border: "#fecaca" },
  };
  const c = colors[color] || colors.blue;
  return (
    <span
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
      className="text-[11px] font-semibold px-2 py-[2px] rounded-full tracking-[0.03em] uppercase"
    >
      {children}
    </span>
  );
}
