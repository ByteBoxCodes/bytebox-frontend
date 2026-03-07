import { useState } from "react";
import { KeyRound, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { useForgotPassword } from "@/hooks/useForgotPassword";

interface ForgotPasswordModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function ForgotPasswordModal({ isOpen, setIsOpen }: ForgotPasswordModalProps) {
    const [email, setEmail] = useState("");

    const { mutate, isPending } = useForgotPassword(() => {
        setIsOpen(false);
        setEmail("");
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            return;
        }
        mutate(email);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md p-6 overflow-hidden">
                <DialogHeader className="flex flex-col items-center pt-2">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4 shadow-sm ring-4 ring-blue-50 dark:ring-blue-950/30">
                        <KeyRound className="h-8 w-8 text-blue-600 dark:text-blue-500" />
                    </div>
                    <DialogTitle className="text-2xl font-bold tracking-tight text-(--text-primary) dark:text-(--dk-text)">
                        Forgot Password
                    </DialogTitle>
                    <DialogDescription className="text-center text-sm mt-3 leading-relaxed">
                        Enter your email address and we'll send you a link to reset your password.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-6 relative z-10">
                    <div className="space-y-1.5">
                        <Label htmlFor="forgot-email"
                            className="text-sm text-(--text-secondary) dark:text-(--dk-text-muted)">
                            Email
                        </Label>
                        <div className="relative">
                            <Mail size={15}
                                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none
                                             text-(--text-tertiary) dark:text-(--dk-text-faint)" />
                            <Input
                                id="forgot-email"
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
                    <DialogFooter className="sm:justify-center mt-8 relative z-10">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-hover) w-full h-11 rounded-xl text-md font-semibold transition-all shadow-md active:scale-[0.98] border border-transparent dark:border-white/10"
                        >
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Send Reset Link
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
