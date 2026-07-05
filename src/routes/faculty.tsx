import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import abhinavImage from "@/assets/abhinav.jpeg";
import meetaImage from "@/assets/meeta.jpg";
import krishnaImage from "@/assets/krishna.png";
import eleshImage from "@/assets/elesh.jpg";
import elesh2Image from "@/assets/elesh2.jpg";

export const Route = createFileRoute("/faculty")({
  head: () => ({ meta: [{ title: "Our Faculty — Octave 8 Music Academy" }, { name: "description", content: "Meet the artists and educators behind Octave 8 Music Academy." }] }),
  component: FacultyPage,
});

const TEAM = [
  { name: "Elesh", role: "Percussive Fingerstyle Guitar Teacher", emoji: null, image: eleshImage, bio: "Professional percussive fingerstyle guitarist and Trinity-certified teacher known for precise technique and inspiring contemporary guitar lessons.", tags: ["Guitar", "Fingerstyle", "Trinity Certified"] },
  { name: "Elesh Seth", role: "Grade 8 Keyboard Teacher", emoji: null, image: elesh2Image, bio: "Grade 8 certified keyboard tutor with exam-focused lessons in technique, theory and performance.", tags: ["Keyboard", "Grade 8", "Certified"] },
  { name: "Abhinav", role: "Grade 8 Violin Teacher", emoji: null, image: abhinavImage, bio: "Dedicated violin mentor with a Grade 8 foundation, helping students build technique, confidence, and expressive performance skills.", tags: ["Violin", "Technique", "Performance"] },
  { name: "Meeta", role: "Bollywood & Classical Vocal Teacher", emoji: null, image: meetaImage, bio: "Classically trained vocalist with a Bollywood style approach, helping students build voice strength, expression, and stage confidence.", tags: ["Vocal", "Bollywood", "Classical"] },
  { name: "Krishna", role: "Professional Indian Classical Flute Teacher", emoji: null, image: krishnaImage, bio: "Experienced flute mentor with 5+ years of teaching, specializing in Indian classical flute techniques and expressive performance.", tags: ["Flute", "Indian Classical", "Performance"] },
  { name: "", role: "Drums & Percussion", emoji: "🥁", bio: "Session drummer for live tours and studios. Teaches everything from rudiments to gig-ready chops.", tags: ["Drums", "Cajon"], image: null, hiring: true },
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
            <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/25 to-card group-hover:scale-110 transition-transform duration-500">
              {t.hiring ? (
                <div className="flex h-full w-full items-center justify-center bg-secondary/60 text-center px-6">
                  <span className="text-xl font-semibold text-primary">Hiring</span>
                </div>
              ) : t.image ? (
                <img src={t.image} alt={t.name} className="h-full w-full object-cover object-top" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-8xl">
                  {t.emoji}
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-primary text-xs tracking-widest uppercase">
                <Award size={14}/> {t.role}
              </div>
              {t.name ? <h3 className="font-display text-2xl mt-1">{t.name}</h3> : null}
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
