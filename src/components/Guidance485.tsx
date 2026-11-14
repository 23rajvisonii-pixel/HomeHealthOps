"use client";

import React from "react";
import { ClipboardList, Check } from "lucide-react";

export default function Guidance485() {
  const items = [
    "Primary & secondary diagnoses (ICD-10)",
    "Skilled nursing need (assessment, teaching, mgt)",
    "Therapy goals (functional, safety, ADL/IADL)",
    "Frequency & duration of visits",
    "Homebound status and justification",
    "All necessary DME and safety needs",
  ];

  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
      <div>
        {/* Top subtle category label */}
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          485 Guidance
        </div>

        {/* Title */}
        <div className="mt-1 flex items-center gap-1.5 pb-2.5 border-b border-slate-100">
          <ClipboardList className="h-4 w-4 text-[#1769D2]" />
          <h4 className="text-xs font-bold text-slate-800">
            Suggested 485 Items to Include
          </h4>
        </div>

        {/* Checklist */}
        <div className="mt-3 space-y-1.5 text-xs">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
              <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-tight">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 text-[10px] text-slate-400 font-medium">
        CMS-485 Compliant template
      </div>
    </div>
  );
}
