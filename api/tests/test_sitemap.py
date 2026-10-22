import xml.etree.ElementTree as ET


def test_sitemap_returns_xml(client):
    r = client.get("/sitemap.xml")
    assert r.status_code == 200
    assert "application/xml" in r.headers["content-type"]


def test_sitemap_valid_xml(client):
    r = client.get("/sitemap.xml")
    root = ET.fromstring(r.text)
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = root.findall("s:url", ns)
    assert len(urls) >= 70


def test_sitemap_contains_homepage(client):
    r = client.get("/sitemap.xml")
    assert "https://insure.doaide.com/" in r.text


def test_sitemap_contains_all_tools(client):
    r = client.get("/sitemap.xml")
    for path in [
        "/premium-calculator",
        "/maturity-calculator",
        "/commission-calculator",
        "/plan-comparison",
        "/client-reminders",
        "/guides",
        "/premium-table",
        "/dashboard",
        "/maturity-tracker",
        "/guides/lic-commission-structure",
        "/guides/how-to-become-lic-agent",
        "/guides/best-plans-for-tax-saving",
        "/claim-settlement-ratio",
    ]:
        assert f"https://insure.doaide.com{path}" in r.text


def test_robots_references_sitemap(client):
    r = client.get("/robots.txt")
    assert r.status_code == 200
    assert "text/plain" in r.headers["content-type"]
    assert "Sitemap: https://insure.doaide.com/sitemap.xml" in r.text
    assert "Disallow: /api/" in r.text
