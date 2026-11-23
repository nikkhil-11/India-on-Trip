import Icon, { type IconName } from "@/components/ui/Icon";

/** Compact quick-fact tile used in the trip-page facts grid. */
export default function FactCard({
  icon,
  label,
  value,
}: {
  icon: IconName;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-card border border-line bg-white p-4 shadow-card">
      <span className="grid h-10 w-10 place-items-center rounded-btn bg-tint text-primary" aria-hidden="true">
        <Icon name={icon} size={20} />
      </span>
      <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.08em] text-muted">{label}</p>
      <p className="mt-1 font-display text-[16px] font-extrabold leading-[1.35] text-deep">{value}</p>
    </div>
  );
}
