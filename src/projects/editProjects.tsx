import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, MapPin } from "lucide-react";
import { projectsApi } from "@/api/entityApi";
import type { Project, ProjectLocation } from "@/models/entityModels";
import { useToast } from "@/components/ui/use-toast";
import FeaturesTab from "@/components/projects/FeaturesTab";
import SpecificationsTab from "@/components/projects/SpecificationsTab";
import AmenitiesTab from "@/components/projects/AmenitiesTab";
import BasicInfoTab from "@/components/projects/BasicInfoTab";

// Using ProjectLocation from models/entityModels
interface ProjectLocationTemp {
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  coordinates?: {
    latitude?: number;
    longitude?: number;
  };
}

const EditProject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [projectLocation, setProjectLocation] = useState<ProjectLocation>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("basic-info");
  const selectedCompanyId =
    localStorage.getItem("selectedCompanyId") ||
    "00000000-0000-0000-0000-000000000001";

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (id) {
          const data = await projectsApi.getProjectById(id);
          setProject(data);

          // Initialize location data if available
          if (data.location) {
            setProjectLocation(data.location);
          }
        }
      } catch (err) {
        setError("Failed to load project data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!project) return;

    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value,
    });
  };

  const handleLocationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProjectLocation({
      ...projectLocation,
      [name]: value,
    });
  };

  const handleCoordinateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === "" ? undefined : parseFloat(value);

    setProjectLocation({
      ...projectLocation,
      coordinates: {
        ...projectLocation.coordinates,
        [name]: numValue,
      },
    });
  };

  const handleSelectChange = (field: string, value: string) => {
    if (!project) return;

    setProject({
      ...project,
      [field]: value,
    });
  };

  const handleSave = async () => {
    if (!project) return;

    setSaving(true);
    try {
      // Combine project with location data and ensure company_id is set
      const updatedProject = {
        ...project,
        location: projectLocation,
        company_id:
          localStorage.getItem("selectedCompanyId") ||
          "00000000-0000-0000-0000-000000000001",
      };

      if (id) {
        await projectsApi.updateProject(id, updatedProject);
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } else {
        // This is a new project
        const newProject = await projectsApi.createProject(updatedProject);
        toast({
          title: "Success",
          description: "Project created successfully",
        });
        // Navigate to the edit page for the new project
        navigate(`/projects/${newProject.id}`);
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading project data...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/projects")}
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              {project?.name || "Edit Project"}
            </h1>
          </div>
          <Button onClick={handleSave} className="gap-2" disabled={saving}>
            <Save size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <Tabs
          defaultValue="basic-info"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent
            value="basic-info"
            className="p-4 border rounded-md mt-4"
          >
            <BasicInfoTab
              projectId={id || "new"}
              onSave={(updatedProject) => {
                if (updatedProject) {
                  setProject(updatedProject);
                  toast({
                    title: "Success",
                    description: "Project updated successfully",
                  });
                }
              }}
            />
          </TabsContent>

          <TabsContent value="location" className="p-4 border rounded-md mt-4">
            <h2 className="text-xl font-semibold mb-4">Location Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={projectLocation?.address || ""}
                  onChange={handleLocationChange}
                  placeholder="Enter street address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={projectLocation?.city || ""}
                  onChange={handleLocationChange}
                  placeholder="Enter city"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  name="state"
                  value={projectLocation?.state || ""}
                  onChange={handleLocationChange}
                  placeholder="Enter state or province"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zip">Postal/Zip Code</Label>
                <Input
                  id="zip"
                  name="zip"
                  value={projectLocation?.zip || ""}
                  onChange={handleLocationChange}
                  placeholder="Enter postal or zip code"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={projectLocation?.country || ""}
                  onChange={handleLocationChange}
                  placeholder="Enter country"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <h3 className="text-md font-medium mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Coordinates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      name="latitude"
                      type="number"
                      step="0.000001"
                      value={projectLocation?.coordinates?.latitude || ""}
                      onChange={handleCoordinateChange}
                      placeholder="Enter latitude"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      name="longitude"
                      type="number"
                      step="0.000001"
                      value={projectLocation?.coordinates?.longitude || ""}
                      onChange={handleCoordinateChange}
                      placeholder="Enter longitude"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features" className="p-4 border rounded-md mt-4">
            <FeaturesTab projectId={id || ""} />
          </TabsContent>

          <TabsContent
            value="specifications"
            className="p-4 border rounded-md mt-4"
          >
            <SpecificationsTab projectId={id || ""} />
          </TabsContent>

          <TabsContent value="amenities" className="p-4 border rounded-md mt-4">
            <AmenitiesTab projectId={id || ""} />
          </TabsContent>

          <TabsContent value="media" className="p-4 border rounded-md mt-4">
            <h2 className="text-xl font-semibold mb-4">Media Gallery</h2>
            <p className="text-muted-foreground">
              Media upload and management will be implemented here
            </p>
          </TabsContent>

          <TabsContent value="details" className="p-4 border rounded-md mt-4">
            <h2 className="text-xl font-semibold mb-4">Project Details</h2>
            <p className="text-muted-foreground">
              Project details form will be implemented here
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default EditProject;
