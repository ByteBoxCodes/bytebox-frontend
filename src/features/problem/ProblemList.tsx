
import QuestionRow from "./QuestionRow";

interface ProblemListProps {
    topic: {
        title: string;
        description: string;
        questions: any[];
    };
}

export default function ProblemList({ topic }: ProblemListProps) {
    return (
        <div className="space-y-6">
            <div className="pb-4 border-b border-(--border-primary)">
                <h2 className="text-2xl font-bold text-(--text-primary) font-pj">{topic.title}</h2>
                <p className="mt-1 text-(--text-secondary) font-pj">{topic.description}</p>
            </div>

            <div className="overflow-hidden">
                {/* Optional: Add a header row for the table-like list if desired, 
                     but keeping it simple as per "professional" request often implies clean lists. 
                     The QuestionRow itself provides the row structure. 
                 */}
                {topic.questions.map((question: any) => (
                    <QuestionRow key={question.id} {...question} />
                ))}
            </div>
        </div>
    );
}
