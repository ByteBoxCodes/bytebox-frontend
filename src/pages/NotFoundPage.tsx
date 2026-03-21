import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
    return (
        <div className="flex-1 w-full h-full flex flex-col items-center justify-center p-8 text-center
                        bg-(--bg-secondary) text-(--text-primary) transition-colors duration-200">
            <div className="relative flex flex-col items-center justify-center">
                <h1 className="text-9xl font-extrabold tracking-widest text-(--text-secondary) dark:text-(--dk-text-muted) opacity-20 select-none">
                    404
                </h1>
                <div className="absolute bg-(--btn-primary-bg) dark:bg-(--dk-btn-bg) text-(--btn-primary-text) dark:text-(--dk-btn-text) px-3 py-1 text-sm rounded shadow-lg -rotate-6 top-1/2">
                    Page Not Found
                </div>
            </div>
            
            <div className="mt-10 space-y-4 z-10">
                <h3 className="text-2xl font-bold text-(--text-primary) dark:text-(--dk-text)">Oops! We couldn't find that page.</h3>
                <p className="text-(--text-secondary) dark:text-(--dk-text-muted) max-w-md mx-auto leading-relaxed text-sm">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                
                <div className="pt-6">
                    <Button asChild className="rounded-xl px-8 h-11 font-semibold transition-colors
                               bg-(--btn-primary-bg) text-(--btn-primary-text) hover:bg-(--btn-primary-hover)
                               dark:bg-(--dk-btn-bg) dark:text-(--dk-btn-text) dark:hover:bg-(--dk-btn-hover)">
                        <Link to="/">Return to Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
