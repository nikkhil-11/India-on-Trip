import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import { whyTravel } from "@/data/home";

export default function WhyTravel() {
  return (
    <section className="section-y bg-deep">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Travel with IndiaOnTrip?"
          tone="dark"
          align="center"
        />

        <ul className="mt-12 grid grid-cols-6 gap-5 max-b1180:grid-cols-3 max-b760:grid-cols-2 max-b420:grid-cols-1">
          {whyTravel.map((item) => (
            <li key={item.title} className="text-center">
              <span
                className="mx-auto grid h-14 w-14 place-items-center rounded-btn border-2 border-yellow text-yellow"
                aria-hidden="true"
              >
                <Icon name={item.icon} size={26} />
              </span>
              <h3 className="mt-4 font-display text-[16px] font-extrabold leading-[1.3] !text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-white/72">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
