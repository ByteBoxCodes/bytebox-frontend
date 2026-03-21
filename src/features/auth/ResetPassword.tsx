import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/apis/authApi";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { mutate, isPending } = useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            toast.success("Password reset successfully. You can now log in.");
            navigate("/login");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to reset password");
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!token) {
            toast.error("Invalid or missing reset token");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        mutate({ token, newPassword: password });
    };

    if (!token) {
        return (
            <div className="text-center p-8 bg-(--bg-secondary) rounded-xl border border-(--border-primary) text-(--text-primary)">
                <h3 className="text-xl font-bold text-red-500 mb-2">Invalid Link</h3>
                <p className="text-(--text-secondary) mb-6">No reset token found in the URL. Please use the link from your email.</p>
                <Button onClick={() => navigate("/login")}>Go to Login</Button>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            <div className="space-y-1">
                <h2 className="text-3xl font-bold text-(--text-primary) dark:text-(--dk-text)">
                    Reset Password
                </h2>
                <p className="text-base text-(--text-secondary) dark:text-(--dk-text-muted)">
                    Enter your new password below
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* New Password */}
                <div className="space-y-1.5">
                    <Label htmlFor="password"
                        className="text-sm text-(--text-secondary) dark:text-(--dk-text-muted)">
                        New Password
                    </Label>
                    <div className="relative">
                        <Lock size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none
                                         text-(--text-tertiary) dark:text-(--dk-text-faint)" />
                        <Input
                            id="password"
                            placeholder="New password"
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-11 rounded-xl pl-9 pr-10
                                       bg-white border-(--border-primary) text-(--text-primary)
                                       placeholder:text-(--text-tertiary)
                                       dark:bg-(--dk-surface) dark:border-(--dk-border-muted)
                                       dark:text-(--dk-text) dark:placeholder:text-(--dk-text-faint)"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(v => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer
                                       text-(--text-tertiary) hover:text-(--text-primary) transition-colors
                                       dark:text-(--dk-text-faint) dark:hover:text-(--dk-text)"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                    <Label htmlFor="confirmPassword"
                        className="text-sm text-(--text-secondary) dark:text-(--dk-text-muted)">
                        Confirm New Password
                    </Label>
                    <div className="relative">
                        <Lock size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none
                                         text-(--text-tertiary) dark:text-(--dk-text-faint)" />
                        <Input
                            id="confirmPassword"
                            placeholder="Confirm new password"
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="h-11 rounded-xl pl-9 pr-10
                                       bg-white border-(--border-primary) text-(--text-primary)
                                       placeholder:text-(--text-tertiary)
                                       dark:bg-(--dk-surface) dark:border-(--dk-border-muted)
                                       dark:text-(--dk-text) dark:placeholder:text-(--dk-text-faint)"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(v => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer
                                       text-(--text-tertiary) hover:text-(--text-primary) transition-colors
                                       dark:text-(--dk-text-faint) dark:hover:text-(--dk-text)"
                        >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-11 rounded-xl font-semibold mt-6 transition-colors cursor-pointer
                               bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-hover)
                               dark:bg-(--dk-btn-bg) dark:text-(--dk-btn-text) dark:hover:bg-(--dk-btn-hover)"
                >
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Reset Password
                </Button>
            </form>
        </div>
    );
}
