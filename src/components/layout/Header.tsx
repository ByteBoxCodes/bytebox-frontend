import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

export default function Header() {
    return (
        <header className="relative py-2 bg-(--bg-secondary) transition-colors duration-200 ">
            <div className="px-4 w-full sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="shrink-0">
                        <Link to="/" title="" className="flex rounded outline-none">
                            <img src="src/assets/logo/bytebox-light.png" alt="Logo" className="h-[50px] object-contain dark:hidden" />
                            <img src="src/assets/logo/bytebox-dark.png" alt="Logo" className="h-12 object-contain hidden dark:block" />
                        </Link>
                    </div>

                    <div className="flex lg:hidden">
                        <ThemeToggle />
                        <button type="button" className="ml-4 text-(--text-primary)">
                            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10">
                        <div className="flex items-center space-x-12">
                            <Link to="/problems" title="" className="text-base font-medium text-(--text-primary) transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-(--btn-primary-ring) focus:ring-offset-2"> Problems </Link>

                            <Link to="#" title="" className="text-base font-medium text-(--text-primary) transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-(--btn-primary-ring) focus:ring-offset-2"> Leaderboard </Link>

                            <Link to="#" title="" className="text-base font-medium text-(--text-primary) transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-(--btn-primary-ring) focus:ring-offset-2"> Challenges </Link>
                        </div>

                        <div className="w-px h-5 bg-(--border-primary)"></div>

                        <ThemeToggle />

                        <Link to="/login" title="" className="text-base font-medium text-(--text-primary) transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-(--btn-primary-ring) focus:ring-offset-2"> Login </Link>

                        <Link
                            to="/signup"
                            title=""
                            className="
                            px-5
                            py-2
                            text-base
                            font-semibold
                            leading-7
                            text-(--text-primary)
                            transition-all
                            duration-200
                            bg-transparent
                            border border-(--text-primary)
                            rounded-xl
                            font-pj
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-(--btn-primary-ring)
                            hover:bg-(--btn-primary-bg) hover:text-(--text-inverse)
                            focus:bg-(--btn-primary-bg) focus:text-(--text-inverse)
                        "
                            role="button"
                        >
                            Create free account
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
