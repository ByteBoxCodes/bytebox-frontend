import { useProfile } from "@/hooks/useProfile";
import type { IUserProfile } from "@/types/auth";
import ProfileAvatar from "./ProfileAvatar";
import ProfileInfo from "./ProfileInfo";
import ProfileStats from "./ProfileStats";
import { Loader2 } from "lucide-react";

export default function ProfilePageContent() {
    const { data, isLoading, isError } = useProfile();

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 text-center">
                <p className="text-lg font-semibold text-foreground">
                    Couldn't load profile
                </p>
                <p className="text-sm text-muted-foreground">
                    Please try refreshing the page.
                </p>
            </div>
        );
    }

    const user: IUserProfile = data?.data ?? data;

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Banner */}
            <div className="relative h-36 w-full overflow-hidden bg-linear-to-br from-primary/10 via-secondary to-primary/5">
                <div className="absolute inset-0 bg-grid-white/5" />
            </div>

            {/* Avatar + Name Overlay */}
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="-mt-10 mb-6 flex items-end gap-4">
                    <ProfileAvatar
                        name={user.name}
                        size="lg"
                        className="ring-4 ring-background shadow-lg"
                    />
                    <div className="mb-1">
                        <h1 className="text-2xl font-bold text-foreground leading-tight">
                            {user.name}
                        </h1>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid gap-5 pb-16 sm:grid-cols-1 md:grid-cols-2">
                    <ProfileInfo user={user} />
                    <ProfileStats user={user} />
                </div>
            </div>
        </div>
    );
}
