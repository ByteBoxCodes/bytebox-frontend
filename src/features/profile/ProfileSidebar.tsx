import type { IUserProfile } from "@/types/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Github,
    Linkedin,
    Twitter,
    Instagram,
    Globe,
    Calendar,
    Link2,
    Star,
} from "lucide-react";
import ProfileSkills from "./ProfileSkills";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { Button } from "@/components/ui/button";

interface ProfileSidebarProps {
    user: IUserProfile;
}

function getInitials(name?: string) {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

function formatDate(d?: string) {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "long" });
}

function SideStatPill({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
            <span className="text-xs text-(--text-secondary) dark:text-(--dk-text-muted)">{label}</span>
            <span className="text-xs font-semibold text-(--text-primary) dark:text-(--dk-text)">{value}</span>
        </div>
    );
}



export default function ProfileSidebar({ user }: ProfileSidebarProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <aside className="w-full lg:w-72 lg:shrink-0 space-y-5 rounded-2xl border border-border/60 bg-(--bg-secondary) dark:bg-(--dk-surface) p-5">

            {/* Avatar + Name */}
            <div className="flex flex-col items-center text-center gap-3 pt-2">
                <Avatar className="h-24 w-24 ring-4 ring-primary/20 shadow-xl">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                        {getInitials(user.name)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-xl font-bold leading-tight text-(--text-primary) dark:text-(--dk-text)">
                        {user.name}
                    </h1>
                    <p className="text-sm text-(--text-secondary) dark:text-(--dk-text-muted) mt-0.5">
                        @{user.username}
                    </p>
                </div>
                {/* Rank badge — static, replace later */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                                 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Star size={11} /> ByteBox Knight
                </span>
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

            {/* Community stats — static, replace later */}
            <div className="px-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-(--text-secondary) dark:text-(--dk-text-muted) mb-2">
                    Community
                </p>
                <SideStatPill label="Global Rank" value="#4,218" />
                <SideStatPill label="Contest Rating" value="1,632" />
                <SideStatPill label="Streak" value="12 days 🔥" />
                <SideStatPill label="Reputation" value="340 pts" />
            </div>

            <hr className="border-border/40" />

            {/* Skills & Languages */}
            <ProfileSkills />

            <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={user} />
        </aside>
    );
}
