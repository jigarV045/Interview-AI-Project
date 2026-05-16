import { useState, useEffect } from "react";
import { useInterview } from "../hooks/useInterview";
import { Link, useParams } from "react-router";
import Navbar from "../../authentication/components/Navbar";
import toast from "react-hot-toast";

const TABS = [
    { id: "technical", label: "Technical", icon: "⚙️" },
    { id: "behavioral", label: "Behavioral", icon: "🧠" },
    { id: "roadmap", label: "Roadmap", icon: "🗺️" },
];

const TAB_ACTIVE_STYLES = {
    technical: "text-indigo-400 bg-indigo-950/40 border border-indigo-800",
    behavioral: "text-indigo-400 bg-indigo-950/40 border border-indigo-800",
    roadmap: "text-indigo-400 bg-indigo-950/40 border border-indigo-800",
};

const SEVERITY_CONFIG = {
    low: { badge: "text-emerald-400 bg-emerald-950/40 border border-emerald-800", barColor: "bg-emerald-500", barWidth: "w-1/3" },
    medium: { badge: "text-orange-400 bg-orange-950/40 border border-orange-800", barColor: "bg-orange-500", barWidth: "w-3/5" },
    high: { badge: "text-red-400 bg-red-950/40 border border-red-800", barColor: "bg-red-500", barWidth: "w-5/6" },
};

// ─── CIRCULAR MATCHSCORE RING ──────────────────────────────────────────────────
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
        <div className="flex flex-col items-center gap-2">
            <div className="relative w-28 h-28">
                <svg className="-rotate-90 w-full h-full" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r={r} fill="none" stroke="#1f2937" strokeWidth="8" />
                    <circle
                        cx="60" cy="60" r={r}
                        fill="none"
                        stroke="#4f46e5"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        style={{
                            transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)",
                        }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white leading-none">{score}%</span>
                </div>
            </div>
            <p className="text-xs font-semibold text-indigo-400 tracking-wide mt-1">{label}</p>
        </div>
    );
}

// ─── SKILL GAP CONTAINER ──────────────────────────────────────────────────────
function SkillGapItem({ skill, sub, severity }) {
    const cfg = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.medium;
    return (
        <div className="border-b border-gray-800/60 pb-3 last:border-none last:pb-0">
            <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-200 truncate">{skill}</p>
                    {sub && <p className="text-[11px] text-gray-500 truncate">{sub}</p>}
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${cfg.badge}`}>
                    {severity}
                </span>
            </div>
            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-1000 ${cfg.barColor} ${cfg.barWidth}`} />
            </div>
        </div>
    );
}

// ─── QUESTION SELECTION CARD ──────────────────────────────────────────────────
function QuestionCard({ index, question, intention, answer, prefix, openBorderClass }) {
    const [open, setOpen] = useState(false);

    return (
        <div className={`bg-[#161925] rounded-lg mb-3 overflow-hidden border transition-colors duration-150 ${open ? openBorderClass : "border-gray-800"}`}>
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-start gap-3 px-4 py-3.5 text-left hover:bg-gray-800/30 transition-colors"
            >
                <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-gray-800 border border-gray-700 text-gray-300 shrink-0 mt-0.5">
                    {prefix} {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-gray-200 leading-relaxed flex-1">{question}</span>
                <span className={`text-sm text-gray-500 shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
                    ▼
                </span>
            </button>

            <div
                className="transition-all duration-200 ease-in-out overflow-hidden"
                style={{ maxHeight: open ? "500px" : "0px" }}
            >
                <div className="border-t border-gray-800 bg-[#0f111a]/40 px-4 py-3.5 flex flex-col gap-2.5 text-xs">
                    <div className="flex gap-4 items-start">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 w-16 shrink-0 pt-0.5">Focus</span>
                        <p className="text-gray-400 leading-relaxed italic">{intention}</p>
                    </div>
                    <div className="flex gap-4 items-start">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 w-16 shrink-0 pt-0.5">Response</span>
                        <p className="text-gray-300 leading-relaxed">{answer}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── TIMELINE CARD (ROADMAP) ──────────────────────────────────────────────────
function DayCard({ day, focus, tasks }) {
    return (
        <div className="relative pl-6 mb-4 last:mb-0">
            <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-indigo-500 shadow-sm" />
            <div className="bg-[#161925] border border-gray-800 rounded-lg px-4 py-3.5">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-900 px-2 py-0.5 rounded">
                        Day {day}
                    </span>
                    <span className="text-xs font-semibold text-gray-200">{focus}</span>
                </div>
                <ul className="space-y-1.5">
                    {tasks.map((task, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full bg-gray-600 mt-1.5 shrink-0" />
                            <p className="text-xs text-gray-400 leading-relaxed">{task}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// ─── MAIN REPORT PAGE ────────────────────────────────────────────────────
export default function Interview() {
    const [activeTab, setActiveTab] = useState("technical");
    const { loading, report, getReportById, generateResume } = useInterview();
    const { interviewId } = useParams();
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        }
    }, [interviewId]);

    if (!report) {
        return (
            <div className="min-h-screen bg-[#0f111a] flex items-center justify-center">
                <p className="text-sm text-gray-500">No report file available.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f111a] text-gray-200 flex flex-col">
            <Navbar />

            {/* ── HEADER NAVIGATION ── */}
            <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#161925] border-b border-gray-800 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-indigo-500" />
                    <h1 className="text-sm font-bold uppercase tracking-wider">
                        <Link to="/dashboard" className="text-white hover:text-gray-300 transition">Interview Report</Link>
                    </h1>
                </div>
                <div className="text-[11px] text-gray-500 bg-[#0f111a] border border-gray-800 px-2.5 py-0.5 rounded-md">
                    Analysis Completed
                </div>
            </header>

            <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">

                {/* ── LEFT UTILITY PANEL (Flips layout fluidly on mobile viewports) ── */}
                <nav className="w-full lg:w-56 shrink-0 bg-[#161925] border-b lg:border-b-0 lg:border-r border-gray-800 flex p-3 sm:p-4">
                    <div className="flex flex-row lg:flex-col gap-1.5 w-full">
                        {/* 1. Category Tabs Loop */}
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center justify-center lg:justify-start gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors w-full
          ${activeTab === tab.id
                                        ? TAB_ACTIVE_STYLES[tab.id]
                                        : "text-gray-400 hover:text-white hover:bg-gray-800/50 border border-transparent"
                                    }`}
                            >
                                <span>{tab.icon}</span>
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}

                        {/* 2. Export Button with Isolated Inline Loading and Error Messaging */}
                        <button
                            disabled={isGenerating}
                            onClick={async () => {
                                setIsGenerating(true);
                                // We call your hook's method and wait for its true/false return
                                const success = await generateResume(interviewId);
                                setIsGenerating(false);

                                if (success) {
                                    toast.success("Resume downloaded successfully!");
                                } else {
                                    toast.error("Failed to generate resume. Please try again.");
                                }
                            }}
                            className="flex items-center justify-center lg:justify-start gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium border border-transparent bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all w-full disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? (
                                <>
                                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent group-hover:border-white" />
                                    <span className="hidden sm:inline">Generating...</span>
                                </>
                            ) : (
                                <>
                                    <span>📄</span>
                                    <span className="hidden sm:inline">Export Resume</span>
                                </>
                            )}
                        </button>
                    </div>
                </nav>

                {/* ── CORE QUESTION RUNTIME DISPLAY ── */}
                <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 bg-[#0f111a]">
                    {activeTab === "technical" && (
                        <div>
                            <h2 className="text-lg font-bold text-white tracking-tight">Technical Questions</h2>
                            <p className="text-xs text-gray-400 mt-0.5 mb-5">Select entries below to study expected responses and focus strategies.</p>
                            {report?.technicalQuestions?.map((q, i) => (
                                <QuestionCard
                                    key={i} index={i}
                                    question={q.question} intention={q.intention} answer={q.answer}
                                    prefix="Tech"
                                    openBorderClass="border-indigo-800"
                                />
                            ))}
                        </div>
                    )}

                    {activeTab === "behavioral" && (
                        <div>
                            <h2 className="text-lg font-bold text-white tracking-tight">Behavioral Evaluation</h2>
                            <p className="text-xs text-gray-400 mt-0.5 mb-5">Review scenario questions alongside targeted intent breakdowns.</p>
                            {report?.behavioralQuestions?.map((q, i) => (
                                <QuestionCard
                                    key={i} index={i}
                                    question={q.question} intention={q.intention} answer={q.answer}
                                    prefix="Behav"
                                    openBorderClass="border-indigo-800"
                                />
                            ))}
                        </div>
                    )}

                    {activeTab === "roadmap" && (
                        <div>
                            <h2 className="text-lg font-bold text-white tracking-tight">Preparation Roadmap</h2>
                            <p className="text-xs text-gray-400 mt-0.5 mb-5">Follow this organized task order sequence to build full alignment.</p>
                            <div className="relative ml-1 border-l border-gray-800 pt-1">
                                {report?.preparationPlan?.map((day, i) => (
                                    <DayCard key={i} day={day.day} focus={day.focus} tasks={day.tasks} />
                                ))}
                            </div>
                        </div>
                    )}
                </main>

                {/* ── RIGHT OVERVIEW METRICS PANEL ── */}
                <aside className="w-full lg:w-60 shrink-0 bg-[#161925] border-t lg:border-t-0 lg:border-l border-gray-800 flex flex-col sm:flex-row lg:flex-col gap-6 p-5 overflow-y-auto">
                    {/* Score section wrapper */}
                    <div className="flex-1 sm:flex sm:flex-col sm:items-center lg:block">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3 text-center sm:text-left lg:text-left">Match Evaluation</p>
                        <ScoreRing score={report?.matchScore} />
                    </div>

                    <div className="hidden lg:block h-px bg-gray-800" />

                    {/* Skill profile gap list wrapper */}
                    <div className="flex-[2] space-y-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Core Gaps Identified</p>
                        <div className="space-y-3.5">
                            {report?.skillGaps?.map((gap, i) => (
                                <SkillGapItem key={i} skill={gap.skill} sub={gap.sub} severity={gap.severity} />
                            ))}
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
}