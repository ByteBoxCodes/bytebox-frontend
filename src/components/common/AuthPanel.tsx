import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";

interface AuthPanelProps {
    /** Eyebrow text shown above the heading */
    eyebrow?: string;
    /** Main heading */
    heading?: React.ReactNode;
    /** Sub-description */
    description?: string;
    /** Footer tagline */
    tagline?: string;
}

/**
 * Shared left-panel used by LoginPage and RegisterPage.
 * Handles both light and dark themes automatically.
 */
export default function AuthPanel({
    eyebrow = "Welcome to ByteBox",
    heading = (
        <>
            Master the Code.{" "}
            <br />
            <span className="text-4xl text-(--text-secondary) dark:text-(--dk-text-muted) font-semibold">
                Command your fundamentals.
            </span>
        </>
    ),
    description = "Sharpen your problem-solving skills with curated challenges, detailed explanations, and a community of passionate developers.",
    tagline = "© 2025 ByteBox — Built for developers, by developers.",
}: AuthPanelProps) {
    return (
        <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 overflow-hidden z-10
                        border-r border-(--border-primary) dark:border-(--dk-border)">

            {/* Light mode pattern */}
            <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0 dark:hidden pointer-events-none">
                <img
                    className="w-auto h-full opacity-(--pattern-opacity)"
                    src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png"
                    alt=""
                />
            </div>

            {/* Dark mode blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden hidden dark:block">
                <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full blur-3xl"
                    style={{ background: "var(--dk-blob-a)" }} />
                <div className="absolute bottom-0 -right-24 w-[400px] h-[400px] rounded-full blur-3xl"
                    style={{ background: "var(--dk-blob-b)" }} />
            </div>

            {/* Brand */}
            <div className="z-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md
                                bg-black/5 ring-1 ring-black/10
                                dark:bg-(--dk-surface) dark:ring-(--dk-border-muted)">
                    <Code2 size={20} className="text-(--text-primary) dark:text-(--dk-text)" />
                </div>
                <Link
                    to="/"
                    className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity
                               text-(--text-primary) dark:text-(--dk-text)"
                >
                    ByteBox
                </Link>
            </div>

            {/* Headline + description */}
            <div className="z-10 relative flex flex-col gap-6">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-widest mb-3
                                  text-(--text-secondary) dark:text-(--dk-text-muted)">
                        {eyebrow}
                    </p>
                    <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight
                                   text-(--text-primary) dark:text-(--dk-text)">
                        {heading}
                    </h1>
                    <p className="mt-4 text-base leading-relaxed max-w-sm
                                  text-(--text-secondary) dark:text-(--dk-text-muted)">
                        {description}
                    </p>
                </div>

                {/* SVG Illustration */}
                <div className="w-full flex justify-center items-end">
                    {/* Light mode */}
                    <svg viewBox="0 0 420 220" className="w-full max-w-md opacity-90 dark:hidden" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect x="110" y="30" width="200" height="130" rx="12" fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.12)" strokeWidth="2" />
                        <rect x="110" y="30" width="200" height="20" rx="12" fill="rgba(0,0,0,0.07)" />
                        <circle cx="127" cy="40" r="4" fill="#ff6060" fillOpacity="0.9" />
                        <circle cx="141" cy="40" r="4" fill="#ffcc00" fillOpacity="0.9" />
                        <circle cx="155" cy="40" r="4" fill="#44cc44" fillOpacity="0.9" />
                        <rect x="126" y="64" width="80" height="7" rx="3.5" fill="rgba(0,0,0,0.15)" />
                        <rect x="126" y="80" width="120" height="7" rx="3.5" fill="rgba(0,0,0,0.08)" />
                        <rect x="136" y="96" width="96" height="7" rx="3.5" fill="rgba(0,0,0,0.12)" />
                        <rect x="136" y="112" width="60" height="7" rx="3.5" fill="rgba(0,0,0,0.08)" />
                        <rect x="126" y="128" width="100" height="7" rx="3.5" fill="rgba(0,0,0,0.10)" />
                        <rect x="197" y="160" width="26" height="20" rx="4" fill="rgba(0,0,0,0.05)" />
                        <rect x="170" y="176" width="80" height="8" rx="4" fill="rgba(0,0,0,0.06)" />
                        <rect x="130" y="188" width="160" height="28" rx="8" fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
                        {[0, 1, 2, 3, 4].map(i => <rect key={i} x={140 + i * 25} y="196" width="20" height="12" rx="3" fill="rgba(0,0,0,0.06)" />)}
                        <circle cx="70" cy="80" r="16" fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.10)" strokeWidth="1.5">
                            <animate attributeName="cy" values="80;68;80" dur="3s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="360" cy="100" r="12" fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5">
                            <animate attributeName="cy" values="100;88;100" dur="4s" repeatCount="indefinite" />
                        </circle>
                        <text x="52" y="140" fontSize="22" fontFamily="monospace" fill="rgba(0,0,0,0.12)" fontWeight="bold">
                            {"{"}
                            <animate attributeName="opacity" values="0.12;0.04;0.12" dur="3s" repeatCount="indefinite" />
                        </text>
                        <text x="358" y="145" fontSize="22" fontFamily="monospace" fill="rgba(0,0,0,0.12)" fontWeight="bold">
                            {"}"}
                            <animate attributeName="opacity" values="0.12;0.04;0.12" dur="4s" repeatCount="indefinite" />
                        </text>
                        <text x="75" y="175" fontSize="16" fontFamily="monospace" fill="rgba(0,0,0,0.10)">
                            {"</>"}
                            <animate attributeName="opacity" values="0.10;0.03;0.10" dur="5s" repeatCount="indefinite" />
                        </text>
                    </svg>

                    {/* Dark mode */}
                    <svg viewBox="0 0 420 220" className="w-full max-w-md opacity-80 hidden dark:block" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect x="110" y="30" width="200" height="130" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                        <rect x="110" y="30" width="200" height="20" rx="12" fill="rgba(255,255,255,0.08)" />
                        <circle cx="127" cy="40" r="4" fill="#ff6060" fillOpacity="0.8" />
                        <circle cx="141" cy="40" r="4" fill="#ffcc00" fillOpacity="0.8" />
                        <circle cx="155" cy="40" r="4" fill="#66ff66" fillOpacity="0.8" />
                        <rect x="126" y="64" width="80" height="7" rx="3.5" fill="rgba(255,255,255,0.25)" />
                        <rect x="126" y="80" width="120" height="7" rx="3.5" fill="rgba(255,255,255,0.12)" />
                        <rect x="136" y="96" width="96" height="7" rx="3.5" fill="rgba(255,255,255,0.18)" />
                        <rect x="136" y="112" width="60" height="7" rx="3.5" fill="rgba(255,255,255,0.12)" />
                        <rect x="126" y="128" width="100" height="7" rx="3.5" fill="rgba(255,255,255,0.2)" />
                        <rect x="197" y="160" width="26" height="20" rx="4" fill="rgba(255,255,255,0.07)" />
                        <rect x="170" y="176" width="80" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
                        <rect x="130" y="188" width="160" height="28" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                        {[0, 1, 2, 3, 4].map(i => <rect key={i} x={140 + i * 25} y="196" width="20" height="12" rx="3" fill="rgba(255,255,255,0.08)" />)}
                        <circle cx="70" cy="80" r="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
                            <animate attributeName="cy" values="80;68;80" dur="3s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="360" cy="100" r="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5">
                            <animate attributeName="cy" values="100;88;100" dur="4s" repeatCount="indefinite" />
                        </circle>
                        <text x="52" y="140" fontSize="22" fontFamily="monospace" fill="rgba(255,255,255,0.2)" fontWeight="bold">
                            {"{"}
                            <animate attributeName="opacity" values="0.2;0.08;0.2" dur="3s" repeatCount="indefinite" />
                        </text>
                        <text x="358" y="145" fontSize="22" fontFamily="monospace" fill="rgba(255,255,255,0.2)" fontWeight="bold">
                            {"}"}
                            <animate attributeName="opacity" values="0.2;0.08;0.2" dur="4s" repeatCount="indefinite" />
                        </text>
                        <text x="75" y="175" fontSize="16" fontFamily="monospace" fill="rgba(255,255,255,0.15)">
                            {"</>"}
                            <animate attributeName="opacity" values="0.15;0.05;0.15" dur="5s" repeatCount="indefinite" />
                        </text>
                    </svg>
                </div>
            </div>

            {/* Tagline */}
            <p className="z-10 relative text-xs select-none text-(--text-secondary) dark:text-(--dk-text-faint)">
                {tagline}
            </p>
        </div>
    );
}
