import { useParams } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useUserStats } from "@/hooks/useUserStats";
import { useGetPublicProfile } from "@/hooks/useGetPublicProfile";
import { useGetHeaderProfile } from "@/hooks/useGetHeaderProfile";
import type { IUserProfile, IUserStats } from "@/types/auth";
import ProfileSidebar from "./ProfileSidebar";
import ProfilePageSkeleton from "@/fallback/ProfilePageSkeleton";
import ProfileSolvedStats from "./ProfileSolvedStats";
import ProfileActivity from "./ProfileActivity";
import ProfileSubmissions from "./ProfileSubmissions";

export default function ProfilePageContent() {
    const { username } = useParams();
    
    // Auth profile vs Request parameter
    const { data: headerData } = useGetHeaderProfile();
    const currentUser = headerData?.data ?? headerData;
    const isOwnProfile = !username || (currentUser?.username === username);

    // Private Hooks
    const { data: privateProfile, isLoading: isPrivateProfileLoading, isError: isPrivateProfileError } = useProfile();
    const { data: privateStats, isLoading: isPrivateStatsLoading, isError: isPrivateStatsError } = useUserStats();

    // Public Hook
    const { data: publicData, isLoading: isPublicLoading, isError: isPublicError } = useGetPublicProfile(username);

    const isLoading = username ? isPublicLoading : (isPrivateProfileLoading || isPrivateStatsLoading);
    const isError = username ? isPublicError : (isPrivateProfileError || isPrivateStatsError);

    if (isLoading) {
        return <ProfilePageSkeleton />;
    }

    if (isError || (!username && (!privateProfile || !privateStats)) || (username && !publicData)) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 text-center">
                <p className="text-lg font-semibold text-foreground">Couldn't load profile</p>
                <p className="text-sm text-muted-foreground">This profile might not exist or there is a network error.</p>
            </div>
        );
    }

    // Extract correct user & stats reference depending on route context
    const user: IUserProfile = username 
        ? (publicData?.data ?? publicData)
        : (privateProfile?.data ?? privateProfile);
        
    const stats: IUserStats = username
        ? (publicData?.data ?? publicData)
        : (privateStats?.data ?? privateStats);

    const recentSubmissions = username ? ((publicData?.data ?? publicData).recentSubmissions) : undefined;

    return (
        <div className="min-h-screen bg-(--bg-primary) dark:bg-zinc-950 text-(--text-primary) dark:text-(--dk-text)">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-6 items-start">

                    {/* Left sidebar */}
                    <ProfileSidebar user={user} stats={stats} isOwnProfile={isOwnProfile} />

                    {/* Right content */}
                    <div className="flex-1 min-w-0 w-full space-y-5">
                        <ProfileSolvedStats stats={stats} user={user} />
                        <ProfileActivity stats={stats} user={user} />
                        <ProfileSubmissions submissions={recentSubmissions} />
                    </div>

                </div>
            </div>
        </div>
    );
}
