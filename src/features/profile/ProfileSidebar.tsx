import type { IUserProfile } from "@/types/auth";
import { getLevelInfo } from "@/utils/levelUtils";
import {
    Github,
    Linkedin,
    Twitter,
    Instagram,
    Globe,
    Calendar,
    Link2,
    Rocket,
    Pencil,
    Languages,
} from "lucide-react";
import ProfileSkills from "./ProfileSkills";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { Button } from "@/components/ui/button";
import ProfileAvatar from "./ProfileAvatar";
import { PREFERRED_LANGUAGE_OPTIONS } from "@/features/submission/languageOptions";
import LanguagePickerModal from "./LanguagePickerModal";
import { BADGES } from "@/constants/badges";

interface ProfileSidebarProps {
    user: IUserProfile;
    languages: string[];
}

function formatDate(d?: string) {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "long" });
}

export default function ProfileSidebar({ user, languages }: ProfileSidebarProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isLangModalOpen, setIsLangModalOpen] = useState(false);

    const currentLangLabel = PREFERRED_LANGUAGE_OPTIONS.find(
        (o) => o.value === user.preferredLanguage?.toLowerCase()
    )?.label ?? "Not set";

    const points = user.points ?? 0;
    const levelInfo = getLevelInfo(points, user.level);

    // Reverse find highest unlocked badge to map styling
    const currentBadge = [...BADGES].reverse().find(b => levelInfo.level >= b.req) || BADGES[0];
    const BadgeIcon = currentBadge.icon;

    // Reverse find highest unlocked badge to map styling
    return (
        <aside className="relative w-full lg:w-72 lg:shrink-0 space-y-5 rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-5 ">
            {/* Avatar + Info */}
            <div className="flex items-center gap-4 pt-2 pl-2">
                {/* Left: Avatar with Progress */}
                <div className="relative shrink-0 flex items-center justify-center">
                    <svg
                        className="absolute w-[88px] h-[88px] rotate-90 pointer-events-none"
                        viewBox="0 0 96 96"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Background circle */}
                        <circle
                            cx="48"
                            cy="48"
                            r="43"
                            stroke="currentColor"
                            className="text-border/40"
                            strokeWidth="2.5"
                        />
                        {/* Progress circle */}
                        <circle
                            cx="48"
                            cy="48"
                            r="43"
                            stroke="url(#avatar-gray-gradient)"
                            className="transition-all duration-1000 ease-out"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray={2 * Math.PI * 43}
                            strokeDashoffset={2 * Math.PI * 43 * (1 - Math.min(100, Math.max(0, points < (levelInfo.level * 15) ? (points / (levelInfo.level * 15)) * 100 : 100)) / 100)}
                        />
                        <defs>
                            <linearGradient id="avatar-gray-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" className="[stop-color:var(--color-zinc-200)]" />
                                <stop offset="100%" className="[stop-color:var(--color-zinc-400)] dark:[stop-color:var(--color-zinc-600)]" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <ProfileAvatar name={user.name} imageUrl={user.avatarUrl} size="lg" className="z-10 bg-background w-[72px] h-[72px]" />
                </div>

                {/* Right: Info */}
                <div className="flex flex-col min-w-0 flex-1 justify-center">
                    <h1 className="text-lg font-bold leading-tight text-(--text-primary) dark:text-(--dk-text) truncate pr-2">
                        {user.name}
                    </h1>
                    <p className="text-xs text-(--text-secondary) dark:text-(--dk-text-muted) truncate mt-0.5">
                        @{user.username}
                    </p>

                    {/* Level / Points Block */}
                    <div className="mt-2.5 flex flex-col gap-1.5 w-full">
                        <div className="flex items-center justify-between w-full max-w-[140px]">
                            <div className="flex items-center gap-1">
                                <BadgeIcon size={12} className={`${currentBadge.color} ${currentBadge.fill}`} />
                                <span className="text-xs font-semibold text-(--text-primary) dark:text-(--dk-text)">
                                    Level {levelInfo.level}
                                </span>
                            </div>
                            <p className="text-[10px] text-(--text-secondary) dark:text-(--dk-text-muted) font-medium font-mono">
                                <span className={`font-bold ${currentBadge.color}`}>{points}</span> / {levelInfo.level * 15}
                            </p>
                        </div>

                        {/* Mini Linear Progress Bar */}
                        <div className="h-1.5 w-full max-w-[140px] bg-border/40 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ${currentBadge.bg.replace('/10', '')}`}
                                style={{ width: `${Math.min(100, Math.max(0, points < (levelInfo.level * 15) ? (points / (levelInfo.level * 15)) * 100 : 100))}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bio */}
            {user.bio ? (
                <p className="text-sm text-(--text-secondary) dark:text-(--dk-text-muted) text-center leading-relaxed px-2">
                    {user.bio}
                </p>
            ) : (
                <p className="text-sm text-(--text-secondary) dark:text-(--dk-text-muted) text-center leading-relaxed px-2 italic">
                    No bio available...!!
                </p>
            )}

            {/* Social icons */}
            {(() => {
                const activeSocials = [];

                if (user.githubUsername && user.githubUsername.trim() !== "") {
                    activeSocials.push({ icon: Github, href: `https://github.com/${user.githubUsername.replace(/^@/, '')}`, label: "GitHub", username: user.githubUsername });
                }
                if (user.linkedinUsername && user.linkedinUsername.trim() !== "") {
                    activeSocials.push({ icon: Linkedin, href: `https://linkedin.com/in/${user.linkedinUsername.replace(/^@/, '')}`, label: "LinkedIn", username: user.linkedinUsername });
                }
                if (user.twitterUsername && user.twitterUsername.trim() !== "") {
                    activeSocials.push({ icon: Twitter, href: `https://twitter.com/${user.twitterUsername.replace(/^@/, '')}`, label: "Twitter", username: user.twitterUsername });
                }
                if (user.instagramUsername && user.instagramUsername.trim() !== "") {
                    activeSocials.push({ icon: Instagram, href: `https://instagram.com/${user.instagramUsername.replace(/^@/, '')}`, label: "Instagram", username: user.instagramUsername });
                }
                if (user.websiteUrl && user.websiteUrl.trim() !== "") {
                    const cleanWebsite = user.websiteUrl.trim();
                    activeSocials.push({ icon: Globe, href: cleanWebsite.startsWith('http') ? cleanWebsite : `https://${cleanWebsite}`, label: "Website", username: cleanWebsite });
                }

                if (activeSocials.length === 0) return null;

                return (
                    <div className="flex justify-center gap-3">
                        {activeSocials.map(({ icon: Icon, href, label, username }) => {
                            return (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={label}
                                    title={username ? (label === "Website" ? username : `@${username.replace(/^@/, '')}`) : label}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg
                                           bg-(--bg-secondary) dark:bg-(--dk-surface)
                                           border border-border/60
                                           text-(--text-secondary) dark:text-(--dk-text-muted)
                                           hover:text-(--text-primary) dark:hover:text-(--dk-text)
                                           hover:border-primary/40 transition-colors duration-150"
                                >
                                    <Icon size={14} />
                                </a>
                            );
                        })}
                    </div>
                );
            })()}

            <Button
                className="w-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 font-semibold shadow-none"
                onClick={() => setIsEditModalOpen(true)}
            >
                Edit Profile
            </Button>

            <hr className="border-border/40" />

            {/* Level Progression Journey */}
            <div className="px-1">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-(--text-secondary) dark:text-(--dk-text-muted)">
                        Rank Journey
                    </p>
                </div>

                <div className="relative pt-1 pb-1">
                    {/* Progress Background Line */}
                    <div className="absolute top-5 left-5 right-5 h-1.5 bg-border/40 rounded-full overflow-hidden">
                        {/* Active Progress Line */}
                        <div
                            className="h-full bg-linear-to-r from-emerald-500 via-purple-500 to-amber-500 transition-all duration-1000 relative"
                            style={{
                                width: `${Math.min(100, Math.max(0,
                                    levelInfo.level < 15 ? ((levelInfo.level - 1) / 14) * 25 :
                                        levelInfo.level < 30 ? 25 + ((levelInfo.level - 15) / 15) * 25 :
                                            levelInfo.level < 40 ? 50 + ((levelInfo.level - 30) / 10) * 25 :
                                                levelInfo.level < 50 ? 75 + ((levelInfo.level - 40) / 10) * 25 : 100
                                ))}%`
                            }}
                        >
                            <div className="absolute inset-0 bg-white/30 w-full animate-[shimmer_2s_infinite]" />
                        </div>
                    </div>

                    <div className="relative flex justify-between">
                        {BADGES.map((badge, idx) => {
                            const isUnlocked = levelInfo.level >= badge.req;
                            const isCurrent = levelInfo.level >= badge.req && (idx === 4 || levelInfo.level < BADGES[idx + 1].req);
                            const Icon = badge.icon;

                            return (
                                <div key={badge.req} className="flex flex-col items-center group relative w-10 cursor-default">
                                    {/* Tooltip */}
                                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 border border-zinc-700 text-white text-[10px] font-bold px-2 py-1.5 rounded-md shadow-xl whitespace-nowrap z-20 pointer-events-none">
                                        Unlocks at LVL {badge.req}
                                    </div>

                                    <div
                                        className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-transform duration-300 bg-(--bg-primary)
                                            ${isUnlocked ? `${badge.border} ${badge.color}` : 'border-border/60 text-(--text-tertiary) dark:text-(--dk-text-muted)/40 bg-secondary/50'}
                                            ${isCurrent ? 'scale-125 bg-(--bg-secondary) z-20 border-opacity-100' : 'hover:scale-110'}
                                        `}
                                    >
                                        <Icon size={isCurrent ? 14 : 12} className={isUnlocked && isCurrent ? "animate-pulse" : ""} />
                                    </div>
                                    <span className={`mt-2.5 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-tighter sm:tracking-tighter transition-colors ${isUnlocked ? 'text-(--text-primary) dark:text-(--dk-text)' : 'text-(--text-tertiary) dark:text-(--dk-text-muted)/40'}`}>
                                        {badge.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <hr className="border-border/40" />

            {/* Meta info */}
            <div className="space-y-2.5 text-sm px-1">

                <div className="flex items-center gap-2.5 text-(--text-secondary) dark:text-(--dk-text-muted)">
                    <Link2 size={14} className="shrink-0" />
                    {user.websiteUrl ? (
                        <a href={user.websiteUrl.startsWith('http') ? user.websiteUrl : `https://${user.websiteUrl}`} target="_blank" rel="noreferrer" className="text-xs hover:underline truncate">
                            {user.websiteUrl.replace(/^https?:\/\//, '')}
                        </a>
                    ) : (
                        <span className="text-xs">Not available</span>
                    )}
                </div>

                <div className="flex items-center gap-2.5 text-(--text-secondary) dark:text-(--dk-text-muted)">
                    <Calendar size={14} className="shrink-0" />
                    <span className="text-xs">Joined {formatDate(user.createdAt)}</span>
                </div>
            </div>

            <hr className="border-border/40" />

            {/* Preferred Language */}
            <div className="px-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-(--text-secondary) dark:text-(--dk-text-muted) mb-2">
                    Preferred Language
                </p>
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-(--text-secondary) dark:text-(--dk-text-muted)">
                        <Languages size={14} className="shrink-0" />
                        <span className="text-xs font-medium">{currentLangLabel}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsLangModalOpen(true)}
                        className="p-1 rounded-md text-(--text-secondary) dark:text-(--dk-text-muted) hover:text-(--text-primary) dark:hover:text-(--dk-text) hover:bg-(--bg-tertiary) transition-colors"
                        title="Edit preferred language"
                    >
                        <Pencil size={12} />
                    </button>
                </div>
            </div>

            <hr className="border-border/40" />



            {/* Community stats — static, replace later */}
            <div className="px-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-(--text-secondary) dark:text-(--dk-text-muted) mb-2">
                    Community
                </p>
                <div className="flex flex-col items-center justify-center py-5 px-3 mt-2 rounded-xl border border-dashed border-border flex-1 bg-primary/5 dark:bg-primary/10">
                    <Rocket className="text-primary/60 mb-2 animate-pulse" size={20} />
                    <p className="text-sm font-medium text-(--text-primary) dark:text-(--dk-text)">
                        Coming Soon
                    </p>
                    <p className="text-xs text-center text-(--text-secondary) dark:text-(--dk-text-muted) mt-1">
                        Community stats and rankings are on the way!
                    </p>
                </div>
            </div>

            <hr className="border-border/40" />

            {/* Skills & Languages */}
            <ProfileSkills languages={languages} />

            <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={user} />
            <LanguagePickerModal isOpen={isLangModalOpen} onClose={() => setIsLangModalOpen(false)} currentLanguage={user.preferredLanguage} />
        </aside>
    );
}
