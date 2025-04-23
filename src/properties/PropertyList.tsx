import React, { useState, useEffect } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { EntityForm, FormField } from "@/components/ui/entity-form";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin } from "lucide-react";
import { propertiesApi } from "@/api/entityApi";
import type { Property } from "@/models/entityModels";
import { useToast } from "@/components/ui/use-toast";

const PropertyList = () => {
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const pageSize = 10;

  const loadProperties = async () => {
    setIsLoading(true);
    try {
      const filters: Record<string, any> = {};

      if (searchTerm) {
        filters.name = searchTerm;
      }

      if (filterValue !== "all") {
        filters.status = filterValue;
      }

      const response = await propertiesApi.getProperties({
        page: currentPage,
        pageSize,
        filters,
        sortBy: "name",
        sortOrder: "asc",
      });

      setProperties(response.data);
      setTotalItems(response.count);
    } catch (error) {
      console.error("Error loading properties:", error);
      toast({
        title: "Error",
        description: "Failed to load properties. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, [currentPage, searchTerm, filterValue]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilter = (value: string) => {
    setFilterValue(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddProperty = async (data: Partial<Property>) => {
    try {
      await propertiesApi.createProperty(data);
      toast({
        title: "Success",
        description: "Property created successfully.",
      });
      loadProperties();
    } catch (error) {
      console.error("Error creating property:", error);
      toast({
        title: "Error",
        description: "Failed to create property. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditProperty = async (data: Partial<Property>) => {
    if (!data.id) return;

    try {
      await propertiesApi.updateProperty(data.id, data);
      toast({
        title: "Success",
        description: "Property updated successfully.",
      });
      loadProperties();
    } catch (error) {
      console.error("Error updating property:", error);
      toast({
        title: "Error",
        description: "Failed to update property. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProperty = async (property: Property) => {
    try {
      await propertiesApi.deleteProperty(property.id);
      toast({
        title: "Success",
        description: "Property deleted successfully.",
      });
      loadProperties();
    } catch (error) {
      console.error("Error deleting property:", error);
      toast({
        title: "Error",
        description: "Failed to delete property. Please try again.",
        variant: "destructive",
      });
    }
  };

  const columns: DataTableColumn[] = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (value, row) => (
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      header: "Address",
      accessorKey: "address",
      cell: (value, row) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>
            {value}, {row.city}, {row.state} {row.zip}
          </span>
        </div>
      ),
    },
    {
      header: "Type",
      accessorKey: "property_type",
      cell: (value) => (
        <span className="capitalize">{value.replace("_", " ")}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (value) => {
        const statusColors: Record<string, string> = {
          active: "bg-green-100 text-green-800",
          inactive: "bg-gray-100 text-gray-800",
          under_construction: "bg-yellow-100 text-yellow-800",
          sold: "bg-blue-100 text-blue-800",
        };

        return (
          <Badge
            variant="outline"
            className={statusColors[value] || "bg-gray-100 text-gray-800"}
          >
            {value.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </Badge>
        );
      },
    },
  ];

  const formFields: FormField[] = [
    {
      name: "name",
      label: "Property Name",
      type: "text",
      placeholder: "Enter property name",
      validation: { required: true },
    },
    {
      name: "property_type",
      label: "Property Type",
      type: "select",
      options: [
        { label: "Residential", value: "residential" },
        { label: "Commercial", value: "commercial" },
        { label: "Industrial", value: "industrial" },
        { label: "Land", value: "land" },
      ],
      validation: { required: true },
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Under Construction", value: "under_construction" },
        { label: "Sold", value: "sold" },
      ],
      validation: { required: true },
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      placeholder: "Enter street address",
      validation: { required: true },
    },
    {
      name: "city",
      label: "City",
      type: "text",
      placeholder: "Enter city",
      validation: { required: true },
    },
    {
      name: "state",
      label: "State/Province",
      type: "text",
      placeholder: "Enter state or province",
      validation: { required: true },
    },
    {
      name: "zip",
      label: "Zip/Postal Code",
      type: "text",
      placeholder: "Enter zip or postal code",
      validation: { required: true },
    },
    {
      name: "country",
      label: "Country",
      type: "text",
      placeholder: "Enter country",
      validation: { required: true },
    },
    {
      name: "purchase_price",
      label: "Purchase Price",
      type: "number",
      placeholder: "Enter purchase price",
    },
    {
      name: "market_value",
      label: "Market Value",
      type: "number",
      placeholder: "Enter market value",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter property description",
    },
  ];

  const renderPropertyForm = (property?: Property, onClose?: () => void) => {
    const handleSubmit = (data: Partial<Property>) => {
      if (property) {
        handleEditProperty({ ...data, id: property.id });
      } else {
        handleAddProperty(data);
      }
      if (onClose) onClose();
    };

    return (
      <EntityForm
        fields={formFields}
        onSubmit={handleSubmit}
        onCancel={onClose}
        defaultValues={property}
        submitLabel={property ? "Update Property" : "Add Property"}
      />
    );
  };

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Under Construction", value: "under_construction" },
    { label: "Sold", value: "sold" },
  ];

  return (
    <DataTable
      title="Properties"
      description="Manage your property portfolio"
      columns={columns}
      data={properties}
      isLoading={isLoading}
      onSearch={handleSearch}
      onFilter={handleFilter}
      onPageChange={handlePageChange}
      onDelete={handleDeleteProperty}
      renderForm={renderPropertyForm}
      totalItems={totalItems}
      pageSize={pageSize}
      currentPage={currentPage}
      filterOptions={filterOptions}
    />
  );
};

export default PropertyList;
