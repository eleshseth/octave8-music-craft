import { motion } from "framer-motion";

export function SectionHeading({ eyebrow, title, subtitle, center = false }: { eyebrow?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={center ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}
    >
      {eyebrow && <div className="text-xs tracking-[0.3em] text-primary uppercase mb-3">{eyebrow}</div>}
      <h2 className="font-display text-4xl md:text-6xl text-foreground">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground text-lg">{subtitle}</p>}
    </motion.div>
  );
}
