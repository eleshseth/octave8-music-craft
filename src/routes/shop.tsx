import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShoppingCart, Tag } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/shop")({
  head: () => ({ meta: [{ title: "Shop Instruments — Octave 8 Music Academy" }, { name: "description", content: "Buy quality musical instruments from Octave 8 — guitars, keyboards, drums, ukuleles and more." }] }),
  component: ShopPage,
});

const ITEMS = [
  { name: "Acoustic Guitar — Yamaha F310", price: 9500, tag: "Bestseller", emoji: "🎸" },
  { name: "Electric Guitar Starter Kit", price: 18500, tag: "New", emoji: "🎸" },
  { name: "Beginner Drum Kit (5-piece)", price: 28500, tag: "", emoji: "🥁" },
  { name: "Casio CT-S300 Keyboard", price: 12500, tag: "Popular", emoji: "🎹" },
  { name: "Roland FP-30X Digital Piano", price: 72000, tag: "Pro", emoji: "🎹" },
  { name: "Ukulele — Concert Mahogany", price: 3200, tag: "", emoji: "🎶" },
  { name: "Violin — Full Size Set", price: 8900, tag: "", emoji: "🎻" },
  { name: "Tabla Set with Bag", price: 6500, tag: "", emoji: "🪘" },
  { name: "Bansuri (Indian Flute)", price: 1200, tag: "Combo Free", emoji: "🪈" },
];

function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <SectionHeading eyebrow="Shop" title="Instruments & Gear" subtitle="Curated, student-tested instruments. Members get exclusive pricing." center />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        {ITEMS.map((it, k) => (
          <motion.div key={it.name}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.05 }}
            whileHover={{ y: -6 }}
            className="rounded-2xl bg-card border border-border hover:border-primary transition-all overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-primary/15 to-card flex items-center justify-center text-8xl">{it.emoji}</div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold">{it.name}</h3>
                {it.tag && <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-primary/15 text-primary">{it.tag}</span>}
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <Tag size={14} className="text-primary"/>
                <span className="font-display text-2xl text-primary">₹{it.price.toLocaleString("en-IN")}</span>
              </div>
              <Link to="/contact" className="mt-4 w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-full gradient-primary text-primary-foreground text-sm font-semibold">
                <ShoppingCart size={16}/> Enquire to Buy
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
