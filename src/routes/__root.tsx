import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Music2, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";
import appCss from "../styles.css?url";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/combos", label: "Combo Packages" },
  { to: "/faculty", label: "Faculty" },
  { to: "/gallery", label: "Gallery" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
] as const;

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Octave 8 Music Academy" className="h-12 w-12 rounded-full ring-2 ring-primary group-hover:ring-glow transition-all" />
          <div className="leading-tight">
            <div className="font-display text-lg sm:text-xl tracking-wider">OCTAVE 8</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-primary">Crafting Musicians</div>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-3 px-5 py-2.5 rounded-full gradient-primary text-primary-foreground font-semibold text-sm hover:ring-glow transition-all"
          >
            Enquire Now
          </Link>
        </nav>
        <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background/95">
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="px-3 py-3 rounded-md hover:bg-secondary">
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border mt-20 bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Octave 8" className="h-12 w-12 rounded-full ring-2 ring-primary" />
            <div>
              <div className="font-display text-xl">OCTAVE 8 MUSIC ACADEMY</div>
              <div className="text-xs text-primary tracking-widest">CRAFTING MUSICIANS</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Where passion meets practice. Learn from the best, perform like a pro.</p>
        </div>
        <div>
          <h4 className="font-display text-lg mb-3 text-primary">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}><Link to={n.to} className="text-muted-foreground hover:text-primary">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg mb-3 text-primary">Get in Touch</h4>
          <a href="tel:7838825103" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-2"><Phone size={16}/> +91 78388 25103</a>
          <a href="mailto:octave8musicacademy1@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-2"><Mail size={16}/> octave8musicacademy1@gmail.com</a>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3"><Music2 size={16} className="text-primary"/> Monthly fee ₹1500 per course</div>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Octave 8 Music Academy. All rights reserved.
      </div>
    </footer>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-primary text-glow">404</h1>
        <p className="mt-4 text-muted-foreground">This page hit a wrong note.</p>
        <Link to="/" className="mt-6 inline-block px-6 py-3 rounded-full gradient-primary text-primary-foreground font-semibold">Back home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">Something went off-key</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 px-6 py-3 rounded-full gradient-primary text-primary-foreground font-semibold">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Octave 8 Music Academy — Crafting Musicians" },
      { name: "description", content: "Learn guitar, drums, keyboard, violin, flute, ukulele, singing, dholak and tabla at Octave 8 Music Academy. ₹1500/month per course." },
      { property: "og:title", content: "Octave 8 Music Academy — Crafting Musicians" },
      { name: "twitter:title", content: "Octave 8 Music Academy — Crafting Musicians" },
      { property: "og:description", content: "Learn guitar, drums, keyboard, violin, flute, ukulele, singing, dholak and tabla at Octave 8 Music Academy. ₹1500/month per course." },
      { name: "twitter:description", content: "Learn guitar, drums, keyboard, violin, flute, ukulele, singing, dholak and tabla at Octave 8 Music Academy. ₹1500/month per course." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d84f7f68-f78e-41b0-891e-d8bba721f4d4/id-preview-fdb56d3f--1d778e9e-efe4-4fe5-a443-e67d25e58b6f.lovable.app-1779353289408.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d84f7f68-f78e-41b0-891e-d8bba721f4d4/id-preview-fdb56d3f--1d778e9e-efe4-4fe5-a443-e67d25e58b6f.lovable.app-1779353289408.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1"><Outlet /></main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
