import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { projectsApi } from "@/api/entityApi";
import type { Project } from "@/models/entityModels";

interface BasicInfoTabProps {
  projectId: string;
  onSave?: (project: Project) => void;
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({ projectId, onSave }) => {
  const { toast } = useToast();
  const [project, setProject] = useState<Partial<Project>>({
    name: "",
    description: "",
    status: "planning",
    start_date: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (projectId && projectId !== "new") {
      fetchProject();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const data = await projectsApi.getProjectById(projectId);
      setProject(data);
    } catch (error) {
      console.error("Error fetching project:", error);
      toast({
        title: "Error",
        description: "Failed to load project data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === "" ? undefined : parseFloat(value);
    setProject((prev) => ({ ...prev, [name]: numValue }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setProject((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      let savedProject;

      if (projectId && projectId !== "new") {
        savedProject = await projectsApi.updateProject(projectId, project);
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } else {
        savedProject = await projectsApi.createProject(project);
        toast({
          title: "Success",
          description: "Project created successfully",
        });
      }

      if (onSave) {
        onSave(savedProject);
      }
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading project data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name_en">Name (English)</Label>
          <Input
            id="name_en"
            name="name"
            value={project.name || ""}
            onChange={handleInputChange}
            placeholder="Enter project name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name_ar">Name (Arabic)</Label>
          <Input
            id="name_ar"
            name="name_ar"
            value={project.name_ar || ""}
            onChange={handleInputChange}
            placeholder="Enter project name in Arabic"
            dir="rtl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description_en">Description (English)</Label>
          <Textarea
            id="description_en"
            name="description"
            value={project.description || ""}
            onChange={handleInputChange}
            placeholder="Enter project description"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description_ar">Description (Arabic)</Label>
          <Textarea
            id="description_ar"
            name="description_ar"
            value={project.description_ar || ""}
            onChange={handleInputChange}
            placeholder="Enter project description in Arabic"
            rows={4}
            dir="rtl"
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="has_garden"
              checked={project.has_garden || false}
              onCheckedChange={(checked) =>
                handleCheckboxChange("has_garden", checked as boolean)
              }
            />
            <Label htmlFor="has_garden">Has Garden</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="has_roof"
              checked={project.has_roof || false}
              onCheckedChange={(checked) =>
                handleCheckboxChange("has_roof", checked as boolean)
              }
            />
            <Label htmlFor="has_roof">Has Roof</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="has_private_pool"
              checked={project.has_private_pool || false}
              onCheckedChange={(checked) =>
                handleCheckboxChange("has_private_pool", checked as boolean)
              }
            />
            <Label htmlFor="has_private_pool">Has Private Pool</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="has_parking_space"
              checked={project.has_parking_space || false}
              onCheckedChange={(checked) =>
                handleCheckboxChange("has_parking_space", checked as boolean)
              }
            />
            <Label htmlFor="has_parking_space">Has Parking Space</Label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Label htmlFor="total_rooms">Total Rooms</Label>
          <Input
            id="total_rooms"
            name="total_rooms"
            type="number"
            min="0"
            value={project.total_rooms || ""}
            onChange={handleNumberChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            name="bedrooms"
            type="number"
            min="0"
            value={project.bedrooms || ""}
            onChange={handleNumberChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            name="bathrooms"
            type="number"
            min="0"
            value={project.bathrooms || ""}
            onChange={handleNumberChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="balconies">Balconies</Label>
          <Input
            id="balconies"
            name="balconies"
            type="number"
            min="0"
            value={project.balconies || ""}
            onChange={handleNumberChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="living_rooms">Living Rooms</Label>
          <Input
            id="living_rooms"
            name="living_rooms"
            type="number"
            min="0"
            value={project.living_rooms || ""}
            onChange={handleNumberChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="kitchens">Kitchens</Label>
          <Input
            id="kitchens"
            name="kitchens"
            type="number"
            min="0"
            value={project.kitchens || ""}
            onChange={handleNumberChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="unit_area">Unit Area (m²)</Label>
          <Input
            id="unit_area"
            name="unit_area"
            type="number"
            min="0"
            step="0.01"
            value={project.unit_area || ""}
            onChange={handleNumberChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="display_order">Display Order</Label>
          <Input
            id="display_order"
            name="display_order"
            type="number"
            min="0"
            value={project.display_order || ""}
            onChange={handleNumberChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="unit_type">Unit Type</Label>
          <Select
            value={project.unit_type_id || ""}
            onValueChange={(value) => handleSelectChange("unit_type_id", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select unit type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="penthouse">Penthouse</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="unit_usage">Unit Usage</Label>
          <Select
            value={project.unit_usage_id || ""}
            onValueChange={(value) =>
              handleSelectChange("unit_usage_id", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select unit usage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="mixed">Mixed Use</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default BasicInfoTab;
