import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useVerifyUser } from "@/hooks/useVerifyUser";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const { mutate, isPending, isSuccess, isError } = useVerifyUser();

    // We want to show a success animation briefly, then redirect
    const [showSuccessAnim, setShowSuccessAnim] = useState(false);

    useEffect(() => {
        if (token && !isSuccess && !isError && !isPending) {
            mutate(token);
        }
    }, [token, mutate, isSuccess, isError, isPending]);

    useEffect(() => {
        if (isSuccess) {
            setShowSuccessAnim(true);
            const timer = setTimeout(() => {
                navigate("/login"); // or navigate("/problems") if it auto-logs in
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, navigate]);

    if (!token) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-(--bg-primary) p-4">
                <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl dark:bg-(--dk-bg-primary) dark:shadow-none dark:ring-1 dark:ring-(--dk-border-muted) text-center">
                    <XCircle className="mx-auto h-16 w-16 text-red-500" />
                    <h2 className="text-2xl font-bold text-(--text-primary) dark:text-(--dk-text)">Invalid Link</h2>
                    <p className="text-(--text-secondary) dark:text-(--dk-text-muted)">The verification link is missing or invalid.</p>
                    <Link to="/login">
                        <Button className="mt-4 bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-hover)">Back to Login</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-(--bg-primary) p-4">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl dark:bg-(--dk-bg-primary) dark:shadow-none dark:ring-1 dark:ring-(--dk-border-muted) text-center">
                {isPending && (
                    <div className="animate-in fade-in zoom-in duration-300">
                        <Loader2 className="mx-auto h-16 w-16 animate-spin text-(--btn-primary-bg)" />
                        <h2 className="mt-6 text-2xl font-bold text-(--text-primary) dark:text-(--dk-text)">Verifying...</h2>
                        <p className="mt-2 text-(--text-secondary) dark:text-(--dk-text-muted)">Please wait while we verify your email address.</p>
                    </div>
                )}

                {showSuccessAnim && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-500 animate-in zoom-in duration-500 delay-150" />
                        </div>
                        <h2 className="mt-6 text-2xl font-bold text-(--text-primary) dark:text-(--dk-text)">Verification Complete!</h2>
                        <p className="mt-2 text-(--text-secondary) dark:text-(--dk-text-muted)">Your email has been successfully verified.</p>
                        <p className="mt-4 text-sm text-(--text-tertiary) dark:text-(--dk-text-faint)">Redirecting to login...</p>
                    </div>
                )}

                {isError && (
                    <div className="animate-in fade-in zoom-in duration-300">
                        <XCircle className="mx-auto h-16 w-16 text-red-500" />
                        <h2 className="mt-6 text-2xl font-bold text-(--text-primary) dark:text-(--dk-text)">Verification Failed</h2>
                        <p className="mt-2 text-(--text-secondary) dark:text-(--dk-text-muted)">This link may have expired or is invalid.</p>
                        <Link to="/login">
                            <Button className="mt-6 bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-hover)">Back to Login</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
