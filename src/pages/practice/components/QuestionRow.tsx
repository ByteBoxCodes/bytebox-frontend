
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
        Easy: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400',
        Medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400',
        Hard: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400',
    };

    const openQuestion = () => navigate(`/practice/${id}`);

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
            className="flex items-center justify-between p-4 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 last:border-0 cursor-pointer"
        >
            <div className="flex items-center flex-1 min-w-0">
                <div className="flex-shrink-0 mr-4">
                    <input
                        type="checkbox"
                        checked={isCompleted}
                        readOnly
                        className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
                <div className="flex-shrink-0 w-8 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {id}.
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-base font-medium text-gray-900 dark:text-white truncate font-pj">
                        {title}
                    </p>
                </div>
            </div>

            <div className="flex items-center ml-6 space-x-6">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColor[difficulty]}`}>
                    {difficulty}
                </span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-16 text-right">
                    {points} pts
                </span>
            </div>
        </div>
    )
}
