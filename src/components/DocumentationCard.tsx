"use client";

import React from "react";
import { FileText, AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";

interface DocumentationCardProps {
  issueCount?: number;
  clinicalGroup?: string;
  onClick?: () => void;
}

export default function DocumentationCard({
  issueCount = 3,
  clinicalGroup = "MMTA",
  onClick,
}: DocumentationCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all"
    >
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-slate-100 text-slate-600">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Documentation:
            </div>
            <div className="text-xs font-bold text-slate-800">SOC Evaluation</div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="mt-3 space-y-2">
          {/* Issues Found Badge */}
          <div className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50/80 px-2.5 py-1 text-xs font-semibold text-red-700">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{issueCount} Issues Found</span>
          </div>

          {/* PDGM Clinical Group */}
          <div className="text-[11px] font-medium text-slate-600 px-1">
            <span className="font-bold text-slate-700">PDGM:</span> Clinical Group –{" "}
            <span className="text-slate-900 font-semibold">{clinicalGroup}</span>
          </div>

          {/* Recommendation Ready Badge */}
          <div className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50/80 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span>Recommendation Ready</span>
          </div>
        </div>
      </div>

      <div className="pt-2 text-[10px] font-medium text-blue-600 hover:underline flex items-center justify-between">
        <span>View Full OASIS / SOC</span>
        <ChevronRight className="h-3 w-3" />
      </div>
    </div>
  );
}
