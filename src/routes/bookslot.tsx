import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AlertCircle, CalendarDays, CheckCircle2, Mail, MapPin, Send, Clock3 } from "lucide-react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/bookslot")({
  head: () => ({
    meta: [
      { title: "Book a Slot — Octave 8 Music Academy" },
      { name: "description", content: "Book a time slot at Octave 8 Music Academy." },
    ],
  }),
  component: BookSlotPage,
});

const EMAILJS_SERVICE_ID = "service_ukhekhl";
const EMAILJS_TEMPLATE_ID = "template_h4tlurr";
const EMAILJS_CONFIRMATION_TEMPLATE_ID = "template_29mh0id";
const EMAILJS_PUBLIC_KEY = "fGvdxCECkPpJphBgA";

function BookSlotPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;

    if (EMAILJS_SERVICE_ID.startsWith("YOUR_")) {
      setStatus("error");
      setErrorMsg("EmailJS keys are not configured yet.");
      return;
    }

    const form = formRef.current;
    const name = (form.elements.namedItem("from_name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("from_email") as HTMLInputElement).value;
    const slot = (form.elements.namedItem("slot") as HTMLSelectElement).value;
    const date = (form.elements.namedItem("date") as HTMLInputElement).value;
    const address = (form.elements.namedItem("address") as HTMLTextAreaElement).value;
    const message = [
      "Book a Slot Request",
      `Name: ${name}`,
      `Email: ${email}`,
      `Time Slot: ${slot}`,
      `Date: ${date}`,
      `Address: ${address}`,
    ].join("\n");

    (form.elements.namedItem("message") as HTMLInputElement).value = message;
    setStatus("sending");

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, {
        publicKey: EMAILJS_PUBLIC_KEY,
      });
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CONFIRMATION_TEMPLATE_ID,
        {
          to_email: email,
          customer_name: name,
          address,
          booking_date: date,
          booking_time: slot,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setStatus("success");
      form.reset();
    } catch (error: unknown) {
      setStatus("error");
      const details =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setErrorMsg(details);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <SectionHeading
        eyebrow="Book a slot"
        title="Find your time to make music"
        subtitle="Choose a date and time that works for you. We will confirm your slot by email."
        center
      />

      <motion.form
        ref={formRef}
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto mt-14 p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-5"
      >
        <Field label="Name" icon={<CheckCircle2 size={17} />}>
          <input required name="from_name" placeholder="Full name" className="input" />
        </Field>

        <Field label="Email ID" icon={<Mail size={17} />}>
          <input required name="from_email" type="email" placeholder="you@example.com" className="input" />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Time Slot" icon={<Clock3 size={17} />}>
            <select required name="slot" className="input">
              <option value="">Available time slot</option>
              <option value="9:00 AM - 10:00 AM" disabled>9:00 AM - 10:00 AM (Booked)</option>
              <option value="10:00 AM - 12:30 PM" disabled>10:00 AM - 12:30 PM (Booked)</option>
              <option value="12:30 PM - 1:30 PM" disabled>12:30 PM - 1:30 PM (Booked)</option>
              <option value="1:30 PM - 2:30 PM" disabled>1:30 PM - 2:30 PM (Booked)</option>
              <option value="2:30 PM - 3:30 PM">2:30 PM - 3:30 PM</option>
              <option value="3:30 PM - 4:30 PM">3:30 PM - 4:30 PM</option>
              <option value="4:30 PM - 5:30 PM">4:30 PM - 5:30 PM</option>
              <option value="7:45 PM - 8:45 PM">7:45 PM - 8:45 PM</option>
              <option value="8:45 PM - 9:45 PM">8:45 PM - 9:45 PM</option>
            </select>
          </Field>
          <Field label="Date" icon={<CalendarDays size={17} />}>
            <input required name="date" type="date" className="input" />
          </Field>
        </div>

        <Field label="Address" icon={<MapPin size={17} />}>
          <textarea
            required
            name="address"
            rows={4}
            placeholder="Enter your address"
            className="input resize-none"
          />
        </Field>

        <input type="hidden" name="message" />

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-full gradient-primary text-primary-foreground font-semibold disabled:opacity-60"
        >
          <Send size={18} /> {status === "sending" ? "Sending..." : "Book My Slot"}
        </button>

        {status === "success" && (
          <div className="flex items-start gap-2 p-4 rounded-xl bg-primary/10 border border-primary/30 text-sm">
            <CheckCircle2 className="text-primary mt-0.5" size={18} />
            Thanks! Your slot request has been sent. We will confirm it shortly.
          </div>
        )}
        {status === "error" && (
          <div className="flex items-start gap-2 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-sm">
            <AlertCircle className="text-destructive mt-0.5" size={18} />
            {errorMsg}
          </div>
        )}
      </motion.form>

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

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 flex items-center gap-2">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}
