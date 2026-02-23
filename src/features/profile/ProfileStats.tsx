import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IUserProfile } from "@/types/auth";
import { CheckCircle2, Target, TrendingUp } from "lucide-react";

interface ProfileStatsProps {
    user: IUserProfile;
}

export default function ProfileStats({ user }: ProfileStatsProps) {
    const solved = user.problemsSolved ?? 0;
    const attempted = user.problemsAttempted ?? 0;
    const rate =
        attempted > 0 ? Math.round((solved / attempted) * 100) : 0;

    const stats = [
        {
            icon: CheckCircle2,
            label: "Problems Solved",
            value: solved,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        },
        {
            icon: Target,
            label: "Problems Attempted",
            value: attempted,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            icon: TrendingUp,
            label: "Success Rate",
            value: `${rate}%`,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
        },
    ];

    return (
        <Card className="rounded-2xl border border-border bg-card shadow-sm">
            <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground">
                    Coding Stats
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-3">
                {stats.map(({ icon: Icon, label, value, color, bg }) => (
                    <div
                        key={label}
                        className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 text-center"
                    >
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${bg}`}>
                            <Icon size={18} className={color} />
                        </div>
                        <p className="text-xl font-bold text-foreground">{value}</p>
                        <p className="text-xs text-muted-foreground leading-tight">{label}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
