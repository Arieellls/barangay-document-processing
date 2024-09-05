import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  CalendarRange,
  MapPinHouse,
  BookOpenCheck,
  UserPen,
  FileClock
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getAdminMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin/barangay-officials",
          label: "Barangay Officials",
          active: pathname.includes("/barangay-officials"),
          icon: Users,
          submenus: []
        },
        {
          href: "/admin/events",
          label: "Calendar of Events",
          active: pathname.includes("/events"),
          icon: CalendarRange,
          submenus: []
        },
        {
          href: "/admin/residents",
          label: "Residents",
          active: pathname.includes("/residents"),
          icon: MapPinHouse,
          submenus: []
        },
        {
          href: "/admin/requested-documents",
          label: "Requested Documents",
          active: pathname.includes("/requested-documents"),
          icon: BookOpenCheck,
          submenus: []
        },
        {
          href: "/admin/history",
          label: "History",
          active: pathname.includes("/history"),
          icon: FileClock,
          submenus: []
        },
        {
          href: "/admin/account-approval",
          label: "Account Approval",
          active: pathname.includes("/account-approval"),
          icon: UserPen,
          submenus: []
        }
      ]
    }
  ];
}
