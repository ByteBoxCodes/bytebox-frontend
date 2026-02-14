import { useState } from "react";
import RightSidebar from "../features/problem/RightSidebar";
import TopicSidebar from "../features/problem/TopicSidebar";
import ProblemList from "../features/problem/ProblemList";
import { practiceData } from "../constants/practice-data/PracticeData";


export default function ProblemPage() {
    const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);

    return (
        <div className="relative bg-(--bg-secondary) min-h-screen transition-colors duration-200 border-t border-(--border-primary)">
            <div className="absolute top-0 inset-x-0 h-64 bg-linear-gradient-to-b from-(--bg-tertiary) to-transparent dark:from-(--bg-tertiary)/20 pointer-events-none"></div>

            <div className="relative px-4 w-full sm:px-6 lg:px-8 py-8">

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
                    {/* Left Sidebar - Topic Navigation */}
                    <div className="hidden lg:block shrink-0 lg:w-[18%] sticky top-8 lg:pr-8">
                        <TopicSidebar
                            topics={practiceData}
                            selectedTopicIndex={selectedTopicIndex}
                            onSelectTopic={setSelectedTopicIndex}
                        />
                    </div>

                    {/* Center Content - Problems */}
                    <div className="flex-1 space-y-6 lg:px-8 lg:border-x lg:border-(--border-primary) min-h-[calc(100vh-12rem)] min-w-0">
                        <ProblemList topic={practiceData[selectedTopicIndex]} />
                    </div>

                    {/* Right Sidebar - Widgets */}
                    <div className="shrink-0 w-full lg:w-[22%] space-y-6 lg:pl-8">
                        <RightSidebar />
                    </div>
                </div>
            </div>
        </div>
    )
}
