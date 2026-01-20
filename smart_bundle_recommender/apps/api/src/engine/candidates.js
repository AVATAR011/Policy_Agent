export const ADDONS = [
    {
        name: "Engine Protect",
        tags: ["engine", "water"],
        baseEligibility: (c) => c.vehicle.type === "car",
    },
    {
        name: "Water Damage",
        tags: ["water", "flood"],
        baseEligibility: (c) => true,
    },
    {
        name: "Zero Depreciation",
        tags: ["new_car"],
        baseEligibility: (c) => c.vehicle.vehicle_age_years <= 5 && c.vehicle.type === "car",
    },
    {
        name: "Consumables Cover",
        tags: ["new_car"],
        baseEligibility: (c) => c.vehicle.type === "car",
    },
    { name: "Roadside Assistance", tags: ["rsa"], baseEligibility: (_c) => true },
    {
        name: "Tyre Protect",
        tags: ["highway"],
        baseEligibility: (c) => c.vehicle.type === "car",
    },
    {
        name: "Return to Invoice",
        tags: ["new_car"],
        baseEligibility: (c) => c.vehicle.vehicle_age_years <= 3 && c.vehicle.type === "car",
    },
    {
        name: "NCB Protect",
        tags: ["renewal"],
        baseEligibility: (c) => c.lifecycle === "renewal",
    },
    {
        name: "Key Replacement",
        tags: ["convenience"],
        baseEligibility: (c) => c.vehicle.type === "car",
    },
];
export function baseBundleTemplates() {
    return [
        { key: "value", base_policy_type: "Comprehensive" },
        { key: "protection_plus", base_policy_type: "Comprehensive" },
        { key: "low_premium", base_policy_type: "TP" },
    ];
}
