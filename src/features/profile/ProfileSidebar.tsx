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
import { RankJourney } from "@/components/common/RankJourney";
import RankBadge from "@/components/common/RankBadge";
import { getRankBadge } from "@/utils/rankBadge";

interface ProfileSidebarProps {
    user: IUserProfile;
    languages: string[];
    isOwnProfile?: boolean;
}

function formatDate(d1?: string, d2?: string) {
    const d = d1 || d2;
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "long" });
}

export default function ProfileSidebar({ user, languages, isOwnProfile = true }: ProfileSidebarProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isLangModalOpen, setIsLangModalOpen] = useState(false);

    const currentLangLabel = PREFERRED_LANGUAGE_OPTIONS.find(
        (o) => o.value === user.preferredLanguage?.toLowerCase()
    )?.label ?? "Not set";

    const points = user.points ?? 0;
    const levelInfo = getLevelInfo(points, user.level, user.levelXp);
    
    // Get badge properties for styling other elements (like the progress bar)
    const badge = getRankBadge(points, user.level, user.levelXp);
    return (
        <aside className="relative w-full lg:w-72 lg:shrink-0 space-y-5 rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-4 sm:p-5">
            {/* Avatar + Info */}
            <div className="flex items-center gap-4 pt-2 sm:pl-2">
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
                            strokeDashoffset={2 * Math.PI * 43 * (1 - (levelInfo.progressPercent / 100))}
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
                    <div className="flex items-center gap-1.5 mt-0.5 text-xs text-(--text-secondary) dark:text-(--dk-text-muted) truncate">
                        <span>@{user.username}</span>
                        <span className="text-[10px] opacity-40">•</span>
                        <span className={`font-semibold ${badge.color}`}>{levelInfo.currentPoints} XP</span>
                    </div>

                    {/* Level / Points Block */}
                    <div className="mt-2.5 flex flex-col gap-1.5 w-full">
                        <div className="flex items-center justify-between w-full max-w-[180px] sm:max-w-[140px]">
                            <div className="flex items-center gap-1">
                                <RankBadge badge={badge} variant="inline" size="sm" />
                            </div>
                            <p className="text-[10px] text-(--text-secondary) dark:text-(--dk-text-muted) font-medium font-mono">
                                <span className={`font-bold ${badge.color}`}>{levelInfo.levelXp}</span> / {levelInfo.pointsForNextLevel}
                            </p>
                        </div>

                        {/* Mini Linear Progress Bar */}
                        <div className="h-1.5 w-full max-w-[180px] sm:max-w-[140px] bg-border/40 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ${badge.bg.replace('/10', '')}`}
                                style={{ width: `${levelInfo.progressPercent}%` }}
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

            {isOwnProfile && (
                <Button
                    className="w-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 font-semibold shadow-none"
                    onClick={() => setIsEditModalOpen(true)}
                >
                    Edit Profile
                </Button>
            )}

            <hr className="border-border/40" />

            {/* Level Progression Journey */}
            <RankJourney levelInfo={levelInfo} />

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
                    <span className="text-xs">Joined {formatDate(user.createdAt, user.memberSince)}</span>
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
                    {isOwnProfile && (
                        <button
                            type="button"
                            onClick={() => setIsLangModalOpen(true)}
                            className="p-1 rounded-md text-(--text-secondary) dark:text-(--dk-text-muted) hover:text-(--text-primary) dark:hover:text-(--dk-text) hover:bg-(--bg-tertiary) transition-colors"
                            title="Edit preferred language"
                        >
                            <Pencil size={12} />
                        </button>
                    )}
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

            {isOwnProfile && (
                <>
                    <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={user} />
                    <LanguagePickerModal isOpen={isLangModalOpen} onClose={() => setIsLangModalOpen(false)} currentLanguage={user.preferredLanguage} />
                </>
            )}
        </aside>
    );
}
