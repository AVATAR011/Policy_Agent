"use client";

import { useMemo, useState } from "react";
import Stepper from "./components/Stepper";
import VehicleStep from "./components/VehicleStep";
import RiskStep from "./components/RiskStep";
import CompetitorStep from "./components/CompetitorStep";
import ResultsStep from "./components/ResultsStep";

export default function Page() {
  const [step, setStep] = useState(0);

  const [vehicle, setVehicle] = useState<any>({
    type: "car",
    brand: "Hyundai",
    model: "i20",
    fuel_type: "petrol",
    cc: 1197,
    vehicle_age_years: 2,
    idv_band: "medium",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600001",
    ownership: "1st",
    usage: "private",
    annual_km: 12000,
  });

  const [risk, setRisk] = useState<any>({
    claim_count_3y: 0,
    claim_types: [],
    ncb_percent: 20,
    violations_count_12m: 0,
    last_claim_months_ago: 240,
  });

  const [telematics, setTelematics] = useState<any>({});
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [constraints, setConstraints] = useState<any>({
    budget_band: "medium",
    must_have_addons: [],
    excluded_addons: [],
  });
  const [lifecycle, setLifecycle] = useState<"purchase" | "renewal">(
    "purchase",
  );

  const payload = useMemo(
    () => ({
      lifecycle,
      vehicle,
      customer_risk: risk,
      telematics,
      competitor_gaps: competitors,
      constraints,
    }),
    [lifecycle, vehicle, risk, telematics, competitors, constraints],
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Smart Policy Bundle Recommender
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Rules + Scoring + OpenAI narratives. Built for insurers.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
            <div className="text-xs text-slate-400">Lifecycle</div>
            <select
              className="mt-1 w-full rounded-lg bg-slate-950 px-3 py-2 text-sm"
              value={lifecycle}
              onChange={(e) => setLifecycle(e.target.value as any)}
            >
              <option value="purchase">New Purchase</option>
              <option value="renewal">Renewal</option>
            </select>
          </div>
        </div>

        <div className="mt-8">
          <Stepper step={step} setStep={setStep} />
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          {step === 0 && (
            <VehicleStep
              value={vehicle}
              onChange={setVehicle}
              onNext={() => setStep(1)}
            />
          )}
          {step === 1 && (
            <RiskStep
              value={{ risk, telematics, constraints }}
              onChange={({ risk, telematics, constraints }: any) => {
                setRisk(risk);
                setTelematics(telematics);
                setConstraints(constraints);
              }}
              onBack={() => setStep(0)}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <CompetitorStep
              value={competitors}
              onChange={setCompetitors}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <ResultsStep payload={payload} onBack={() => setStep(2)} />
          )}
        </div>
      </div>
    </main>
  );
}
