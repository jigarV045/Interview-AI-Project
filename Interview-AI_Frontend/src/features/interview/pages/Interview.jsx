import { useState, useEffect } from "react";
import { useInterview } from "../hooks/useInterview";
import { Link, useParams } from "react-router";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
// Replace with your API call when integrating the backend.
// Shape matches your MongoDB document exactly.

// ─── TAB CONFIG ───────────────────────────────────────────────────────────────
const TABS = [
    { id: "technical", label: "Technical", icon: "⚙️" },
    { id: "behavioral", label: "Behavioral", icon: "🧠" },
    { id: "roadmap", label: "Roadmap", icon: "🗺️" },
];

const TAB_ACTIVE_STYLES = {
    technical: "text-emerald-400 bg-emerald-950 border border-emerald-700",
    behavioral: "text-sky-400 bg-sky-950 border border-sky-700",
    roadmap: "text-pink-400 bg-pink-950 border border-pink-700",
};

const SEVERITY_CONFIG = {
    low: { badge: "text-emerald-400 bg-emerald-950 border border-emerald-800", barColor: "bg-emerald-400", barWidth: "w-1/3" },
    medium: { badge: "text-orange-400 bg-orange-950 border border-orange-800", barColor: "bg-orange-400", barWidth: "w-3/5" },
    high: { badge: "text-red-400 bg-red-950 border border-red-800", barColor: "bg-red-400", barWidth: "w-5/6" },
};

// ─── SCORE RING ───────────────────────────────────────────────────────────────
function ScoreRing({ score }) {
    const r = 50;
    const circumference = 2 * Math.PI * r;
    const [offset, setOffset] = useState(circumference);

    useEffect(() => {
        const t = setTimeout(() => {
            setOffset(circumference - (score / 100) * circumference);
        }, 300);
        return () => clearTimeout(t);
    }, [score, circumference]);

    const label = score >= 90 ? "Excellent Fit" : score >= 75 ? "Good Fit" : "Needs Work";

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative w-32 h-32">
                <svg className="-rotate-90 w-full h-full" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r={r} fill="none" stroke="#1e293b" strokeWidth="8" />
                    <circle
                        cx="60" cy="60" r={r}
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        style={{
                            transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)",
                            filter: "drop-shadow(0 0 6px #34d399)",
                        }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-emerald-400 leading-none">{score}</span>
                    <span className="text-xs text-slate-500 font-medium">/ 100</span>
                </div>
            </div>
            <p className="text-sm font-bold text-emerald-400 tracking-wide">{label}</p>
            <p className="text-xs text-slate-500 text-center leading-relaxed font-light">
                Candidate aligns strongly with the role requirements.
            </p>
        </div>
    );
}

// ─── SKILL GAP ITEM ───────────────────────────────────────────────────────────
function SkillGapItem({ skill, sub, severity }) {
    const cfg = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.medium;
    return (
        <div className="mb-4">
            <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                    <p className="text-sm font-medium text-slate-200 leading-snug">{skill}</p>
                    {sub && <p className="text-xs text-slate-500">{sub}</p>}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full whitespace-nowrap ${cfg.badge}`}>
                    {severity}
                </span>
            </div>
            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-1000 ${cfg.barColor} ${cfg.barWidth}`} />
            </div>
        </div>
    );
}

// ─── QUESTION ACCORDION CARD ─────────────────────────────────────────────────
function QuestionCard({ index, question, intention, answer, prefix, accentClass, openBorderClass }) {
    const [open, setOpen] = useState(false);

    const chevronColor = accentClass.includes("emerald")
        ? "text-emerald-400"
        : "text-sky-400";

    return (
        <div
            className={`bg-slate-900 rounded-2xl mb-3 overflow-hidden border transition-colors duration-200 
        ${open ? openBorderClass : "border-slate-800"}`}
        >
            {/* Question trigger */}
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-slate-800/40 transition-colors duration-150"
            >
                <span className={`text-[11px] font-bold tracking-wider px-2 py-0.5 rounded-md shrink-0 mt-0.5 border ${accentClass}`}>
                    {prefix} {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-slate-100 leading-relaxed flex-1">{question}</span>
                <span
                    className={`text-lg shrink-0 mt-0.5 transition-transform duration-300 ${chevronColor}`}
                    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                    ⌄
                </span>
            </button>

            {/* Collapsible detail */}
            <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: open ? "500px" : "0px" }}
            >
                <div className="border-t border-slate-800 px-5 py-4 flex flex-col gap-3">
                    <div className="flex gap-3 items-start">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 w-20 shrink-0 pt-0.5">
                            Intention
                        </span>
                        <p className="text-xs text-slate-400 leading-relaxed italic font-light">{intention}</p>
                    </div>
                    <div className="flex gap-3 items-start">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 w-20 shrink-0 pt-0.5">
                            Answer
                        </span>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">{answer}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── DAY CARD (ROADMAP) ───────────────────────────────────────────────────────
function DayCard({ day, focus, tasks }) {
    return (
        <div className="relative pl-7 mb-5">
            {/* Dot on timeline */}
            <div
                className="absolute left-0 top-4.5 w-3 h-3 rounded-full border-2 border-slate-950 bg-pink-500"
                style={{ boxShadow: "0 0 8px #ec4899" }}
            />
            <div className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 hover:border-pink-900 transition-colors duration-200">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-pink-400 bg-pink-950 border border-pink-900 px-2.5 py-0.5 rounded-md">
                        Day {day}
                    </span>
                    <span className="text-sm font-semibold text-slate-100">{focus}</span>
                </div>
                <ul className="flex flex-col gap-2">
                    {tasks.map((task, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-pink-500 opacity-60 mt-1.5 shrink-0" />
                            <p className="text-xs text-slate-400 leading-relaxed font-light">{task}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
// ┌─ HOW TO INTEGRATE BACKEND ──────────────────────────────────────────────┐
// │  Option 1 — fetch inside a parent page and pass as prop:               │
// │    const [data, setData] = useState(null);                              │
// │    useEffect(() => {                                                     │
// │      fetch(`/api/interview-report/${id}`)                               │
// │        .then(r => r.json()).then(setData);                             │
// │    }, [id]);                                                             │
// │    return <InterviewReport report={data} loading={!data} />;           │
// │                                                                          │
// │  Option 2 — fetch inside this component directly:                       │
// │    Add your own useEffect + useState here at the top, then             │
// │    remove the propReport fallback to MOCK_REPORT.                      │
// └─────────────────────────────────────────────────────────────────────────┘
export default function Interview() {
    const [activeTab, setActiveTab] = useState("technical");
    const { loading, report, getReportById, generateResume } = useInterview();

    const { interviewId } = useParams();
    // const report = propReport || MOCK_REPORT;

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        }
    }, [interviewId]);

    // ── Loading state ──
    // if (loading ) {
    //     return (
    //         <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    //             <div className="flex flex-col items-center gap-3">
    //                 <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
    //                 <p className="text-sm text-slate-500">Loading report...</p>
    //             </div>
    //         </div>
    //     );
    // }
    if (!report) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <p className="text-sm text-slate-500">No report found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">

            {/* ── HEADER ── */}
            <header className="flex items-center gap-3 px-7 py-3.5 bg-slate-900 border-b border-slate-800 shrink-0">
                <div
                    className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"
                    style={{ boxShadow: "0 0 10px #34d399" }}
                />
                <h1 className="text-sm font-bold uppercase tracking-widest">
                    <Link to="/">Interview Report</Link>
                </h1>
                <div className="ml-auto text-[11px] text-slate-500 border border-slate-700 px-3 py-1 rounded-full">
                    AI Generated
                </div>
            </header>

            {/* ── BODY (fills remaining viewport height) ── */}
            <div className="flex flex-1 overflow-hidden">

                {/* ── LEFT NAV ── */}
                <nav className="w-58 shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col gap-1.5 p-4">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-2 pb-2.5 border-b border-slate-800 mb-1">
                            Sections
                        </p>
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left w-full transition-all duration-200
                ${activeTab === tab.id
                                        ? TAB_ACTIVE_STYLES[tab.id]
                                        : "text-slate-500 hover:text-slate-300 hover:bg-slate-800 border border-transparent"
                                    }`}
                            >
                                <span className="text-base leading-none">{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => generateResume(interviewId)}
                        className="flex items-center bg-blue-600 gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left w-full transition-all duration-200 text-slate-100 hover:text-white hover:bg-blue-500 border border-transparent"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Generating...
                            </span>
                        ) : "Generate Resume"}
                    </button>
                </nav>

                {/* ── CENTER ── */}
                <main className="flex-1 overflow-y-auto px-8 py-7 bg-slate-950">

                    {activeTab === "technical" && (
                        <div>
                            <h2 className="text-xl font-black text-slate-100 mb-1 tracking-tight">Technical Questions</h2>
                            <p className="text-xs text-slate-500 font-light mb-6">
                                Click a question to reveal the intention and expected answer.
                            </p>
                            {report?.technicalQuestions.map((q, i) => (
                                <QuestionCard
                                    key={i} index={i}
                                    question={q.question} intention={q.intention} answer={q.answer}
                                    prefix="Q"
                                    accentClass="text-emerald-400 bg-emerald-950 border-emerald-800"
                                    openBorderClass="border-emerald-800"
                                />
                            ))}
                        </div>
                    )}

                    {activeTab === "behavioral" && (
                        <div>
                            <h2 className="text-xl font-black text-slate-100 mb-1 tracking-tight">Behavioral Questions</h2>
                            <p className="text-xs text-slate-500 font-light mb-6">
                                Click a question to reveal the intention and expected answer.
                            </p>
                            {report?.behavioralQuestions.map((q, i) => (
                                <QuestionCard
                                    key={i} index={i}
                                    question={q.question} intention={q.intention} answer={q.answer}
                                    prefix="B"
                                    accentClass="text-sky-400 bg-sky-950 border-sky-800"
                                    openBorderClass="border-sky-800"
                                />
                            ))}
                        </div>
                    )}

                    {activeTab === "roadmap" && (
                        <div>
                            <h2 className="text-xl font-black text-slate-100 mb-1 tracking-tight">Preparation Roadmap</h2>
                            <p className="text-xs text-slate-500 font-light mb-6">
                                A {report?.preparationPlan.length}-day structured plan to maximize interview readiness.
                            </p>
                            <div className="relative ml-1">
                                {/* Vertical timeline line */}
                                <div className="absolute left-1.25 top-4 bottom-4 w-0.5 bg-linear-to-b from-pink-500 to-purple-800 rounded-full" />
                                {report?.preparationPlan.map((day, i) => (
                                    <DayCard key={i} day={day.day} focus={day.focus} tasks={day.tasks} />
                                ))}
                            </div>
                        </div>
                    )}

                </main>

                {/* ── RIGHT PANEL ── */}
                <aside className="w-56 shrink-0 bg-slate-900 border-l border-slate-800 flex flex-col gap-6 p-5 overflow-y-auto">

                    {/* Match Score */}
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Match Score</p>
                        <ScoreRing score={report?.matchScore} />
                    </div>

                    <div className="h-px bg-slate-800" />

                    {/* Skill Gaps */}
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Skill Gaps</p>
                        {report?.skillGaps.map((gap, i) => (
                            <SkillGapItem key={i} skill={gap.skill} sub={gap.sub} severity={gap.severity} />
                        ))}
                    </div>

                </aside>
            </div>
        </div>
    );
}