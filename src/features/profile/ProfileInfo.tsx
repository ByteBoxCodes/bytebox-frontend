import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IUserProfile } from "@/types/auth";
import { Mail, User, AtSign, Calendar } from "lucide-react";

interface ProfileInfoProps {
    user: IUserProfile;
}

function formatDate(dateStr?: string): string {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
    });
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
    const fields = [
        { icon: User, label: "Full Name", value: user.name },
        { icon: AtSign, label: "Username", value: `@${user.username}` },
        { icon: Mail, label: "Email", value: user.email },
        { icon: Calendar, label: "Member Since", value: formatDate(user.createdAt) },
    ];

    return (
        <Card className="rounded-2xl border border-border bg-card shadow-sm">
            <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-foreground">
                    Account Information
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {fields.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                            <Icon size={14} className="text-muted-foreground" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">{label}</p>
                            <p className="text-sm font-medium text-foreground truncate">{value ?? "—"}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
