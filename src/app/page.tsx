"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import WelcomeSection from "@/components/WelcomeSection";
import SummaryCard from "@/components/SummaryCard";
import ReferralIntake from "@/components/ReferralIntake";
import ClinicianMatch from "@/components/ClinicianMatch";
import PrePCRSection from "@/components/PrePCRSection";
import {
  AssignClinicianModal,
  ViewMapModal,
  FullReferralModal,
  OpenInEMRModal,
  FixIssueModal,
  HelpModal,
} from "@/components/InteractiveModals";
import {
  SUMMARY_METRICS,
  INITIAL_ISSUES,
  CLINICIANS_DATA,
  Clinician,
  SummaryMetric,
  IssueItem,
} from "@/data/dashboardData";
import { Info, CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
  // Navigation & Layout States
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Data & Issue States
  const [issues, setIssues] = useState<IssueItem[]>(INITIAL_ISSUES);
  const [activeMetricFilter, setActiveMetricFilter] = useState<string | null>(null);

  // Modal States
  const [selectedClinicianForAssign, setSelectedClinicianForAssign] =
    useState<Clinician | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [referralModalTab, setReferralModalTab] = useState<"details" | "fax">("details");
  const [isEmrModalOpen, setIsEmrModalOpen] = useState(false);
  const [activeFixIssue, setActiveFixIssue] = useState<IssueItem | null>(null);
  const [isFixIssueModalOpen, setIsFixIssueModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Handlers
  const handleAssignClinician = (clinician: Clinician) => {
    setSelectedClinicianForAssign(clinician);
    setIsAssignModalOpen(true);
  };

  const handleConfirmAssignment = (clinician: Clinician) => {
    showToast(`✓ Clinician ${clinician.name}, ${clinician.discipline} successfully assigned to Mary Thompson!`);
  };

  const handleOpenFixIssue = (issue: IssueItem) => {
    setActiveFixIssue(issue);
    setIsFixIssueModalOpen(true);
  };

  const handleResolveIssue = (issueId: string) => {
    setIssues((prev) =>
      prev.map((iss) => (iss.id === issueId ? { ...iss, resolved: true } : iss))
    );
    showToast("✓ Documentation issue successfully updated and validated!");
  };

  const handleSummaryCardClick = (metric: SummaryMetric) => {
    if (activeMetricFilter === metric.id) {
      setActiveMetricFilter(null);
      showToast("Filter cleared.");
    } else {
      setActiveMetricFilter(metric.id);
      showToast(`Showing filtered records for ${metric.title}.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] flex flex-col font-sans">
      {/* Toast Notification Pill */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2.5 shadow-2xl text-xs font-semibold animate-in fade-in slide-in-from-top-2 border border-slate-700">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <Header
        onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isSidebarOpen={isMobileSidebarOpen}
        onOpenHelp={() => setIsHelpModalOpen(true)}
        onSearchResultSelect={(item) => {
          showToast(`Opened search result: ${item}`);
          if (item.includes("Mary") || item.includes("R-100458")) {
            setIsReferralModalOpen(true);
          }
        }}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR (12 items in exact order) */}
        <Sidebar
          activeItem={activeNavItem}
          onSelectItem={(id) => {
            setActiveNavItem(id);
            if (id !== "dashboard") {
              showToast(`Navigated to ${id.replace("-", " ").toUpperCase()} section.`);
            }
          }}
          isOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 overflow-y-auto px-4 md:px-7 py-6">
          {/* Subtle Demonstration Banner */}
          <div className="mb-4 flex items-center justify-between rounded-lg border border-blue-200/70 bg-blue-50/60 px-3.5 py-1.5 text-xs text-blue-900">
            <div className="flex items-center gap-2">
              <Info className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              <span>
                <strong>Demonstration Mode:</strong> Displaying simulated operational data for front-desk triage and clinical decision support.
              </span>
            </div>
            <button
              onClick={() => setIsHelpModalOpen(true)}
              className="text-[11px] font-semibold text-blue-700 hover:underline hidden sm:block"
            >
              System Guide
            </button>
          </div>

          {/* DASHBOARD WELCOME SECTION */}
          <WelcomeSection />

          {/* FOUR SUMMARY CARDS */}
          <section className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SUMMARY_METRICS.map((metric) => (
              <SummaryCard
                key={metric.id}
                metric={metric}
                isActive={activeMetricFilter === metric.id}
                onClick={handleSummaryCardClick}
              />
            ))}
          </section>

          {/* TWO MAIN PANELS: REFERRAL INTAKE (AI) & CLINICIAN MATCH (AI) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* LEFT: Referral Intake (AI) Panel (7 cols on large desktop) */}
            <div className="lg:col-span-7 flex flex-col">
              <ReferralIntake
                onContinueIntake={() => {
                  setReferralModalTab("details");
                  setIsReferralModalOpen(true);
                }}
                onViewFullReferral={() => {
                  setReferralModalTab("details");
                  setIsReferralModalOpen(true);
                }}
                onPreviewFax={() => {
                  setReferralModalTab("fax");
                  setIsReferralModalOpen(true);
                }}
                onOpenEMR={() => setIsEmrModalOpen(true)}
              />
            </div>

            {/* RIGHT: Clinician Match (AI) Panel (5 cols on large desktop) */}
            <div className="lg:col-span-5 flex flex-col">
              <ClinicianMatch
                onAssignClinician={handleAssignClinician}
                onViewMap={() => setIsMapModalOpen(true)}
                onFilterChange={(filter) => {
                  showToast(`Filter applied: ${filter}`);
                }}
              />
            </div>
          </section>

          {/* PRE-PCR & CODING (AI) SECTION */}
          <section className="mb-6">
            <PrePCRSection
              issues={issues}
              onOpenIssueModal={handleOpenFixIssue}
              onOpenDocModal={() => {
                setReferralModalTab("details");
                setIsReferralModalOpen(true);
              }}
            />
          </section>
        </main>
      </div>

      {/* INTERACTIVE MODALS & DIALOGS */}
      <AssignClinicianModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        clinician={selectedClinicianForAssign}
        onConfirm={handleConfirmAssignment}
      />

      <ViewMapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
      />

      <FullReferralModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
        activeTab={referralModalTab}
      />

      <OpenInEMRModal
        isOpen={isEmrModalOpen}
        onClose={() => setIsEmrModalOpen(false)}
      />

      <FixIssueModal
        isOpen={isFixIssueModalOpen}
        onClose={() => setIsFixIssueModalOpen(false)}
        issue={activeFixIssue}
        onResolve={handleResolveIssue}
      />

      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
}
