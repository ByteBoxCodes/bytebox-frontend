import { useProfile } from "@/hooks/useProfile";
import { useUserStats } from "@/hooks/useUserStats";
import type { IUserProfile, IUserStats } from "@/types/auth";
import ProfileSidebar from "./ProfileSidebar";
import ProfilePageSkeleton from "@/fallback/ProfilePageSkeleton";
import ProfileSolvedStats from "./ProfileSolvedStats";
import ProfileActivity from "./ProfileActivity";
import ProfileSubmissions from "./ProfileSubmissions";

export default function ProfilePageContent() {
    const { data, isLoading, isError } = useProfile();
    const { data: statsData, isLoading: isStatsLoading, isError: isStatsError } = useUserStats();



    if (isLoading || isStatsLoading) {
        return <ProfilePageSkeleton />;
    }

    if (isError || !data || isStatsError || !statsData) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 text-center">
                <p className="text-lg font-semibold text-foreground">Couldn't load profile</p>
                <p className="text-sm text-muted-foreground">Please try refreshing the page.</p>
            </div>
        );
    }

    const user: IUserProfile = data?.data ?? data;
    const stats: IUserStats = statsData?.data ?? statsData;
    console.log(stats)
    return (
        <div className="min-h-screen bg-(--bg-primary) dark:bg-zinc-950 text-(--text-primary) dark:text-(--dk-text)">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-6 items-start">

                    {/* Left sidebar */}
                    <ProfileSidebar user={user} languages={stats.languages} />


                    {/* Right content */}
                    <div className="flex-1 min-w-0 space-y-5">
                        <ProfileSolvedStats stats={stats} user={user} />
                        <ProfileActivity stats={stats} />
                        <ProfileSubmissions />
                    </div>

                </div>
            </div>
        </div>
    );
}
