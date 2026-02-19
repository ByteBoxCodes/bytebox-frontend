
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ITopic } from "@/types/topics";



interface TopicSidebarProps {
    topics: ITopic[];
    selectedTopic: string;
    onSelectTopic: (topic: string) => void;
}

export default function TopicSidebar({ topics, selectedTopic, onSelectTopic }: TopicSidebarProps) {
    return (
        <div className="h-[calc(100vh-12rem)] sticky top-24">
            <div className="pb-4 mb-2 border-b border-(--border-primary)">
                <h2 className="text-lg font-bold text-(--text-primary) font-pj">Topics</h2>
                <p className="text-xs text-(--text-secondary) mt-1">Select a topic to practice</p>
            </div>
            <ScrollArea className="h-[calc(100%-5rem)]">
                <div className="space-y-1 pr-4">
                    {topics.map((topic, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            className={cn(
                                "w-full justify-start text-left font-pj h-auto py-3 px-4",
                                selectedTopic === topic.name
                                    ? "bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-hover) hover:text-(--btn-primary-text)"
                                    : "text-(--text-secondary) hover:bg-(--bg-tertiary) hover:text-(--text-primary)"
                            )}
                            onClick={() => onSelectTopic(topic.name)}
                        >
                            <div className="truncate">
                                <div className="font-semibold">{topic.name}</div>
                                <div className={cn(
                                    "text-xs mt-0.5 truncate",
                                    selectedTopic === topic.name ? "text-(--text-inverse)/80" : "text-(--text-tertiary)"
                                )}>
                                    {topic.description}
                                </div>
                            </div>
                        </Button>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
