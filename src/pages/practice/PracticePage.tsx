import DashboardStats from "./components/DashboardStats";
import TopicAccordion from "./components/TopicAccordion";
import RightSidebar from "./components/RightSidebar";
import { practiceData } from "../../data/practice-data/PracticeData";


export default function PracticePage() {
    return (
        <div className="relative bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
            <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-gray-100 to-transparent dark:from-gray-800/20 pointer-events-none"></div>

            <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-pj">Practice Dashboard</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400 font-pj">Track your progress and master the fundamentals.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content - 75% width on large screens */}
                    <div className="lg:col-span-9 space-y-8">
                        <DashboardStats />

                        <div className="space-y-6">
                            {practiceData.map((topic, index) => (
                                <TopicAccordion
                                    key={index}
                                    title={topic.title}
                                    description={topic.description}
                                    questions={topic.questions}
                                    defaultOpen={index === 0}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar - 25% width on large screens */}
                    <div className="lg:col-span-3">
                        <RightSidebar />
                    </div>
                </div>
            </div>
        </div>
    )
}
