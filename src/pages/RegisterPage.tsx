
import Register from "../features/auth/Register";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    return (
        <div className="relative min-h-full flex flex-col justify-center items-center bg-(--bg-primary) p-4 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-64 bg-linear-gradient-to-b from-(--bg-tertiary) to-transparent dark:from-(--bg-tertiary)/20 pointer-events-none"></div>

            {/* Logo or Brand - Optional */}
            <div className="mb-8 relative z-10 text-center">
                <Link to="/" className="inline-flex items-center gap-2">
                    <span className="text-3xl font-bold text-(--text-primary) font-pj">BaseMint</span>
                </Link>
            </div>

            <div className="relative z-10 w-full max-w-sm">
                <Register />
            </div>
        </div>
    )
}
