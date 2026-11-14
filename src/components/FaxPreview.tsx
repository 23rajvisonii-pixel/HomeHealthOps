"use client";

import React from "react";
import { Eye, FileCheck2 } from "lucide-react";

interface FaxPreviewProps {
  onOpenPreview?: () => void;
}

export default function FaxPreview({ onOpenPreview }: FaxPreviewProps) {
  return (
    <div
      onClick={onOpenPreview}
      className="group relative cursor-pointer flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-3 shadow-xs hover:border-blue-400 hover:shadow-md transition-all duration-200 w-full sm:w-36 h-48 select-none"
      title="Click to view full incoming fax document"
    >
      {/* Top Document Header Lines */}
      <div className="space-y-2">
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
          <div className="h-1.5 w-12 rounded bg-slate-400" />
          <div className="h-1 w-6 rounded bg-slate-300" />
        </div>

        {/* Simulated Document Text Skeleton Lines */}
        <div className="space-y-1.5 pt-0.5">
          <div className="h-1 w-20 rounded bg-slate-300" />
          <div className="h-1 w-24 rounded bg-slate-200" />
          <div className="h-1 w-16 rounded bg-slate-200" />
          <div className="h-1 w-22 rounded bg-slate-300" />
          <div className="h-1 w-20 rounded bg-slate-200" />
        </div>

        <div className="my-1.5 border-t border-dashed border-slate-200" />

        <div className="space-y-1.5">
          <div className="h-1 w-14 rounded bg-slate-300" />
          <div className="h-1 w-24 rounded bg-slate-200" />
          <div className="h-1 w-18 rounded bg-slate-200" />
          <div className="h-1 w-20 rounded bg-slate-200" />
        </div>
      </div>

      {/* Bottom FAX Label Tag & Hover Eye */}
      <div className="flex items-center justify-between pt-2">
        <span className="inline-flex items-center rounded bg-[#1769D2] px-2 py-0.5 text-[10px] font-bold text-white tracking-wider shadow-2xs">
          FAX
        </span>
        <div className="flex items-center text-slate-400 group-hover:text-blue-600 transition-colors">
          <Eye className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* Hover Overlay Hint */}
      <div className="absolute inset-0 rounded-lg bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
        <span className="bg-slate-900/80 text-white text-[10px] font-medium px-2 py-1 rounded shadow">
          Preview Fax
        </span>
      </div>
    </div>
  );
}
