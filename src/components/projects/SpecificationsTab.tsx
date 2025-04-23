import React, { useState, useEffect } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { EntityForm, FormField } from "@/components/ui/entity-form";
import { useToast } from "@/components/ui/use-toast";
import { projectSpecificationsApi } from "@/api/entityApi";
import type { ProjectSpecification } from "@/models/entityModels";

interface SpecificationsTabProps {
  projectId: string;
}

const SpecificationsTab: React.FC<SpecificationsTabProps> = ({ projectId }) => {
  const { toast } = useToast();
  const [specifications, setSpecifications] = useState<ProjectSpecification[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchSpecifications();
  }, [projectId]);

  const fetchSpecifications = async () => {
    try {
      setLoading(true);
      const data =
        await projectSpecificationsApi.getSpecificationsByProjectId(projectId);
      setSpecifications(data);
    } catch (error) {
      console.error("Error fetching specifications:", error);
      toast({
        title: "Error",
        description: "Failed to load project specifications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddSpecification = async (
    data: Partial<ProjectSpecification>,
  ) => {
    try {
      setSubmitting(true);
      const newSpecification = {
        ...data,
        project_id: projectId,
      };
      await projectSpecificationsApi.createSpecification(newSpecification);
      toast({
        title: "Success",
        description: "Specification added successfully",
      });
      fetchSpecifications();
    } catch (error) {
      console.error("Error adding specification:", error);
      toast({
        title: "Error",
        description: "Failed to add specification",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateSpecification = async (
    id: string,
    data: Partial<ProjectSpecification>,
  ) => {
    try {
      setSubmitting(true);
      await projectSpecificationsApi.updateSpecification(id, data);
      toast({
        title: "Success",
        description: "Specification updated successfully",
      });
      fetchSpecifications();
    } catch (error) {
      console.error("Error updating specification:", error);
      toast({
        title: "Error",
        description: "Failed to update specification",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSpecification = async (
    specification: ProjectSpecification,
  ) => {
    try {
      await projectSpecificationsApi.deleteSpecification(specification.id);
      toast({
        title: "Success",
        description: "Specification deleted successfully",
      });
      fetchSpecifications();
    } catch (error) {
      console.error("Error deleting specification:", error);
      toast({
        title: "Error",
        description: "Failed to delete specification",
        variant: "destructive",
      });
    }
  };

  const columns: DataTableColumn[] = [
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Value",
      accessorKey: "value",
    },
    {
      header: "Unit",
      accessorKey: "unit",
      cell: (value) => value || "-",
    },
    {
      header: "Notes",
      accessorKey: "notes",
      cell: (value) => value || "-",
    },
  ];

  const formFields: FormField[] = [
    {
      name: "category",
      label: "Category",
      type: "select",
      options: [
        { label: "Dimensions", value: "dimensions" },
        { label: "Materials", value: "materials" },
        { label: "Systems", value: "systems" },
        { label: "Finishes", value: "finishes" },
        { label: "Equipment", value: "equipment" },
        { label: "Other", value: "other" },
      ],
      validation: { required: true },
    },
    {
      name: "name",
      label: "Specification Name",
      type: "text",
      placeholder: "Enter specification name",
      validation: { required: true },
    },
    {
      name: "value",
      label: "Value",
      type: "text",
      placeholder: "Enter specification value",
      validation: { required: true },
    },
    {
      name: "unit",
      label: "Unit",
      type: "text",
      placeholder: "E.g., sq ft, kg, etc.",
    },
    {
      name: "notes",
      label: "Notes",
      type: "textarea",
      placeholder: "Additional notes about this specification",
    },
  ];

  const renderForm = (
    specification?: ProjectSpecification,
    onClose?: () => void,
  ) => {
    const handleSubmit = async (data: Partial<ProjectSpecification>) => {
      if (specification) {
        await handleUpdateSpecification(specification.id, data);
      } else {
        await handleAddSpecification(data);
      }
      if (onClose) onClose();
    };

    return (
      <EntityForm
        fields={formFields}
        onSubmit={handleSubmit}
        onCancel={onClose}
        defaultValues={specification || { category: "dimensions" }}
        submitLabel={
          specification ? "Update Specification" : "Add Specification"
        }
        isSubmitting={submitting}
      />
    );
  };

  return (
    <div className="space-y-6">
      <DataTable
        title="Project Specifications"
        description="Manage technical specifications for this project"
        columns={columns}
        data={specifications}
        isLoading={loading}
        renderForm={renderForm}
        onDelete={handleDeleteSpecification}
      />
    </div>
  );
};

export default SpecificationsTab;
