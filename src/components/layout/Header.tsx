import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import ProfileDropdown from "@/features/profile/ProfileDropdown";
import { useProfile } from "@/hooks/useProfile";
import { Search, Bell } from "lucide-react";

export default function Header() {
    const token = localStorage.getItem("token");
    const { data } = useProfile();
    const user = token ? (data?.data ?? data) : null;

    return (
        <header
            className="relative py-2 bg-(--bg-secondary) border-b border-(--border-primary) dark:border-white/8 transition-colors duration-200 z-50"
            style={{ ["--dk-bg" as string]: "1" }}
        >
            {/* Dark mode gradient background (Matching HeroSection) */}
            <div className="absolute inset-0 hidden dark:block transition-colors duration-200 pointer-events-none"
                style={{ background: `linear-gradient(to bottom right, var(--dk-bg-from), var(--dk-bg-via), var(--dk-bg-to))` }} />

            <div className="relative px-4 w-full sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">

                    {/* Left Section: Logo & Navigation */}
                    <div className="flex items-center gap-8">
                        <div className="shrink-0 flex items-center">
                            <Link to="/" title="" className="flex rounded outline-none py-1">
                                <img src="src/assets/logo/bytebox-light.png" alt="Logo" className="h-[36px] object-contain dark:hidden relative z-10" />
                                <img src="src/assets/logo/bytebox-dark.png" alt="Logo" className="h-[36px] object-contain hidden dark:block relative z-10" />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-6 relative z-10">
                            <Link to="/" className="text-sm font-medium text-(--text-primary) dark:text-white/80 transition-colors rounded focus:outline-none hover:text-(--btn-primary-bg) dark:hover:text-white relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-(--btn-primary-bg) dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"> Explore</Link>
                            <Link to="/problems" className="text-sm font-medium text-(--text-primary) dark:text-white/80 transition-colors rounded focus:outline-none hover:text-(--btn-primary-bg) dark:hover:text-white relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-(--btn-primary-bg) dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"> Problems </Link>
                            <Link to="#" className="text-sm font-medium text-(--text-primary) dark:text-white/80 transition-colors rounded focus:outline-none hover:text-(--btn-primary-bg) dark:hover:text-white cursor-not-allowed relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-(--btn-primary-bg) dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"> Leaderboard </Link>
                            <Link to="#" className="text-sm font-medium text-(--text-primary) dark:text-white/80 transition-colors rounded focus:outline-none hover:text-(--btn-primary-bg) dark:hover:text-white cursor-not-allowed relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-(--btn-primary-bg) dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"> Challenges </Link>
                        </div>
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex lg:hidden items-center gap-2 relative z-10">
                        <ThemeToggle />
                        {token && user ? (
                            <ProfileDropdown name={user.name} email={user.email} />
                        ) : null}
                    </div>

                    {/* Right Section: Search, Notifications, Profile, Theme Toggle */}
                    <div className="hidden lg:flex items-center justify-end gap-5 relative z-10">

                        {/* Search Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="w-4 h-4 text-(--text-tertiary) group-focus-within:text-(--text-primary) transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-48 xl:w-64 h-9 pl-10 pr-4 text-sm bg-(--bg-secondary) border border-(--border-primary) dark:border-white/10 rounded-full focus:outline-none focus:ring-1 focus:ring-(--btn-primary-bg) dark:focus:ring-white/30 transition-all text-(--text-primary) dark:text-white placeholder:text-(--text-tertiary)"
                            />
                        </div>

                        <div className="w-px h-5 bg-(--border-primary) dark:bg-white/15"></div>

                        {token && user ? (
                            <div className="flex items-center gap-3">
                                {/* Notifications */}
                                <button className="relative p-1.5 text-(--text-secondary) hover:text-(--text-primary) dark:text-white/80 dark:hover:text-white hover:bg-(--bg-tertiary) rounded-full transition-colors outline-none focus:ring-2 focus:ring-(--btn-primary-ring) dark:focus:ring-white/30 cursor-not-allowed" disabled>
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-(--bg-primary) dark:border-zinc-900"></span>
                                </button>

                                {/* Profile Dropdown */}
                                <ProfileDropdown name={user.name} email={user.email} username={user.username || user.email?.split('@')[0]} />
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-sm font-medium text-(--text-primary) dark:text-white/80 hover:text-(--btn-primary-bg) dark:hover:text-white transition-colors"> Login </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-1.5 text-sm font-semibold rounded-full text-(--text-primary) dark:text-white bg-transparent border border-(--text-primary) dark:border-white/30 hover:bg-(--btn-primary-bg) hover:text-(--text-inverse) transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Theme Toggle Last */}
                        <div className="pl-1 scale-90 origin-right flex items-center">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
