import RightSidebar from "../features/problem/RightSidebar";
import TopicSidebar from "../features/problem/TopicSidebar";
import ProblemList from "../features/problem/ProblemList";
import { useGetAllTopics } from "@/hooks/useGetAllTopics";
import { useState } from "react";
import { useGetProblemsByTopic } from "@/hooks/useGetProblemsByTopic";

export default function ProblemPage() {
    const { data: topics } = useGetAllTopics();
    const [selectedTopic, setSelectedTopic] = useState<string>("variables");
    const { data: problems } = useGetProblemsByTopic(selectedTopic);

    console.log(selectedTopic)

    return (
        <div className="relative h-full flex flex-col overflow-hidden transition-colors duration-200
                        bg-(--bg-secondary) border-t border-(--border-primary)
                        dark:border-(--dk-border)">

            <div className="relative z-10 px-4 w-full sm:px-6 lg:px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">

                    {/* Left Sidebar — Topic Navigation */}
                    <div className="hidden lg:block shrink-0 lg:w-[18%] sticky top-8 lg:pr-8">
                        <TopicSidebar
                            selectedTopic={selectedTopic}
                            onSelectTopic={setSelectedTopic}
                            topics={topics || []}
                        />
                    </div>

                    {/* Center Content — Problems */}
                    <div className="flex-1 space-y-6 lg:px-8 min-h-[calc(100vh-12rem)] min-w-0
                                    lg:border-x border-(--border-primary) dark:border-(--dk-border)">
                        <ProblemList problems={problems || []} topicName={selectedTopic} />
                    </div>

                    {/* Right Sidebar — Widgets */}
                    <div className="shrink-0 w-full lg:w-[22%] space-y-6 lg:pl-8">
                        <RightSidebar topics={topics || []} selectedTopic={selectedTopic} problems={problems || []} />
                    </div>

                </div>
            </div>
        </div>
    );
}
