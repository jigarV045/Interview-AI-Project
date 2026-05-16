import { useState, useRef } from "react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";
import { useAuth } from "../../authentication/hooks/useAuth";
import { Navbar, Spinner } from "../../../components/UI";

export default function Home() {
  const { loading, generateReport, reports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState("");
  const resumeInputRef = useRef();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    if (!jobDescription.trim()) { alert("Please enter the job description."); return; }
    if (!resumeFile) { alert("Please upload your resume."); return; }
    if (!selfDescription.trim()) { alert("Please add a self description."); return; }
    const data = await generateReport({ jobDescription, resumeFile, selfDescription });
    if (!data) return;
    navigate(`/interview/${data._id}`);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      const dt = new DataTransfer();
      dt.items.add(file);
      resumeInputRef.current.files = dt.files;
      setFileName(file.name);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface-2)]">
      <Navbar />

      <div className="max-w-[1100px] mx-auto p-[40px_24px]">

        {/* Header */}
        <div className="animate-fade-up mb-8">
          <h1 className="font-['DM_Serif_Display',serif] text-[clamp(26px,4vw,36px)] text-[var(--text-primary)] tracking-[-0.5px] mb-2">
            Hello, {user?.username} 👋
          </h1>
          <p className="text-[15px] text-[var(--text-secondary)]">
            Generate a personalized interview report by filling in the details below.
          </p>
        </div>

        {/* Main card */}
        <div className="animate-fade-up delay-100 bg-[var(--surface)] border border-[var(--border)] rounded-[16px] shadow-[var(--shadow)] overflow-hidden mb-10">

          {/* Card header */}
          <div className="px-6 py-[18px] border-b border-[var(--border)] flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[var(--primary)] shadow-[0_0_0_3px_var(--primary-light)]" />
            <span className="text-[14px] font-semibold text-[var(--text-primary)]">New Interview Report</span>
            <span className="ml-auto text-[12px] text-[var(--text-muted)] bg-[var(--surface-3)] px-2.5 py-[3px] rounded-[20px] border border-[var(--border)]">
              AI Powered
            </span>
          </div>

          {/* Input area */}
          <div className="grid grid-cols-2 min-h-[380px]">

            {/* Left - Job Description */}
            <div className="border-r border-[var(--border)] p-6 flex flex-col gap-2.5">
              <label className="text-[13px] font-semibold text-[var(--text-primary)]">
                Target Job Description
                <span className="text-[var(--danger)] ml-0.5">*</span>
              </label>
              <p className="text-[12px] text-[var(--text-muted)]">Paste the full job posting including requirements</p>
              <textarea
                onChange={e => setJobDescription(e.target.value)}
                placeholder={"Paste the job description here...\n\nInclude: role requirements, responsibilities, skills needed, company info, etc."}
                className="flex-1 resize-none border border-[var(--border)] rounded-[10px] p-3.5 text-[13px] leading-[1.65] text-[var(--text-primary)] outline-none bg-[var(--surface-2)] min-h-[280px] transition-[border-color] duration-150 font-['DM_Sans',sans-serif] focus:border-[var(--primary)]"
              />
            </div>

            {/* Right - Resume + Self Desc */}
            <div className="p-6 flex flex-col gap-5">
              {/* Resume upload */}
              <div>
                <label className="text-[13px] font-semibold text-[var(--text-primary)] block mb-1">
                  Resume (PDF)
                  <span className="text-[var(--danger)] ml-0.5">*</span>
                </label>
                <p className="text-[12px] text-[var(--text-muted)] mb-2.5">Upload your current resume in PDF format</p>
                <div
                  onClick={() => resumeInputRef.current.click()}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className="rounded-[10px] p-5 text-center cursor-pointer transition-all duration-150"
                  style={{
                    border: `2px dashed ${dragOver ? "var(--primary)" : "var(--border)"}`,
                    background: dragOver ? "var(--primary-light)" : "var(--surface-2)",
                  }}
                >
                  <input
                    ref={resumeInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {fileName ? (
                    <div>
                      <div className="text-[22px] mb-1.5">📄</div>
                      <p className="text-[13px] font-medium text-[var(--primary)]">{fileName}</p>
                      <p className="text-[11px] text-[var(--text-muted)] mt-1">Click to change</p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-[22px] mb-1.5">☁️</div>
                      <p className="text-[13px] font-medium text-[var(--text-secondary)]">Drop your PDF here or click to browse</p>
                      <p className="text-[11px] text-[var(--text-muted)] mt-1">PDF files only</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Self description */}
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-[var(--text-primary)]">
                  Self Description
                  <span className="text-[var(--danger)] ml-0.5">*</span>
                </label>
                <p className="text-[12px] text-[var(--text-muted)]">Briefly describe yourself, your goals, and background</p>
                <textarea
                  onChange={e => setSelfDescription(e.target.value)}
                  placeholder="e.g. I'm a final-year CS student with internship experience in React and Node.js. I'm looking for a full-stack developer role..."
                  className="flex-1 resize-none border border-[var(--border)] rounded-[10px] p-3.5 text-[13px] leading-[1.65] text-[var(--text-primary)] outline-none bg-[var(--surface-2)] min-h-[130px] transition-[border-color] duration-150 font-['DM_Sans',sans-serif] focus:border-[var(--primary)]"
                />
              </div>
            </div>
          </div>

          {/* Card footer */}
          <div className="px-6 py-4 border-t border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-between">
            <p className="text-[12px] text-[var(--text-muted)]">
              Report includes: interview questions, skill gaps, match score, prep roadmap & improved resume
            </p>
            <button
              onClick={handleGenerateReport}
              disabled={loading}
              className="flex items-center gap-2 px-[22px] py-2.5 text-white border-none rounded-lg text-[14px] font-semibold whitespace-nowrap transition-all duration-150"
              style={{
                background: loading ? "#93aff5" : "var(--primary)",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading ? "none" : "0 2px 8px rgba(26,86,219,0.3)",
              }}
            >
              {loading ? (
                <><Spinner size={15} color="white" /> Generating Report...</>
              ) : (
                <>
                  Generate Report
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="animate-fade-up delay-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] font-bold text-[var(--text-primary)]">Recent Reports</h2>
            {reports && reports.length > 0 && (
              <span className="text-[12px] text-[var(--text-muted)] bg-[var(--surface-3)] px-2.5 py-[3px] rounded-[20px] border border-[var(--border)]">
                {reports.length} total
              </span>
            )}
          </div>

          {reports && reports.length > 0 ? (
            <div className="flex flex-col gap-2.5">
              {reports.map((report, i) => (
                <div
                  key={report._id}
                  className="animate-fade-up bg-[var(--surface)] border border-[var(--border)] rounded-[12px] px-5 py-4 flex items-center justify-between shadow-[var(--shadow-sm)] transition-[box-shadow,transform] duration-150 hover:shadow-[var(--shadow)]"
                  style={{ animationDelay: `${0.1 + i * 0.05}s` }}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 bg-[var(--primary-light)] rounded-[10px] flex items-center justify-center text-[var(--primary)] shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[var(--text-primary)] mb-0.5">
                        {report.title || "Untitled Position"}
                      </p>
                      <p className="text-[12px] text-[var(--text-muted)]">
                        {new Date(report.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · {new Date(report.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {report.matchScore && (
                      <div
                        className="text-[13px] font-bold rounded-[20px] px-3 py-[3px]"
                        style={{
                          color: report.matchScore >= 75 ? "var(--success)" : report.matchScore >= 50 ? "var(--warning)" : "var(--danger)",
                          background: report.matchScore >= 75 ? "#f0fdf4" : report.matchScore >= 50 ? "#fffbeb" : "#fef2f2",
                          border: `1px solid ${report.matchScore >= 75 ? "#bbf7d0" : report.matchScore >= 50 ? "#fde68a" : "#fecaca"}`,
                        }}
                      >
                        {report.matchScore}% match
                      </div>
                    )}
                    <button
                      onClick={() => navigate(`/interview/${report._id}`)}
                      className="px-4 py-[7px] bg-[var(--primary)] text-white border-none rounded-lg text-[13px] font-semibold cursor-pointer"
                    >
                      View Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[var(--surface)] border border-dashed border-[var(--border)] rounded-[12px] p-10 text-center">
              <div className="text-[36px] mb-3">📋</div>
              <p className="text-[15px] font-medium text-[var(--text-secondary)] mb-1.5">No reports yet</p>
              <p className="text-[13px] text-[var(--text-muted)]">Fill in the form above to generate your first interview report.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
