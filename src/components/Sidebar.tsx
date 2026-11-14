"use client";

import React from "react";
import {
  Home,
  Inbox,
  Users,
  Calendar,
  ClipboardCheck,
  FileText,
  Sparkles,
  ClipboardList,
  UserCheck,
  MapPin,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SIDEBAR_ITEMS } from "@/data/dashboardData";

interface SidebarProps {
  activeItem: string;
  onSelectItem: (id: string) => void;
  isOpen: boolean;
  onCloseMobile?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({
  activeItem,
  onSelectItem,
  isOpen,
  onCloseMobile,
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  // Map icons to each item ID in exact order
  const getIcon = (id: string, isSelected: boolean) => {
    const iconClass = `h-4 w-4 shrink-0 transition-colors ${
      isSelected ? "text-white" : "text-slate-300 group-hover:text-white"
    }`;

    switch (id) {
      case "dashboard":
        return <Home className={iconClass} />;
      case "referrals":
        return <Inbox className={iconClass} />;
      case "patients":
        return <Users className={iconClass} />;
      case "scheduling":
        return <Calendar className={iconClass} />;
      case "visits-qa":
        return <ClipboardCheck className={iconClass} />;
      case "documentation":
        return <FileText className={iconClass} />;
      case "prepcr":
        return <Sparkles className={iconClass} />;
      case "orders-485":
        return <ClipboardList className={iconClass} />;
      case "clinicians":
        return <UserCheck className={iconClass} />;
      case "map":
        return <MapPin className={iconClass} />;
      case "reports":
        return <BarChart3 className={iconClass} />;
      case "settings":
        return <Settings className={iconClass} />;
      default:
        return <FileText className={iconClass} />;
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Main Sidebar Element */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-[#142B4A] transition-all duration-300 ease-in-out lg:static lg:z-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "w-20" : "w-64"}`}
      >
        {/* Top spacing / Title for mobile */}
        <div className="flex h-16 items-center justify-between px-4 lg:hidden border-b border-white/10">
          <div className="flex items-center gap-2 text-white">
            <span className="font-bold text-sm tracking-wide">HomeHealthOps</span>
          </div>
          <button
            onClick={onCloseMobile}
            className="rounded p-1 text-slate-300 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const isSelected = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectItem(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                title={isCollapsed ? item.label : undefined}
                className={`group relative flex w-full items-center rounded-lg px-3 py-2.5 text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-[#1769D2] text-white shadow-sm"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                } ${isCollapsed ? "justify-center" : "justify-between"}`}
              >
                <div className="flex items-center gap-3">
                  {getIcon(item.id, isSelected)}
                  {!isCollapsed && (
                    <span className="truncate tracking-wide">{item.label}</span>
                  )}
                </div>

                {/* Badge (e.g. 7 or 12 in red circle) */}
                {item.badge !== null && (
                  <span
                    className={`flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E53E3E] px-1 text-[10px] font-bold text-white shadow-xs ${
                      isCollapsed ? "absolute top-1 right-2" : ""
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Toggle Collapse for Desktop */}
        <div className="hidden lg:flex items-center justify-between border-t border-white/10 p-3">
          {!isCollapsed && (
            <div className="text-[11px] text-slate-400 font-medium truncate">
              v2.4.0 (Enterprise)
            </div>
          )}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="flex h-7 w-7 items-center justify-center rounded text-slate-400 hover:bg-white/10 hover:text-white transition-colors ml-auto"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
