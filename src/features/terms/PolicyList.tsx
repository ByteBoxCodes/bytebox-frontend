import type { ReactNode } from "react";

interface PolicyListProps {
  items: (string | ReactNode)[];
}

export function PolicyList({ items }: PolicyListProps) {
  return (
    <ul className="space-y-1.5 ml-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-1.5 w-1 h-1 rounded-full bg-muted-foreground/60 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
