"use client";

import React from "react";
import { CalendarRange } from "lucide-react";

export default function PlanOfCare() {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
      <div>
        {/* Top subtle category label */}
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Visit Recommendations
        </div>

        {/* Title */}
        <div className="mt-1 flex items-center gap-1.5 pb-2.5 border-b border-slate-100">
          <CalendarRange className="h-4 w-4 text-[#1769D2]" />
          <h4 className="text-xs font-bold text-slate-800">
            Recommended Plan of Care
          </h4>
        </div>

        {/* Plan of Care Breakdown */}
        <div className="mt-3 space-y-3 text-xs">
          {/* Therapy */}
          <div>
            <div className="font-bold text-slate-900 text-[11px]">
              Therapy (PT/OT):{" "}
              <span className="font-semibold text-blue-700">6–9 visits over 3 weeks</span>
            </div>
            <ul className="mt-1 space-y-0.5 text-[10px] text-slate-600 pl-2">
              <li className="flex items-start gap-1">
                <span className="text-blue-500">•</span>
                <span>
                  <strong className="text-slate-700">PT:</strong> 2–3 visits/week × 2–3 weeks
                </span>
              </li>
              <li className="flex items-start gap-1">
                <span className="text-blue-500">•</span>
                <span>
                  <strong className="text-slate-700">OT:</strong> 1–2 visits/week (if ADL/UE needs)
                </span>
              </li>
            </ul>
          </div>

          {/* Nursing */}
          <div className="pt-2 border-t border-slate-100">
            <div className="font-bold text-slate-900 text-[11px]">
              Nursing (SN):{" "}
              <span className="font-semibold text-blue-700">4–6 visits over 3 weeks</span>
            </div>
            <ul className="mt-1 space-y-0.5 text-[10px] text-slate-600 pl-2">
              <li className="flex items-start gap-1">
                <span className="text-blue-500">•</span>
                <span>
                  <strong className="text-slate-700">SN:</strong> 1–2 visits/week for assessment, teaching, and disease management
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-2 text-[10px] text-slate-400 font-medium">
        Standard 30-day episode window
      </div>
    </div>
  );
}
