import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FAQ from "../../components/FAQ";
import { getMarkdownPost } from "./markdownPosts";

const SITE_URL = "https://insure.doaide.com";

function setMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function MarkdownPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getMarkdownPost(slug);

  useEffect(() => {
    if (!post) return;
    const url = `${SITE_URL}/blog/${post.slug}`;
    const title = `${post.title} | InsureKit`;
    document.title = title;
    setMeta("name", "description", post.description);
    setMeta("name", "keywords", post.keywords);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", post.description);
    setMeta("property", "og:type", "article");
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", post.description);

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    let script = document.getElementById("blog-ld-json");
    if (!script) {
      script = document.createElement("script");
      script.id = "blog-ld-json";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        url,
        datePublished: post.date,
        dateModified: post.date,
        author: { "@type": "Organization", name: "DoAide" },
        publisher: { "@type": "Organization", name: "DoAide", url: "https://doaide.com" },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: `${SITE_URL}/og-image.png`,
        inLanguage: "en-IN",
      },
    ];
    if (post.faq.length) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((i) => ({
          "@type": "Question",
          name: i.q,
          acceptedAnswer: { "@type": "Answer", text: i.a },
        })),
      });
    }
    script.textContent = JSON.stringify(schemas);
    return () => { if (script.parentNode) script.parentNode.removeChild(script); };
  }, [post]);

  if (!post) {
    return (
      <div className="panel-inner p-6 text-sm text-white/60">
        This article could not be found. <Link to="/blog" className="text-signal">Browse all articles →</Link>
      </div>
    );
  }

  // Keep in-app links inside the SPA instead of doing a full page load.
  const onClick = (e) => {
    const a = e.target.closest("a");
    const href = a?.getAttribute("href");
    if (!href || !href.startsWith("/") || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <article className="animate-fade-up">
      <span className="text-[10px] px-2 py-0.5 rounded bg-signal/10 text-signal font-medium uppercase tracking-wide">
        {post.category}
      </span>
      <h1 className="text-2xl font-bold text-white mt-3 mb-1">{post.title}</h1>
      <p className="text-white/40 text-sm mb-8">
        Updated {new Date(post.date).toLocaleDateString("en-IN", { month: "long", year: "numeric" })} &middot; {post.readTime}
      </p>
      <div className="md-post" onClick={onClick} dangerouslySetInnerHTML={{ __html: post.html }} />
      {post.faq.length > 0 && <FAQ items={post.faq} />}
    </article>
  );
}
