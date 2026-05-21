import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/faculty")({
  head: () => ({ meta: [{ title: "Our Faculty — Octave 8 Music Academy" }, { name: "description", content: "Meet the artists and educators behind Octave 8 Music Academy." }] }),
  component: FacultyPage,
});

const TEAM = [
  { name: "Rohan Sharma", role: "Head of Guitar", emoji: "🎸", bio: "15+ years performing & teaching acoustic, electric and bass guitar across India.", tags: ["Guitar", "Bass", "Theory"] },
  { name: "Aisha Verma", role: "Vocal Coach", emoji: "🎤", bio: "Hindustani classical vocalist with playback singing credits and a graded teaching method.", tags: ["Indian", "Bollywood"] },
  { name: "Daniel Pinto", role: "Western Vocals & Piano", emoji: "🎹", bio: "Trinity-certified pianist and vocal coach specialising in pop, rock and musical theatre.", tags: ["Piano", "Western Vocals"] },
  { name: "Karan Bhatt", role: "Drums & Percussion", emoji: "🥁", bio: "Session drummer for live tours and studios. Teaches everything from rudiments to gig-ready chops.", tags: ["Drums", "Cajon"] },
  { name: "Meera Iyer", role: "Violin Maestro", emoji: "🎻", bio: "Carnatic & Western violin teacher with concert experience and exam-board grading expertise.", tags: ["Violin", "Theory"] },
  { name: "Pandit Sajan Mishra", role: "Tabla & Dholak", emoji: "🪘", bio: "Hindustani percussion guru rooted in the Benares gharana with decades of stage performance.", tags: ["Tabla", "Dholak"] },
];

function FacultyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <SectionHeading eyebrow="Our Faculty" title="Meet your mentors" subtitle="A team of performing artists and patient teachers — each chosen for craft and care." center />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        {TEAM.map((t, k) => (
          <motion.div key={t.name}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.07 }}
            className="group rounded-2xl bg-card border border-border hover:border-primary transition-all overflow-hidden">
            <div className="aspect-[4/3] bg-gradient-to-br from-primary/25 to-card flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">
              {t.emoji}
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-primary text-xs tracking-widest uppercase">
                <Award size={14}/> {t.role}
              </div>
              <h3 className="font-display text-2xl mt-1">{t.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.bio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.tags.map((tag) => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-secondary border border-border">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
