import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Grid, List, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { projectsApi } from "@/api/entityApi";
import type { Project } from "@/models/entityModels";
import { supabase } from "@/lib/supabase";

const Projects = () => {
  const navigate = useNavigate();
  const selectedCompanyId =
    localStorage.getItem("selectedCompanyId") ||
    "00000000-0000-0000-0000-000000000001";
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 9;

  useEffect(() => {
    fetchProjects();
  }, [currentPage, searchQuery, selectedCompanyId]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      // Use the selected company ID from context, or fall back to default
      const companyId =
        selectedCompanyId || "00000000-0000-0000-0000-000000000001";

      // Store the selected company ID in localStorage for persistence
      if (selectedCompanyId) {
        localStorage.setItem("selectedCompanyId", selectedCompanyId);
      }

      // Use the projectsApi instead of direct Supabase query
      const { data, count } = await projectsApi.getProjectsByCompanyId(
        companyId,
        {
          page: currentPage,
          pageSize,
          filters: searchQuery ? { search: searchQuery } : undefined,
          sortBy: "updated_at",
          sortOrder: "desc",
        },
      );

      console.log("Fetched projects:", data);

      setProjects(data || []);
      setTotalCount(count || 0);

      if ((data?.length === 0 || !data) && currentPage > 1) {
        // If no data and we're not on the first page, go back to page 1
        setCurrentPage(1);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects. Please try again.");
      setProjects([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    navigate("/projects/new");
  };

  const handleProjectClick = (id: string) => {
    navigate(`/projects/${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "text-blue-600";
      case "in_progress":
        return "text-amber-600";
      case "completed":
        return "text-green-600";
      case "on_hold":
        return "text-purple-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const renderGridView = () => {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleProjectClick(project.id)}
          >
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                {project.name}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {project.description || "No description provided"}
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Status</p>
                <p className={`${getStatusColor(project.status || "")}`}>
                  {project.status
                    ? project.status.replace("_", " ").charAt(0).toUpperCase() +
                      project.status.replace("_", " ").slice(1)
                    : "Unknown"}
                </p>
              </div>
              <div>
                <p className="font-medium">Start Date</p>
                <p className="text-muted-foreground">
                  {new Date(project.start_date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="font-medium">Budget</p>
                <p className="text-muted-foreground">
                  ${project.budget?.toLocaleString() || "N/A"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderListView = () => {
    return (
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 font-medium">Name</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-left p-3 font-medium">Start Date</th>
              <th className="text-left p-3 font-medium">End Date</th>
              <th className="text-left p-3 font-medium">Budget</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-t hover:bg-muted/50 cursor-pointer"
                onClick={() => handleProjectClick(project.id)}
              >
                <td className="p-3">
                  {project.name || project.project_name_en || "Unnamed Project"}
                </td>
                <td className="p-3">
                  <span className={`${getStatusColor(project.status || "")}`}>
                    {project.status
                      ? project.status
                          .replace("_", " ")
                          .charAt(0)
                          .toUpperCase() +
                        project.status.replace("_", " ").slice(1)
                      : "Unknown"}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(project.start_date).toLocaleDateString()}
                </td>
                <td className="p-3">
                  {project.end_date
                    ? new Date(project.end_date).toLocaleDateString()
                    : "Ongoing"}
                </td>
                <td className="p-3">
                  ${project.budget?.toLocaleString() || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(totalCount / pageSize);
    return (
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Showing {projects.length} of {totalCount} projects
        </p>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    );
  };

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
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <Button onClick={handleAddNew} className="gap-2">
            <Plus size={16} />
            Add New Project
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <Grid size={16} />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <List size={16} />
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <p className="text-muted-foreground">No projects found</p>
            <Button onClick={handleAddNew} variant="outline" className="gap-2">
              <Plus size={16} />
              Create your first project
            </Button>
          </div>
        ) : (
          <>
            {viewMode === "grid" ? renderGridView() : renderListView()}
            {renderPagination()}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Projects;
