import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import hero1 from "@/assets/hero-guitar.jpg";
import hero2 from "@/assets/hero-drums.jpg";
import hero3 from "@/assets/hero-keys.jpg";
import hero4 from "@/assets/hero-vocal.jpg";
import kidsImage from "@/assets/kids.JPG";
import img7805 from "@/assets/IMG_7805.JPG";
import img7806 from "@/assets/IMG_7806.JPG";
import img7807 from "@/assets/IMG_7807.JPG";
import img7808 from "@/assets/IMG_7808.JPG";
import img7810 from "@/assets/IMG_7810.JPG";
import img7811 from "@/assets/IMG_7811.JPG";
import img7812 from "@/assets/IMG_7812.JPG";
import img7813 from "@/assets/IMG_7813.JPG";
const unnamed1jpg = new URL("../assets/unnamed (1).jpg", import.meta.url).href;
const unnamed1webp = new URL("../assets/unnamed (1).webp", import.meta.url).href;
const unnamed2jpg = new URL("../assets/unnamed (2).jpg", import.meta.url).href;
const unnamed2webp = new URL("../assets/unnamed (2).webp", import.meta.url).href;
const unnamed3jpg = new URL("../assets/unnamed (3).jpg", import.meta.url).href;
const unnamed3webp = new URL("../assets/unnamed (3).webp", import.meta.url).href;
const unnamed4jpg = new URL("../assets/unnamed (4).jpg", import.meta.url).href;
const unnamed4webp = new URL("../assets/unnamed (4).webp", import.meta.url).href;
const unnamed5webp = new URL("../assets/unnamed (5).webp", import.meta.url).href;
const unnamed6webp = new URL("../assets/unnamed (6).webp", import.meta.url).href;
const unnamed7webp = new URL("../assets/unnamed (7).webp", import.meta.url).href;
const unnamed8webp = new URL("../assets/unnamed (8).webp", import.meta.url).href;
const unnamed9webp = new URL("../assets/unnamed (9).webp", import.meta.url).href;
const unnamed10webp = new URL("../assets/unnamed (10).webp", import.meta.url).href;
const unnamed11webp = new URL("../assets/unnamed (11).webp", import.meta.url).href;
const unnamed12webp = new URL("../assets/unnamed (12).webp", import.meta.url).href;
const unnamed13webp = new URL("../assets/unnamed (13).webp", import.meta.url).href;
const unnamed14webp = new URL("../assets/unnamed (14).webp", import.meta.url).href;
const unnamed15webp = new URL("../assets/unnamed (15).webp", import.meta.url).href;
const unnamed16webp = new URL("../assets/unnamed (16).webp", import.meta.url).href;
const unnamed17webp = new URL("../assets/unnamed (17).webp", import.meta.url).href;
const unnamed18webp = new URL("../assets/unnamed (18).webp", import.meta.url).href;
const unnamed19webp = new URL("../assets/unnamed (19).webp", import.meta.url).href;
const unnamed20webp = new URL("../assets/unnamed (20).webp", import.meta.url).href;
const unnamed21webp = new URL("../assets/unnamed (21).webp", import.meta.url).href;
const unnamed22webp = new URL("../assets/unnamed (22).webp", import.meta.url).href;
const unnamedMainJpg = new URL("../assets/unnamed.jpg", import.meta.url).href;

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [{ title: "Gallery — Octave 8 Music Academy" }, { name: "description", content: "Moments from our music academy — classes, recitals and student performances." }] }),
  component: GalleryPage,
});

// To add academy photos: drop JPG/PNG files into src/assets/ and import them here.
const IMAGES = [
  
  { src: img7805, caption: "Academy moment" },
  { src: img7806, caption: "Class session" },
  { src: img7807, caption: "Student performance" },
  { src: img7808, caption: "Music practice" },
  { src: img7810, caption: "Academy event" },
  { src: img7811, caption: "Lesson time" },
  { src: img7812, caption: "Studio session" },
  { src: img7813, caption: "Group activity" },
  { src: kidsImage, caption: "Kids class" },
  { src: unnamed1jpg, caption: "Academy moment" },
  { src: unnamed1webp, caption: "Class time" },
  { src: unnamed2jpg, caption: "Student moment" },
  { src: unnamed2webp, caption: "Lesson session" },
  { src: unnamed3jpg, caption: "Music practice" },
  { src: unnamed3webp, caption: "Performance" },
  { src: unnamed4jpg, caption: "Academy event" },
  { src: unnamed4webp, caption: "Class activity" },
  { src: unnamed5webp, caption: "Studio work" },
  { src: unnamed6webp, caption: "Practice room" },
  { src: unnamed7webp, caption: "Group lesson" },
  { src: unnamed8webp, caption: "Music session" },
  { src: unnamed9webp, caption: "Student jam" },
  { src: unnamed10webp, caption: "Academy moment" },
  { src: unnamed11webp, caption: "Live performance" },
  { src: unnamed12webp, caption: "Class snapshot" },
  { src: unnamed13webp, caption: "Music time" },
  { src: unnamed14webp, caption: "Studio moment" },
  { src: unnamed15webp, caption: "Student showcase" },
  { src: unnamed16webp, caption: "Lesson moment" },
  { src: unnamed17webp, caption: "Academy shot" },
  { src: unnamed18webp, caption: "Performance time" },
  { src: unnamed19webp, caption: "Music class" },
  { src: unnamed20webp, caption: "Group activity" },
  { src: unnamed21webp, caption: "Academy event" },
  { src: unnamed22webp, caption: "Student moment" },
  { src: unnamedMainJpg, caption: "Octave 8 snapshot" },
];

const YOUTUBE_VIDEOS = [
  {
    title: "Featured performance",
    description: "A highlight reel from our academy performances shared on YouTube.",
    videoId: "JNTo-mtqB_s",
  },
  {
    title: "Another studio performance",
    description: "An additional performance video from our talented students.",
    videoId: "JxJWC6odFNw",
  },
];

function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <SectionHeading eyebrow="Gallery" title="Inside Octave 8" subtitle="Snapshots from our classes, recitals and student journeys." center />

      <section className="mt-12 rounded-3xl border border-border bg-card/60 p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">YouTube Performance Videos</p>
          <h3 className="mt-2 text-2xl font-semibold text-foreground">Featured performances</h3>
          <p className="mt-3 text-sm text-muted-foreground">A growing collection of live and studio performance highlights from our academy.</p>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {YOUTUBE_VIDEOS.map((video) => (
            <div key={video.videoId} className="overflow-hidden rounded-2xl border border-border bg-background/80">
              <div className="aspect-video overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              <div className="p-4 sm:p-5">
                <h4 className="text-lg font-semibold text-foreground">{video.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

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
