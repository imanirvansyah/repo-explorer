import { cn } from "@/lib/utils";

const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={cn("w-full min-h-2 animate-pulse bg-muted rounded-md", className)}></div>;
}

export default Skeleton;