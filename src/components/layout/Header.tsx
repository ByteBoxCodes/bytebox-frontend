import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import ProfileDropdown from "@/features/profile/ProfileDropdown";
import { useProfile } from "@/hooks/useProfile";
import { Search, Bell, Menu, X } from "lucide-react";

export default function Header() {
    const token = localStorage.getItem("token");
    const { data } = useProfile();
    const user = token ? (data?.data ?? data) : null;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

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
                        <div className="hidden md:flex items-center space-x-6 relative z-10">
                            <Link to="/" className="text-sm font-medium text-(--text-primary) dark:text-white/80 transition-colors rounded focus:outline-none hover:text-(--btn-primary-bg) dark:hover:text-white relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-(--btn-primary-bg) dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"> Explore</Link>
                            <Link to="/problems" className="text-sm font-medium text-(--text-primary) dark:text-white/80 transition-colors rounded focus:outline-none hover:text-(--btn-primary-bg) dark:hover:text-white relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-(--btn-primary-bg) dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"> Problems </Link>
                            <Link to="#" className="text-sm font-medium text-(--text-primary) dark:text-white/80 transition-colors rounded focus:outline-none hover:text-(--btn-primary-bg) dark:hover:text-white cursor-not-allowed relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-(--btn-primary-bg) dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"> Leaderboard </Link>
                            <Link to="#" className="text-sm font-medium text-(--text-primary) dark:text-white/80 transition-colors rounded focus:outline-none hover:text-(--btn-primary-bg) dark:hover:text-white cursor-not-allowed relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-(--btn-primary-bg) dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"> Challenges </Link>
                        </div>
                    </div>

                    {/* Mobile Controls (Always visible on small screens) */}
                    <div className="flex md:hidden items-center gap-2 relative z-10">
                        <ThemeToggle />
                        {token && user ? (
                            <ProfileDropdown name={user.name} email={user.email} />
                        ) : null}
                        <button
                            type="button"
                            onClick={toggleMobileMenu}
                            className="text-(--text-primary) dark:text-white p-1.5 hover:bg-(--bg-tertiary) rounded-md transition-colors ml-1 focus:outline-none focus:ring-2 focus:ring-(--btn-primary-ring) dark:focus:ring-white/30"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">Open menu</span>
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>

                    {/* Right Section: Search, Notifications, Profile, Theme Toggle (Desktop) */}
                    <div className="hidden md:flex items-center justify-end gap-5 relative z-10">
                        {/* Search Input */}
                        <div className="relative group hidden lg:block">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="w-4 h-4 text-(--text-tertiary) group-focus-within:text-(--text-primary) transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-48 xl:w-64 h-9 pl-10 pr-4 text-sm bg-(--bg-secondary) border border-(--border-primary) dark:border-white/10 rounded-full focus:outline-none focus:ring-1 focus:ring-(--btn-primary-bg) dark:focus:ring-white/30 transition-all text-(--text-primary) dark:text-white placeholder:text-(--text-tertiary)"
                            />
                        </div>

                        <div className="w-px h-5 bg-(--border-primary) dark:bg-white/15 hidden lg:block"></div>

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

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden relative z-10 mt-4 pb-4 border-t border-(--border-primary) dark:border-white/10 pt-4 animate-in slide-in-from-top-4 fade-in duration-200">
                        <div className="flex flex-col space-y-4">
                            {/* Mobile Search */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Search className="w-4 h-4 text-(--text-tertiary)" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full h-10 pl-10 pr-4 text-sm bg-(--bg-secondary) border border-(--border-primary) dark:border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-(--btn-primary-bg) dark:focus:ring-white/30 text-(--text-primary) dark:text-white placeholder:text-(--text-tertiary)"
                                />
                            </div>

                            {/* Mobile Navigation Links */}
                            <nav className="flex flex-col space-y-2">
                                <Link to="/" onClick={toggleMobileMenu} className="px-3 py-2 rounded-lg text-base font-medium text-(--text-primary) dark:text-white hover:bg-(--bg-tertiary) transition-colors"> Explore </Link>
                                <Link to="/problems" onClick={toggleMobileMenu} className="px-3 py-2 rounded-lg text-base font-medium text-(--text-primary) dark:text-white hover:bg-(--bg-tertiary) transition-colors"> Problems </Link>
                                <Link to="#" onClick={toggleMobileMenu} className="px-3 py-2 rounded-lg text-base font-medium text-(--text-primary) dark:text-white hover:bg-(--bg-tertiary) transition-colors cursor-not-allowed opacity-70"> Leaderboard </Link>
                                <Link to="#" onClick={toggleMobileMenu} className="px-3 py-2 rounded-lg text-base font-medium text-(--text-primary) dark:text-white hover:bg-(--bg-tertiary) transition-colors cursor-not-allowed opacity-70"> Challenges </Link>
                            </nav>

                            {/* Mobile Auth Actions */}
                            {(!token || !user) && (
                                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-(--border-primary) dark:border-white/10">
                                    <Link
                                        to="/login"
                                        onClick={toggleMobileMenu}
                                        className="flex justify-center items-center px-4 py-2 text-sm font-semibold rounded-lg text-(--text-primary) dark:text-white bg-(--bg-tertiary) w-full hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        onClick={toggleMobileMenu}
                                        className="flex justify-center items-center px-4 py-2 text-sm font-semibold rounded-lg text-white bg-(--btn-primary-bg) dark:bg-white dark:text-zinc-950 w-full hover:bg-(--btn-primary-hover) dark:hover:bg-gray-200 transition-colors"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
