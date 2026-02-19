
import QuestionRow from "./ProblemRow";
import { useGetProblemsByTopic } from "@/hooks/useGetProblemsByTopic";



export default function ProblemList({ topicName }: { topicName: string }) {

    const { data } = useGetProblemsByTopic(topicName);

    return (
        <div className="space-y-6">
            <div className="pb-4 border-b border-(--border-primary)">
                <h2 className="text-2xl font-bold text-(--text-primary) font-pj">{topicName}</h2>
                <p className="mt-1 text-(--text-secondary) font-pj">{topicName}</p>
            </div>

            <div className="overflow-hidden ">
                {data?.map((question: any) => (
                    <QuestionRow key={question.id} {...question} />
                ))}
            </div>
        </div>
    );
}
