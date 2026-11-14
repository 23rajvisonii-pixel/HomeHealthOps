"use client";

import React, { useState } from "react";
import { AlertTriangle, Check, ArrowRight, Sparkles } from "lucide-react";
import { IssueItem } from "@/data/dashboardData";

interface IssuesAndFixesProps {
  issues: IssueItem[];
  onOpenActionModal?: (issue: IssueItem) => void;
}

export default function IssuesAndFixes({
  issues,
  onOpenActionModal,
}: IssuesAndFixesProps) {
  const [activeTab, setActiveTab] = useState<"issues" | "coding">("issues");

  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
      <div>
        {/* Tab-Like Header */}
        <div className="flex items-center border-b border-slate-200 pb-1.5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("issues")}
            className={`pb-1.5 px-2 relative transition-colors ${
              activeTab === "issues"
                ? "text-blue-600 font-bold border-b-2 border-blue-600 -mb-2"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Issues & Fixes
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={() => setActiveTab("coding")}
            className={`pb-1.5 px-2 relative transition-colors ${
              activeTab === "coding"
                ? "text-blue-600 font-bold border-b-2 border-blue-600 -mb-2"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            PDGM Coding
          </button>
        </div>

        {/* Tab 1: Issues & Fixes List */}
        {activeTab === "issues" ? (
          <div className="mt-3 space-y-2">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="flex items-start justify-between gap-2 rounded-md bg-slate-50/70 p-2 text-xs transition-colors hover:bg-slate-100/80"
              >
                <div className="flex items-start gap-1.5 flex-1">
                  {issue.resolved ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                  )}
                  <span
                    className={`text-[11px] font-medium leading-tight ${
                      issue.resolved
                        ? "line-through text-slate-400"
                        : "text-slate-800"
                    }`}
                  >
                    {issue.text}
                  </span>
                </div>

                <button
                  onClick={() => onOpenActionModal && onOpenActionModal(issue)}
                  className={`shrink-0 rounded border px-2 py-0.5 text-[10px] font-semibold transition-colors active:scale-95 ${
                    issue.resolved
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                      : "border-blue-600 bg-white text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {issue.resolved ? "Resolved ✓" : issue.actionText}
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* Tab 2: PDGM Coding Overview */
          <div className="mt-3 space-y-2 text-xs">
            <div className="rounded-lg bg-blue-50/60 p-2 border border-blue-100">
              <div className="flex items-center gap-1 text-[11px] font-bold text-blue-800">
                <Sparkles className="h-3 w-3 text-blue-600" />
                AI Code Mapping Analysis
              </div>
              <p className="mt-1 text-[10px] text-slate-600 leading-relaxed">
                Referral primary Dx <span className="font-semibold text-slate-800">I50.32</span> maps directly to MMTA Clinical Group. No Low-Utilization (LUPA) risk detected.
              </p>
            </div>
            <div className="text-[11px] text-slate-600 space-y-1">
              <div>• Secondary code E11.9 qualifies for diabetic teaching add-on.</div>
              <div>• Recommended Comorbidity: Tier 1 Adjustment active.</div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-2 text-[10px] font-medium text-slate-400">
        AI validation refreshed 5m ago
      </div>
    </div>
  );
}
