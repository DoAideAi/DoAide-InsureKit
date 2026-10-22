import { describe, it, expect } from "vitest";
import { LIC_PLANS, getPlan, getPlanBySlug, getAllSlugs, getPlansByType, getRelatedPlans, getPlansForComparison, getSRBRate, getFABRate, getSASlabBonus, PLAN_TYPE_LABELS } from "./licPlans";

describe("LIC_PLANS data integrity", () => {
  it("has at least 25 plans", () => {
    expect(LIC_PLANS.length).toBeGreaterThanOrEqual(25);
  });

  it("each plan has required fields including slug", () => {
    for (const plan of LIC_PLANS) {
      expect(plan.id).toBeTruthy();
      expect(plan.slug).toBeTruthy();
      expect(plan.name).toBeTruthy();
      expect(typeof plan.tableNo).toBe("number");
      expect(plan.type).toBeTruthy();
      expect(typeof plan.minAge).toBe("number");
      expect(typeof plan.maxAge).toBe("number");
      expect(plan.description).toBeTruthy();
      expect(plan.features?.length).toBeGreaterThan(0);
    }
  });

  it("plan IDs are unique", () => {
    const ids = LIC_PLANS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("new plans", () => {
  it("includes Jeevan Tarun 734", () => {
    const plan = getPlan("jeevan_tarun_734");
    expect(plan).toBeTruthy();
    expect(plan.tableNo).toBe(734);
    expect(plan.type).toBe("child");
    expect(plan.srbRate).toBe(54);
  });

  it("includes Bima Jyoti 860", () => {
    const plan = getPlan("bima_jyoti_860");
    expect(plan).toBeTruthy();
    expect(plan.tableNo).toBe(860);
  });

  it("includes New Children's Money Back 732", () => {
    const plan = getPlan("new_children_money_back_732");
    expect(plan).toBeTruthy();
    expect(plan.survivalBenefits).toHaveLength(3);
  });

  it("includes Aadhaar Shila 744", () => {
    const plan = getPlan("aadhaar_shila_744");
    expect(plan).toBeTruthy();
    expect(plan.isForWomen).toBe(true);
  });

  it("includes Aadhaar Stambh 743", () => {
    const plan = getPlan("aadhaar_stambh_743");
    expect(plan).toBeTruthy();
    expect(plan.maxSA).toBe(300000);
  });

  it("includes Jeevan Amar 855", () => {
    const plan = getPlan("jeevan_amar_855");
    expect(plan).toBeTruthy();
    expect(plan.type).toBe("term");
  });
});

describe("getPlan", () => {
  it("returns plan by id", () => {
    expect(getPlan("jeevan_anand_715")?.name).toBe("New Jeevan Anand");
  });

  it("returns undefined for unknown id", () => {
    expect(getPlan("nonexistent")).toBeUndefined();
  });
});

describe("getPlansForComparison", () => {
  it("excludes govt and pension plans", () => {
    const plans = getPlansForComparison();
    expect(plans.every((p) => p.type !== "govt" && p.type !== "pension")).toBe(true);
  });
});

describe("getSRBRate", () => {
  it("returns fixed SRB rate", () => {
    const plan = getPlan("jeevan_anand_715");
    expect(getSRBRate(plan, 20)).toBe(44);
  });

  it("returns term-dependent SRB rate", () => {
    const plan = getPlan("new_endowment_714");
    expect(getSRBRate(plan, 15)).toBe(41);
    expect(getSRBRate(plan, 25)).toBe(47);
  });
});

describe("getFABRate", () => {
  it("returns FAB rate by term", () => {
    const plan = getPlan("jeevan_anand_715");
    expect(getFABRate(plan, 20)).toBe(25);
    expect(getFABRate(plan, 25)).toBe(180);
  });

  it("returns 0 for plans without FAB", () => {
    const plan = getPlan("tech_term_854");
    expect(getFABRate(plan, 20)).toBe(0);
  });
});

describe("getSASlabBonus", () => {
  it("returns slab bonus for Jeevan Labh SA >= 10L", () => {
    const plan = getPlan("jeevan_labh_736");
    expect(getSASlabBonus(plan, 1000000)).toBe(2);
  });

  it("returns 0 for SA below threshold", () => {
    const plan = getPlan("jeevan_labh_736");
    expect(getSASlabBonus(plan, 200000)).toBe(0);
  });
});

describe("slug-based functions", () => {
  it("plan slugs are unique", () => {
    const slugs = LIC_PLANS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("getPlanBySlug returns correct plan", () => {
    expect(getPlanBySlug("jeevan-anand-715")?.name).toBe("New Jeevan Anand");
    expect(getPlanBySlug("tech-term-854")?.tableNo).toBe(854);
  });

  it("getPlanBySlug returns undefined for unknown slug", () => {
    expect(getPlanBySlug("nonexistent")).toBeUndefined();
  });

  it("getAllSlugs returns all slugs", () => {
    const slugs = getAllSlugs();
    expect(slugs.length).toBe(LIC_PLANS.length);
    expect(slugs).toContain("jeevan-anand-715");
  });

  it("getPlansByType filters correctly", () => {
    const termPlans = getPlansByType("term");
    expect(termPlans.length).toBeGreaterThan(0);
    expect(termPlans.every((p) => p.type === "term")).toBe(true);
  });

  it("getRelatedPlans returns same-type plans excluding self", () => {
    const plan = getPlan("jeevan_anand_715");
    const related = getRelatedPlans(plan, 3);
    expect(related.length).toBeLessThanOrEqual(3);
    expect(related.every((p) => p.type === plan.type && p.id !== plan.id)).toBe(true);
  });
});

describe("PLAN_TYPE_LABELS", () => {
  it("has labels for all plan types", () => {
    expect(PLAN_TYPE_LABELS.endowment).toBe("Endowment");
    expect(PLAN_TYPE_LABELS.term).toBe("Term Insurance");
    expect(PLAN_TYPE_LABELS.ulip).toBe("ULIP");
  });
});

describe("new plans added", () => {
  it("includes Jeevan Azad 868", () => {
    const plan = getPlan("jeevan_azad_868");
    expect(plan).toBeTruthy();
    expect(plan.tableNo).toBe(868);
    expect(plan.guaranteedAdditions).toBe(55);
  });

  it("includes New Jeevan Shanti 858", () => {
    const plan = getPlan("new_jeevan_shanti_858");
    expect(plan).toBeTruthy();
    expect(plan.type).toBe("pension");
  });

  it("includes SIIP 852 as ULIP", () => {
    const plan = getPlan("siip_852");
    expect(plan).toBeTruthy();
    expect(plan.type).toBe("ulip");
  });

  it("includes Micro Bachat 851", () => {
    const plan = getPlan("micro_bachat_851");
    expect(plan).toBeTruthy();
    expect(plan.maxSA).toBe(50000);
  });

  it("includes Aam Aadmi Bima Yojana", () => {
    const plan = getPlan("aam_aadmi_bima_yojana");
    expect(plan).toBeTruthy();
    expect(plan.type).toBe("govt");
  });
});
