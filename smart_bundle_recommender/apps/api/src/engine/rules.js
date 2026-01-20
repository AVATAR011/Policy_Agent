export function applyRules(ctx, addonName) {
    const reasons = [];
    // excluded
    if (ctx.constraints?.excluded_addons?.includes(addonName)) {
        reasons.push("Excluded by constraints");
        return { ok: false, reasons };
    }
    // must-have handled later in selection, not eligibility
    // example underwriting constraints:
    if (addonName === "Zero Depreciation" && ctx.vehicle.vehicle_age_years > 5) {
        reasons.push("Zero Dep requires vehicle age <= 5 years");
        return { ok: false, reasons };
    }
    if (addonName === "Return to Invoice" && ctx.vehicle.vehicle_age_years > 3) {
        reasons.push("RTI requires vehicle age <= 3 years");
        return { ok: false, reasons };
    }
    // prevent adverse selection: too many recent claims -> restrict expensive covers
    if (ctx.customer_risk.claim_count_3y >= 4 &&
        ["Engine Protect", "Return to Invoice"].includes(addonName)) {
        reasons.push("High claim frequency: restrict high-severity add-ons");
        return { ok: false, reasons };
    }
    return { ok: true, reasons: [] };
}
