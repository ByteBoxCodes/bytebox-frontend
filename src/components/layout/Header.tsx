import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import ProfileDropdown from "@/features/profile/ProfileDropdown";
import { Search, Menu, X, Zap, Flame, Layers } from "lucide-react";
import { useGetHeaderProfile } from "@/hooks/useGetHeaderProfile";
import HeaderProfileSkeleton from "@/fallback/HeaderProfileSkeleton";
import SearchModal from "@/features/problem/SearchModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const token = localStorage.getItem("token");

  const { data, isLoading } = useGetHeaderProfile();
  const user = token ? (data?.data ?? data) : null;

  console.log(user);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowSearchModal((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="relative py-2 bg-(--bg-secondary)  dark:border-white/8 transition-colors duration-200 z-50">
      <SearchModal open={showSearchModal} onOpenChange={setShowSearchModal} />

      <div className="relative px-4 w-full sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left Section: Logo & Navigation */}
          <div className="flex items-center gap-8">
            <div className="shrink-0 flex items-center">
              <Link
                to="/"
                title=""
                className="flex rounded outline-none py-1 relative z-10 items-center gap-1 "
              >
                <Layers className="w-5 h-5 md:size-6 mb-0.5" />
                <div className="flex flex-col items-end justify-center">
                  <span className="text-md md:text-md font-bold tracking-tight text-(--text-primary) dark:text-white leading-none">
                    ByteBox
                  </span>
                  <span className="text-[8px] text-(--text-tertiary) font-mono tracking-widest leading-none mt-0.5">
                    &lt;codes/&gt;
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 relative z-10">
              <Link
                to="/"
                className="text-sm font-medium text-(--text-primary) dark:text-white/80 transition-colors rounded focus:outline-none hover:text-(--btn-primary-bg) dark:hover:text-white relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-(--btn-primary-bg) dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                {" "}
                Explore
              </Link>
              <Link
                to="/problems"
                className="text-sm font-medium text-(--text-primary) dark:text-white/80 transition-colors rounded focus:outline-none hover:text-(--btn-primary-bg) dark:hover:text-white relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-(--btn-primary-bg) dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                {" "}
                Problems{" "}
              </Link>
              <Link
                to="/leaderboard"
                className="text-sm font-medium text-(--text-primary) dark:text-white/80 transition-colors rounded focus:outline-none hover:text-(--btn-primary-bg) dark:hover:text-white relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-(--btn-primary-bg) dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                {" "}
                Leaderboard{" "}
              </Link>
            </div>
          </div>

          {/* Mobile Controls (Always visible on small screens) */}
          <div className="flex md:hidden items-center gap-2 relative z-10">
            <ThemeToggle />
            {token && isLoading ? (
              <HeaderProfileSkeleton />
            ) : token && user ? (
              <ProfileDropdown
                name={user.name}
                email={user.email}
                preferredLanguage={user.preferredLanguage}
              />
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
                placeholder="Search (⌘K)..."
                className="cursor-pointer w-48 xl:w-64 h-9 pl-10 pr-4 text-sm bg-(--bg-secondary) border border-(--border-primary) dark:border-white/10 rounded-full focus:outline-none focus:ring-1 focus:ring-(--btn-primary-bg) dark:focus:ring-white/30 transition-all text-(--text-primary) dark:text-white placeholder:text-(--text-tertiary)"
                readOnly
                onClick={() => setShowSearchModal(true)}
              />
            </div>

            <div className="w-px h-5 bg-(--border-primary) dark:bg-white/15 hidden lg:block"></div>

            {token && isLoading ? (
              <HeaderProfileSkeleton />
            ) : token && user ? (
              <div className="flex items-center gap-3">
                {/* Streak */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="">
                    <button className="flex items-center gap-1.5 px-2 py-1.5 text-(--text-secondary) hover:text-(--text-primary) dark:text-white/80 dark:hover:text-white hover:bg-(--bg-tertiary) rounded-full transition-colors outline-none focus:ring-(--btn-primary-ring) dark:focus:ring-white/30 cursor-pointer">
                      <div className="relative flex items-center justify-center">
                        <Flame
                          className="size-4 text-orange-500 fill-orange-500 origin-bottom"
                          style={{
                            animation: "fire-grow 1.5s ease-in-out infinite",
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold text-(--text-primary) dark:text-white">
                        {user?.currentStreak || 0}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    sideOffset={8}
                    className="w-48 rounded-xl border border-border bg-popover shadow-xl p-1.5"
                  >
                    <div className="flex flex-col gap-2 p-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-orange-500/10 rounded-lg">
                            <Flame
                              className="w-4 h-4 text-orange-500 fill-orange-500 origin-bottom"
                              style={{
                                animation:
                                  "fire-grow 1.5s ease-in-out infinite",
                              }}
                            />
                          </div>
                          <span className="text-xs font-medium text-foreground">
                            Current Streak
                          </span>
                        </div>
                        <span className="text-xs font-bold text-foreground">
                          {user?.currentStreak || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-yellow-500/10 rounded-lg">
                            <Zap className="size-4 text-yellow-500 fill-yellow-500" />
                          </div>
                          <span className="text-xs font-medium text-foreground">
                            Longest Streak
                          </span>
                        </div>
                        <span className="text-xs font-bold text-foreground">
                          {user?.maxStreak || 0}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuContent>
                  <style>{`
                                        @keyframes fire-grow {
                                            0%, 100% { transform: scaleY(0.85); opacity: 0.8; }
                                            50% { transform: scaleY(1.15); opacity: 1; }
                                        }
                                    `}</style>
                </DropdownMenu>

                {/* Profile Dropdown */}
                <ProfileDropdown
                  name={user.name}
                  email={user.email}
                  username={user.username || user.email?.split("@")[0]}
                  imageUrl={user.avatarUrl}
                  preferredLanguage={user.preferredLanguage}
                />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-(--text-primary) dark:text-white/80 hover:text-(--btn-primary-bg) dark:hover:text-white transition-colors"
                >
                  {" "}
                  Login{" "}
                </Link>
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
                  className="cursor-pointer w-full h-10 pl-10 pr-4 text-sm bg-(--bg-secondary) border border-(--border-primary) dark:border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-(--btn-primary-bg) dark:focus:ring-white/30 text-(--text-primary) dark:text-white placeholder:text-(--text-tertiary)"
                  readOnly
                  onClick={() => {
                    setShowSearchModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                />
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col space-y-2">
                <Link
                  to="/"
                  onClick={toggleMobileMenu}
                  className="px-3 py-2 rounded-lg text-base font-medium text-(--text-primary) dark:text-white hover:bg-(--bg-tertiary) transition-colors"
                >
                  {" "}
                  Explore{" "}
                </Link>
                <Link
                  to="/problems"
                  onClick={toggleMobileMenu}
                  className="px-3 py-2 rounded-lg text-base font-medium text-(--text-primary) dark:text-white hover:bg-(--bg-tertiary) transition-colors"
                >
                  {" "}
                  Problems{" "}
                </Link>
                <Link
                  to="/leaderboard"
                  onClick={toggleMobileMenu}
                  className="px-3 py-2 rounded-lg text-base font-medium text-(--text-primary) dark:text-white hover:bg-(--bg-tertiary) transition-colors"
                >
                  {" "}
                  Leaderboard{" "}
                </Link>
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
