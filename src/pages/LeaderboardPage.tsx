import { useGetLeaderboard } from "@/hooks/useGetLeaderboard";
import LeaderboardSkeleton from "@/fallback/LeaderboardSkeleton";
import { useGetHeaderProfile } from "@/hooks/useGetHeaderProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Medal, Award, Flame, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { getLevelInfo } from "@/utils/levelUtils";
import { BADGES } from "@/constants/badges";

export default function LeaderboardPage() {
    const { data: rawUsers, isLoading } = useGetLeaderboard();
    const users = rawUsers?.data || rawUsers;
    const token = localStorage.getItem("token");
    const { data: profileData } = useGetHeaderProfile();
    const currentUser = token ? (profileData?.data ?? profileData) : null;

    let currentUserRank = -1;
    let currentUserStats = null;
    let pointsToNextRank = 0;

    if (users && currentUser?.username && Array.isArray(users)) {
        const index = users.findIndex((u: any) => u.username === currentUser.username);
        if (index !== -1) {
            currentUserRank = index + 1;
            currentUserStats = users[index];

            if (index > 0) {
                const userAbove = users[index - 1];
                pointsToNextRank = userAbove.points - currentUserStats.points;
            } else if (users.length > 1) {
                const userBelow = users[1];
                pointsToNextRank = currentUserStats.points - userBelow.points;
            }
        }
    }

    if (isLoading) {
        return <LeaderboardSkeleton />;
    }

    return (
        <div className="relative h-full flex flex-col overflow-hidden transition-colors duration-200
                        bg-(--bg-secondary) border-t border-(--border-primary)
                        dark:border-(--dk-border)">

            <div className="relative z-10 px-4 w-full sm:px-6 lg:px-6 py-8 overflow-y-auto">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 max-w-7xl mx-auto w-full">

                    {/* Left Content — Leaderboard List */}
                    <div className="flex-1 space-y-6 lg:px-8 min-h-[calc(100vh-12rem)] min-w-0
                                    lg:border-r border-(--border-primary) dark:border-(--dk-border)">

                        <div className="space-y-4">
                            {/* Header Area */}
                            <div className="pb-4">
                                <div className="flex items-center gap-2 justify-between pb-2">
                                    <h2 className="text-2xl font-bold text-foreground font-pj tracking-tight capitalize">
                                        Global Leaderboard
                                    </h2>
                                </div>
                                <p className="mt-2 text-muted-foreground font-pj text-sm max-w-2xl">
                                    Rise through the ranks by solving algorithmic challenges and earning XP.
                                </p>
                            </div>

                            <div className="rounded-lg border-y border-border overflow-x-auto">
                                    <Table>
                                        <TableHeader className="bg-transparent border-b border-border">
                                            <TableRow className="hover:bg-transparent border-0 [&_th]:h-10">
                                                <TableHead className="w-[80px] text-center font-semibold text-muted-foreground">Rank</TableHead>
                                                <TableHead className="font-semibold text-muted-foreground">User</TableHead>
                                                <TableHead className="w-[120px] text-right font-semibold text-muted-foreground hidden sm:table-cell">Solved</TableHead>
                                                <TableHead className="w-[120px] text-right font-semibold text-muted-foreground">XP</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {(!users || users.length === 0) ? (
                                                <TableRow>
                                                    <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                                                        No rankings available.
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                users.map((user: any, index: number) => {
                                                    const isCurrentUser = currentUser?.username === user.username;
                                                    const isEven = index % 2 !== 0;

                                                    const levelInfo = getLevelInfo(user.points, user.level);
                                                    const currentBadge = [...BADGES].reverse().find(b => levelInfo.level >= b.req) || BADGES[0];
                                                    const BadgeIcon = currentBadge.icon;

                                                    let rankDisplay = <span className="text-muted-foreground">{index + 1}</span>;
                                                    if (index === 0) rankDisplay = <Trophy className="w-5 h-5 mx-auto text-yellow-500" />;
                                                    else if (index === 1) rankDisplay = <Medal className="w-5 h-5 mx-auto text-gray-400" />;
                                                    else if (index === 2) rankDisplay = <Award className="w-5 h-5 mx-auto text-amber-600" />;

                                                    return (
                                                        <TableRow
                                                            key={user.username}
                                                            className={`group transition-colors border-0 ${isEven ? "bg-muted/50 hover:bg-muted/80" : "bg-(--bg-secondary) hover:bg-muted/10"} ${isCurrentUser ? "ring-1 ring-inset ring-primary/20 bg-primary/5" : ""}`}
                                                        >
                                                            <TableCell className="text-center py-3 font-medium">
                                                                {rankDisplay}
                                                            </TableCell>
                                                            <TableCell className="py-3">
                                                                <div className="flex items-center gap-3">
                                                                    <Avatar className="h-8 w-8 rounded-md">
                                                                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                                                                        <AvatarFallback className="rounded-md bg-muted text-foreground text-xs font-medium">
                                                                            {user.name?.charAt(0).toUpperCase()}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <div className="flex flex-col">
                                                                        <span className="font-medium text-foreground flex items-center gap-2">
                                                                            {user.name}
                                                                            {isCurrentUser && (
                                                                                <span className="text-[10px] px-1.5 py-0 rounded text-primary bg-primary/10 font-bold uppercase tracking-wider">You</span>
                                                                            )}
                                                                        </span>
                                                                        <span className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                                                                            <span>@{user.username}</span>
                                                                            <span className="text-[10px] text-muted-foreground/40">•</span>
                                                                            <div className="flex items-center gap-1">
                                                                                <BadgeIcon size={12} className={`${currentBadge.color} ${currentBadge.fill}`} />
                                                                                <span className={`font-bold text-[10px] uppercase tracking-wider ${currentBadge.color}`}>
                                                                                    {currentBadge.title}
                                                                                </span>
                                                                                <span className="text-[10px] text-muted-foreground/40 leading-none pb-px">•</span>
                                                                                <span className="font-medium text-[10px] uppercase tracking-wider text-muted-foreground">
                                                                                    Lvl {levelInfo.level}
                                                                                </span>
                                                                            </div>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="py-3 text-right hidden sm:table-cell">
                                                                <span className="font-medium text-muted-foreground">
                                                                    {user.totalProblemsolved}
                                                                </span>
                                                            </TableCell>
                                                            <TableCell className="py-3 text-right">
                                                                <span className="font-semibold text-emerald-600 dark:text-emerald-500">
                                                                    {user.points} XP
                                                                </span>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })
                                            )}
                                        </TableBody>
                                    </Table>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar — Widgets (matches ProblemPage RightSidebar width/padding) */}
                    <div className="shrink-0 w-full lg:w-[26%] space-y-6 lg:pl-8">
                        {currentUser ? (
                            <div className="space-y-6 sticky top-8">
                                {/* Rank Widget */}
                                <div className="pb-5 border-b border-border">
                                    <div className="flex items-center mb-4">
                                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                            <Trophy className="w-5 h-5" />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-lg font-bold text-foreground font-pj tracking-tight">Your Rank</h3>
                                            <p className="text-xs text-muted-foreground">@{currentUser.username}</p>
                                        </div>
                                    </div>

                                    <div className="mb-5 space-y-2">
                                        <div className="flex justify-between items-end">
                                            <span className="text-sm font-medium text-foreground">Position</span>
                                            <span className="text-xs font-semibold text-muted-foreground">
                                                {currentUserRank !== -1 ? `#${currentUserRank}` : "Unranked"}
                                            </span>
                                        </div>
                                        {currentUserRank > 1 && (
                                            <>
                                                <Progress value={(currentUserStats?.points || 0) / ((currentUserStats?.points || 0) + pointsToNextRank) * 100} className="h-2 w-full bg-secondary" />
                                                <p className="text-xs text-muted-foreground text-right">
                                                    {pointsToNextRank} XP to next rank
                                                </p>
                                            </>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-semibold text-muted-foreground">Total XP</span>
                                            <span className="text-xs text-foreground font-medium">{currentUserStats?.points || 0}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-semibold text-muted-foreground">Problems Solved</span>
                                            <span className="text-xs text-foreground font-medium">{currentUserStats?.totalProblemsolved || 0}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Streak Widget (Refined version from RightSidebar) */}
                                <div className="bg-linear-to-br from-orange-500 to-red-600 rounded-xl p-5 text-white shadow-md relative overflow-hidden">
                                    <div className="absolute -right-6 -bottom-6 opacity-30">
                                        <Flame className="w-24 h-24" />
                                    </div>

                                    <div className="relative z-10 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-orange-100">Current Streak</p>
                                            <p className="mt-1 text-3xl font-bold font-pj tracking-tight">{currentUser?.currentStreak || 0} Days</p>
                                        </div>
                                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/10 shadow-sm">
                                            <Flame className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="sticky top-8 pb-5">
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <h3 className="ml-3 text-lg font-bold text-foreground font-pj tracking-tight">Join Leaderboard</h3>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Log in to see your rank and start earning XP by solving algorithmic challenges.
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
