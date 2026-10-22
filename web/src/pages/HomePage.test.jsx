import { describe, it, expect } from "vitest";

describe("HomePage", () => {
  it("has 'Updated for October 2026' badge in source", async () => {
    const raw = (await import("./HomePage?raw")).default;
    expect(raw).toContain("Updated for October 2026");
  });

  it("has primary CTA linking to premium calculator", async () => {
    const raw = (await import("./HomePage?raw")).default;
    expect(raw).toContain("Calculate Premium Now");
    expect(raw).toContain('to="/premium-calculator"');
  });

  it("has secondary CTA linking to plan recommender", async () => {
    const raw = (await import("./HomePage?raw")).default;
    expect(raw).toContain("Find Best Plan");
    expect(raw).toContain('to="/plan-recommender"');
  });

  it("has trust signal badges", async () => {
    const raw = (await import("./HomePage?raw")).default;
    expect(raw).toContain("No Login Required");
    expect(raw).toContain("40+ Free Tools");
    expect(raw).toContain("Works Offline");
  });

  it("has bottom CTA section with browse plans link", async () => {
    const raw = (await import("./HomePage?raw")).default;
    expect(raw).toContain("Try Premium Calculator");
    expect(raw).toContain("Browse 30+ LIC Plans");
    expect(raw).toContain('to="/plans"');
  });

  it("has FAQ items covering key questions", async () => {
    const raw = (await import("./HomePage?raw")).default;
    expect(raw).toContain("Is InsureKit free to use?");
    expect(raw).toContain("Which LIC plans are supported?");
    expect(raw).toContain("Is my data safe?");
    expect(raw).toContain("Can I use this on my phone?");
  });

  it("contains no fabricated testimonials or usage counters", async () => {
    const raw = (await import("./HomePage?raw")).default;
    expect(raw).not.toContain("TESTIMONIALS");
    expect(raw).not.toContain("AnimatedCounter");
    expect(raw).not.toContain("trusted by 5,000+");
    expect(raw).not.toContain("Join 5,000+");
    expect(raw).not.toContain("Calculations Done");
  });
});
