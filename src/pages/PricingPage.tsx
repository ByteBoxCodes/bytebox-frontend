import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";

export default function PricingPage() {
    return (
        <div className="min-h-[85vh] bg-(--bg-primary) dark:bg-zinc-950 text-(--text-primary) dark:text-(--dk-text) py-16 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight">Choose Your Journey</h1>
                <p className="text-(--text-secondary) dark:text-(--dk-text-muted) max-w-xl mx-auto text-lg leading-relaxed">
                    Whether you're just starting coding or aiming for the top of the leaderboard, we have a plan for you.
                </p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                {/* Basic Plan */}
                <div className="flex flex-col p-8 sm:p-10 rounded-3xl border border-border bg-(--bg-secondary) dark:bg-(--dk-surface) shadow-sm">
                    <h3 className="text-2xl font-bold mb-2">Basic</h3>
                    <div className="flex items-baseline gap-2 mb-8">
                        <span className="text-5xl font-black">Free</span>
                    </div>
                    <ul className="space-y-4 mb-10 flex-1 text-[15px] text-(--text-secondary) dark:text-(--dk-text-muted)">
                        <li className="flex items-start gap-3"><Check size={20} className="text-emerald-500 shrink-0 mt-0.5" /> <span>Access to all standard coding problems</span></li>
                        <li className="flex items-start gap-3"><Check size={20} className="text-emerald-500 shrink-0 mt-0.5" /> <span>Standard code execution</span></li>
                        <li className="flex items-start gap-3"><Check size={20} className="text-emerald-500 shrink-0 mt-0.5" /> <span>Global Leaderboard participation</span></li>
                        <li className="flex items-start gap-3"><X size={20} className="text-red-500 shrink-0 mt-0.5 opacity-70" /> <span className="opacity-60">No premium editor features</span></li>
                        <li className="flex items-start gap-3"><X size={20} className="text-red-500 shrink-0 mt-0.5 opacity-70" /> <span className="opacity-60">No exclusive premium badges</span></li>
                    </ul>
                    <Link to="/#problems" className="w-full py-3.5 px-4 text-center rounded-xl font-bold bg-transparent border-2 border-border hover:bg-muted transition-colors">
                        Start Coding
                    </Link>
                </div>

                {/* Pro Plan */}
                <div className="flex flex-col p-8 sm:p-10 rounded-3xl border border-primary/50 shadow-xl bg-(--bg-secondary) dark:bg-(--dk-surface) relative overflow-hidden transform md:-translate-y-4">
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500" />
                    <div className="absolute top-6 right-6 bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-500 text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-wider">Most Popular</div>
                    <h3 className="text-2xl font-bold mb-2">Pro</h3>
                    <div className="flex items-baseline gap-2 mb-8">
                        <span className="text-5xl font-black">₹499</span>
                        <span className="text-sm font-medium text-(--text-secondary)">/month</span>
                    </div>
                    <ul className="space-y-4 mb-10 flex-1 text-[15px] text-(--text-secondary) dark:text-(--dk-text-muted)">
                        <li className="flex items-start gap-3"><Check size={20} className="text-emerald-500 shrink-0 mt-0.5" /> <span>Everything in <strong>Basic</strong></span></li>
                        <li className="flex items-start gap-3"><Check size={20} className="text-emerald-500 shrink-0 mt-0.5" /> <span><span className="font-bold text-foreground">Advanced</span> performance metrics</span></li>
                        <li className="flex items-start gap-3"><Check size={20} className="text-emerald-500 shrink-0 mt-0.5" /> <span><span className="font-bold text-foreground">Premium</span> editor features (Vim, Monokai)</span></li>
                        <li className="flex items-start gap-3"><Check size={20} className="text-emerald-500 shrink-0 mt-0.5" /> <span>Exclusive badges and ranks</span></li>
                        <li className="flex items-start gap-3"><Check size={20} className="text-emerald-500 shrink-0 mt-0.5" /> <span>Priority execution queue</span></li>
                    </ul>
                    <button className="w-full py-3.5 px-4 text-center rounded-xl font-bold text-background bg-foreground hover:opacity-90 transition-opacity">
                        Upgrade to Pro
                    </button>
                    <p className="text-center text-xs text-muted-foreground mt-4">Billed monthly. Cancel anytime.</p>
                </div>
            </div>
        </div>
    );
}
