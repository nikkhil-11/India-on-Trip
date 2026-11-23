import clsx from "clsx";
import Icon from "@/components/ui/Icon";

/**
 * Inclusions / exclusions list with a 4px coloured top border — green
 * check-circles for what's in, red cross-circles for what's not.
 */
export default function InclusionCard({
  id,
  title,
  items,
  tone,
}: {
  id?: string;
  title: string;
  items: string[];
  tone: "included" | "excluded";
}) {
  const included = tone === "included";

  return (
    <div
      id={id}
      className={clsx(
        "spy-section rounded-panel border border-line bg-white p-6 shadow-card",
        included ? "border-t-4 border-t-success" : "border-t-4 border-t-danger",
      )}
    >
      <h3 className="flex items-center gap-2.5 font-display text-[19px] font-extrabold text-deep">
        <Icon
          name={included ? "checkcircle" : "cross"}
          size={22}
          className={included ? "text-success" : "text-danger"}
        />
        {title}
      </h3>

      <ul className="mt-5 space-y-3">
        {items.map((item, index) => (
          <li key={`${item}-${index}`} className="flex items-start gap-2.5 text-[14.5px] leading-[1.6] text-body">
            <Icon
              name={included ? "checkcircle" : "cross"}
              size={18}
              className={clsx("mt-0.5 shrink-0", included ? "text-success" : "text-danger")}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
