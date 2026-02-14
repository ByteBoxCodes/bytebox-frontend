import ThemeToggle from "../ThemeToggle";

export default function Header() {
    return (
        <header className="relative py-4 md:py-6 bg-(--bg-secondary) transition-colors duration-200 ">
            <div className="px-4 w-full sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="shrink-0">
                        <a href="/" title="" className="flex rounded outline-none focus:ring-1 focus:ring-(--btn-primary-ring) focus:ring-offset-2">
                            <span className="text-2xl font-bold text-(--text-primary) font-pj">BaseMint</span>
                        </a>
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
                            <a href="/practice" title="" className="text-base font-medium text-(--text-primary) transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-(--btn-primary-ring) focus:ring-offset-2"> Practice </a>

                            <a href="#" title="" className="text-base font-medium text-(--text-primary) transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-(--btn-primary-ring) focus:ring-offset-2"> Leaderboard </a>

                            <a href="#" title="" className="text-base font-medium text-(--text-primary) transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-(--btn-primary-ring) focus:ring-offset-2"> Challenges </a>
                        </div>

                        <div className="w-px h-5 bg-(--border-primary)"></div>

                        <ThemeToggle />

                        <a href="#" title="" className="text-base font-medium text-(--text-primary) transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-(--btn-primary-ring) focus:ring-offset-2"> Login </a>

                        <a
                            href="#"
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
                        </a>
                    </div>
                </div>
            </div>
        </header>
    )
}
