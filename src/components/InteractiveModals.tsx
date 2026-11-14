"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  MapPin,
  Calendar,
  User,
  ShieldCheck,
  FileText,
  AlertTriangle,
  ExternalLink,
  Navigation,
  Sparkles,
} from "lucide-react";
import { Clinician, REFERRAL_DATA, IssueItem } from "@/data/dashboardData";

// Modal Wrapper
interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidthClass?: string;
}

function ModalWrapper({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidthClass = "max-w-lg",
}: ModalWrapperProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`relative w-full ${maxWidthClass} rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl transition-all`}
      >
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">{title}</h3>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

// 1. Assign Clinician Modal
interface AssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  clinician: Clinician | null;
  onConfirm: (clinician: Clinician) => void;
}

export function AssignClinicianModal({
  isOpen,
  onClose,
  clinician,
  onConfirm,
}: AssignModalProps) {
  const [scheduledDate, setScheduledDate] = useState("2026-01-29");
  const [scheduledTime, setScheduledTime] = useState("10:00 AM");
  const [visitType, setVisitType] = useState("Start of Care (SOC) Evaluation");

  if (!clinician) return null;

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Clinician to Referral"
      subtitle="Fictional Demonstration Workflow"
    >
      <div className="space-y-4 text-xs">
        {/* Clinician Card Summary */}
        <div className="flex items-center gap-3 rounded-xl bg-blue-50/70 p-3.5 border border-blue-100">
          <img
            src={clinician.avatarUrl}
            alt={clinician.name}
            className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-2xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900">
                {clinician.name}, {clinician.discipline}
              </span>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                {clinician.matchRate}
              </span>
            </div>
            <p className="text-slate-600 mt-0.5">
              {clinician.territory} • {clinician.distance} away
            </p>
            <p className="text-slate-500 text-[11px] mt-0.5">
              Current Caseload: {clinician.caseload}
            </p>
          </div>
        </div>

        {/* Patient Details */}
        <div className="rounded-xl border border-slate-200 p-3 space-y-2 bg-slate-50/50">
          <div className="font-semibold text-slate-800">Target Patient Information</div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
            <div>
              <span className="font-medium text-slate-500">Patient:</span> {REFERRAL_DATA.patientName}
            </div>
            <div>
              <span className="font-medium text-slate-500">Referral ID:</span> {REFERRAL_DATA.referralId}
            </div>
            <div className="col-span-2">
              <span className="font-medium text-slate-500">Address:</span> {REFERRAL_DATA.address}
            </div>
            <div className="col-span-2">
              <span className="font-medium text-slate-500">Primary Dx:</span> {REFERRAL_DATA.primaryDx}
            </div>
          </div>
        </div>

        {/* Scheduling Inputs */}
        <div className="space-y-3">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Visit Type</label>
            <input
              type="text"
              value={visitType}
              onChange={(e) => setVisitType(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Target Date</label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Estimated Time</label>
              <input
                type="text"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(clinician);
              onClose();
            }}
            className="rounded-lg bg-[#1769D2] px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 shadow-xs flex items-center gap-1.5"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Confirm & Notify Clinician</span>
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

// 2. View Territory Map Modal
export function ViewMapModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Territory & Travel Route Intelligence"
      subtitle="Interactive Geospatial Demonstration View"
      maxWidthClass="max-w-2xl"
    >
      <div className="space-y-4">
        {/* Map Canvas Simulation */}
        <div className="relative h-72 w-full rounded-xl bg-slate-900 overflow-hidden border border-slate-700 flex flex-col justify-between p-4 shadow-inner">
          {/* Subtle Grid / Roads Simulation */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* SVG Map Lines & Connectors */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none">
            <line
              x1="50%"
              y1="50%"
              x2="30%"
              y2="25%"
              stroke="#60A5FA"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <line
              x1="50%"
              y1="50%"
              x2="70%"
              y2="40%"
              stroke="#34D399"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <line
              x1="50%"
              y1="50%"
              x2="45%"
              y2="80%"
              stroke="#A78BFA"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Map Top Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="rounded-md bg-slate-800/90 px-2.5 py-1 text-[11px] font-medium text-slate-200 border border-slate-700 backdrop-blur-xs flex items-center gap-1.5">
              <Navigation className="h-3.5 w-3.5 text-blue-400" />
              <span>Northwest Sector Coverage</span>
            </div>
            <div className="rounded-md bg-slate-800/90 px-2 py-1 text-[10px] font-semibold text-emerald-400 border border-slate-700">
              Low Traffic Conditions (Est. 8 min drive)
            </div>
          </div>

          {/* Center Pin: Mary Thompson */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg ring-4 ring-red-400/30 animate-pulse">
              <MapPin className="h-4 w-4" />
            </div>
            <span className="mt-1 rounded bg-slate-900/90 px-2 py-0.5 text-[10px] font-bold text-white border border-slate-700 whitespace-nowrap shadow">
              Mary Thompson (Patient)
            </span>
          </div>

          {/* Pin 1: Sarah Johnson */}
          <div className="absolute top-1/4 left-[30%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white shadow ring-2 ring-blue-300">
              <User className="h-3.5 w-3.5" />
            </div>
            <span className="mt-1 rounded bg-slate-900/90 px-1.5 py-0.5 text-[9px] font-semibold text-blue-300 border border-slate-700 whitespace-nowrap">
              Sarah Johnson, PT (3.2 mi)
            </span>
          </div>

          {/* Pin 2: Michael Reyes */}
          <div className="absolute top-[40%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white shadow ring-2 ring-emerald-300">
              <User className="h-3.5 w-3.5" />
            </div>
            <span className="mt-1 rounded bg-slate-900/90 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-300 border border-slate-700 whitespace-nowrap">
              Michael Reyes, RN (4.1 mi)
            </span>
          </div>

          {/* Pin 3: Emily Carter */}
          <div className="absolute top-[80%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-600 text-white shadow ring-2 ring-purple-300">
              <User className="h-3.5 w-3.5" />
            </div>
            <span className="mt-1 rounded bg-slate-900/90 px-1.5 py-0.5 text-[9px] font-semibold text-purple-300 border border-slate-700 whitespace-nowrap">
              Emily Carter, PTA (5.7 mi)
            </span>
          </div>

          {/* Bottom Controls */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400">
            <span>Radius: 10 miles</span>
            <span>Territory: District 4-A</span>
          </div>
        </div>

        {/* Territory Stats */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200">
            <div className="text-slate-500 text-[10px]">Optimal Route</div>
            <div className="font-bold text-slate-800 text-sm mt-0.5">3.2 miles</div>
            <div className="text-[10px] text-emerald-600 font-semibold">Sarah Johnson, PT</div>
          </div>
          <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200">
            <div className="text-slate-500 text-[10px]">Est. Drive Time</div>
            <div className="font-bold text-slate-800 text-sm mt-0.5">8 - 11 mins</div>
            <div className="text-[10px] text-slate-500">Normal Conditions</div>
          </div>
          <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-200">
            <div className="text-slate-500 text-[10px]">Territory Density</div>
            <div className="font-bold text-slate-800 text-sm mt-0.5">9 Clinicians</div>
            <div className="text-[10px] text-blue-600 font-semibold">High Availability</div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
          >
            Close Map View
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

// 3. View Full Referral & Fax Modal
export function FullReferralModal({
  isOpen,
  onClose,
  activeTab = "details",
}: {
  isOpen: boolean;
  onClose: () => void;
  activeTab?: "details" | "fax";
}) {
  const [currentTab, setCurrentTab] = useState<"details" | "fax">(activeTab);

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title={`Referral Dossier: ${REFERRAL_DATA.referralId}`}
      subtitle="Processed by HomeHealthOps AI Intake Engine"
      maxWidthClass="max-w-2xl"
    >
      <div className="space-y-4 text-xs">
        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setCurrentTab("details")}
            className={`rounded-md px-3 py-1.5 font-semibold text-xs transition-colors ${
              currentTab === "details"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Clinical & Demographics
          </button>
          <button
            onClick={() => setCurrentTab("fax")}
            className={`rounded-md px-3 py-1.5 font-semibold text-xs transition-colors ${
              currentTab === "fax"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Original Incoming Fax (#FX-99201)
          </button>
        </div>

        {currentTab === "details" ? (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-slate-200 p-3 bg-slate-50/50">
                <span className="text-[10px] font-bold uppercase text-slate-400">Patient</span>
                <p className="font-bold text-sm text-slate-800">{REFERRAL_DATA.patientName}</p>
                <p className="text-slate-600 text-[11px] mt-0.5">DOB: {REFERRAL_DATA.dob} ({REFERRAL_DATA.age} y/o)</p>
                <p className="text-slate-600 text-[11px] mt-0.5">Phone: {REFERRAL_DATA.phone}</p>
                <p className="text-slate-600 text-[11px]">Address: {REFERRAL_DATA.address}</p>
              </div>

              <div className="rounded-lg border border-slate-200 p-3 bg-slate-50/50">
                <span className="text-[10px] font-bold uppercase text-slate-400">Payer & Order</span>
                <p className="font-bold text-sm text-emerald-700">{REFERRAL_DATA.insurance}</p>
                <p className="text-slate-600 text-[11px] mt-0.5">Referral: {REFERRAL_DATA.referralType}</p>
                <p className="text-slate-600 text-[11px] mt-0.5">Source: {REFERRAL_DATA.source}</p>
                <p className="text-slate-600 text-[11px]">Emergency Contact: {REFERRAL_DATA.emergencyContact}</p>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 p-3">
              <span className="text-[10px] font-bold uppercase text-slate-400">Diagnosis Details</span>
              <p className="font-semibold text-slate-900 mt-1">Primary: {REFERRAL_DATA.primaryDx}</p>
              <p className="text-slate-600 mt-0.5">Secondary: {REFERRAL_DATA.otherDx}</p>
            </div>

            <div className="rounded-lg border border-purple-200 bg-purple-50/40 p-3">
              <div className="flex items-center gap-1.5 font-bold text-purple-900">
                <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                AI Extraction Summary
              </div>
              <ul className="mt-2 space-y-1 text-[11px] text-slate-700 pl-4 list-disc">
                {REFERRAL_DATA.insights.map((ins, i) => (
                  <li key={i}>{ins}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="rounded-xl border border-slate-300 bg-white p-4 font-mono text-[11px] text-slate-700 shadow-inner max-h-96 overflow-y-auto">
              <div className="border-b border-slate-200 pb-2 text-slate-500 flex justify-between">
                <span>FAX TRANSMISSION: MEMORIAL REGIONAL HOSPITAL</span>
                <span>PAGES: 4</span>
              </div>
              <div className="mt-3 space-y-2">
                <p>DATE: JAN 28, 2026 09:14 AM</p>
                <p>ATTN: HOME HEALTH INTAKE COORDINATOR</p>
                <p>RE: DISCHARGE REFERRAL FOR THOMPSON, MARY (DOB: 04/16/1944)</p>
                <p>MRN: #89412 | ADMISSION DX: ACUTE ON CHRONIC DIASTOLIC HEART FAILURE</p>
                <p className="text-slate-500 pt-2 border-t border-slate-100">
                  CLINICAL SUMMARY: Patient is an 81-year-old female discharging home today following 4-day stabilization. Orders for SN 2x/wk for vitals monitoring, medication management, and CHF teaching. Physical Therapy 2x/wk for gait training and transfer safety. Homebound due to severe fatigue and fall risk.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

// 4. Open In EMR Modal
export function OpenInEMRModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Electronic Medical Record (EMR) Integration"
      subtitle="Seamless Bi-Directional Synchronization"
    >
      <div className="space-y-3 text-xs">
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <ExternalLink className="h-4 w-4 text-blue-600" />
            <span>Select Connected EHR / EMR Provider</span>
          </div>
          <p className="text-slate-600 text-[11px]">
            HomeHealthOps supports automated single-sign-on and real-time FHIR record syncing with major home health platforms:
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {["Homecare Homebase (HCHB)", "PointClickCare", "Epic Systems", "WellSky (Kinnser)"].map(
            (emr, idx) => (
              <button
                key={idx}
                onClick={onClose}
                className="flex items-center justify-between rounded-lg border border-slate-200 p-2.5 text-left text-xs font-medium text-slate-700 hover:border-blue-500 hover:bg-blue-50/50 transition-colors"
              >
                <span>{emr}</span>
                <span className="text-[10px] text-emerald-600 font-bold">Sync Ready</span>
              </button>
            )
          )}
        </div>

        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2.5 text-[11px] text-emerald-800">
          ✓ Patient Mary Thompson (MRN: 89412) profile draft mapped and ready for 1-click import.
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-3.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
          >
            Done
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

// 5. Fix Issue Modal (Add Section / Update Coding / Add Detail)
export function FixIssueModal({
  isOpen,
  onClose,
  issue,
  onResolve,
}: {
  isOpen: boolean;
  onClose: () => void;
  issue: IssueItem | null;
  onResolve: (issueId: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  if (!issue) return null;

  const getModalContent = () => {
    switch (issue.actionType) {
      case "add-section":
        return {
          title: "Add Functional Status Section (OASIS M1800-M1860)",
          subtitle: "Resolve missing gait, transfers, and ADL scoring",
          defaultText:
            "Patient ambulates with rolling walker 25 feet with moderate assist. Transfers from bed to chair with contact guard assist. Score: M1840 = 2, M1850 = 2.",
          label: "Functional Assessment Documentation:",
        };
      case "update-coding":
        return {
          title: "Update & Align Primary ICD-10 Code",
          subtitle: "Reconcile referral code with SOC evaluation",
          defaultText: "I50.32 – Chronic diastolic (congestive) heart failure (MMTA Group)",
          label: "Confirmed Primary Diagnosis:",
        };
      case "add-detail":
        return {
          title: "Document Skilled Nursing Need",
          subtitle: "Detail clinical necessity for SN visits",
          defaultText:
            "Skilled nursing required for daily CHF symptom surveillance, cardiopulmonary assessment, medication regimen education, and edema evaluation.",
          label: "Skilled Nursing Justification:",
        };
    }
  };

  const config = getModalContent();

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title={config.title}
      subtitle={config.subtitle}
    >
      <div className="space-y-4 text-xs">
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-amber-800 flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
          <div>
            <span className="font-bold">Detected Audit Issue:</span> {issue.text}
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-800 mb-1">{config.label}</label>
          <textarea
            rows={4}
            defaultValue={config.defaultText}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onResolve(issue.id);
              onClose();
            }}
            className="rounded-lg bg-[#1769D2] px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 shadow-xs flex items-center gap-1.5"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Save & Validate Fix</span>
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

// 6. Help & Documentation Modal
export function HelpModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="HomeHealthOps Knowledge Base"
      subtitle="Enterprise Home Health Operations & AI Guide"
    >
      <div className="space-y-3 text-xs text-slate-600">
        <div className="rounded-lg bg-blue-50 p-3 text-blue-900 border border-blue-200">
          <h4 className="font-bold text-sm">Welcome to HomeHealthOps</h4>
          <p className="mt-1 text-[11px] leading-relaxed">
            This dashboard orchestrates home health front-desk intake, AI document parsing, clinician dispatching, and CMS Pre-Claim Review (PCR) documentation auditing.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-slate-800">Key Functional Modules</h5>
          <ul className="mt-1 space-y-1 list-disc pl-4 text-[11px]">
            <li><strong>Referral Intake (AI):</strong> Parses incoming digital faxes into ICD-10 coded patient profiles.</li>
            <li><strong>Clinician Match (AI):</strong> Scores eligible clinicians using GPS proximity, current caseload, and clinical certifications.</li>
            <li><strong>Pre-PCR Audit Engine:</strong> Screens OASIS documents for CMS Medicare compliance before billing submission.</li>
          </ul>
        </div>

        <div className="rounded-lg bg-slate-100 p-2.5 text-[10px] text-slate-500">
          Note: This instance is running in frontend demonstration mode with fictional patient records.
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
          >
            Got it
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
