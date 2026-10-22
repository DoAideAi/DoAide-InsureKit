// @vitest-environment node
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it, beforeAll } from 'vitest'
import { JSDOM } from 'jsdom'
import { appShellHead, canonicalUrl, finalizeHead, pageName } from './seoHead.mjs'
import { cacheControl, contentType, resolveRequest } from './static-server.mjs'

const ROOT = new URL('..', import.meta.url).pathname

const HEAD = `<!DOCTYPE html><html><head>
<meta name="robots" content="index, follow">
<meta property="og:url" content="https://insure.doaide.com/">
<link rel="canonical" href="https://insure.doaide.com/">
<script type="application/ld+json" data-home-only>{"@type":"FAQPage"}</script>
<title>LIC Surrender Value Calculator — Free | DoAide InsureKit</title>
</head><body><div id="root"></div></body></html>`

const ldTypes = doc => [...doc.querySelectorAll('script[type="application/ld+json"]')]
  .map(el => JSON.parse(el.textContent)['@type'])

describe('finalizeHead', () => {
  it('points canonical and og:url at the route itself', () => {
    const { document } = new JSDOM(HEAD).window
    finalizeHead(document, '/surrender-calculator')
    expect(document.querySelector('link[rel="canonical"]').getAttribute('href')).toBe('https://insure.doaide.com/surrender-calculator')
    expect(document.querySelector('meta[property="og:url"]').getAttribute('content')).toBe('https://insure.doaide.com/surrender-calculator')
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1)
  })

  it('adds a BreadcrumbList with the section for nested pages', () => {
    const { document } = new JSDOM(HEAD).window
    finalizeHead(document, '/blog/how-much-life-insurance')
    const crumbs = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map(el => JSON.parse(el.textContent)).find(d => d['@type'] === 'BreadcrumbList')
    expect(crumbs.itemListElement.map(i => i.name)).toEqual(['Home', 'Blog', 'LIC Surrender Value Calculator'])
    expect(crumbs.itemListElement.at(-1).item).toBe('https://insure.doaide.com/blog/how-much-life-insurance')
  })

  it('does not add a second BreadcrumbList when the page has one', () => {
    const { document } = new JSDOM(HEAD.replace('</head>', '<script type="application/ld+json">[{"@type":"BreadcrumbList"}]</script></head>')).window
    finalizeHead(document, '/surrender-calculator')
    expect(ldTypes(document).filter(t => t === 'BreadcrumbList')).toHaveLength(0)
  })

  it('keeps the homepage canonical with a trailing slash and no breadcrumb', () => {
    const { document } = new JSDOM(HEAD).window
    finalizeHead(document, '/')
    expect(document.querySelector('link[rel="canonical"]').getAttribute('href')).toBe('https://insure.doaide.com/')
    expect(ldTypes(document)).not.toContain('BreadcrumbList')
  })
})

describe('appShellHead', () => {
  it('strips canonical and homepage-only data and sets noindex', () => {
    const { document } = new JSDOM(HEAD).window
    appShellHead(document)
    expect(document.querySelector('link[rel="canonical"]')).toBeNull()
    expect(document.querySelector('script[data-home-only]')).toBeNull()
    expect(document.querySelector('meta[name="robots"]').getAttribute('content')).toBe('noindex, follow')
  })
})

describe('helpers', () => {
  it('builds canonical URLs without trailing slashes', () => {
    expect(canonicalUrl('/surrender-calculator/')).toBe('https://insure.doaide.com/surrender-calculator')
    expect(pageName('LIC Premium Calculator 2026 — Exact Premium | DoAide InsureKit')).toBe('LIC Premium Calculator 2026')
  })
})

describe('static server resolution', () => {
  let root
  beforeAll(async () => {
    root = await mkdtemp(join(tmpdir(), 'ik-dist-'))
    await mkdir(join(root, 'surrender-calculator'))
    await mkdir(join(root, 'assets'))
    await writeFile(join(root, 'index.html'), 'home')
    await writeFile(join(root, 'app-shell.html'), 'shell')
    await writeFile(join(root, 'surrender-calculator', 'index.html'), 'surrender')
    await writeFile(join(root, 'assets', 'app.js'), 'js')
  })

  it('serves prerendered route directories', async () => {
    expect((await resolveRequest(root, '/surrender-calculator')).file).toBe(join(root, 'surrender-calculator', 'index.html'))
    expect((await resolveRequest(root, '/surrender-calculator/')).file).toBe(join(root, 'surrender-calculator', 'index.html'))
    expect((await resolveRequest(root, '/')).file).toBe(join(root, 'index.html'))
  })

  it('falls back to the SPA shell for unknown routes and 404s missing assets', async () => {
    expect(await resolveRequest(root, '/embed/premium-calculator')).toEqual({ status: 200, file: join(root, 'app-shell.html') })
    expect(await resolveRequest(root, '/assets/missing.js')).toEqual({ status: 404, file: null })
  })

  it('refuses path traversal', async () => {
    expect((await resolveRequest(root, '/../../etc/passwd')).file).not.toMatch(/passwd/)
  })

  it('sets types and caching', () => {
    expect(contentType('/x/sitemap.xml')).toMatch(/application\/xml/)
    expect(cacheControl('/assets/app.js')).toMatch(/immutable/)
    expect(cacheControl('/surrender-calculator')).toBe('no-cache')
  })
})

describe('routes.json', () => {
  it('has no duplicates and only routes that App.jsx defines', async () => {
    const routes = JSON.parse(await readFile(join(ROOT, 'src/seo/routes.json'), 'utf8'))
    const app = await readFile(join(ROOT, 'src/App.jsx'), 'utf8')
    const patterns = [...app.matchAll(/path="([^"]+)"/g)].map(m => m[1])
      .filter(p => p !== '*')
      .map(p => (p.startsWith('/') ? p : `/blog/${p}`)) // relative paths are children of /blog
      .map(p => new RegExp('^' + p.replace(/:[^/]+/g, '[^/]+') + '$'))
    expect(new Set(routes).size).toBe(routes.length)
    expect(routes.filter(r => !patterns.some(re => re.test(r)))).toEqual([])
  })
})
