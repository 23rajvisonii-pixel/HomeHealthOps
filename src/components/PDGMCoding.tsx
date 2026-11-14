"use client";

import React from "react";
import { BadgePercent } from "lucide-react";

export default function PDGMCoding() {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
      <div>
        {/* Top subtle category label */}
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Visit Recommendations
        </div>

        {/* Title */}
        <div className="mt-1 flex items-center gap-1.5 pb-2.5 border-b border-slate-100">
          <BadgePercent className="h-4 w-4 text-[#1769D2]" />
          <h4 className="text-xs font-bold text-slate-800">
            PDGM Coding Recommendation
          </h4>
        </div>

        {/* Breakdown Items */}
        <div className="mt-3 space-y-2 text-xs">
          <div>
            <span className="font-bold text-slate-900 text-[11px]">
              Clinical Group:
            </span>{" "}
            <span className="text-slate-700 text-[11px] leading-tight block sm:inline">
              MMTA (Medical Management, Teaching & Assessment)
            </span>
          </div>

          <div>
            <span className="font-bold text-slate-900 text-[11px]">
              Functional Level:
            </span>{" "}
            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700">
              Medium
            </span>
          </div>

          <div>
            <span className="font-bold text-slate-900 text-[11px]">
              Comorbidity Adjustment:
            </span>{" "}
            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
              Yes (Low Tier)
            </span>
          </div>

          <div className="pt-1 border-t border-slate-100">
            <span className="font-bold text-slate-900 text-[11px]">
              Payment Group:
            </span>{" "}
            <span className="font-bold text-blue-700 text-[11px]">
              MMTA – Medium
            </span>
          </div>
        </div>
      </div>

      <div className="pt-2 text-[10px] text-slate-400 font-medium">
        Target Case-Mix Weight: 1.482
      </div>
    </div>
  );
}
