import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Building2,
  Home,
  Building,
  ShoppingBag,
  Key,
  Users,
  FileText,
  Wrench,
  DollarSign,
  UserRound,
  BarChart3,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const NavItem = ({
  icon,
  label,
  path,
  isActive,
  isCollapsed,
}: NavItemProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={path}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 rounded-lg py-2 px-2.25 text-left",
                isActive
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "hover:bg-muted",
                isCollapsed ? "h-10 w-10 p-0 justify-center" : "h-10",
              )}
            >
              <div className={cn("shrink-0", isCollapsed ? "mr-0" : "mr-2")}>
                {icon}
              </div>
              {!isCollapsed && <span>{label}</span>}
            </Button>
          </Link>
        </TooltipTrigger>
        {isCollapsed && <TooltipContent side="right">{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

interface SidebarProps {
  isCollapsed?: boolean;
  toggleSidebar?: () => void;
}

const Sidebar = ({
  isCollapsed: propIsCollapsed,
  toggleSidebar,
}: SidebarProps = {}) => {
  const [stateIsCollapsed, setIsCollapsed] = useState(false);
  const isCollapsed =
    propIsCollapsed !== undefined ? propIsCollapsed : stateIsCollapsed;
  const location = useLocation();

  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/dashboard",
    },
    { icon: <Building2 size={20} />, label: "Projects", path: "/projects" },
    { icon: <Building size={20} />, label: "Properties", path: "/properties" },
    { icon: <Home size={20} />, label: "Units", path: "/units" },
    { icon: <ShoppingBag size={20} />, label: "Sales", path: "/sales" },
    { icon: <Key size={20} />, label: "Rentals", path: "/rentals" },
    { icon: <Users size={20} />, label: "Tenants", path: "/tenants" },
    { icon: <FileText size={20} />, label: "Leases", path: "/leases" },
    { icon: <Wrench size={20} />, label: "Maintenance", path: "/maintenance" },
    { icon: <DollarSign size={20} />, label: "Finance", path: "/finance" },
    { icon: <UserRound size={20} />, label: "CRM", path: "/crm" },
    { icon: <BarChart3 size={20} />, label: "Reports", path: "/reports" },
    { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
  ];

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-background transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[70px]" : "w-[280px]",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-border/40 px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Nexus PMS</span>
          </div>
        )}
        {isCollapsed && <Building2 className="mx-auto h-6 w-6 text-primary" />}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto h-8 w-8"
          onClick={() =>
            toggleSidebar ? toggleSidebar() : setIsCollapsed(!isCollapsed)
          }
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <div className="flex-1 overflow-hidden py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={location.pathname.startsWith(item.path)}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
      </div>

      <div className="border-t border-border/40 p-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
            <UserRound size={20} className="text-primary" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">Admin User</span>
              <span className="text-xs text-muted-foreground">
                admin@nexuspms.com
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
