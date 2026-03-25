import type { ReactNode } from "react";
import { Mail, Globe, Github } from "lucide-react";

interface ContactCardProps {
  email?: string;
  website?: string;
  github?: string;
  children?: ReactNode;
}

export function ContactCard({ email, website, github, children }: ContactCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 space-y-3">
      <p className="font-medium text-foreground text-sm">Get in touch</p>

      {email && (
        <div className="flex items-center gap-2.5 text-sm">
          <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
          <a
            href={`mailto:${email}`}
            className="text-foreground underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            {email}
          </a>
        </div>
      )}

      {website && (
        <div className="flex items-center gap-2.5 text-sm">
          <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            {website}
          </a>
        </div>
      )}

      {github && (
        <div className="flex items-center gap-2.5 text-sm">
          <Github className="w-4 h-4 text-muted-foreground shrink-0" />
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            {github}
          </a>
        </div>
      )}

      {children}
    </div>
  );
}
