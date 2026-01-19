export function scoreAddon(ctx: any, addonName: string) {
  let score = 0; // higher = better fit (attach + differentiation)
  let risk = 0; // higher = riskier to insurer
  let price = 0; // higher = pricier

  const floodStates = new Set([
    "Tamil Nadu",
    "Kerala",
    "Assam",
    "Maharashtra",
    "Gujarat",
  ]);

  const inFloodZone =
    floodStates.has(ctx.vehicle.state) ||
    (ctx.vehicle.city || "").toLowerCase().includes("chennai");

  const highwayHeavy = (ctx.telematics?.highway_pct ?? 0) >= 40;
  const newCar = ctx.vehicle.vehicle_age_years <= 2;

  const claims = ctx.customer_risk.claim_count_3y ?? 0;
  const overspeed = ctx.telematics?.overspeed_score ?? 50;
  const night = ctx.telematics?.night_driving_pct ?? 0;

  if (addonName === "Water Damage") {
    score += inFloodZone ? 25 : 5;
    risk += inFloodZone ? 12 : 4;
    price += 6;
  }

  if (addonName === "Engine Protect") {
    score += inFloodZone ? 18 : 6;
    risk += inFloodZone ? 18 : 10;
    risk += claims >= 2 ? 8 : 0;
    price += 10;
  }

  if (addonName === "Tyre Protect") {
    score += highwayHeavy ? 18 : 6;
    risk += highwayHeavy ? 10 : 6;
    price += 6;
  }

  if (addonName === "Roadside Assistance") {
    score += 10;
    risk += 2;
    price += 2;
  }

  if (addonName === "Zero Depreciation") {
    score += newCar ? 20 : 8;
    risk += newCar ? 8 : 10;
    price += 12;
  }

  if (addonName === "Return to Invoice") {
    score += newCar ? 18 : 6;
    risk += 10;
    price += 14;
  }

  if (addonName === "NCB Protect") {
    score += ctx.lifecycle === "renewal" ? 14 : 2;
    risk += 6;
    price += 5;
  }

  // unsafe driving increases risk
  if (overspeed < 30) risk += 4;
  if (night > 35) risk += 3;

  return { fitScore: score, riskScore: risk, priceScore: price };
}

export function bandFromPrice(priceScore: number, budgetBand?: string) {
  // crude mapping
  if (budgetBand === "low") return "low";
  if (priceScore <= 10) return "low";
  if (priceScore <= 22) return "medium";
  return "high";
}
