export function buildProductCandidates(ctx) {
    return [
        {
            archetype: "Value Growth Product",
            focus: ["Affordable pricing", "High conversion"],
            suggested_addons: ["RSA", "Consumables"],
            risk_posture: "medium",
        },
        {
            archetype: "Protection Plus Product",
            focus: ["Maximum coverage", "Premium buyers"],
            suggested_addons: ["Zero Dep", "Engine Protect", "RTI"],
            risk_posture: "controlled",
        },
        {
            archetype: "Digital Fast Claims Product",
            focus: ["Instant settlement", "Urban users"],
            suggested_addons: ["AI Claims", "Pickup Repair"],
            risk_posture: "low",
        },
    ];
}
