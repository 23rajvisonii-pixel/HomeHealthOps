"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import DocumentationCard from "./DocumentationCard";
import IssuesAndFixes from "./IssuesAndFixes";
import PDGMCoding from "./PDGMCoding";
import PlanOfCare from "./PlanOfCare";
import Guidance485 from "./Guidance485";
import { IssueItem } from "@/data/dashboardData";

interface PrePCRSectionProps {
  issues: IssueItem[];
  onOpenIssueModal?: (issue: IssueItem) => void;
  onOpenDocModal?: () => void;
}

export default function PrePCRSection({
  issues,
  onOpenIssueModal,
  onOpenDocModal,
}: PrePCRSectionProps) {
  const unresolvedCount = issues.filter((i) => !i.resolved).length;

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#17233D] tracking-tight">
              Pre-PCR & Coding (AI)
            </h2>
            <span className="rounded-md bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700">
              Audit Guard
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Validate documentation, identify errors, and provide coding & PDGM guidance
          </p>
        </div>
      </div>

      {/* 5 Cards Horizontal Grid */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <DocumentationCard
          issueCount={unresolvedCount}
          onClick={onOpenDocModal}
        />
        <IssuesAndFixes
          issues={issues}
          onOpenActionModal={onOpenIssueModal}
        />
        <PDGMCoding />
        <PlanOfCare />
        <Guidance485 />
      </div>
    </div>
  );
}
