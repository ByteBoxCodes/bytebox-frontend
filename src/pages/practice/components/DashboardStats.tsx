
export default function DashboardStats() {
    return (
        <div className="relative overflow-hidden mb-8 pb-8 border-b border-(--border-primary)">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-20">
                <svg viewBox="0 0 200 200" className="w-64 h-64 text-(--text-primary) fill-current">
                    <path d="M45.7,-76.3C58.9,-69.3,69.1,-57.6,76.3,-44.6C83.5,-31.6,87.7,-17.3,86.4,-3.3C85.1,10.7,78.3,24.4,69.5,36.4C60.7,48.4,49.9,58.7,37.6,66.3C25.3,73.9,11.5,78.8,-1.8,81.9C-15.1,85,-28.1,86.3,-39.8,80.8C-51.5,75.3,-61.9,63,-70.5,49.8C-79.1,36.6,-85.9,22.5,-86.6,8.1C-87.3,-6.3,-81.9,-21,-72.4,-32.8C-62.9,-44.6,-49.3,-53.5,-35.3,-60.1C-21.3,-66.7,-6.9,-71,-7.4,-76.3" transform="translate(100 100)" />
                </svg>
            </div>

            <div className="relative px-6 py-8 sm:px-8 md:py-10">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div>
                        <p className="text-sm font-medium text-(--text-secondary) font-pj">Total Questions Solved</p>
                        <p className="mt-2 text-4xl font-bold text-(--text-primary) font-pj">12 <span className="text-xl text-(--text-tertiary)">/ 50</span></p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-(--text-secondary) font-pj">Current Rank</p>
                        <div className="flex items-center mt-2">
                            <span className="text-4xl font-bold text-(--text-primary) font-pj">Novice</span>
                            <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Level 2
                            </span>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-(--text-secondary) font-pj">Total Points</p>
                        <p className="mt-2 text-4xl font-bold text-(--text-primary) font-pj">450</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
