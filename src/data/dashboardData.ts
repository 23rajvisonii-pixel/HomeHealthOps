export interface Clinician {
  id: string;
  name: string;
  discipline: string;
  distance: string;
  caseload: string;
  isBestMatch?: boolean;
  status: "Available" | "Busy" | "On Route";
  matchRate: string;
  avatarUrl: string;
  phone: string;
  territory: string;
  specialties: string[];
}

export interface SummaryMetric {
  id: string;
  title: string;
  value: number;
  subtitle: string;
  type: "referrals" | "visits" | "qa" | "prepcr";
  bgClass: string;
  borderClass: string;
  iconBgClass: string;
  iconColorClass: string;
}

export interface IssueItem {
  id: string;
  text: string;
  actionText: string;
  actionType: "add-section" | "update-coding" | "add-detail";
  resolved?: boolean;
}

export const DASHBOARD_USER = {
  name: "John Doe",
  initials: "JD",
  role: "Front Desk",
  agency: "Metropolitan Home Health Care",
  dateFormatted: "Tue, Jan 28, 2026",
};

export const NOTIFICATIONS_DATA = [
  {
    id: "notif-1",
    title: "AI Fax Extraction Completed",
    description: "Referral R-100458 for Mary Thompson parsed with 98% confidence.",
    time: "4 mins ago",
    unread: true,
  },
  {
    id: "notif-2",
    title: "QA Review Ready",
    description: "SOC Assessment #8921 for Robert Chen ready for review.",
    time: "22 mins ago",
    unread: true,
  },
  {
    id: "notif-3",
    title: "Pre-PCR Documentation Alert",
    description: "3 missing functional scores detected for intake batch #4.",
    time: "1 hour ago",
    unread: true,
  },
];

export const SUMMARY_METRICS: SummaryMetric[] = [
  {
    id: "metric-1",
    title: "New Referrals",
    value: 7,
    subtitle: "3 from Fax (AI)",
    type: "referrals",
    bgClass: "bg-[#EFF6FF]",
    borderClass: "border-[#DBEAFE]",
    iconBgClass: "bg-blue-100",
    iconColorClass: "text-[#1769D2]",
  },
  {
    id: "metric-2",
    title: "Pending Visits",
    value: 18,
    subtitle: "Need scheduling",
    type: "visits",
    bgClass: "bg-[#ECFDF5]",
    borderClass: "border-[#A7F3D0]",
    iconBgClass: "bg-emerald-100",
    iconColorClass: "text-emerald-600",
  },
  {
    id: "metric-3",
    title: "QA Visits",
    value: 6,
    subtitle: "Ready for review",
    type: "qa",
    bgClass: "bg-[#FEFCE8]",
    borderClass: "border-[#FEF08A]",
    iconBgClass: "bg-amber-100",
    iconColorClass: "text-amber-600",
  },
  {
    id: "metric-4",
    title: "Pre-PCR Alerts",
    value: 4,
    subtitle: "Documentation & coding",
    type: "prepcr",
    bgClass: "bg-[#FAF5FF]",
    borderClass: "border-[#E9D5FF]",
    iconBgClass: "bg-purple-100",
    iconColorClass: "text-purple-600",
  },
];

export const REFERRAL_DATA = {
  referralId: "R-100458",
  status: "New",
  patientName: "Mary Thompson",
  dob: "04/16/1944",
  age: 81,
  insurance: "Medicare (Traditional)",
  referralType: "Home Health (SN, PT, OT)",
  primaryDx: "I50.32 – Chronic diastolic heart failure",
  otherDx: "E11.9 – Type 2 diabetes, R26.2 – Difficulty walking",
  intakeDate: "Jan 28, 2026 09:14 AM",
  source: "e-Fax #FX-99201 from Memorial Regional Hospital",
  address: "1422 Elmwood Ave, Oakridge, IL 60068",
  phone: "(555) 382-9912",
  emergencyContact: "David Thompson (Son) – (555) 382-9915",
  insights: [
    "Patient & demographics identified",
    "Insurance verified (Medicare)",
    "Diagnoses coded (ICD-10)",
    "Requested disciplines: SN, PT, OT",
    "Eligibility: Homebound likely",
    "Ready for intake",
  ],
};

export const CLINICIANS_DATA: Clinician[] = [
  {
    id: "c-1",
    name: "Sarah Johnson",
    discipline: "PT",
    distance: "3.2 mi",
    caseload: "68% current caseload",
    isBestMatch: true,
    status: "Available",
    matchRate: "98% Match",
    avatarUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
    phone: "(555) 234-5678",
    territory: "Northwest District (Sector 4)",
    specialties: ["Cardiopulmonary Rehab", "Gait & Balance", "Fall Prevention"],
  },
  {
    id: "c-2",
    name: "Michael Reyes",
    discipline: "RN",
    distance: "4.1 mi",
    caseload: "72% caseload",
    status: "Available",
    matchRate: "94% Match",
    avatarUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
    phone: "(555) 345-6789",
    territory: "Central-North Corridor",
    specialties: ["Chronic CHF Care", "Diabetic Teaching", "Wound Care"],
  },
  {
    id: "c-3",
    name: "Emily Carter",
    discipline: "PTA",
    distance: "5.7 mi",
    caseload: "60% caseload",
    status: "Available",
    matchRate: "92% Match",
    avatarUrl: "https://images.unsplash.com/photo-1594824813589-9828d1162d0d?w=150&auto=format&fit=crop&q=80",
    phone: "(555) 456-7890",
    territory: "Northwest Suburbs",
    specialties: ["Geriatric Mobility", "ADL Transfers", "Therapeutic Exercise"],
  },
];

export const INITIAL_ISSUES: IssueItem[] = [
  {
    id: "iss-1",
    text: "Missing functional status (e.g., gait, transfers, ADLs)",
    actionText: "Add Section",
    actionType: "add-section",
  },
  {
    id: "iss-2",
    text: "Inconsistent primary diagnosis with referral",
    actionText: "Update Coding",
    actionType: "update-coding",
  },
  {
    id: "iss-3",
    text: "No specific skilled nursing need documented",
    actionText: "Add Detail",
    actionType: "add-detail",
  },
];

export const SIDEBAR_ITEMS = [
  { id: "dashboard", label: "Dashboard", badge: null },
  { id: "referrals", label: "Referrals & Intake", badge: 7 },
  { id: "patients", label: "Patients", badge: null },
  { id: "scheduling", label: "Scheduling", badge: null },
  { id: "visits-qa", label: "Visits & QA", badge: 12 },
  { id: "documentation", label: "Documentation", badge: null },
  { id: "prepcr", label: "Pre-PCR & Coding", badge: null },
  { id: "orders-485", label: "485 & Orders", badge: null },
  { id: "clinicians", label: "Clinicians", badge: null },
  { id: "map", label: "Map & Territories", badge: null },
  { id: "reports", label: "Reports", badge: null },
  { id: "settings", label: "Settings", badge: null },
] as const;
