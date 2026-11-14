"use client";

import React from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { Clinician } from "@/data/dashboardData";

interface ClinicianCardProps {
  clinician: Clinician;
  isSelected?: boolean;
  onSelect?: (clinician: Clinician) => void;
}

export default function ClinicianCard({
  clinician,
  isSelected,
  onSelect,
}: ClinicianCardProps) {
  return (
    <div
      onClick={() => onSelect && onSelect(clinician)}
      className={`group cursor-pointer flex items-center justify-between rounded-lg border p-2.5 transition-all duration-150 ${
        isSelected
          ? "border-blue-500 bg-blue-50/50 shadow-xs"
          : "border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50/60"
      }`}
    >
      {/* Left: Avatar + Details */}
      <div className="flex items-center gap-3">
        {/* Avatar with fallback / image */}
        <div className="relative">
          <img
            src={clinician.avatarUrl}
            alt={clinician.name}
            className="h-10 w-10 rounded-full object-cover border border-slate-200"
            onError={(e) => {
              // Fallback to initials if image fails to load
              const target = e.currentTarget;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<div class="h-10 w-10 rounded-full bg-[#142B4A] text-white flex items-center justify-center font-bold text-xs">${clinician.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}</div>`;
              }
            }}
          />
          {/* Availability mini dot */}
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {clinician.name}, {clinician.discipline}
            </span>
            {clinician.isBestMatch && (
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800">
                Best Match
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
            <span>{clinician.distance}</span>
            <span>•</span>
            <span>{clinician.caseload}</span>
          </div>
        </div>
      </div>

      {/* Right: Availability text + Match % badge */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>{clinician.status}</span>
        </div>

        <div className="flex flex-col items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-center">
          <span className="text-xs font-extrabold text-emerald-700">
            {clinician.matchRate}
          </span>
        </div>
      </div>
    </div>
  );
}
