import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Music, Sparkles, Award, Users } from "lucide-react";
import { COURSES, FEE } from "@/lib/courses";
import { SectionHeading } from "@/components/SectionHeading";
import { EnquireButton } from "@/components/EnquireButton";
import hero4 from "@/assets/hero-vocal.jpg";
import achievementImage from "@/assets/acheivements.png";
import kidsImage from "@/assets/kids.JPG";
import kriyanshImage from "@/assets/kriyansh.webp";
import violinGirlImage from "@/assets/viogirl.webp";
import danceImage from "@/assets/dance.png";

const SLIDES = [
  { img: achievementImage, kicker: "Strings that speak", title: "Find your sound", sub: "Guitar, ukulele & violin for every level" },
  { img: kidsImage, kicker: "Rhythm in your veins", title: "Hit harder. Play tighter.", sub: "Drums, tabla & dholak with industry pros" },
  { img: kriyanshImage, kicker: "Keys to mastery", title: "Compose your future", sub: "Piano & keyboard across classical and pop" },
  { img: hero4, kicker: "Find your voice", title: "Sing like nobody's listening", sub: "Indian & Western vocal training" },
  { img: violinGirlImage, kicker: "Dance in motion", title: "Move with the music", sub: "Performance, rhythm and expression in every class" },
  { img: danceImage, kicker: "Rhythm & movement", title: "Let the beat lead", sub: "Dance, expression and musical energy in every session" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Octave 8 Music Academy — Crafting Musicians" },
      { name: "description", content: "Premier music academy offering guitar, drums, keyboard, violin, flute, ukulele, singing, dholak and tabla classes with monthly fees from ₹200 to ₹3500." },
    ],
  }),
  component: Home,
});

function Home() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {/* HERO SLIDER */}
      <section className="relative h-[88vh] min-h-[560px] overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <img src={SLIDES[i].img} alt={SLIDES[i].title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
            <div className="absolute inset-0 bg-grid opacity-30" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-primary/15 text-primary text-xs tracking-[0.25em] uppercase border border-primary/30 mb-5">
                {SLIDES[i].kicker}
              </div>
              <h1 className="font-display text-6xl md:text-8xl leading-[0.95] text-glow">
                {SLIDES[i].title}
              </h1>
              <p className="mt-5 text-lg md:text-xl text-foreground/85 max-w-xl">{SLIDES[i].sub}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <EnquireButton />
            <Link to="/contact" search={{ mode: "registration" }} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
              Registration <ArrowRight size={18} />
            </Link>
            <Link to="/courses" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary text-foreground">
              Explore Courses <ArrowRight size={18} />
            </Link>
          </div>

          <div className="absolute bottom-6 right-6 flex gap-2">
            {SLIDES.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`slide ${k + 1}`}
                className={`h-1.5 rounded-full transition-all ${k === i ? "w-10 bg-primary" : "w-4 bg-foreground/30"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: "10+", l: "Instruments", icon: Music },
            { n: "500+", l: "Students Trained", icon: Users },
            { n: "₹200–₹3500", l: "Monthly Fee", icon: Sparkles },
            { n: "Pro", l: "Faculty Team", icon: Award },
          ].map((s, k) => (
            <motion.div key={k} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.1 }}
              className="text-center">
              <s.icon className="mx-auto text-primary mb-2" size={28} />
              <div className="font-display text-3xl md:text-4xl text-glow">{s.n}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COURSES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <SectionHeading eyebrow="What we teach" title="Pick your instrument" subtitle="Ten disciplines, one passion. Flexible monthly fees for every instrument and learning level." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-12">
          {COURSES.map((c, k) => (
            <motion.div key={c.slug}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: k * 0.04 }}
              whileHover={{ y: -6 }}>
              <Link to="/courses/$slug" params={{ slug: c.slug }}
                className="block p-5 rounded-2xl bg-card border border-border hover:border-primary hover:ring-glow transition-all h-full">
                <div className="text-4xl mb-3">{c.emoji}</div>
                <div className="font-display text-xl">{c.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.tagline}</div>
                <div className="mt-4 text-primary text-sm flex items-center gap-1">Learn more <ArrowRight size={14}/></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="overflow-hidden rounded-3xl border border-border bg-card/80">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Achievement</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">A place where dedication turns into real milestones</h2>
              <p className="mt-4 text-base text-muted-foreground max-w-2xl">
                From first lessons to stage-ready performances, our students keep growing through consistent guidance, community, and opportunities to shine.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">500+ students trained</span>
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">Award-winning faculty</span>
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">Regular stage performances</span>
              </div>
            </div>
          </div>
          <div className="mt-2 overflow-hidden rounded-b-[1.5rem] border-t border-border bg-background">
            <img src={achievementImage} alt="Octave 8 achievements" className="h-[380px] w-full object-cover object-center sm:h-[500px] lg:h-[620px]" />
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-primary/40 p-10 md:p-16 bg-card">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
          <div className="relative">
            <div className="text-xs tracking-[0.3em] text-primary uppercase mb-3">Crafting Musicians</div>
            <h2 className="font-display text-4xl md:text-6xl max-w-2xl">Ready to play your first note with us?</h2>
            <p className="mt-4 text-muted-foreground max-w-xl">Book a free trial class and meet our faculty. We'll help you choose the right instrument and pace.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <EnquireButton />
              <Link to="/combos" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition">
                See yearly combos <Sparkles size={16}/>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
