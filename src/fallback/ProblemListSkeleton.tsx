import { Skeleton } from "@/components/ui/skeleton";

export default function ProblemListSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <tr
          key={i}
          className={`border-0 ${i % 2 !== 0 ? "bg-muted/50" : "bg-(--bg-secondary)"}`}
        >
          <td className="w-[80px] p-4 text-center align-middle py-3">
            <Skeleton className="h-[18px] w-[18px] rounded-full mx-auto" />
          </td>
          <td className="w-[60px] p-4 align-middle py-3">
            <Skeleton className="h-4 w-4" />
          </td>
          <td className="p-4 align-middle py-3">
            <Skeleton
              className="h-4"
              style={{
                width: `${120 + (i % 4) * 40}px`,
                maxWidth: "100%",
              }}
            />
          </td>
          <td className="w-[120px] p-4 align-middle py-3">
            <Skeleton className="h-[22px] w-16 rounded-full" />
          </td>
        </tr>
      ))}
    </>
  );
}
