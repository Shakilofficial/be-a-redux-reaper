import { Skeleton } from "@/components/ui/skeleton";

export function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="space-y-4 w-full max-w-md mx-auto">
        {/* Simulated Task Card Skeleton */}
        {[1, 2, 3].map((_, idx) => (
          <div
            key={idx}
            className="border px-5 py-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Skeleton for Title */}
            <Skeleton className="h-6 w-3/4 rounded-full mb-4" />
            {/* Skeleton for Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
