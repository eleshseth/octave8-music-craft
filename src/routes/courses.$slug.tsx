import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, ArrowLeft } from "lucide-react";
import { COURSES, FEE } from "@/lib/courses";
import { EnquireButton } from "@/components/EnquireButton";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = COURSES.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.course.name} Classes — Octave 8 Music Academy` },
      { name: "description", content: `${loaderData.course.name} classes at Octave 8 — ${loaderData.course.tagline}. ₹${FEE}/month.` },
    ] : [],
  }),
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="font-display text-5xl">Course not found</h1>
      <Link to="/courses" className="mt-6 inline-block text-primary">← Back to courses</Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="p-10 text-center text-destructive">{error.message}</div>,
  component: CoursePage,
});

function CoursePage() {
  const { course } = Route.useLoaderData();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft size={16}/> All courses
      </Link>
      <div className="grid lg:grid-cols-5 gap-10 items-start">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
          className="lg:col-span-2 aspect-square rounded-3xl bg-gradient-to-br from-primary/30 via-card to-background border border-border flex items-center justify-center text-[16rem] leading-none ring-glow">
          {course.emoji}
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-3">
          <div className="text-xs tracking-[0.3em] text-primary uppercase">{course.tagline}</div>
          <h1 className="font-display text-5xl md:text-7xl mt-2 text-glow">{course.name}</h1>
          <p className="mt-5 text-lg text-muted-foreground">{course.description}</p>

          <div className="mt-8 inline-flex items-baseline gap-3 px-6 py-4 rounded-2xl bg-card border border-primary/40">
            <span className="font-display text-4xl text-primary">₹{FEE}</span>
            <span className="text-muted-foreground">/ month</span>
          </div>

          <ul className="mt-8 grid sm:grid-cols-2 gap-3">
            {course.highlights.map((h: string) => (
              <li key={h} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/40 border border-border">
                <Check className="text-primary mt-0.5 shrink-0" size={18} />
                <span className="text-sm">{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <EnquireButton courseName={course.name} />
            <Link to="/combos" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary">
              View Combo Packages
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
