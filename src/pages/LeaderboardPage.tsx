import { useGetLeaderboard } from "@/hooks/useGetLeaderboard";
import LeaderboardSkeleton from "@/fallback/LeaderboardSkeleton";
import { useGetHeaderProfile } from "@/hooks/useGetHeaderProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Crown, Medal, Flame, User, Trophy, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import RankBadge from "@/components/common/RankBadge";
import { Link } from "react-router-dom";
function TopUserCard({
  user,
  rank,
  isFirst = false,
}: {
  user: any;
  rank: number;
  isFirst?: boolean;
}) {
  if (!user) return null;

  const rankConfig = {
    1: {
      color: "text-yellow-600 dark:text-yellow-500",
      bgClass:
        "bg-yellow-500/10 border-yellow-500/30 dark:bg-yellow-500/5 dark:border-yellow-500/20",
      icon: <Crown className="w-5 h-5 text-yellow-500" />,
      avatarRing:
        "ring-2 ring-yellow-400 dark:ring-yellow-500 ring-offset-2 ring-offset-background",
    },
    2: {
      color: "text-slate-600 dark:text-slate-400",
      bgClass:
        "bg-slate-500/10 border-slate-300 dark:bg-slate-500/5 dark:border-slate-600/50",
      icon: <Medal className="w-4 h-4 text-slate-500 dark:text-slate-400" />,
      avatarRing:
        "ring-2 ring-slate-300 dark:ring-slate-500 ring-offset-2 ring-offset-background",
    },
    3: {
      color: "text-orange-600 dark:text-orange-500",
      bgClass:
        "bg-orange-500/10 border-orange-500/30 dark:bg-orange-500/5 dark:border-orange-500/20",
      icon: <Medal className="w-4 h-4 text-orange-500" />,
      avatarRing:
        "ring-2 ring-orange-400 dark:ring-orange-600 ring-offset-2 ring-offset-background",
    },
  };

  const s = rankConfig[rank as keyof typeof rankConfig];

  return (
    <div
      className={`relative flex flex-col items-center transition-all p-4 pt-6 mt-4 rounded-2xl border backdrop-blur-md shadow-sm ${s.bgClass} ${isFirst ? "scale-105 shadow-xl top-0 z-20 w-[140px] sm:w-[170px]" : "w-[130px] sm:w-[150px] opacity-90 hover:opacity-100 mt-8"} `}
    >
      {/* Floating Crown/Medal Top Center */}
      <div className="absolute -top-4 w-9 h-9 rounded-full border border-border shadow-xs bg-(--bg-secondary) flex items-center justify-center z-20">
        {s.icon}
      </div>

      {/* Absolute Rank Number Overlay inside Card (Subtle) */}
      <span
        className={`absolute top-1 right-2 font-black italic text-2xl ${s.color} opacity-30 select-none pointer-events-none`}
      >
        #{rank}
      </span>

      <Link
        to={`/profile/${user.username}`}
        className="relative z-10 transition-transform hover:scale-105"
      >
        <Avatar
          className={`${isFirst ? "w-16 h-16 sm:w-20 sm:h-20" : "w-12 h-12 sm:w-16 sm:h-16"} ${s.avatarRing}`}
        >
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="font-bold bg-muted text-foreground">
            {user.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Link>

      <div className="flex flex-col flex-1 mt-3 items-center w-full z-10">
        <Link
          to={`/profile/${user.username}`}
          className={`truncate w-full hover:underline text-center ${s.color}`}
        >
          <h3 className={`font-black text-sm sm:text-base truncate w-full`}>
            {user.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground font-medium mb-2.5 w-full justify-center">
          <Link
            to={`/profile/${user.username}`}
            className="hover:text-primary hover:underline transition-colors truncate max-w-[80px] sm:max-w-[100px]"
          >
            @{user.username}
          </Link>
        </div>

        <div className="flex flex-col items-center gap-2 w-full">
          <RankBadge
            points={user.points}
            level={user.level}
            levelXp={user.levelXp}
            variant="pill"
            size="md"
            className="bg-background/80 border-border shadow-xs backdrop-blur-sm"
          />

          <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-muted-foreground font-bold w-full uppercase tracking-wide">
            <div className="flex items-center gap-1 group relative">
              <span className="text-foreground">
                {user.totalProblemsolved || 0}
              </span>
              <span>SLVD</span>
            </div>
            <span className="text-border">|</span>
            <div className={`flex items-center gap-1 ${s.color}`}>
              {user.points} XP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  const { data: rawUsers, isLoading } = useGetLeaderboard();
  const users = rawUsers?.data || rawUsers;
  const token = localStorage.getItem("token");

  const topUsers = !users || !Array.isArray(users) ? [] : users.slice(0, 3);
  const remainingUsers = !users || !Array.isArray(users) ? [] : users.slice(3);
  const { data: profileData } = useGetHeaderProfile();
  const currentUser = token ? (profileData?.data ?? profileData) : null;

  let currentUserRank = -1;
  let currentUserStats = null;
  let pointsToNextRank = 0;

  if (users && currentUser?.username && Array.isArray(users)) {
    const index = users.findIndex(
      (u: any) => u.username === currentUser.username,
    );
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
    <div
      className="relative h-full flex flex-col overflow-hidden transition-colors duration-200
                        bg-(--bg-secondary) border-t border-(--border-primary)
                        dark:border-(--dk-border)"
    >
      <div className="relative z-10 px-4 w-full sm:px-6 lg:px-6 py-8 overflow-y-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 max-w-7xl mx-auto w-full">
          {/* Left Content — Leaderboard List */}
          <div
            className="flex-1 space-y-6 lg:px-8 min-h-[calc(100vh-12rem)] min-w-0
                                    lg:border-r border-(--border-primary) dark:border-(--dk-border)"
          >
            <div className="space-y-4">
              {/* Header Area */}
              <div className="pb-4">
                <div className="flex items-center gap-2 justify-between pb-2">
                  <h2 className="text-2xl font-bold text-foreground font-pj tracking-tight capitalize">
                    Global Leaderboard
                  </h2>
                </div>
                <p className="mt-2 text-muted-foreground font-pj text-sm max-w-2xl">
                  Rise through the ranks by solving algorithmic challenges and
                  earning XP.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-(--bg-secondary) overflow-hidden flex flex-col">
                {topUsers.length > 0 && (
                  <div className="relative flex items-center justify-center pt-6 pb-6 px-4 bg-muted/10 border-b border-border overflow-hidden">
                    {/* Background Decorative Icons */}
                    <Trophy className="absolute -left-12 sm:-left-6 top-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 text-foreground/3 dark:text-foreground/2 -rotate-12 pointer-events-none select-none z-0" />
                    <Award className="absolute -right-12 sm:-right-6 top-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 text-foreground/3 dark:text-foreground/2 rotate-12 pointer-events-none select-none z-0" />

                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-8 w-full">
                      {/* 2nd Place */}
                      {topUsers[1] && (
                        <TopUserCard user={topUsers[1]} rank={2} />
                      )}
                      {/* 1st Place */}
                      {topUsers[0] && (
                        <TopUserCard user={topUsers[0]} rank={1} isFirst />
                      )}
                      {/* 3rd Place */}
                      {topUsers[2] && (
                        <TopUserCard user={topUsers[2]} rank={3} />
                      )}
                    </div>
                  </div>
                )}

                <div className="overflow-x-auto w-full">
                  <Table>
                    <TableHeader className="bg-transparent border-b border-border">
                      <TableRow className="hover:bg-transparent border-0 [&_th]:h-10">
                        <TableHead className="w-[80px] text-center font-semibold text-muted-foreground">
                          Rank
                        </TableHead>
                        <TableHead className="font-semibold text-muted-foreground">
                          User
                        </TableHead>
                        <TableHead className="w-[120px] text-right font-semibold text-muted-foreground hidden sm:table-cell">
                          Solved
                        </TableHead>
                        <TableHead className="w-[120px] text-right font-semibold text-muted-foreground">
                          XP
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {!remainingUsers || remainingUsers.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="h-32 text-center text-muted-foreground"
                          >
                            {topUsers.length === 0
                              ? "No rankings available."
                              : "No more players to display."}
                          </TableCell>
                        </TableRow>
                      ) : (
                        remainingUsers.map((user: any, index: number) => {
                          const isCurrentUser =
                            currentUser?.username === user.username;
                          const isEven = index % 2 !== 0;

                          const actualRank = index + 1 + topUsers.length;
                          const rankDisplay = (
                            <span className="text-muted-foreground font-semibold px-2">
                              {actualRank}
                            </span>
                          );

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
                                  <Link
                                    to={`/profile/${user.username}`}
                                    className="shrink-0 transition-transform hover:scale-105"
                                  >
                                    <Avatar className="h-8 w-8 rounded-md">
                                      <AvatarImage
                                        src={user.avatarUrl}
                                        alt={user.name}
                                      />
                                      <AvatarFallback className="rounded-md bg-muted text-foreground text-xs font-medium">
                                        {user.name?.charAt(0).toUpperCase()}
                                      </AvatarFallback>
                                    </Avatar>
                                  </Link>
                                  <div className="flex flex-col min-w-0">
                                    <Link
                                      to={`/profile/${user.username}`}
                                      className="font-medium text-foreground hover:text-primary hover:underline flex items-center gap-2 truncate"
                                    >
                                      <span className="truncate">
                                        {user.name}
                                      </span>
                                      {isCurrentUser && (
                                        <span className="text-[10px] px-1.5 py-0 rounded text-primary bg-primary/10 font-bold uppercase tracking-wider shrink-0 no-underline">
                                          You
                                        </span>
                                      )}
                                    </Link>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5 truncate">
                                      <Link
                                        to={`/profile/${user.username}`}
                                        className="hover:text-primary hover:underline truncate"
                                      >
                                        @{user.username}
                                      </Link>
                                      <span className="text-[10px] text-muted-foreground/40 shrink-0">
                                        •
                                      </span>
                                      <div className="flex items-center gap-1">
                                        <RankBadge
                                          points={user.points}
                                          level={user.level}
                                          levelXp={user.levelXp}
                                          variant="inline"
                                        />
                                        <span className="text-[10px] text-muted-foreground/40 leading-none pb-px">
                                          •
                                        </span>
                                        <span className="font-medium text-[10px] uppercase tracking-wider text-muted-foreground">
                                          Lvl {user.level || 1}
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
                      <h3 className="text-lg font-bold text-foreground font-pj tracking-tight">
                        Your Rank
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        @{currentUser.username}
                      </p>
                    </div>
                  </div>

                  <div className="mb-5 space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-medium text-foreground">
                        Position
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {currentUserRank !== -1
                          ? `#${currentUserRank}`
                          : "Unranked"}
                      </span>
                    </div>
                    {currentUserRank > 1 && (
                      <>
                        <Progress
                          value={
                            ((currentUserStats?.points || 0) /
                              ((currentUserStats?.points || 0) +
                                pointsToNextRank)) *
                            100
                          }
                          className="h-2 w-full bg-secondary"
                        />
                        <p className="text-xs text-muted-foreground text-right">
                          {pointsToNextRank} XP to next rank
                        </p>
                      </>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-muted-foreground">
                        Total XP
                      </span>
                      <span className="text-xs text-foreground font-medium">
                        {currentUserStats?.points || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-muted-foreground">
                        Problems Solved
                      </span>
                      <span className="text-xs text-foreground font-medium">
                        {currentUserStats?.totalProblemsolved || 0}
                      </span>
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
                      <p className="text-sm font-medium text-orange-100">
                        Current Streak
                      </p>
                      <p className="mt-1 text-3xl font-bold font-pj tracking-tight">
                        {currentUser?.currentStreak || 0} Days
                      </p>
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
                  <h3 className="ml-3 text-lg font-bold text-foreground font-pj tracking-tight">
                    Join Leaderboard
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Log in to see your rank and start earning XP by solving
                  algorithmic challenges.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
