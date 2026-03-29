export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse">
        {/* Hero skeleton */}
        <div className="h-48 bg-surface-200 rounded-3xl mb-10" />

        {/* Metrics skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-surface-200 rounded-2xl" />
          ))}
        </div>

        {/* Charts skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="h-80 bg-surface-200 rounded-2xl" />
          <div className="h-80 bg-surface-200 rounded-2xl" />
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-surface-200 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}