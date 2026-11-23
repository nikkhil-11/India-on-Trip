import Icon from "@/components/ui/Icon";
import { bookingSteps } from "@/data/home";

export default function BookingSteps() {
  return (
    <div>
      <h2 className="t-h2">How to Book Your Trip With Us?</h2>

      <ol className="mt-6 grid grid-cols-4 gap-6 max-b760:grid-cols-2 max-b760:gap-4">
        {bookingSteps.map((step, index) => (
          <li key={step.title} className="relative">
            <div className="h-full rounded-card border border-line bg-white p-5 shadow-card">
              <span
                className="float-right font-display text-[30px] font-extrabold leading-none text-tint"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <span
                className="grid h-10 w-10 place-items-center rounded-btn bg-tint text-primary"
                aria-hidden="true"
              >
                <Icon name={step.icon} size={20} />
              </span>
              <h3 className="mt-3.5 font-display text-[15.5px] font-extrabold leading-[1.3] text-deep">
                {step.title}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-[1.6] text-muted">{step.text}</p>
            </div>

            {/* Connector chip, centred in the 24px gap between cards. */}
            {index < bookingSteps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute -right-7 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-yellow text-deep max-b760:hidden"
              >
                <Icon name="arrow" size={16} strokeWidth={2.2} />
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
