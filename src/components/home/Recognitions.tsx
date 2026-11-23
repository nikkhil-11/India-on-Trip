import SectionHeading from "@/components/ui/SectionHeading";
import { recognitions } from "@/data/site";

/**
 * Registrations and platform listings. The wording stays factual — a
 * registration is never presented as an award.
 */
export default function Recognitions() {
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeading
          eyebrow="Verified Business"
          title="Our Recognitions"
          subtitle="Registrations and platform listings, shown exactly as they are."
          align="center"
        />

        <ul className="mt-12 grid grid-cols-4 gap-5 max-b900:grid-cols-2">
          {recognitions.map((item) => (
            <li
              key={item.title}
              className="rounded-card border border-line bg-white p-5 text-center shadow-card"
            >
              <span className="grid h-[72px] place-items-center rounded-btn border-2 border-dashed border-field bg-light text-[12px] font-bold text-muted">
                Official logo
              </span>
              <h3 className="mt-4 font-display text-[15px] font-extrabold leading-[1.35] text-deep">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-muted">
                {item.kind}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
