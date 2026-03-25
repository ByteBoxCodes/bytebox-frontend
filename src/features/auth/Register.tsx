
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, User, AtSign, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRegisterUser } from "@/hooks/useRegisterUser";
import VerificationModal from "./VerificationModal";
import GoogleLoginAuth from "./GoogleLoginAuth";

export default function Register() {
    // const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [isOver13, setIsOver13] = useState(false);

    const { mutate, isPending } = useRegisterUser(() => {
        setShowVerificationModal(true);
    });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ name, username, email, password });
    };

    return (
        <div className="w-full space-y-5">
            {/* Header */}
            <div className="space-y-1">
                <h2 className="text-3xl font-bold text-(--text-primary) dark:text-(--dk-text)">
                    Create account
                </h2>
                <p className="text-base text-(--text-secondary) dark:text-(--dk-text-muted)">
                    Join ByteBox and start coding today
                </p>
            </div>

            {/* Google button */}
            <GoogleLoginAuth />


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
            <form onSubmit={handleRegister} className="space-y-3">

                {/* Full Name */}
                <div className="space-y-1.5">
                    <Label htmlFor="name"
                        className="text-sm text-(--text-secondary) dark:text-(--dk-text-muted)">
                        Full Name
                    </Label>
                    <div className="relative">
                        <User size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none
                                         text-(--text-tertiary) dark:text-(--dk-text-faint)" />
                        <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-11 rounded-xl pl-9
                                       bg-white border-(--border-primary) text-(--text-primary)
                                       placeholder:text-(--text-tertiary)
                                       dark:bg-(--dk-surface) dark:border-(--dk-border-muted)
                                       dark:text-(--dk-text) dark:placeholder:text-(--dk-text-faint)"
                        />
                    </div>
                </div>

                {/* Username */}
                <div className="space-y-1.5">
                    <Label htmlFor="username"
                        className="text-sm text-(--text-secondary) dark:text-(--dk-text-muted)">
                        Username
                    </Label>
                    <div className="relative">
                        <AtSign size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none
                                           text-(--text-tertiary) dark:text-(--dk-text-faint)" />
                        <Input
                            id="username"
                            type="text"
                            placeholder="johndoe"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="h-11 rounded-xl pl-9
                                       bg-white border-(--border-primary) text-(--text-primary)
                                       placeholder:text-(--text-tertiary)
                                       dark:bg-(--dk-surface) dark:border-(--dk-border-muted)
                                       dark:text-(--dk-text) dark:placeholder:text-(--dk-text-faint)"
                        />
                    </div>
                </div>

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

                {/* Password with show/hide */}
                <div className="space-y-1.5">
                    <Label htmlFor="password"
                        className="text-sm text-(--text-secondary) dark:text-(--dk-text-muted)">
                        Password
                    </Label>
                    <div className="relative">
                        <Lock size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none
                                         text-(--text-tertiary) dark:text-(--dk-text-faint)" />
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Min. 8 characters"
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
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-2.5 pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                            className="mt-0.5 h-4 w-4 rounded border border-(--border-primary) dark:border-(--dk-border-muted) accent-(--btn-primary-bg) cursor-pointer shrink-0"
                        />
                        <span className="text-xs text-(--text-secondary) dark:text-(--dk-text-faint) leading-relaxed">
                            I agree to the{" "}
                            <a
                                href="/terms"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-2 text-(--text-primary) dark:text-(--dk-text-muted) hover:opacity-80 transition-opacity"
                            >
                                Terms &amp; Conditions
                            </a>{" "}
                            and{" "}
                            <a
                                href="/privacy-policy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-2 text-(--text-primary) dark:text-(--dk-text-muted) hover:opacity-80 transition-opacity"
                            >
                                Privacy Policy
                            </a>
                        </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={isOver13}
                            onChange={(e) => setIsOver13(e.target.checked)}
                            className="mt-0.5 h-4 w-4 rounded border border-(--border-primary) dark:border-(--dk-border-muted) accent-(--btn-primary-bg) cursor-pointer shrink-0"
                        />
                        <span className="text-xs text-(--text-secondary) dark:text-(--dk-text-faint) leading-relaxed">
                            I confirm that I am 13 years of age or older
                        </span>
                    </label>
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={isPending || !acceptedTerms || !isOver13}
                    className="w-full h-11 rounded-xl font-semibold mt-1 transition-colors
                               bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-hover)
                               dark:bg-(--dk-btn-bg) dark:text-(--dk-btn-text) dark:hover:bg-(--dk-btn-hover)
                               disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                </Button>
            </form>

            {/* Sign in link */}
            <p className="text-center text-sm text-(--text-secondary) dark:text-(--dk-text-faint)">
                Already have an account?{" "}
                <Link to="/login"
                    className="underline underline-offset-4 hover:opacity-80 transition-opacity
                                 text-(--text-primary) dark:text-(--dk-text-dim)">
                    Sign in
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
