export function TrackerEmptyState() {
  return (
    <div className="flex flex-col gap-3 py-6">
      <div className="flex items-center gap-3">
        {/* Pulse dot — keyframes live in globals.css so prefers-reduced-motion can disable them. */}
        <span
          className="ryot-pulse-dot block h-2.5 w-2.5 rounded-full bg-accent"
          aria-hidden="true"
        />
        <p className="font-body text-base text-text-primary">
          Just launched. You&#x27;re early.
        </p>
      </div>
      <p className="font-body text-sm text-text-secondary pl-[22px]">
        Every donation will show up here the moment it lands.
      </p>
    </div>
  );
}
