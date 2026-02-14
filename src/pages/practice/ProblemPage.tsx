import { useState } from "react";
import DashboardStats from "./components/DashboardStats";
import RightSidebar from "./components/RightSidebar";
import TopicSidebar from "./components/TopicSidebar";
import ProblemList from "./components/ProblemList";
import { practiceData } from "../../constants/practice-data/PracticeData";


export default function ProblemPage() {
    const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);

    return (
        <div className="relative bg-(--bg-secondary) min-h-screen transition-colors duration-200 border-t border-(--border-primary)">
            <div className="absolute top-0 inset-x-0 h-64 bg-linear-gradient-to-b from-(--bg-tertiary) to-transparent dark:from-(--bg-tertiary)/20 pointer-events-none"></div>

            <div className="relative px-4 w-full sm:px-6 lg:px-8 py-8">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0">
                    {/* Left Sidebar - Topic Navigation (3 cols) */}
                    <div className="lg:col-span-2 hidden lg:block sticky top-8 lg:pr-8">
                        <TopicSidebar
                            topics={practiceData}
                            selectedTopicIndex={selectedTopicIndex}
                            onSelectTopic={setSelectedTopicIndex}
                        />
                    </div>

                    {/* Center Content - Problems (6 cols) */}
                    <div className="lg:col-span-8 space-y-6 lg:px-8 lg:border-x lg:border-(--border-primary) min-h-[calc(100vh-12rem)]">
                        <DashboardStats />
                        <ProblemList topic={practiceData[selectedTopicIndex]} />
                    </div>

                    {/* Right Sidebar - Widgets (3 cols) */}
                    <div className="lg:col-span-2 space-y-6 lg:pl-8">
                        <RightSidebar />
                    </div>
                </div>
            </div>
        </div>
    )
}
