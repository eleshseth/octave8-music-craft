import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BLOGS } from "@/lib/blogs";
import { SectionHeading } from "@/components/SectionHeading";
import { EnquireButton } from "@/components/EnquireButton";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Octave 8 Music Academy" },
      { name: "description", content: "Read insightful articles about music education, learning instruments, performance tips, and music academies in Delhi NCR." },
    ],
  }),
  component: BlogLayout,
});

function BlogLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/blog/$slug");
  if (isChild) return <Outlet />;

  // Group blogs by category
  const categories = Array.from(new Set(BLOGS.map(b => b.category)));
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-5xl sm:text-6xl tracking-tight mb-4">
              Music Academy Insights & Tips
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expert articles on learning music, finding the right academy, overcoming challenges, and discovering your musical potential.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <SectionHeading 
          eyebrow="Latest Articles" 
          title="Featured Blog Posts" 
          subtitle={`${BLOGS.length} insightful articles about music education`}
          center 
        />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {BLOGS.map((blog, idx) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                to="/blog/$slug"
                params={{ slug: blog.slug }}
                className="block group h-full rounded-2xl bg-card border border-border hover:border-primary transition-all overflow-hidden"
              >
                {/* Image Section */}
                <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/20 to-card">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest">
                      {blog.category}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
                    {blog.excerpt}
                  </p>

                  {/* Metadata */}
                  <div className="space-y-2 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>{blog.readTime} min read</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span>{blog.author}</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                    Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 bg-gradient-to-b from-transparent to-primary/5">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to start your musical journey with Octave 8?
          </p>
          <EnquireButton />
        </div>
      </section>
    </div>
  );
}
