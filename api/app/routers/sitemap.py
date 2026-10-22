import json
from pathlib import Path

from fastapi import APIRouter
from fastapi.responses import PlainTextResponse, Response

router = APIRouter(tags=["seo"])

SITE_URL = "https://insure.doaide.com"

# Single source of truth shared with the web build (prerender) — see web/src/seo/routes.json.
ROUTES_FILE = Path(__file__).resolve().parents[3] / "web" / "src" / "seo" / "routes.json"
TOP_PAGES = {"/plans", "/premium-calculator", "/maturity-calculator", "/premium-table"}


def _freq_prio(path: str) -> tuple[str, str]:
    if path == "/":
        return "weekly", "1.0"
    if path in TOP_PAGES:
        return "monthly", "0.9"
    if path in ("/guides", "/blog"):
        return "weekly", "0.8"
    return "monthly", "0.7"


PAGES = [(path, *_freq_prio(path)) for path in json.loads(ROUTES_FILE.read_text())]


def _build_sitemap_xml() -> str:
    from datetime import date

    today = date.today().isoformat()
    urls = "\n".join(
        f"  <url><loc>{SITE_URL}{path}</loc>"
        f"<lastmod>{today}</lastmod>"
        f"<changefreq>{freq}</changefreq>"
        f"<priority>{prio}</priority></url>"
        for path, freq, prio in PAGES
    )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{urls}\n"
        "</urlset>\n"
    )


@router.get("/sitemap.xml")
async def sitemap():
    return Response(content=_build_sitemap_xml(), media_type="application/xml")


# Caddy proxies /robots.txt to the API (not the SPA), so it must be served here.
@router.get("/robots.txt", response_class=PlainTextResponse)
async def robots():
    return f"User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /auth/\n\nSitemap: {SITE_URL}/sitemap.xml\n"
