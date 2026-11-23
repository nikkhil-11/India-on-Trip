import Icon from "@/components/ui/Icon";

/**
 * Month-by-month weather tile. Temperature and snow level stay bracketed
 * placeholders until the business supplies verified figures.
 */
export default function WeatherCard({
  name,
  temp,
  snow,
  text,
}: {
  name: string;
  temp: string;
  snow: string;
  text: string;
}) {
  return (
    <div className="rounded-card border border-line bg-white p-5 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <h4 className="font-display text-[17px] font-extrabold text-deep">{name}</h4>
        <span className="grid h-9 w-9 place-items-center rounded-btn bg-tint text-primary" aria-hidden="true">
          <Icon name="snow" size={18} />
        </span>
      </div>

      <dl className="mt-4 space-y-2.5">
        <div className="flex items-center gap-2">
          <Icon name="thermo" size={16} className="shrink-0 text-primary" />
          <dt className="sr-only">Temperature</dt>
          <dd className="text-[13.5px] font-semibold text-body">{temp}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="snow" size={16} className="shrink-0 text-primary" />
          <dt className="sr-only">Snow level</dt>
          <dd className="text-[13.5px] font-semibold text-body">{snow}</dd>
        </div>
      </dl>

      <p className="mt-4 border-t border-line pt-3 text-[13.5px] leading-[1.6] text-muted">{text}</p>
    </div>
  );
}
