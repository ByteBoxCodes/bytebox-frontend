import RightSidebar from "../features/problem/RightSidebar";
import TopicSidebar from "../features/problem/TopicSidebar";
import ProblemList from "../features/problem/ProblemList";
import { useGetAllTopics } from "@/hooks/useGetAllTopics";
import { useState, useEffect } from "react";
import LanguagePickerModal from "@/features/profile/LanguagePickerModal";
import { useUpdatePreferredLanguage } from "@/hooks/useUpdatePreferredLanguage";
import { useGetProblemsByTopicId } from "@/hooks/useGetProblemsByTopicId";

export default function ProblemPage() {
    const { data: topics } = useGetAllTopics();
    const [selectedTopicIdState, setSelectedTopicIdState] = useState<string | null>(null);
    const selectedTopicId = selectedTopicIdState || (topics?.[0]?.id || "");
    const setSelectedTopicId = (id: string) => setSelectedTopicIdState(id);

    const { data: problems } = useGetProblemsByTopicId(selectedTopicId);
    const [showLangModal, setShowLangModal] = useState(false);
    const { mutate: updateLang } = useUpdatePreferredLanguage();

    useEffect(() => {
        // Only show if no preferred language is currently set
        const lang = localStorage.getItem("preferredLanguage");
        if (!lang) {
            setShowLangModal(true);
        }
    }, []);

    const handleLangModalClose = () => {
        setShowLangModal(false);
        // If the user closed the modal without selecting a language, default to cpp
        if (!localStorage.getItem("preferredLanguage")) {
            localStorage.setItem("preferredLanguage", "cpp");
            updateLang("cpp");
        }
    };

    const activeTopicName = topics?.find(t => t.id === selectedTopicId)?.name || 'All';

    return (
        <div className="relative h-full flex flex-col overflow-hidden transition-colors duration-200
                        bg-(--bg-secondary) border-t border-(--border-primary)
                        dark:border-(--dk-border)">

            <LanguagePickerModal
                isOpen={showLangModal}
                onClose={handleLangModalClose}
            />

            <div className="relative z-10 px-4 w-full sm:px-6 lg:px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">

                    {/* Left Sidebar — Topic Navigation */}
                    <div className="hidden lg:block shrink-0 lg:w-[18%] sticky top-8 lg:pr-8">
                        <TopicSidebar
                            selectedTopicId={selectedTopicId}
                            onSelectTopicId={setSelectedTopicId}
                            topics={topics || []}
                        />
                    </div>

                    {/* Center Content — Problems */}
                    <div className="flex-1 space-y-6 lg:px-8 min-h-[calc(100vh-12rem)] min-w-0
                                    lg:border-x border-(--border-primary) dark:border-(--dk-border)">
                        <ProblemList problems={problems || []} topicName={activeTopicName} />
                    </div>

                    {/* Right Sidebar — Widgets */}
                    <div className="shrink-0 w-full lg:w-[22%] space-y-6 lg:pl-8">
                        <RightSidebar topics={topics || []} selectedTopicId={selectedTopicId} problems={problems || []} />
                    </div>

                </div>
            </div>
        </div>
    );
}
