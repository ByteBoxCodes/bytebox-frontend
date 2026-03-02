
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useLoginUser } from "@/hooks/useLoginUser";
import VerificationModal from "./VerificationModal";
import { toast } from "sonner";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showVerificationModal, setShowVerificationModal] = useState(false);

    const { mutate, isPending } = useLoginUser((message) => {
        if (message.toLowerCase().includes("not verified") || message.toLowerCase().includes("unverified")) {
            setShowVerificationModal(true);
        } else {
            toast.error("Login failed", { description: message });
        }
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ email, password });
    };

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="space-y-1">
                <h2 className="text-3xl font-bold text-(--text-primary) dark:text-(--dk-text)">
                    Welcome back
                </h2>
                <p className="text-base text-(--text-secondary) dark:text-(--dk-text-muted)">
                    Sign in to your ByteBox account
                </p>
            </div>

            {/* Google button */}
            <button
                type="button"
                className="w-full h-12 rounded-xl flex items-center justify-center gap-3 text-sm font-medium
                           transition-colors duration-200
                           bg-black/5 ring-1 ring-black/10 text-(--text-primary) hover:bg-black/8
                           dark:bg-(--dk-surface) dark:ring-(--dk-border-light) dark:text-(--dk-text-dim)
                           dark:hover:bg-(--dk-surface-hover)"
            >
                <svg className="h-5 w-5" viewBox="0 0 488 512" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
                Continue with Google
            </button>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-(--border-primary) dark:border-(--dk-border-muted)" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-3 font-medium
                                     bg-(--bg-secondary) text-(--text-secondary)
                                     dark:bg-(--dk-bg-via) dark:text-(--dk-text-faint)">
                        or
                    </span>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">

                {/* Email */}
                <div className="space-y-1.5">
                    <Label htmlFor="email"
                        className="text-sm text-(--text-secondary) dark:text-(--dk-text-muted)">
                        Email
                    </Label>
                    <div className="relative">
                        <Mail size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none
                                         text-(--text-tertiary) dark:text-(--dk-text-faint)" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-11 rounded-xl pl-9
                                       bg-white border-(--border-primary) text-(--text-primary)
                                       placeholder:text-(--text-tertiary)
                                       dark:bg-(--dk-surface) dark:border-(--dk-border-muted)
                                       dark:text-(--dk-text) dark:placeholder:text-(--dk-text-faint)"
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password"
                            className="text-sm text-(--text-secondary) dark:text-(--dk-text-muted)">
                            Password
                        </Label>
                        <Link to="/forgot-password"
                            className="text-xs hover:opacity-80 transition-opacity
                                         text-(--text-secondary) dark:text-(--dk-text-faint)">
                            Forgot password?
                        </Link>
                    </div>
                    <div className="relative">
                        <Lock size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none
                                         text-(--text-tertiary) dark:text-(--dk-text-faint)" />
                        <Input
                            id="password"
                            placeholder="your password"
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
                            className="absolute right-3 top-1/2 -translate-y-1/2
                                       text-(--text-tertiary) hover:text-(--text-primary) transition-colors
                                       dark:text-(--dk-text-faint) dark:hover:text-(--dk-text)"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword
                                ? <EyeOff size={16} />
                                : <Eye size={16} />
                            }
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-11 rounded-xl font-semibold mt-2 transition-colors
                               bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-hover)
                               dark:bg-(--dk-btn-bg) dark:text-(--dk-btn-text) dark:hover:bg-(--dk-btn-hover)"
                >
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                </Button>
            </form>

            {/* Sign up */}
            <p className="text-center text-sm text-(--text-secondary) dark:text-(--dk-text-faint)">
                Don't have an account?{" "}
                <Link to="/signup"
                    className="underline underline-offset-4 hover:opacity-80 transition-opacity
                                 text-(--text-primary) dark:text-(--dk-text-dim)">
                    Sign up
                </Link>
            </p>

            <VerificationModal
                isOpen={showVerificationModal}
                setIsOpen={setShowVerificationModal}
                email={email}
            />
        </div>
    );
}
