import type { ReactNode } from "react";

interface AboutSectionProps {
  id: string;
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export function AboutSection({ id, icon, title, children }: AboutSectionProps) {
  return (
    <section id={id} className="scroll-mt-6">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="text-muted-foreground">{icon}</span>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
      </div>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
}
