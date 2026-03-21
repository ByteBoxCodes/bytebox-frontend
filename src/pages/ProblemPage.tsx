import RightSidebar from "../features/problem/RightSidebar";
import TopicSidebar from "../features/problem/TopicSidebar";
import ProblemList from "../features/problem/ProblemList";
import { useGetAllTopics } from "@/hooks/useGetAllTopics";
import ProblemPageSkeleton from "@/fallback/ProblemPageSkeleton";
import { useState, useEffect, useMemo, useCallback } from "react";
import LanguagePickerModal from "@/features/profile/LanguagePickerModal";
import { useUpdatePreferredLanguage } from "@/hooks/useUpdatePreferredLanguage";
import { useGetProblemsByTopicId } from "@/hooks/useGetProblemsByTopicId";

const SELECTED_TOPIC_KEY = "selectedTopicId";

export default function ProblemPage() {
    const { data: topics, isLoading: isTopicsLoading } = useGetAllTopics();
    const [storedTopicId, setStoredTopicId] = useState<string | null>(
        () => localStorage.getItem(SELECTED_TOPIC_KEY)
    );

    // Derive the effective topic ID — validate stored ID against loaded topics
    // Use String() coercion since API may return numeric ids but localStorage stores strings
    const selectedTopicId = useMemo(() => {
        if (storedTopicId && topics?.some(t => String(t.id) === storedTopicId)) {
            return storedTopicId;
        }
        return topics?.[0]?.id ? String(topics[0].id) : "";
    }, [storedTopicId, topics]);

    const setSelectedTopicId = useCallback((id: string) => {
        const stringId = String(id);
        localStorage.setItem(SELECTED_TOPIC_KEY, stringId);
        setStoredTopicId(stringId);
    }, []);

    const { data: problems, isLoading: isProblemsLoading } = useGetProblemsByTopicId(selectedTopicId);
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

    const activeTopicName = topics?.find(t => String(t.id) === selectedTopicId)?.name || 'All';

    if (isTopicsLoading) {
        return <ProblemPageSkeleton />;
    }

    return (
        <div className="relative lg:h-full min-h-0 flex flex-col overflow-hidden transition-colors duration-200
                        bg-(--bg-secondary) border-t border-(--border-primary)
                        dark:border-(--dk-border)">

            <LanguagePickerModal
                isOpen={showLangModal}
                onClose={handleLangModalClose}
            />

            <div className="relative z-10 px-4 w-full sm:px-6 lg:px-6 py-8 flex-1 overflow-y-auto lg:overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 h-auto lg:h-full">

                    {/* Left Sidebar — Topic Navigation */}
                    <div className="hidden lg:block shrink-0 lg:w-[18%] h-full overflow-y-auto lg:pr-8">
                        <TopicSidebar
                            selectedTopicId={selectedTopicId}
                            onSelectTopicId={setSelectedTopicId}
                            topics={topics || []}
                        />
                    </div>

                    {/* Mobile Topic Selector */}
                    <div className="lg:hidden w-full mb-2">
                        <select
                            value={selectedTopicId}
                            onChange={(e) => setSelectedTopicId(e.target.value)}
                            className="w-full h-10 px-3 rounded-xl text-sm font-medium
                                       bg-white border border-(--border-primary) text-(--text-primary)
                                       dark:bg-(--dk-surface) dark:border-(--dk-border-muted) dark:text-(--dk-text)
                                       focus:outline-none focus:ring-1 focus:ring-(--btn-primary-bg)
                                       appearance-none cursor-pointer"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
                        >
                            {(topics || []).map((t: any) => (
                                <option key={t.id} value={String(t.id)}>
                                    {t.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Center Content — Problems */}
                    <div className="flex-1 space-y-6 lg:px-8 min-h-[300px] lg:h-full overflow-visible lg:overflow-y-auto min-w-0
                                    lg:border-x border-(--border-primary) dark:border-(--dk-border)">
                        <ProblemList problems={problems || []} topicName={activeTopicName} isLoading={isProblemsLoading} />
                    </div>

                    {/* Right Sidebar — Widgets */}
                    <div className="shrink-0 w-full lg:w-[22%] space-y-6 lg:pl-8 lg:h-full overflow-visible lg:overflow-y-auto">
                        <RightSidebar topics={topics || []} selectedTopicId={selectedTopicId} problems={problems || []} />
                    </div>

                </div>
            </div>
        </div>
    );
}
