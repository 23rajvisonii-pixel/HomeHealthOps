"use client";

import React from "react";
import { Users, Calendar, ClipboardCheck, FileText, ChevronRight } from "lucide-react";
import { SummaryMetric } from "@/data/dashboardData";

interface SummaryCardProps {
  metric: SummaryMetric;
  onClick?: (metric: SummaryMetric) => void;
  isActive?: boolean;
}

export default function SummaryCard({ metric, onClick, isActive }: SummaryCardProps) {
  const getIcon = (type: SummaryMetric["type"]) => {
    switch (type) {
      case "referrals":
        return <Users className="h-5 w-5" />;
      case "visits":
        return <Calendar className="h-5 w-5" />;
      case "qa":
        return <ClipboardCheck className="h-5 w-5" />;
      case "prepcr":
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <button
      onClick={() => onClick && onClick(metric)}
      className={`group relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
        metric.bgClass
      } ${metric.borderClass} ${isActive ? "ring-2 ring-blue-500 shadow-md" : ""}`}
    >
      <div className="flex items-start justify-between w-full">
        {/* Left Side: Icon in circular background + text */}
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${metric.iconBgClass} ${metric.iconColorClass}`}
          >
            {getIcon(metric.type)}
          </div>
          <div>
            <h3 className="text-xs font-semibold text-slate-700">{metric.title}</h3>
            <div className="mt-0.5 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#17233D]">
                {metric.value}
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500">{metric.subtitle}</p>
          </div>
        </div>

        {/* Right Arrow */}
        <div className="mt-1 text-slate-400 group-hover:text-slate-700 transition-colors">
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </button>
  );
}
