"use client";

import React from "react";
import { Printer, ArrowRight, FileText, ExternalLink, Sparkles } from "lucide-react";
import FaxPreview from "./FaxPreview";
import ReferralDetails from "./ReferralDetails";
import AIReferralInsights from "./AIReferralInsights";

interface ReferralIntakeProps {
  onContinueIntake?: () => void;
  onViewFullReferral?: () => void;
  onOpenEMR?: () => void;
  onPreviewFax?: () => void;
}

export default function ReferralIntake({
  onContinueIntake,
  onViewFullReferral,
  onOpenEMR,
  onPreviewFax,
}: ReferralIntakeProps) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
      {/* Top Header */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#1769D2]">
              <Printer className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#17233D] tracking-tight">
                  Referral Intake (AI)
                </h2>
                <span className="rounded-md bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                  AI
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                New referral received via fax and processed by AI
              </p>
            </div>
          </div>

          {/* Right badge: AI Extracted */}
          <div className="flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-purple-600" />
            <span>AI Extracted</span>
          </div>
        </div>

        {/* Content: 3 Sections */}
        <div className="flex flex-col md:flex-row items-start gap-4 py-4">
          {/* Section A: Fax Preview */}
          <FaxPreview onOpenPreview={onPreviewFax || onViewFullReferral} />

          {/* Section B: Referral Details */}
          <ReferralDetails onPatientClick={onViewFullReferral} />

          {/* Section C: AI Referral Insights */}
          <AIReferralInsights />
        </div>
      </div>

      {/* Bottom Actions Bar */}
      <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-slate-100">
        <button
          onClick={onContinueIntake}
          className="flex items-center gap-2 rounded-lg bg-[#1769D2] px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 active:scale-98"
        >
          <span>Continue Intake</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>

        <button
          onClick={onViewFullReferral}
          className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 active:scale-98"
        >
          <FileText className="h-3.5 w-3.5 text-slate-500" />
          <span>View Full Referral</span>
        </button>

        <button
          onClick={onOpenEMR}
          className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 active:scale-98"
        >
          <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
          <span>Open in EMR</span>
        </button>
      </div>
    </div>
  );
}
