import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <Skeleton className="w-80 h-[140px]" />
        <Skeleton className="w-40 h-10" />
      </div>
      <Skeleton className="w-full h-[70vh] p-6" />
    </div>
  );
}
