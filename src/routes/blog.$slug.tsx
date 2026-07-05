import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BLOGS } from "@/lib/blogs";
import { EnquireButton } from "@/components/EnquireButton";
import { Calendar, Clock, User, Share2, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const blog = BLOGS.find((b) => b.slug === params.slug);
    return {
      meta: [
        { title: `${blog?.title} — Octave 8 Music Academy` },
        { name: "description", content: blog?.excerpt || "" },
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const blog = BLOGS.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="font-display text-3xl mb-4">Blog Post Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The article you're looking for doesn't exist.
        </p>
        <Link to="/blog" className="text-primary font-semibold hover:underline">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  // Related blogs (same category, excluding current)
  const relatedBlogs = BLOGS.filter(
    (b) => b.category === blog.category && b.slug !== blog.slug
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-semibold text-sm"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest">
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Metadata Bar */}
          <div className="flex flex-wrap gap-4 sm:gap-8 text-sm text-muted-foreground pb-8 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                👤
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-primary font-semibold">Author</div>
                <div className="text-foreground">{blog.author}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-primary" />
              <div>
                <div className="text-xs uppercase tracking-widest text-primary font-semibold">Published</div>
                <div className="text-foreground">{blog.date}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-primary" />
              <div>
                <div className="text-xs uppercase tracking-widest text-primary font-semibold">Reading Time</div>
                <div className="text-foreground">{blog.readTime} min</div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="my-12 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
            <img src={blog.image} alt={blog.title} className="h-full w-full object-cover" />
          </div>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          <div
            className="text-lg leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{
              __html: blog.content
                .split("\n")
                .map((line) => {
                  // Handle markdown-like formatting
                  if (line.startsWith("## ")) {
                    return `<h2 class="font-display text-3xl mt-12 mb-4 text-foreground">${line.replace("## ", "")}</h2>`;
                  }
                  if (line.startsWith("### ")) {
                    return `<h3 class="font-display text-2xl mt-8 mb-3 text-foreground">${line.replace("### ", "")}</h3>`;
                  }
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return `<p class="font-semibold text-lg text-primary">${line.replace(/\*\*/g, "")}</p>`;
                  }
                  if (line.startsWith("- ")) {
                    return `<li class="ml-4 list-disc text-muted-foreground">${line.replace("- ", "")}</li>`;
                  }
                  if (line.trim() === "") {
                    return "<br />";
                  }
                  return `<p class="text-muted-foreground">${line}</p>`;
                })
                .join(""),
            }}
          />
        </motion.article>
      </section>

      {/* Share Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Share this article</p>
            <div className="flex gap-3">
              <button className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
          <EnquireButton />
        </div>
      </section>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-border">
          <h2 className="font-display text-3xl mb-8">Related Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedBlogs.map((relatedBlog, idx) => (
              <motion.div
                key={relatedBlog.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: relatedBlog.slug }}
                  className="block group rounded-xl bg-card border border-border hover:border-primary transition-all overflow-hidden h-full"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/20 to-card">
                    <img
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{relatedBlog.readTime} min read</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center bg-gradient-to-b from-transparent to-primary/5 rounded-2xl my-12">
        <h2 className="font-display text-3xl mb-4">Ready to Begin Your Musical Journey?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join hundreds of students at Octave 8 Music Academy who are discovering their potential. Start with a trial class today.
        </p>
        <EnquireButton />
      </section>
    </div>
  );
}
