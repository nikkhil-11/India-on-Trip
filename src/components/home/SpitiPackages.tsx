import SectionHeading from "@/components/ui/SectionHeading";
import PackageCard from "@/components/cards/PackageCard";
import { rowStyles } from "@/components/ui/rows";
import { spitiPackages } from "@/data/packages";

export default function SpitiPackages() {
  return (
    <section id="spiti-packages" className="section-y">
      <div className="container-page">
        <SectionHeading
          eyebrow="The Land of High Passes"
          title="Spiti Valley Packages"
          subtitle="Explore Spiti Your Way – Group, Self-Drive or Private."
          action={{ label: "View All Packages", href: "/spiti-valley" }}
        />

        <div className={`mt-10 ${rowStyles.packages.container}`}>
          {spitiPackages.map((item) => (
            <PackageCard key={item.slug} item={item} className={rowStyles.packages.item} />
          ))}
        </div>
      </div>
    </section>
  );
}
