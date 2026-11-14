"use client";

import React from "react";
import { Sparkles, Check } from "lucide-react";
import { REFERRAL_DATA } from "@/data/dashboardData";

export default function AIReferralInsights() {
  return (
    <div className="w-full sm:w-56 shrink-0 rounded-xl border border-purple-200 bg-[#FBF9FE] p-3.5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center gap-1.5 pb-2.5 border-b border-purple-100">
        <Sparkles className="h-3.5 w-3.5 text-purple-600" />
        <h4 className="text-xs font-bold text-slate-800">AI Referral Insights</h4>
      </div>

      {/* Validation Checklist */}
      <div className="space-y-1.5 pt-2.5">
        {REFERRAL_DATA.insights.slice(0, -1).map((insight, idx) => (
          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
            <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-tight">{insight}</span>
          </div>
        ))}

        {/* Highlighted last item: Ready for intake */}
        <div className="flex items-center gap-1.5 pt-1 text-emerald-700 font-bold text-xs">
          <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-100">
            <Check className="h-2.5 w-2.5 text-emerald-700" />
          </div>
          <span>{REFERRAL_DATA.insights[REFERRAL_DATA.insights.length - 1]}</span>
        </div>
      </div>
    </div>
  );
}
