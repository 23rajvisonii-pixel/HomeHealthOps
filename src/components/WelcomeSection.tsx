"use client";

import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DASHBOARD_USER } from "@/data/dashboardData";

interface WelcomeSectionProps {
  userName?: string;
  userRole?: string;
  dateStr?: string;
}

export default function WelcomeSection({
  userName = DASHBOARD_USER.name,
  userRole = DASHBOARD_USER.role,
  dateStr = DASHBOARD_USER.dateFormatted,
}: WelcomeSectionProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      {/* Left: Greeting & Subtitle */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#17233D]">
          Good Morning, {userName.split(" ")[0]}
        </h1>
        <p className="text-xs md:text-sm font-medium text-slate-500 mt-0.5">
          Home Health Operations – {userRole}
        </p>
      </div>

      {/* Right: Date Badge */}
      <div className="flex items-center gap-2 self-start sm:self-auto text-slate-700 bg-white/60 border border-slate-200/80 rounded-lg px-3 py-1.5 shadow-2xs backdrop-blur-xs">
        <CalendarIcon className="h-4 w-4 text-slate-500" />
        <span className="text-xs font-semibold tracking-tight">{dateStr}</span>
      </div>
    </div>
  );
}
