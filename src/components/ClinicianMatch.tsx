"use client";

import React, { useState, useRef, useEffect } from "react";
import { User, Check, Map, ChevronDown, Filter, RotateCcw, Share2, Layers } from "lucide-react";
import ClinicianCard from "./ClinicianCard";
import { CLINICIANS_DATA, Clinician } from "@/data/dashboardData";

interface ClinicianMatchProps {
  onAssignClinician?: (clinician: Clinician) => void;
  onViewMap?: () => void;
  onFilterChange?: (filterName: string) => void;
}

export default function ClinicianMatch({
  onAssignClinician,
  onViewMap,
  onFilterChange,
}: ClinicianMatchProps) {
  const [selectedClinician, setSelectedClinician] = useState<Clinician>(CLINICIANS_DATA[0]);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowMoreOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#1769D2]">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#17233D] tracking-tight">
              Clinician Match (AI)
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Eligible clinicians based on distance, territory, availability and skills
            </p>
          </div>
        </div>

        {/* Clinicians List */}
        <div className="space-y-2 py-4">
          {CLINICIANS_DATA.map((clinician) => (
            <ClinicianCard
              key={clinician.id}
              clinician={clinician}
              isSelected={selectedClinician.id === clinician.id}
              onSelect={(c) => setSelectedClinician(c)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-slate-100 relative">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAssignClinician && onAssignClinician(selectedClinician)}
            className="flex items-center gap-1.5 rounded-lg bg-[#1769D2] px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 active:scale-98"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Assign Clinician</span>
          </button>

          <button
            onClick={onViewMap}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 active:scale-98"
          >
            <Map className="h-3.5 w-3.5 text-slate-500" />
            <span>View Map</span>
          </button>
        </div>

        {/* More Options Dropdown */}
        <div className="relative" ref={optionsRef}>
          <button
            onClick={() => setShowMoreOptions(!showMoreOptions)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 active:scale-98"
          >
            <span>More Options</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {showMoreOptions && (
            <div className="absolute right-0 bottom-full mb-1 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-50">
              <button
                onClick={() => {
                  if (onFilterChange) onFilterChange("territory");
                  setShowMoreOptions(false);
                }}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
              >
                <Filter className="h-3.5 w-3.5 text-slate-400" />
                Filter by Territory
              </button>
              <button
                onClick={() => {
                  if (onFilterChange) onFilterChange("discipline");
                  setShowMoreOptions(false);
                }}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
              >
                <Layers className="h-3.5 w-3.5 text-slate-400" />
                Filter by Discipline (SN/PT/OT)
              </button>
              <button
                onClick={() => {
                  if (onFilterChange) onFilterChange("rescore");
                  setShowMoreOptions(false);
                }}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
                Re-score AI Match
              </button>
              <button
                onClick={() => {
                  if (onFilterChange) onFilterChange("export");
                  setShowMoreOptions(false);
                }}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
              >
                <Share2 className="h-3.5 w-3.5 text-slate-400" />
                Export Roster
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
