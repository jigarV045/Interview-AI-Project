import { useState, useEffect } from "react";
import { useInterview } from "../hooks/useInterview";
import { Link, useParams } from "react-router";
import { Spinner } from "../../../components/UI";

const TABS = [
  { id: "technical", label: "Technical Questions", icon: "⚙️" },
  { id: "behavioral", label: "Behavioral Questions", icon: "🧠" },
  { id: "roadmap", label: "Prep Roadmap", icon: "🗺️" },
];

const SEVERITY = {
  low:    { label: "Low",    bg: "#f0fdf4", text: "#0e9f6e", border: "#bbf7d0", bar: "#0e9f6e", width: "30%" },
  medium: { label: "Medium", bg: "#fffbeb", text: "#c2570a", border: "#fde68a", bar: "#e3a008", width: "60%" },
  high:   { label: "High",   bg: "#fef2f2", text: "#e02424", border: "#fecaca", bar: "#e02424", width: "90%" },
};

function ScoreRing({ score }) {
  const r = 48;
  const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);

  useEffect(() => {
    const t = setTimeout(() => setOffset(circ - (score / 100) * circ), 400);
    return () => clearTimeout(t);
  }, [score, circ]);

  const color = score >= 75 ? "#0e9f6e" : score >= 50 ? "#e3a008" : "#e02424";
  const label = score >= 75 ? "Good Fit" : score >= 50 ? "Moderate Fit" : "Needs Work";
  const labelBg = score >= 75 ? "#f0fdf4" : score >= 50 ? "#fffbeb" : "#fef2f2";
  const labelBorder = score >= 75 ? "#bbf7d0" : score >= 50 ? "#fde68a" : "#fecaca";

  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="relative w-[120px] h-[120px]">
        <svg style={{ transform: "rotate(-90deg)", width: "100%", height: "100%" }} viewBox="0 0 112 112">
          <circle cx="56" cy="56" r={r} fill="none" stroke="var(--surface-3)" strokeWidth="7" />
          <circle
            cx="56" cy="56" r={r}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)", filter: `drop-shadow(0 0 4px ${color}60)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span style={{ color }} className="text-[26px] font-extrabold leading-none">{score}</span>
          <span className="text-[11px] text-[var(--text-muted)]">/ 100</span>
        </div>
      </div>
      <span
        style={{ color, background: labelBg, border: `1px solid ${labelBorder}` }}
        className="text-[12px] font-bold px-3 py-[3px] rounded-[20px]"
      >
        {label}
      </span>
    </div>
  );
}

function QuestionCard({ index, question, intention, answer, prefix, color }) {
  const [open, setOpen] = useState(false);
  const colors = {
    green: { bg: "#f0fdf4", text: "#0e9f6e", border: "#bbf7d0" },
    blue:  { bg: "#eff6ff", text: "#1a56db", border: "#bfdbfe" },
  };
  const c = colors[color] || colors.blue;

  return (
    <div
      style={{ border: `1px solid ${open ? c.border : "var(--border)"}` }}
      className="bg-[var(--surface)] rounded-[10px] mb-2.5 overflow-hidden transition-[border-color] duration-200 shadow-[var(--shadow-sm)]"
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start gap-3 px-[18px] py-3.5 bg-transparent border-none cursor-pointer text-left transition-[background] duration-150 hover:bg-[var(--surface-2)]"
      >
        <span
          style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
          className="text-[10px] font-bold px-2 py-[2px] rounded-[6px] tracking-[0.05em] whitespace-nowrap mt-[1px]"
        >
          {prefix} {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-[14px] font-medium text-[var(--text-primary)] leading-[1.55]">
          {question}
        </span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          className="shrink-0 mt-[2px] text-[var(--text-muted)] transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
        >
          <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: open ? 600 : 0 }}
      >
        <div className="border-t border-[var(--border)] p-[16px_18px] flex flex-col gap-3.5 bg-[var(--surface-2)]">
          {[
            { label: "Intention", content: intention },
            { label: "How to Answer", content: answer },
          ].map(({ label, content }) => (
            <div key={label} className="flex gap-3">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.05em] min-w-[80px] pt-[2px]">
                {label}
              </span>
              <p className="text-[13px] text-[var(--text-secondary)] leading-[1.65] flex-1">{content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillGap({ skill, severity }) {
  const s = SEVERITY[severity] || SEVERITY.medium;
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[13px] font-medium text-[var(--text-primary)]">{skill}</span>
        <span
          style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
          className="text-[10px] font-bold px-2 py-[2px] rounded-[20px] tracking-[0.04em] uppercase"
        >
          {s.label}
        </span>
      </div>
      <div className="h-[5px] bg-[var(--surface-3)] rounded-[10px] overflow-hidden">
        <div
          style={{ width: s.width, background: s.bar, transition: "width 1s cubic-bezier(0.22,1,0.36,1)" }}
          className="h-full rounded-[10px]"
        />
      </div>
    </div>
  );
}

function DayCard({ day, focus, tasks }) {
  return (
    <div className="flex gap-4 mb-4">
      <div className="flex flex-col items-center">
        <div className="w-9 h-9 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-[12px] font-bold shrink-0">
          {day}
        </div>
        <div className="w-px flex-1 bg-[var(--border)] mt-1.5" />
      </div>
      <div className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-[10px] p-[14px_16px] mb-1 shadow-[var(--shadow-sm)]">
        <p className="text-[14px] font-semibold text-[var(--text-primary)] mb-2.5">{focus}</p>
        <ul className="list-none flex flex-col gap-[7px]">
          {tasks.map((t, i) => (
            <li key={i} className="flex gap-2 items-start">
              <div className="w-[5px] h-[5px] rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
              <span className="text-[13px] text-[var(--text-secondary)] leading-[1.55]">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Interview() {
  const [activeTab, setActiveTab] = useState("technical");
  const { loading, report, getReportById, generateResume } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) getReportById(interviewId);
  }, [interviewId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-2)]">
      <div className="text-center">
        <Spinner size={36} />
        <p className="mt-3.5 text-[14px] text-[var(--text-muted)]">Loading your report...</p>
      </div>
    </div>
  );

  if (!report) return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-2)]">
      <div className="text-center">
        <div className="text-[40px] mb-4">🔍</div>
        <p className="text-[16px] font-semibold text-[var(--text-primary)] mb-2">Report not found</p>
        <Link to="/" className="text-[var(--primary)] no-underline text-[14px]">← Back to Dashboard</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--surface-2)] flex flex-col">

      {/* Header */}
      <header className="bg-[var(--surface)] border-b border-[var(--border)] px-6 h-14 flex items-center gap-4 sticky top-0 z-40 shadow-[var(--shadow-sm)]">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-[13px] text-[var(--text-secondary)] no-underline px-2.5 py-[5px] rounded-[6px] border border-[var(--border)] transition-all duration-150 hover:border-[var(--border-strong)]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Dashboard
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-[7px] h-[7px] rounded-full bg-[var(--success)]" />
          <span className="text-[14px] font-semibold text-[var(--text-primary)]">
            {report.title || "Interview Report"}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2.5">
          <span className="text-[11px] text-[var(--text-muted)] bg-[var(--surface-3)] px-2.5 py-[3px] rounded-[20px] border border-[var(--border)]">
            AI Generated
          </span>

          <button
            onClick={() => generateResume(interviewId)}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-[7px] bg-[var(--primary)] text-white border-none rounded-lg text-[13px] font-semibold"
            style={{ cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? <Spinner size={13} color="white" /> : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {loading ? "Generating..." : "Download Resume"}
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 56px)" }}>

        {/* Left sidebar */}
        <nav className="w-[220px] shrink-0 bg-[var(--surface)] border-r border-[var(--border)] p-[16px_12px] flex flex-col gap-1 overflow-y-auto">
          <p className="text-[10px] font-bold text-[var(--text-muted)] tracking-[0.08em] uppercase px-2 mb-2">
            Sections
          </p>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2.5 px-3 py-[9px] rounded-lg text-[13px] text-left transition-all duration-150 w-full cursor-pointer"
              style={{
                border: activeTab === tab.id ? "1px solid var(--border)" : "1px solid transparent",
                background: activeTab === tab.id ? "var(--primary-light)" : "none",
                color: activeTab === tab.id ? "var(--primary)" : "var(--text-secondary)",
                fontWeight: activeTab === tab.id ? 600 : 400,
              }}
            >
              <span className="text-[15px]">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-7 bg-[var(--surface-2)]">
          {activeTab === "technical" && (
            <div className="animate-fade-in">
              <h2 className="text-[20px] font-bold text-[var(--text-primary)] mb-1.5 tracking-[-0.3px]">Technical Questions</h2>
              <p className="text-[13px] text-[var(--text-muted)] mb-5">Click any question to reveal the interviewer's intention and a suggested answer.</p>
              {report.technicalQuestions?.map((q, i) => (
                <QuestionCard key={i} index={i} question={q.question} intention={q.intention} answer={q.answer} prefix="Q" color="green" />
              ))}
            </div>
          )}

          {activeTab === "behavioral" && (
            <div className="animate-fade-in">
              <h2 className="text-[20px] font-bold text-[var(--text-primary)] mb-1.5 tracking-[-0.3px]">Behavioral Questions</h2>
              <p className="text-[13px] text-[var(--text-muted)] mb-5">Click any question to reveal the interviewer's intention and a suggested answer.</p>
              {report.behavioralQuestions?.map((q, i) => (
                <QuestionCard key={i} index={i} question={q.question} intention={q.intention} answer={q.answer} prefix="B" color="blue" />
              ))}
            </div>
          )}

          {activeTab === "roadmap" && (
            <div className="animate-fade-in">
              <h2 className="text-[20px] font-bold text-[var(--text-primary)] mb-1.5 tracking-[-0.3px]">Preparation Roadmap</h2>
              <p className="text-[13px] text-[var(--text-muted)] mb-6">
                A {report.preparationPlan?.length}-day structured plan to get you interview-ready.
              </p>
              {report.preparationPlan?.map((day, i) => (
                <DayCard key={i} day={day.day} focus={day.focus} tasks={day.tasks} />
              ))}
            </div>
          )}
        </main>

        {/* Right panel */}
        <aside className="w-[240px] shrink-0 bg-[var(--surface)] border-l border-[var(--border)] p-[20px_16px] overflow-y-auto">
          <p className="text-[10px] font-bold text-[var(--text-muted)] tracking-[0.08em] uppercase mb-4">Match Score</p>
          <div className="flex justify-center mb-6">
            <ScoreRing score={report.matchScore} />
          </div>

          <div className="h-px bg-[var(--border)] mb-5" />

          <p className="text-[10px] font-bold text-[var(--text-muted)] tracking-[0.08em] uppercase mb-4">Skill Gaps</p>
          {report.skillGaps?.map((gap, i) => (
            <SkillGap key={i} skill={gap.skill} severity={gap.severity} />
          ))}
        </aside>
      </div>
    </div>
  );
}
