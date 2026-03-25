interface TocItem {
  id: string;
  label: string;
}

interface PolicyTocProps {
  items: TocItem[];
}

export function PolicyToc({ items }: PolicyTocProps) {
  return (
    <nav className="hidden lg:block sticky top-6 self-start w-52 shrink-0">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        On this page
      </p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block text-xs text-muted-foreground hover:text-foreground transition-colors py-0.5"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
