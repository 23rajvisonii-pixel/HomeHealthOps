"use client";

import React from "react";
import { User, Calendar, Shield, Stethoscope, Activity, FileText } from "lucide-react";
import { REFERRAL_DATA } from "@/data/dashboardData";

interface ReferralDetailsProps {
  onPatientClick?: () => void;
}

export default function ReferralDetails({ onPatientClick }: ReferralDetailsProps) {
  return (
    <div className="flex-1 space-y-2.5">
      {/* Header: Referral ID + New Badge */}
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">
          Referral – {REFERRAL_DATA.referralId}
        </h3>
        <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-semibold text-purple-700">
          {REFERRAL_DATA.status}
        </span>
      </div>

      {/* Info Rows */}
      <div className="space-y-1.5 text-xs">
        {/* Patient */}
        <div className="flex items-center gap-2 text-slate-700">
          <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-900">Patient:</span>
          <button
            onClick={onPatientClick}
            className="hover:text-blue-600 hover:underline font-medium text-slate-800"
          >
            {REFERRAL_DATA.patientName}
          </button>
        </div>

        {/* DOB */}
        <div className="flex items-center gap-2 text-slate-700">
          <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-900">DOB:</span>
          <span className="text-slate-600">
            {REFERRAL_DATA.dob} ({REFERRAL_DATA.age} y/o)
          </span>
        </div>

        {/* Insurance */}
        <div className="flex items-center gap-2 text-slate-700">
          <Shield className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-900">Insurance:</span>
          <span className="rounded bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
            {REFERRAL_DATA.insurance}
          </span>
        </div>

        {/* Referral Disciplines */}
        <div className="flex items-center gap-2 text-slate-700">
          <Activity className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-900">Referral:</span>
          <span className="text-slate-700 font-medium">
            {REFERRAL_DATA.referralType}
          </span>
        </div>

        {/* Primary Dx */}
        <div className="flex items-start gap-2 text-slate-700">
          <Stethoscope className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-900">Primary Dx:</span>{" "}
            <span className="text-slate-700 font-medium">
              {REFERRAL_DATA.primaryDx}
            </span>
          </div>
        </div>

        {/* Other Dx */}
        <div className="flex items-start gap-2 text-slate-700">
          <FileText className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-900">Other Dx:</span>{" "}
            <span className="text-slate-600">{REFERRAL_DATA.otherDx}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
