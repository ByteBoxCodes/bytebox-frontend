
import { useNavigate } from 'react-router-dom';

interface QuestionRowProps {
    id: number;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    points: number;
    isCompleted: boolean;
}

export default function QuestionRow({ id, title, difficulty, points, isCompleted }: QuestionRowProps) {
    const navigate = useNavigate();
    const difficultyColor = {
        Easy: 'text-(--status-success-text) bg-(--status-success-bg)',
        Medium: 'text-(--status-warning-text) bg-(--status-warning-bg)',
        Hard: 'text-(--status-error-text) bg-(--status-error-bg)',
    };

    const openQuestion = () => navigate(`/problem/${id}`);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openQuestion();
        }
    };

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={openQuestion}
            onKeyDown={handleKeyDown}
            className="flex items-center justify-between p-4 transition-colors duration-200 hover:bg-(--bg-tertiary)/50 border-b border-(--border-primary) last:border-0 cursor-pointer"
        >
            <div className="flex items-center flex-1 min-w-0">
                <div className="shrink-0 mr-4">
                    <input
                        type="checkbox"
                        checked={isCompleted}
                        readOnly
                        className="w-5 h-5 text-(--text-primary) border-(--border-primary) rounded focus:ring-(--btn-primary-ring) bg-transparent"
                    />
                </div>
                <div className="shrink-0 w-8 text-sm font-medium text-(--text-secondary)">
                    {id}.
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-base font-medium text-(--text-primary) truncate font-pj">
                        {title}
                    </p>
                </div>
            </div>

            <div className="flex items-center ml-6 space-x-6">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColor[difficulty]}`}>
                    {difficulty}
                </span>
                <span className="text-sm font-medium text-(--text-secondary) w-16 text-right">
                    {points} pts
                </span>
            </div>
        </div>
    )
}
