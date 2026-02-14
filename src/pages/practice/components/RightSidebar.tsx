
export default function RightSidebar() {
    return (
        <div className="space-y-6">
            {/* Daily Tip Widget */}
            <div className="pb-5 border-b border-(--border-primary)">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-(--status-warning-bg) rounded-lg">
                        <svg className="w-6 h-6 text-(--status-warning-text)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <h3 className="ml-3 text-lg font-bold text-(--text-primary) font-pj">Daily Tip</h3>
                </div>
                <p className="text-sm text-(--text-secondary) font-pj leading-relaxed">
                    Consistent practice is key! Try to solve at least one problem every day to build muscle memory and improve your problem-solving skills.
                </p>
            </div>

            {/* Platform Updates Widget */}
            <div className="pb-5 border-b border-(--border-primary)">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-(--status-info-bg) rounded-lg">
                        <svg className="w-6 h-6 text-(--status-info-text)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                    </div>
                    <h3 className="ml-3 text-lg font-bold text-(--text-primary) font-pj">Updates</h3>
                </div>
                <div className="space-y-4">
                    <div className="pb-4 border-b border-(--bg-tertiary) last:border-0 last:pb-0">
                        <span className="text-xs font-semibold text-(--status-info-text)">New Feature</span>
                        <p className="mt-1 text-sm font-medium text-(--text-primary) font-pj">Dark Mode is here!</p>
                        <p className="mt-1 text-xs text-(--text-secondary)">Switch themes for better coding experience at night.</p>
                    </div>
                    <div className="pb-4 border-b border-(--bg-tertiary) last:border-0 last:pb-0">
                        <span className="text-xs font-semibold text-(--status-success-text)">Content</span>
                        <p className="mt-1 text-sm font-medium text-(--text-primary) font-pj">10 New Array Questions</p>
                        <p className="mt-1 text-xs text-(--text-secondary)">Practice array manipulation with our latest set.</p>
                    </div>
                </div>
            </div>

            {/* Streak Widget */}
            <div className="bg-linear-to-br from-orange-500 to-red-600 rounded-xl p-5 text-white shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-orange-100">Current Streak</p>
                        <p className="mt-1 text-3xl font-bold">5 Days</p>
                    </div>
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                        </svg>
                    </div>
                </div>
                <div className="mt-4 flex space-x-1">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className={`h-2 flex-1 rounded-full ${i < 5 ? 'bg-white' : 'bg-white/30'}`}></div>
                    ))}
                </div>
                <p className="mt-2 text-xs text-orange-100">Keep it up! 2 more days for a weekly badge.</p>
            </div>
        </div>
    )
}
