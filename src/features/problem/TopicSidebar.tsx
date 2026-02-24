import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { ITopic } from "@/types/topics";
import { Terminal, Code2, Database, Hash, ListTree, RotateCw, Braces, Layers, ChevronRight, Binary } from "lucide-react";

interface TopicSidebarProps {
    topics: ITopic[];
    selectedTopic: string;
    onSelectTopic: (topic: string) => void;
}

const getTopicIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('loop')) return <RotateCw className="w-[18px] h-[18px]" />;
    if (lowerName.includes('array')) return <Layers className="w-[18px] h-[18px]" />;
    if (lowerName.includes('string')) return <Braces className="w-[18px] h-[18px]" />;
    if (lowerName.includes('tree')) return <ListTree className="w-[18px] h-[18px]" />;
    if (lowerName.includes('math') || lowerName.includes('number')) return <Hash className="w-[18px] h-[18px]" />;
    if (lowerName.includes('graph') || lowerName.includes('data') || lowerName.includes('sql')) return <Database className="w-[18px] h-[18px]" />;
    if (lowerName.includes('basic') || lowerName.includes('intro')) return <Terminal className="w-[18px] h-[18px]" />;
    if (lowerName.includes('bit')) return <Binary className="w-[18px] h-[18px]" />;
    return <Code2 className="w-[18px] h-[18px]" />;
};

export default function TopicSidebar({ topics, selectedTopic, onSelectTopic }: TopicSidebarProps) {
    return (
        <div className="h-[calc(100vh-12rem)] sticky top-24 flex flex-col font-pj">
            <div className="pb-5 mb-4 border-b border-(--border-primary)">
                <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="flex items-center justify-center p-1.5 rounded-lg bg-(--btn-primary-bg) text-(--btn-primary-text) shadow-sm">
                        <Terminal className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-(--text-primary) tracking-tight">Topics</h2>
                </div>
                <p className="text-sm text-(--text-secondary) leading-relaxed">
                    Select a topic to master your programming fundamentals.
                </p>
            </div>

            <ScrollArea className="flex-1 -mx-2">
                <div className="space-y-1 px-2 pb-6">
                    {topics.map((topic, index) => {
                        const isActive = selectedTopic === topic.name;

                        return (
                            <button
                                key={topic.id || index}
                                onClick={() => onSelectTopic(topic.name)}
                                className={cn(
                                    "group relative flex items-center gap-3 w-full text-left px-3 py-2 rounded-xl transition-all duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-(--btn-primary-bg)",
                                    isActive
                                        ? "bg-(--bg-tertiary) shadow-sm ring-1 ring-(--border-primary)"
                                        : "hover:bg-(--bg-tertiary)/50 text-(--text-secondary) hover:text-(--text-primary)"
                                )}
                            >
                                {/* Active Indicator Left Bar */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-(--btn-primary-bg) rounded-r-full shadow-[0_0_8px_var(--btn-primary-bg)] opacity-70" />
                                )}

                                {/* Icon Container */}
                                <div className={cn(
                                    "shrink-0 flex items-center justify-center p-1.5 rounded-lg transition-all duration-300",
                                    isActive
                                        ? "bg-(--btn-primary-bg) text-(--btn-primary-text) shadow-md"
                                        : "bg-(--bg-secondary) text-(--text-tertiary) group-hover:bg-(--bg-card) group-hover:text-(--text-secondary) group-hover:shadow-sm"
                                )}>
                                    {getTopicIcon(topic.name)}
                                </div>

                                {/* Text Content */}
                                <div className="flex-1 min-w-0 pr-2">
                                    <div className={cn(
                                        "font-semibold text-sm transition-colors duration-200 truncate",
                                        isActive ? "text-(--text-primary)" : "text-(--text-primary)"
                                    )}>
                                        {topic.name}
                                    </div>
                                </div>

                                {/* Chevron */}
                                <ChevronRight className={cn(
                                    "w-4 h-4 transition-all duration-300 shrink-0",
                                    isActive
                                        ? "text-(--text-primary) translate-x-0 opacity-100"
                                        : "text-transparent -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:text-(--text-tertiary) group-hover:opacity-100"
                                )} />
                            </button>
                        );
                    })}
                </div>
            </ScrollArea>
        </div>
    );
}
