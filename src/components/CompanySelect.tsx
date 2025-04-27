import React, { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/lib/supabase";
import type { Company } from "@/models/companyModel";

interface CompanySelectProps {
  onCompanyChange?: (companyId: string) => void;
}

const CompanySelect = ({ onCompanyChange }: CompanySelectProps) => {
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        // Use a default company instead of trying to fetch from database
        const defaultCompany = {
          id: "00000000-0000-0000-0000-000000000001",
          name: "Default Company",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setCompanies([defaultCompany]);
        setSelectedCompany(defaultCompany);
        if (onCompanyChange) {
          onCompanyChange(defaultCompany.id);
        }
      } catch (err) {
        console.error("Error in company setup:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [onCompanyChange]);

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setOpen(false);
    if (onCompanyChange) {
      onCompanyChange(company.id);
    }
    // Store selected company ID in localStorage for persistence
    localStorage.setItem("selectedCompanyId", company.id);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : selectedCompany?.name || "Select company..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search company..." />
          <CommandEmpty>No company found.</CommandEmpty>
          <CommandGroup>
            {companies && companies.length > 0 ? (
              companies.map((company) => (
                <CommandItem
                  key={company.id}
                  value={company.name}
                  onSelect={() => handleCompanySelect(company)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCompany?.id === company.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {company.name}
                </CommandItem>
              ))
            ) : (
              <CommandItem value="default" onSelect={() => {}}>
                Default Company
              </CommandItem>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CompanySelect;
