import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Gift, Check, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { FEE } from "@/lib/courses";

export const Route = createFileRoute("/combos")({
  head: () => ({ meta: [{ title: "Yearly Combo Packages — Free Instrument | Octave 8" }, { name: "description", content: "Yearly enrollment packages with a FREE instrument included. Save more, learn more." }] }),
  component: CombosPage,
});

const PACKAGES = [
  {
    name: "Solo Yearly",
    courses: 1,
    annual: FEE * 12 - 1500,
    save: 1500,
    free: "Beginner Ukulele",
    perks: ["1 instrument course", "Free instrument bundled", "1 free recital pass", "Priority slots"],
    highlight: false,
  },
  {
    name: "Duo Combo",
    courses: 2,
    annual: (FEE * 2 * 12) - 4000,
    save: 4000,
    free: "Acoustic Guitar OR Keyboard",
    perks: ["2 instrument courses", "Free starter instrument", "2 recital passes", "Free annual workshop", "Priority slots"],
    highlight: true,
  },
  {
    name: "Maestro Pro",
    courses: 3,
    annual: (FEE * 3 * 12) - 8000,
    save: 8000,
    free: "Pro grade instrument of choice",
    perks: ["3 instrument courses", "Free pro instrument", "Unlimited recital passes", "Studio recording session", "1-on-1 mentorship"],
    highlight: false,
  },
];

function CombosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <SectionHeading eyebrow="Yearly Packages" title="Combo + Free Instrument" subtitle="Commit for a year, save thousands, and walk in to your first class with a brand-new instrument on us." center />

      <div className="grid lg:grid-cols-3 gap-6 mt-14">
        {PACKAGES.map((p, k) => (
          <motion.div key={p.name}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.1 }}
            className={`relative rounded-3xl p-8 border ${p.highlight ? "border-primary bg-card ring-glow" : "border-border bg-card"}`}>
            {p.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-primary text-primary-foreground text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                <Sparkles size={12}/> Most Popular
              </div>
            )}
            <h3 className="font-display text-3xl">{p.name}</h3>
            <p className="text-xs uppercase tracking-widest text-primary mt-1">{p.courses} {p.courses > 1 ? "courses" : "course"}</p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-5xl text-glow">₹{p.annual.toLocaleString("en-IN")}</span>
              <span className="text-muted-foreground">/ year</span>
            </div>
            <div className="mt-1 text-sm text-primary">Save ₹{p.save.toLocaleString("en-IN")}</div>

            <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/30 flex items-start gap-3">
              <Gift className="text-primary mt-0.5" size={20}/>
              <div>
                <div className="text-xs uppercase tracking-widest text-primary">Free Instrument</div>
                <div className="font-semibold mt-0.5">{p.free}</div>
              </div>
            </div>

            <ul className="mt-6 space-y-2">
              {p.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-sm">
                  <Check className="text-primary mt-0.5 shrink-0" size={16}/> {perk}
                </li>
              ))}
            </ul>

            <Link to="/contact" search={{ course: `${p.name} (Yearly Combo)` } as any}
              className={`mt-8 w-full inline-flex justify-center px-6 py-3 rounded-full font-semibold transition-all ${p.highlight ? "gradient-primary text-primary-foreground" : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"}`}>
              Enquire Now
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
