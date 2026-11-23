import FactCard from "@/components/cards/FactCard";
import Icon from "@/components/ui/Icon";
import type { Trip } from "@/types/trip";

export function QuickFacts({ facts }: { facts: Trip["facts"] }) {
  return (
    <section aria-label="Quick facts" className="mt-8">
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
        {facts.map((fact) => (
          <FactCard key={fact.label} icon={fact.icon} label={fact.label} value={fact.value} />
        ))}
      </div>
    </section>
  );
}

export function IncludedStrip({ items }: { items: Trip["includedStrip"] }) {
  return (
    <section aria-labelledby="included-strip-heading" className="mt-8 rounded-panel bg-light p-5">
      <h2 id="included-strip-heading" className="font-display text-[15px] font-extrabold text-deep">
        What&apos;s included
      </h2>

      <ul className="mt-4 grid grid-cols-5 gap-3 max-b640:flex max-b640:gap-3 max-b640:overflow-x-auto max-b640:[scrollbar-width:none] max-b640:[&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-2.5 rounded-btn bg-white px-3.5 py-3 max-b640:shrink-0"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-btn bg-tint text-primary" aria-hidden="true">
              <Icon name={item.icon} size={18} />
            </span>
            <span className="text-[13.5px] font-bold text-deep">{item.label}</span>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-[12.5px] text-muted">
        Exact inclusions are listed below — anything unconfirmed is marked.
      </p>
    </section>
  );
}
