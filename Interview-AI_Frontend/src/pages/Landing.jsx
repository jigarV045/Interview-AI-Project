import { Link } from "react-router";
import { Navbar } from "../components/UI";

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Tailored Interview Questions",
    desc: "Get technical and behavioral questions crafted specifically for your target role and resume — with intentions and model answers.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Skill Gap Analysis",
    desc: "Instantly see which skills you're missing for the job — ranked by severity so you know exactly where to focus your prep.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "AI-Optimized Resume",
    desc: "Download a rewritten, ATS-friendly resume tailored to your target job description — ready to send in minutes.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Day-by-Day Prep Plan",
    desc: "Follow a structured preparation roadmap built around your gaps — so every day of study counts toward interview success.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Report History",
    desc: "Every report is saved to your account. Review past analyses, track your match scores over time, and see how far you've come.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Instant AI Analysis",
    desc: "Powered by Gemini AI — your full interview report is generated in under 30 seconds, with no waiting and no templates.",
  },
];

const steps = [
  { num: "01", title: "Upload your details", desc: "Paste the job description, upload your resume PDF, and write a short self-description." },
  { num: "02", title: "AI generates your report", desc: "Gemini AI analyzes your profile against the role and produces a comprehensive interview report." },
  { num: "03", title: "Prepare & download", desc: "Review your questions, fix skill gaps, follow your roadmap, and download your improved resume." },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-[var(--surface-2)]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[var(--surface)] border-b border-[var(--border)] px-6 pt-20 pb-[90px] text-center">
        <div className="max-w-[700px] mx-auto animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-[var(--primary-light)] border border-[#c7d9f8] rounded-[20px] px-3.5 py-[5px] text-[12px] font-semibold text-[var(--primary)] mb-7 tracking-[0.04em]">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
            AI-POWERED INTERVIEW PREPARATION
          </div>

          <h1 className="font-['DM_Serif_Display',serif] text-[clamp(36px,6vw,58px)] leading-[1.12] text-[var(--text-primary)] tracking-[-1px] mb-[22px]">
            Walk into every interview<br />
            <span className="text-[var(--primary)]">fully prepared.</span>
          </h1>

          <p className="text-[17px] text-[var(--text-secondary)] leading-[1.65] max-w-[520px] mx-auto mb-[38px]">
            PrepIQ analyzes your resume against any job description and generates a personalized interview report — questions, skill gaps, roadmap, and an optimized resume.
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-[var(--primary)] text-white no-underline px-7 py-[13px] rounded-[10px] font-semibold text-[15px] shadow-[0_4px_14px_rgba(26,86,219,0.35)] transition-all duration-150"
            >
              Get Started Free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center text-[var(--text-secondary)] no-underline px-7 py-[13px] rounded-[10px] font-medium text-[15px] border border-[var(--border)] bg-[var(--surface)]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--primary)] py-7 px-6">
        <div className="max-w-[900px] mx-auto flex justify-center gap-[clamp(32px,8vw,80px)] flex-wrap">
          {[
            { value: "30s", label: "Report generation time" },
            { value: "AI", label: "Powered by Gemini" },
            { value: "100%", label: "Personalized to your role" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-[28px] font-bold text-white font-['DM_Serif_Display',serif]">{s.value}</div>
              <div className="text-[13px] text-white/70 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 max-w-[1100px] mx-auto">
        <div className="text-center mb-[52px]">
          <h2 className="font-['DM_Serif_Display',serif] text-[clamp(28px,4vw,40px)] text-[var(--text-primary)] tracking-[-0.5px] mb-3.5">
            Everything you need to land the job
          </h2>
          <p className="text-[16px] text-[var(--text-secondary)] max-w-[500px] mx-auto">
            One report. Everything from prep questions to an improved resume.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="animate-fade-up bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-[28px_26px] shadow-[var(--shadow-sm)] transition-[box-shadow,transform] duration-200 hover:shadow-[var(--shadow)] hover:-translate-y-0.5"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="w-11 h-11 bg-[var(--primary-light)] rounded-[10px] flex items-center justify-center text-[var(--primary)] mb-4">
                {f.icon}
              </div>
              <h3 className="text-[16px] font-semibold text-[var(--text-primary)] mb-2">{f.title}</h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[var(--surface)] border-t border-b border-[var(--border)] py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-[52px]">
            <h2 className="font-['DM_Serif_Display',serif] text-[clamp(28px,4vw,40px)] text-[var(--text-primary)] tracking-[-0.5px] mb-3.5">
              How it works
            </h2>
            <p className="text-[16px] text-[var(--text-secondary)]">Three steps to interview confidence.</p>
          </div>

          <div className="flex flex-col gap-0">
            {steps.map((s, i) => (
              <div
                key={i}
                className="flex gap-7 items-start py-7"
                style={{ borderBottom: i < steps.length - 1 ? "1px solid var(--border)" : "none" }}
              >
                <div className="font-['DM_Serif_Display',serif] text-[42px] text-[var(--border-strong)] leading-none min-w-[56px] tracking-[-1px]">
                  {s.num}
                </div>
                <div>
                  <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mb-2">{s.title}</h3>
                  <p className="text-[14px] text-[var(--text-secondary)] leading-[1.65]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-[540px] mx-auto">
          <h2 className="font-['DM_Serif_Display',serif] text-[clamp(28px,4vw,40px)] text-[var(--text-primary)] tracking-[-0.5px] mb-4">
            Ready to ace your next interview?
          </h2>
          <p className="text-[16px] text-[var(--text-secondary)] mb-8">
            Join candidates who use PrepIQ to prepare smarter and interview with confidence.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-[var(--primary)] text-white no-underline px-8 py-3.5 rounded-[10px] font-semibold text-[15px] shadow-[0_4px_14px_rgba(26,86,219,0.3)]"
          >
            Start for Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--surface)] border-t border-[var(--border)] p-6 text-center">
        <p className="text-[13px] text-[var(--text-muted)]">
          © 2025 PrepIQ · Built with React + Node.js + Gemini AI
        </p>
      </footer>
    </div>
  );
}
