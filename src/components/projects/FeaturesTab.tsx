import React, { useState, useEffect } from "react";
import { DataTable, DataTableColumn } from "@/components/ui/data-table";
import { EntityForm, FormField } from "@/components/ui/entity-form";
import { useToast } from "@/components/ui/use-toast";
import { projectFeaturesApi } from "@/api/entityApi";
import type { ProjectFeature } from "@/models/entityModels";

interface FeaturesTabProps {
  projectId: string;
}

const FeaturesTab: React.FC<FeaturesTabProps> = ({ projectId }) => {
  const { toast } = useToast();
  const [features, setFeatures] = useState<ProjectFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchFeatures();
  }, [projectId]);

  const fetchFeatures = async () => {
    try {
      setLoading(true);
      const data = await projectFeaturesApi.getFeaturesByProjectId(projectId);
      setFeatures(data);
    } catch (error) {
      console.error("Error fetching features:", error);
      toast({
        title: "Error",
        description: "Failed to load project features",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddFeature = async (data: Partial<ProjectFeature>) => {
    try {
      setSubmitting(true);
      const newFeature = {
        ...data,
        project_id: projectId,
      };
      await projectFeaturesApi.createFeature(newFeature);
      toast({
        title: "Success",
        description: "Feature added successfully",
      });
      fetchFeatures();
    } catch (error) {
      console.error("Error adding feature:", error);
      toast({
        title: "Error",
        description: "Failed to add feature",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateFeature = async (
    id: string,
    data: Partial<ProjectFeature>,
  ) => {
    try {
      setSubmitting(true);
      await projectFeaturesApi.updateFeature(id, data);
      toast({
        title: "Success",
        description: "Feature updated successfully",
      });
      fetchFeatures();
    } catch (error) {
      console.error("Error updating feature:", error);
      toast({
        title: "Error",
        description: "Failed to update feature",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteFeature = async (feature: ProjectFeature) => {
    try {
      await projectFeaturesApi.deleteFeature(feature.id);
      toast({
        title: "Success",
        description: "Feature deleted successfully",
      });
      fetchFeatures();
    } catch (error) {
      console.error("Error deleting feature:", error);
      toast({
        title: "Error",
        description: "Failed to delete feature",
        variant: "destructive",
      });
    }
  };

  const columns: DataTableColumn[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (value) => value || "-",
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
      header: "Priority",
      accessorKey: "priority",
      cell: (value) => {
        const priorityClasses = {
          low: "bg-gray-100 text-gray-800",
          medium: "bg-blue-100 text-blue-800",
          high: "bg-red-100 text-red-800",
        };
        const priority = value as keyof typeof priorityClasses;
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${priorityClasses[priority]}`}
          >
            {priority}
          </span>
        );
      },
    },
  ];

  const formFields: FormField[] = [
    {
      name: "name",
      label: "Feature Name",
      type: "text",
      placeholder: "Enter feature name",
      validation: { required: true },
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter feature description",
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
      name: "priority",
      label: "Priority",
      type: "select",
      options: [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
      ],
      validation: { required: true },
    },
  ];

  const renderForm = (feature?: ProjectFeature, onClose?: () => void) => {
    const handleSubmit = async (data: Partial<ProjectFeature>) => {
      if (feature) {
        await handleUpdateFeature(feature.id, data);
      } else {
        await handleAddFeature(data);
      }
      if (onClose) onClose();
    };

    return (
      <EntityForm
        fields={formFields}
        onSubmit={handleSubmit}
        onCancel={onClose}
        defaultValues={feature || { status: "planned", priority: "medium" }}
        submitLabel={feature ? "Update Feature" : "Add Feature"}
        isSubmitting={submitting}
      />
    );
  };

  return (
    <div className="space-y-6">
      <DataTable
        title="Project Features"
        description="Manage features for this project"
        columns={columns}
        data={features}
        isLoading={loading}
        renderForm={renderForm}
        onDelete={handleDeleteFeature}
      />
    </div>
  );
};

export default FeaturesTab;
