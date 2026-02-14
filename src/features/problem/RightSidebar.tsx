
export default function RightSidebar() {
    return (
        <div className="space-y-6">
            {/* Stats Widget */}
            <div className="pb-5 border-b border-(--border-primary)">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-(--bg-tertiary)/50 rounded-lg">
                        <svg className="w-6 h-6 text-(--text-primary)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h3 className="ml-3 text-lg font-bold text-(--text-primary) font-pj">Overview</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <p className="text-xs font-medium text-(--text-secondary) uppercase tracking-wide">Rank</p>
                        <div className="flex items-center mt-1">
                            <span className="text-2xl font-bold text-(--text-primary) font-pj">Novice</span>
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                                Lvl 2
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-(--text-secondary) uppercase tracking-wide">Solved</p>
                        <p className="mt-1 text-xl font-bold text-(--text-primary) font-pj">12 <span className="text-sm text-(--text-tertiary)">/ 50</span></p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-(--text-secondary) uppercase tracking-wide">Points</p>
                        <p className="mt-1 text-xl font-bold text-(--text-primary) font-pj">450</p>
                    </div>
                </div>
            </div>

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
