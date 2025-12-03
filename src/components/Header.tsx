import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <header className="relative py-4 md:py-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex-shrink-0">
                        <a href="#" title="" className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white font-pj">BaseMint</span>
                        </a>
                    </div>

                    <div className="flex lg:hidden">
                        <ThemeToggle />
                        <button type="button" className="ml-4 text-gray-900 dark:text-white">
                            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10">
                        <div className="flex items-center space-x-12">
                            <a href="#" title="" className="text-base font-medium text-gray-900 dark:text-gray-100 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Practice </a>

                            <a href="#" title="" className="text-base font-medium text-gray-900 dark:text-gray-100 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Leaderboard </a>

                            <a href="#" title="" className="text-base font-medium text-gray-900 dark:text-gray-100 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Challenges </a>
                        </div>

                        <div className="w-px h-5 bg-gray-300 dark:bg-gray-700"></div>

                        <ThemeToggle />

                        <a href="#" title="" className="text-base font-medium text-gray-900 dark:text-gray-100 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Login </a>

                        <a
                            href="#"
                            title=""
                            className="
                            px-5
                            py-2
                            text-base
                            font-semibold
                            leading-7
                            text-gray-900
                            dark:text-white
                            transition-all
                            duration-200
                            bg-transparent
                            border border-gray-900
                            dark:border-white
                            rounded-xl
                            font-pj
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                            hover:bg-gray-900 hover:text-white
                            dark:hover:bg-white dark:hover:text-gray-900
                            focus:bg-gray-900 focus:text-white
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
