import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import hero1 from "@/assets/hero-guitar.jpg";
import hero2 from "@/assets/hero-drums.jpg";
import hero3 from "@/assets/hero-keys.jpg";
import hero4 from "@/assets/hero-vocal.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [{ title: "Gallery — Octave 8 Music Academy" }, { name: "description", content: "Moments from our music academy — classes, recitals and student performances." }] }),
  component: GalleryPage,
});

// To add academy photos: drop JPG/PNG files into src/assets/ and import them here.
const IMAGES = [
  { src: hero1, caption: "Guitar masterclass" },
  { src: hero2, caption: "Live drum session" },
  { src: hero3, caption: "Piano practice room" },
  { src: hero4, caption: "Vocal recording" },
  { src: hero1, caption: "Performance night" },
  { src: hero3, caption: "Keyboard ensemble" },
  { src: hero2, caption: "Rhythm workshop" },
  { src: hero4, caption: "Student showcase" },
];

function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <SectionHeading eyebrow="Gallery" title="Inside Octave 8" subtitle="Snapshots from our classes, recitals and student journeys." center />
      <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
        {IMAGES.map((img, k) => (
          <motion.figure key={k}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: (k % 6) * 0.05 }}
            className="mb-5 break-inside-avoid group relative overflow-hidden rounded-2xl border border-border">
            <img src={img.src} alt={img.caption} loading="lazy" className="w-full h-auto group-hover:scale-105 transition-transform duration-700"/>
            <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background via-background/60 to-transparent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {img.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>
      <p className="mt-10 text-center text-xs text-muted-foreground">
        Want to add more photos? Drop them in <code className="text-primary">src/assets/</code> and import them in <code className="text-primary">src/routes/gallery.tsx</code>.
      </p>
    </div>
  );
}
