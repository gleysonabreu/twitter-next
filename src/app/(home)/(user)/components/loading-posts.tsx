import { Skeleton } from '@/components/ui/skeleton';

export function LoadingPosts() {
  return (
    <div>
      {Array.from(Array(2).keys()).map((item) => (
        <div
          key={item}
          className="flex flex-col items-start gap-2 border-t p-3 text-left text-sm transition-all"
        >
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 group">
                <Skeleton className="h-10 w-10 rounded-full" />

                <div className="flex flex-col gap-2">
                  <Skeleton className="h-3 w-16 rounded-md" />
                  <Skeleton className="h-3 w-16 rounded-md" />
                </div>
              </div>

              <Skeleton className="h-3 w-10 rounded-md" />
            </div>
          </div>
          <Skeleton className="h-28 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
}
