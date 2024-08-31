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

export function getUserMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
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
          href: "/barangay-officials",
          label: "Barangay Officials",
          active: pathname.includes("/barangay-officials"),
          icon: Users,
          submenus: []
        },
        {
          href: "/events",
          label: "Calendar of Events",
          active: pathname.includes("/events"),
          icon: CalendarRange,
          submenus: []
        },
        {
          href: "/request-documents",
          label: "Request Documents",
          active: pathname.includes("/request-documents"),
          icon: BookOpenCheck,
          submenus: []
        },
        {
          href: "/request-status",
          label: "Request Status",
          active: pathname.includes("/request-status"),
          icon: UserPen,
          submenus: []
        },
        {
          href: "/history",
          label: "History",
          active: pathname.includes("/history"),
          icon: FileClock,
          submenus: []
        }
      ]
    }
  ];
}
