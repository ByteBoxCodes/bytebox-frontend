import { MailWarning } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface VerificationModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    email: string;
}


export default function VerificationModal({ isOpen, setIsOpen, email }: VerificationModalProps) {

    const navigate = useNavigate();
    const handleClose = () => {
        navigate("/login");
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent showCloseButton={false} className="sm:max-w-md text-center p-8 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 inset-x-0 h-32 bg-linear-to-b from-amber-50 to-transparent dark:from-amber-950/20 pointer-events-none" />

                <DialogHeader className="relative z-10 flex flex-col items-center pt-2">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 mb-6 shadow-sm ring-4 ring-amber-50 dark:ring-amber-950/30">
                        <MailWarning className="h-10 w-10 text-amber-600 dark:text-amber-500 animate-pulse" />
                        <div className="absolute top-0 right-0 h-5 w-5 rounded-full bg-green-500 border-2 border-white dark:border-(--dk-bg-primary) animate-ping" />
                        <div className="absolute top-0 right-0 h-5 w-5 rounded-full bg-green-500 border-2 border-white dark:border-(--dk-bg-primary)" />
                    </div>
                    <DialogTitle className="text-2xl font-bold tracking-tight text-(--text-primary) dark:text-(--dk-text)">
                        Verify Your Email
                    </DialogTitle>
                    <DialogDescription className="text-base mt-3 leading-relaxed">
                        We've sent a verification link to<br />
                        <span className="font-semibold text-lg text-(--text-primary) dark:text-(--dk-text) inline-block mt-1 bg-black/5 dark:bg-white/5 px-3 py-1 rounded-md">
                            {email}
                        </span>
                        <br /><span className="inline-block mt-3">Please check your inbox and click the link to verify your account and start coding.</span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-center mt-8 relative z-10">
                    <Button
                        type="button"
                        variant="default"
                        onClick={handleClose}
                        className="bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-hover) w-full h-12 rounded-xl text-md font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md border border-transparent dark:border-white/10"
                    >
                        I'll Check My Email
                    </Button>
                </DialogFooter>

                {/* Footnote */}
                <p className="mt-6 text-sm text-(--text-tertiary) dark:text-(--dk-text-faint) relative z-10">
                    Didn't receive it? Check your spam folder.
                </p>
            </DialogContent>
        </Dialog>
    );
}
