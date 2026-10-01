interface AdSlotProps {
  type: "header" | "in-content" | "sidebar" | "bottom";
  className?: string;
}

export function AdSlot({ type, className = "" }: AdSlotProps) {
  // Clear, non-intrusive placeholders designed for future Adsterra / Google AdSense code insertion
  const dimensions = {
    header: "min-h-[90px] max-w-[728px] w-full",
    "in-content": "min-h-[100px] max-w-[728px] w-full",
    sidebar: "min-h-[250px] w-full max-w-[300px]",
    bottom: "min-h-[90px] max-w-[970px] w-full",
  }[type];

  const labels = {
    header: "Leaderboard Advertisement Slot",
    "in-content": "In-Content Sponsor Placement",
    sidebar: "Sidebar Advertisement Slot",
    bottom: "Bottom Banner Sponsor Space",
  }[type];

  return (
    <aside
      aria-label="Advertisement"
      className={`my-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200/90 bg-slate-50/75 p-3 text-center text-xs text-slate-400 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-500 dark:hover:border-slate-700 ${dimensions} ${className}`}
    >
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Advertisement
        </span>
        <span className="text-[11px] text-slate-400 dark:text-slate-500">{labels}</span>
        {/* Placeholder for network script injection */}
        <div id={`ad-slot-${type}`} className="w-full" />
      </div>
    </aside>
  );
}
