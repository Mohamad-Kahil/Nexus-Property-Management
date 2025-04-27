import React, { useState, useEffect, createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
import { Sun, Moon, Languages } from "lucide-react";
import { motion } from "framer-motion";

import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Create Company Context
interface CompanyContextType {
  selectedCompanyId: string;
  setSelectedCompanyId: (id: string) => void;
}

const CompanyContext = createContext<CompanyContextType>({
  selectedCompanyId: "",
  setSelectedCompanyId: () => {},
});

export const useCompany = () => useContext(CompanyContext);

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [isRtl, setIsRtl] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(
    localStorage.getItem("selectedCompanyId") ||
      "00000000-0000-0000-0000-000000000001",
  );

  // Toggle sidebar collapsed state
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Toggle language
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    setIsRtl(newLanguage === "ar");
    // Here you would also update your i18n context
  };

  // Apply RTL/LTR direction based on language
  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [isRtl, language]);

  // Apply dark mode on initial load if needed
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setIsDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <CompanyContext.Provider
      value={{ selectedCompanyId, setSelectedCompanyId }}
    >
      <div className={`flex h-screen bg-background ${isRtl ? "rtl" : "ltr"}`}>
        {/* Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top Navbar */}
          <header className="flex items-center justify-between h-16 px-6 border-b border-border/40 bg-background">
            {/* Left side - Breadcrumbs */}
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">
                Nexus Property Management
              </h1>
            </div>

            {/* Right side - Theme toggle, Language toggle, User menu */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <Toggle
                pressed={isDarkMode}
                onPressedChange={toggleDarkMode}
                aria-label="Toggle theme"
                className="p-2"
              >
                {isDarkMode ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Toggle>

              {/* Language Toggle */}
              <Toggle
                pressed={language === "ar"}
                onPressedChange={toggleLanguage}
                aria-label="Toggle language"
                className="p-2"
              >
                <Languages className="h-5 w-5" />
                <span className="ml-2 text-sm font-medium">
                  {language.toUpperCase()}
                </span>
              </Toggle>

              {/* User Profile Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar>
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                        alt="User"
                      />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto p-6 bg-background">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {children || <Outlet />}
            </motion.div>
          </main>
        </div>
      </div>
    </CompanyContext.Provider>
  );
};

export default MainLayout;
