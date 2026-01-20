"use client";

import { useMemo, useState } from "react";
import Stepper from "./components/Stepper";
import PortfolioStep from "./components/PortfolioStep";
import StrategyStep from "./components/StrategyStep";
import RiskStep from "./components/RiskStep";
import MarketStep from "./components/CompetitorStep"; 
import ResultsStep from "./components/ResultsStep";

export default function Page() {
  const [step, setStep] = useState(0);

  const [portfolio, setPortfolio] = useState<any>({});
  const [strategy, setStrategy] = useState<any>({});
  const [market, setMarket] = useState<any[]>([]);
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [constraints, setConstraints] = useState<any>({});
  const [lifecycle, setLifecycle] = useState<"purchase" | "renewal">(
    "purchase",
  );

  const payload = useMemo(
  () => ({
    generation_mode: "insurer_product_design",
    lifecycle,
    portfolio_context: portfolio,
    business_strategy: strategy,
    competitor_landscape: market,
    product_constraints: constraints,
  }),
  [lifecycle, portfolio, strategy, market, constraints],
);


  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Smart Insurer Product Generator
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
            <PortfolioStep
              value={portfolio}
              onChange={setPortfolio}
              onNext={() => setStep(1)}
            />
          )}

          {step === 1 && (
            <StrategyStep
              value={strategy}
              onChange={setStrategy}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <MarketStep
              value={market}
              onChange={setMarket}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}

          {step === 3 && (
            <ResultsStep
              payload={payload}
              onBack={() => setStep(2)}
            />
          )}

        </div>
      </div>
    </main>
  );
}
