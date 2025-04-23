import React, { useState, useEffect } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { EntityForm, FormField } from "@/components/ui/entity-form";
import { useToast } from "@/components/ui/use-toast";
import { projectAmenitiesApi, projectAmenityOptionsApi } from "@/api/entityApi";
import type {
  ProjectAmenity,
  ProjectAmenityOption,
} from "@/models/entityModels";

interface AmenitiesTabProps {
  projectId: string;
}

const AmenitiesTab: React.FC<AmenitiesTabProps> = ({ projectId }) => {
  const { toast } = useToast();
  const [amenities, setAmenities] = useState<ProjectAmenity[]>([]);
  const [amenityOptions, setAmenityOptions] = useState<ProjectAmenityOption[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAmenities();
    fetchAmenityOptions();
  }, [projectId]);

  const fetchAmenities = async () => {
    try {
      setLoading(true);
      const data = await projectAmenitiesApi.getAmenitiesByProjectId(projectId);
      setAmenities(data);
    } catch (error) {
      console.error("Error fetching amenities:", error);
      toast({
        title: "Error",
        description: "Failed to load project amenities",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAmenityOptions = async () => {
    try {
      setOptionsLoading(true);
      const data = await projectAmenityOptionsApi.getAmenityOptions();
      setAmenityOptions(data);
    } catch (error) {
      console.error("Error fetching amenity options:", error);
      toast({
        title: "Error",
        description: "Failed to load amenity options",
        variant: "destructive",
      });
    } finally {
      setOptionsLoading(false);
    }
  };

  const handleAddAmenity = async (data: Partial<ProjectAmenity>) => {
    try {
      setSubmitting(true);

      // Find the selected amenity option to get its name and category
      const selectedOption = amenityOptions.find(
        (option) => option.id === data.amenity_option_id,
      );

      const newAmenity = {
        ...data,
        project_id: projectId,
        amenity_name: selectedOption?.name,
        category: selectedOption?.category,
      };

      await projectAmenitiesApi.createAmenity(newAmenity);
      toast({
        title: "Success",
        description: "Amenity added successfully",
      });
      fetchAmenities();
    } catch (error) {
      console.error("Error adding amenity:", error);
      toast({
        title: "Error",
        description: "Failed to add amenity",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateAmenity = async (
    id: string,
    data: Partial<ProjectAmenity>,
  ) => {
    try {
      setSubmitting(true);

      // If amenity option changed, update the name and category
      let updatedData = { ...data };
      if (data.amenity_option_id) {
        const selectedOption = amenityOptions.find(
          (option) => option.id === data.amenity_option_id,
        );
        if (selectedOption) {
          updatedData.amenity_name = selectedOption.name || "Unnamed Amenity";
          updatedData.category = selectedOption.category || "uncategorized";
        }
      }

      await projectAmenitiesApi.updateAmenity(id, updatedData);
      toast({
        title: "Success",
        description: "Amenity updated successfully",
      });
      fetchAmenities();
    } catch (error) {
      console.error("Error updating amenity:", error);
      toast({
        title: "Error",
        description: "Failed to update amenity",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAmenity = async (amenity: ProjectAmenity) => {
    try {
      await projectAmenitiesApi.deleteAmenity(amenity.id);
      toast({
        title: "Success",
        description: "Amenity deleted successfully",
      });
      fetchAmenities();
    } catch (error) {
      console.error("Error deleting amenity:", error);
      toast({
        title: "Error",
        description: "Failed to delete amenity",
        variant: "destructive",
      });
    }
  };

  const columns: DataTableColumn[] = [
    {
      header: "Amenity",
      accessorKey: "amenity_name",
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: (value) => {
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
            {value}
          </span>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (value) => {
        const statusClasses = {
          planned: "bg-blue-100 text-blue-800",
          in_progress: "bg-yellow-100 text-yellow-800",
          completed: "bg-green-100 text-green-800",
        };
        const status = value as keyof typeof statusClasses;
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}
          >
            {status.replace("_", " ")}
          </span>
        );
      },
    },
    {
      header: "Notes",
      accessorKey: "notes",
      cell: (value) => value || "-",
    },
  ];

  // Group amenity options by category for better organization in the form
  const groupedOptions = amenityOptions.reduce<
    Record<string, ProjectAmenityOption[]>
  >((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {});

  // Create select options with category grouping
  const amenitySelectOptions = Object.entries(groupedOptions).flatMap(
    ([category, options]) => [
      { label: `--- ${category.toUpperCase()} ---`, value: "", disabled: true },
      ...options.map((option) => ({
        label: option.name,
        value: option.id,
      })),
    ],
  );

  const formFields: FormField[] = [
    {
      name: "amenity_option_id",
      label: "Amenity",
      type: "select",
      options: amenitySelectOptions,
      validation: { required: true },
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Planned", value: "planned" },
        { label: "In Progress", value: "in_progress" },
        { label: "Completed", value: "completed" },
      ],
      validation: { required: true },
    },
    {
      name: "notes",
      label: "Notes",
      type: "textarea",
      placeholder: "Additional notes about this amenity",
    },
  ];

  const renderForm = (amenity?: ProjectAmenity, onClose?: () => void) => {
    const handleSubmit = async (data: Partial<ProjectAmenity>) => {
      if (amenity) {
        await handleUpdateAmenity(amenity.id, data);
      } else {
        await handleAddAmenity(data);
      }
      if (onClose) onClose();
    };

    return (
      <EntityForm
        fields={formFields}
        onSubmit={handleSubmit}
        onCancel={onClose}
        defaultValues={amenity || { status: "planned" }}
        submitLabel={amenity ? "Update Amenity" : "Add Amenity"}
        isSubmitting={submitting}
      />
    );
  };

  if (optionsLoading) {
    return <div className="p-6 bg-white">Loading amenity options...</div>;
  }

  if (amenityOptions.length === 0) {
    return (
      <div className="p-6 bg-white">
        No amenity options available. Please add some amenity options first.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DataTable
        title="Project Amenities"
        description="Manage amenities for this project"
        columns={columns}
        data={amenities}
        isLoading={loading}
        renderForm={renderForm}
        onDelete={handleDeleteAmenity}
      />
    </div>
  );
};

export default AmenitiesTab;
