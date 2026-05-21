import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { COURSES, FEE } from "@/lib/courses";
import { SectionHeading } from "@/components/SectionHeading";
import { EnquireButton } from "@/components/EnquireButton";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — Octave 8 Music Academy" },
      { name: "description", content: "Explore guitar, drums, keyboard, violin, flute, ukulele, singing, dholak and tabla courses at ₹1500/month." },
    ],
  }),
  component: CoursesLayout,
});

function CoursesLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/courses/$slug");
  if (isChild) return <Outlet />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <SectionHeading eyebrow="Our Courses" title="Choose your instrument" subtitle={`Each course runs at ₹${FEE} per month. Beginner-friendly, performance-focused.`} center />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        {COURSES.map((c, k) => (
          <motion.div key={c.slug}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: k * 0.05 }}>
            <Link to="/courses/$slug" params={{ slug: c.slug }}
              className="block group rounded-2xl bg-card border border-border hover:border-primary transition-all overflow-hidden h-full">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-card flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500">
                {c.emoji}
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl">{c.name}</h3>
                  <span className="text-primary font-semibold">₹{FEE}/mo</span>
                </div>
                <p className="text-xs text-primary uppercase tracking-widest mt-1">{c.tagline}</p>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-primary text-sm font-semibold">
                  View course <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-16 text-center">
        <EnquireButton />
      </div>
    </div>
  );
}
