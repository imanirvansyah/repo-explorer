import Skeleton from "@/components/ui/skeleton";

export const UserInfoLoading: React.FC = () => {
  return (
    <div>
      <div className="flex gap-3">
        <Skeleton className="w-12 h-12" />
        <div>
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-32 h-2 mt-2" />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <Skeleton className="w-18 h-4" />
        <div className="flex gap-4">
          <Skeleton className="w-18 h-4" />
          <Skeleton className="w-18 h-4" />
        </div>
      </div>
    </div>
  )
}

export const RepoLoading: React.FC = () => {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-24 mb-2" />
      ))}
    </div>
  )
}

export const LoadingPlaceholder = () => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4'>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-48" />
      ))}
    </div>
  )
}