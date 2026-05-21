import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { SectionHeading } from "@/components/SectionHeading";
import { COURSES } from "@/lib/courses";

type Search = { course?: string };

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): Search => ({ course: typeof s.course === "string" ? s.course : undefined }),
  head: () => ({ meta: [{ title: "Contact — Octave 8 Music Academy" }, { name: "description", content: "Get in touch with Octave 8 Music Academy for enquiries, admissions and instrument purchases." }] }),
  component: ContactPage,
});

// ─── EmailJS setup ───────────────────────────────────────────────────────────
// 1. Create a free account at https://emailjs.com
// 2. Add an email service, then a template that uses {{from_name}}, {{from_email}},
//    {{phone}}, {{course}}, {{message}} variables and sends to octave8musicacademy1@gmail.com
// 3. Paste your Service ID, Template ID and Public Key below.
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
// ─────────────────────────────────────────────────────────────────────────────

function ContactPage() {
  const { course } = Route.useSearch();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(course ?? "");

  useEffect(() => { if (course) setSelectedCourse(course); }, [course]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    if (EMAILJS_SERVICE_ID.startsWith("YOUR_")) {
      setStatus("error");
      setErrorMsg("EmailJS keys aren't configured yet. Open src/routes/contact.tsx and paste your Service ID, Template ID and Public Key.");
      return;
    }
    setStatus("sending");
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, { publicKey: EMAILJS_PUBLIC_KEY });
      setStatus("success");
      formRef.current.reset();
      setSelectedCourse("");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.text || err?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <SectionHeading eyebrow="Get in touch" title="Let's make music together" subtitle="Send us a note for admissions, trial classes, instrument purchases or any question." center />

      <div className="grid lg:grid-cols-5 gap-8 mt-14">
        {/* INFO */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="lg:col-span-2 space-y-4">
          <a href="tel:7838825103" className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary transition">
            <div className="p-3 rounded-xl bg-primary/15"><Phone className="text-primary" /></div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Phone</div>
              <div className="font-semibold mt-1">+91 78388 25103</div>
            </div>
          </a>
          <a href="mailto:octave8musicacademy1@gmail.com" className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary transition">
            <div className="p-3 rounded-xl bg-primary/15"><Mail className="text-primary" /></div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
              <div className="font-semibold mt-1 break-all">octave8musicacademy1@gmail.com</div>
            </div>
          </a>
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border">
            <div className="p-3 rounded-xl bg-primary/15"><MapPin className="text-primary" /></div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Visit Us</div>
              <div className="font-semibold mt-1">Octave 8 Music Academy</div>
              <div className="text-sm text-muted-foreground">Drop a message — we'll share directions.</div>
            </div>
          </div>
          <div className="p-5 rounded-2xl border border-primary/30 bg-primary/5">
            <div className="text-xs uppercase tracking-widest text-primary">Slogan</div>
            <div className="font-display text-2xl mt-1 text-glow">Crafting Musicians</div>
          </div>
        </motion.div>

        {/* FORM */}
        <motion.form ref={formRef} onSubmit={onSubmit}
          initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="lg:col-span-3 p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Your Name">
              <input required name="from_name" placeholder="Full name" className="input" />
            </Field>
            <Field label="Phone">
              <input required name="phone" type="tel" placeholder="+91…" className="input" />
            </Field>
          </div>
          <Field label="Email">
            <input required name="from_email" type="email" placeholder="you@example.com" className="input" />
          </Field>
          <Field label="Interested In">
            <select name="course" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="input">
              <option value="">Choose a course or topic…</option>
              {COURSES.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
              <option value="Yearly Combo Package">Yearly Combo Package</option>
              <option value="Buy Instrument">Buy Instrument</option>
              <option value="General Enquiry">General Enquiry</option>
            </select>
          </Field>
          <Field label="Message">
            <textarea required name="message" rows={5} placeholder="Tell us about your goals, age, prior experience…" className="input resize-none" />
          </Field>

          <button type="submit" disabled={status === "sending"}
            className="w-full inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-full gradient-primary text-primary-foreground font-semibold disabled:opacity-60">
            <Send size={18}/> {status === "sending" ? "Sending…" : "Send Enquiry"}
          </button>

          {status === "success" && (
            <div className="flex items-start gap-2 p-4 rounded-xl bg-primary/10 border border-primary/30 text-sm">
              <CheckCircle2 className="text-primary mt-0.5" size={18}/>
              Thanks! Your enquiry has been sent. We'll get back within 24 hours.
            </div>
          )}
          {status === "error" && (
            <div className="flex items-start gap-2 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-sm">
              <AlertCircle className="text-destructive mt-0.5" size={18}/>
              {errorMsg}
            </div>
          )}
        </motion.form>
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          background: var(--color-input);
          border: 1px solid var(--color-border);
          color: var(--color-foreground);
          font-size: 0.95rem;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px oklch(0.88 0.24 130 / 0.2);
        }
        .input::placeholder { color: var(--color-muted-foreground); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}
