import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function EnquireButton({ courseName, variant = "primary", className = "" }: { courseName?: string; variant?: "primary" | "ghost"; className?: string }) {
  const search = courseName ? { course: courseName } : undefined;
  const base = "inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all group";
  const styles = variant === "primary"
    ? "gradient-primary text-primary-foreground hover:ring-glow"
    : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground";
  return (
    <Link to="/contact" search={search as any} className={`${base} ${styles} ${className}`}>
      Enquire Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}
