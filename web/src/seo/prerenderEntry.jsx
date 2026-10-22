// Build-time entry used by scripts/prerender.mjs. Renders one route into the
// jsdom document so SEOHead writes that page's own <head> tags.
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import App from "../App";

export async function renderRoute(pathname, container) {
  const root = createRoot(container);
  flushSync(() => {
    root.render(
      <MemoryRouter initialEntries={[pathname]}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>,
    );
  });
  // Routes are lazy-loaded: wait until the chunk resolves and real content
  // replaces the Suspense fallback, then let passive effects (SEOHead) run.
  for (let i = 0; i < 400; i++) {
    await new Promise((r) => setTimeout(r, 0));
    const loading = container.querySelector("[data-route-loading]");
    if (!loading && container.textContent) break;
  }
  for (let i = 0; i < 5; i++) await new Promise((r) => setTimeout(r, 0));
  return root;
}
