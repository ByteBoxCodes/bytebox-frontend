import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ITopic } from "@/types/topics";
import { Code2, Hash, Star, Plus, ChevronsLeftRightEllipsis, Ampersand, ChartNoAxesGantt, Repeat, Asterisk, ParenthesesIcon, Brackets, TextInitial } from "lucide-react";

interface TopicSidebarProps {
    topics: ITopic[];
    selectedTopicId: string;
    onSelectTopicId: (topicId: string) => void;
}

const getTopicIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('input')) return <ChevronsLeftRightEllipsis className="size-[18px]" />
    if (lowerName.includes('operator')) return <Ampersand className="size-[18px]" />
    if (lowerName.includes('condition')) return <ChartNoAxesGantt className="size-[18px]" />
    if (lowerName.includes('loops')) return <Repeat className="size-[18px]" />;
    if (lowerName.includes('pattern')) return <Asterisk className="size-[18px]" />;
    if (lowerName.includes('function')) return <ParenthesesIcon className="size-[18px]" />;
    if (lowerName.includes('math') || lowerName.includes('number')) return <Hash className="size-[18px]" />;
    if (lowerName.includes('array')) return <Brackets className="size-[18px]" />;
    if (lowerName.includes('string')) return <TextInitial className="size-[18px]" />;
    return <Code2 className="size-[18px]" />;
};

export default function TopicSidebar({ topics, selectedTopicId, onSelectTopicId }: TopicSidebarProps) {
    return (
        <div className="h-[calc(100vh-12rem)] sticky top-24 flex flex-col font-pj overflow-hidden">
            {/* My Lists Section */}
            <div className="mb-3 border-b border-(--dk-border) pb-2 shrink-0">
                <div className="flex justify-between items-center">
                    <h3 className="text-xs font-extrabold text-(--text-tertiary) uppercase tracking-wider mb-3 px-3">
                        My Lists
                    </h3>
                    <span className="cursor-pointer mb-1">
                        <Plus className="w-[16px] h-[16px] text-(--text-tertiary)" />
                    </span>
                </div>
                <div className="space-y-1 px-2">
                    <button
                        className={cn(
                            "group relative flex items-center gap-3 w-full text-left px-3 py-2 rounded-md transition-all duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-(--btn-primary-bg)",
                            "hover:bg-(--bg-tertiary)/50 text-(--text-secondary) hover:text-(--text-primary)"
                        )}
                    >
                        {/* Icon Container */}
                        <div className={cn(
                            "shrink-0 flex items-center justify-center p-1.5 rounded-lg transition-all duration-300",
                            "bg-(--bg-secondary) text-(--text-tertiary) group-hover:bg-(--bg-card) group-hover:text-(--text-secondary)"
                        )}>
                            <Star className="w-[18px] h-[18px]" />
                        </div>
                        {/* Text Content */}
                        <div className="flex-1 min-w-0 pr-2">
                            <div className="font-semibold text-sm transition-colors duration-200 truncate text-(--text-primary)">
                                Favorites
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <h3 className="text-xs font-extrabold text-(--text-tertiary) uppercase tracking-wider mb-3 px-3 pt-2 shrink-0">
                Topics
            </h3>
            <ScrollArea className="flex-1 min-h-0 -mx-2">
                <div className=" px-2 pb-6">
                    {[...topics].sort((a, b) => Number(a.id) - Number(b.id)).map((topic, index) => {
                        const isActive = selectedTopicId === topic.id;
                        return (
                            <button
                                key={topic.id || index}
                                onClick={() => onSelectTopicId(topic.id)}
                                className={cn(
                                    "cursor-pointer group relative flex items-center gap-3 w-full text-left px-3 py-2 rounded-md transition-all duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-(--btn-primary-bg)",
                                    isActive
                                        ? "bg-(--bg-tertiary)"
                                        : "hover:bg-(--bg-tertiary)/50 text-(--text-secondary) hover:text-(--text-primary)"
                                )}
                            >
                                {/* Active Indicator Left Bar */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-(--btn-primary-bg) rounded-r-md" />
                                )}

                                {/* Icon Container */}
                                <div className={cn(
                                    "shrink-0 flex items-center justify-center p-1.5 rounded-lg transition-all duration-300",
                                )}>
                                    {getTopicIcon(topic.name)}
                                </div>

                                {/* Text Content */}
                                <div className="flex-1 min-w-0 pr-2">
                                    <div className={cn(
                                        "font-semibold text-xs transition-colors duration-200 truncate capitalize",
                                        isActive ? "text-(--text-primary)" : "text-(--text-primary)"
                                    )}>
                                        {topic.name}
                                    </div>
                                </div>

                                {/* Topic Count Placeholder - Ideally would come from API */}
                                <Badge variant="secondary" className={cn(
                                    "ml-auto text-xs font-normal shrink-0",
                                    isActive ? "bg-(--btn-primary-bg)/20 text-(--btn-primary-bg)" : "bg-(--bg-primary) text-(--text-tertiary)"
                                )}>
                                    {topic.totalProblems}
                                </Badge>
                            </button>
                        );
                    })}
                </div>
            </ScrollArea>
        </div>
    );
}
