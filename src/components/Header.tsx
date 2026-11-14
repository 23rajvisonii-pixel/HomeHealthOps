"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  Menu,
  X,
  CheckCircle2,
  Building2,
  User,
  LogOut,
  Settings,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { DASHBOARD_USER, NOTIFICATIONS_DATA } from "@/data/dashboardData";

interface HeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
  onOpenHelp?: () => void;
  onSearchResultSelect?: (item: string) => void;
}

export default function Header({
  onToggleSidebar,
  isSidebarOpen,
  onOpenHelp,
  onSearchResultSelect,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const [searchFocused, setSearchFocused] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const sampleSearchMatches = [
    { title: "Mary Thompson", type: "Patient (MRN: 89412)", category: "Patients" },
    { title: "R-100458", type: "Referral (St. Jude Fax)", category: "Referrals" },
    { title: "Sarah Johnson, PT", type: "Clinician (Available)", category: "Clinicians" },
    { title: "Robert Chen", type: "QA SOC Assessment #8921", category: "Visits" },
  ].filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 shadow-xs">
      {/* LEFT: Mobile Toggle + Logo & Brand */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle navigation menu"
            className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        )}

        <div className="flex items-center gap-2.5">
          {/* Logo Mark: stylized home with medical cross */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#142B4A] to-[#1E3A8A] text-white shadow-xs">
            <svg
              className="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 9.5V20C2 20.5523 2.44772 21 3 21H9V14H15V21H21C21.5523 21 22 20.5523 22 20V9.5L12 2Z" />
              <path
                d="M12 7V11M10 9H14"
                stroke="#60A5FA"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold tracking-tight text-[#142B4A]">
                HomeHealthOps
              </span>
              <span className="text-[10px] font-semibold text-slate-400">™</span>
            </div>
            <span className="text-[11px] font-medium text-slate-500">
              Home Health Operations & Intelligence
            </span>
          </div>
        </div>
      </div>

      {/* CENTER: Wide Search Bar */}
      <div className="hidden md:flex flex-1 max-w-xl mx-8 relative" ref={searchRef}>
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            placeholder="Search patient, referral, MRN, or clinician..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-[#1769D2] focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Live Search Suggestions Dropdown */}
        {searchFocused && searchQuery.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1.5 rounded-lg border border-slate-200 bg-white p-2 shadow-lg z-50">
            <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Matching Records
            </div>
            {sampleSearchMatches.length > 0 ? (
              sampleSearchMatches.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (onSearchResultSelect) onSearchResultSelect(item.title);
                    setSearchFocused(false);
                  }}
                  className="w-full text-left flex items-center justify-between rounded-md px-2.5 py-2 text-xs hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-blue-600" />
                    <span className="font-medium text-slate-800">{item.title}</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">{item.type}</span>
                </button>
              ))
            ) : (
              <div className="p-3 text-center text-xs text-slate-500">
                No immediate matches found for &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT: Notifications, Help, Profile */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute 1 top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 rounded-xl border border-slate-200 bg-white p-4 shadow-xl z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-slate-900">Notifications</h4>
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">
                    {unreadCount} New
                  </span>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs font-medium text-blue-600 hover:text-blue-800"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="mt-2 divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`py-3 transition-colors ${
                      notif.unread ? "bg-blue-50/40 -mx-4 px-4" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-800">{notif.title}</p>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {notif.time}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                      {notif.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Help Icon */}
        <button
          onClick={onOpenHelp}
          aria-label="Help and resources"
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <HelpCircle className="h-5 w-5" />
        </button>

        {/* Profile Avatar & Info */}
        <div className="relative pl-1 border-l border-slate-200" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 rounded-lg p-1 hover:bg-slate-100 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#142B4A] text-xs font-bold text-white shadow-xs">
              {DASHBOARD_USER.initials}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {DASHBOARD_USER.name}
              </span>
              <span className="text-[11px] font-medium text-slate-500 leading-tight">
                {DASHBOARD_USER.role}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl z-50">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{DASHBOARD_USER.name}</p>
                <p className="text-[11px] text-slate-500">{DASHBOARD_USER.agency}</p>
                <span className="mt-1.5 inline-flex items-center gap-1 rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">
                  <ShieldCheck className="h-3 w-3" /> Role: {DASHBOARD_USER.role}
                </span>
              </div>
              <div className="mt-1">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  My Profile & Credentials
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <Building2 className="h-3.5 w-3.5 text-slate-400" />
                  Switch Agency Branch
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
                >
                  <Settings className="h-3.5 w-3.5 text-slate-400" />
                  Account Settings
                </button>
              </div>
              <div className="mt-1 border-t border-slate-100 pt-1">
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-3.5 w-3.5 text-red-500" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
