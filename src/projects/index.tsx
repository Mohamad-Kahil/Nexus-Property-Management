import React from "react";
import { motion } from "framer-motion";

const Projects = () => {
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
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Add New Project
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Sunset Heights
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Residential complex with 120 units
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Status</p>
                <p className="text-muted-foreground">In Progress</p>
              </div>
              <div>
                <p className="font-medium">Completion</p>
                <p className="text-muted-foreground">75%</p>
              </div>
              <div>
                <p className="font-medium">Budget</p>
                <p className="text-muted-foreground">$12.5M</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Marina Towers
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Mixed-use development with 80 units
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Status</p>
                <p className="text-muted-foreground">Planning</p>
              </div>
              <div>
                <p className="font-medium">Completion</p>
                <p className="text-muted-foreground">10%</p>
              </div>
              <div>
                <p className="font-medium">Budget</p>
                <p className="text-muted-foreground">$18.2M</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Green Valley
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Eco-friendly residential community
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Status</p>
                <p className="text-muted-foreground">Completed</p>
              </div>
              <div>
                <p className="font-medium">Completion</p>
                <p className="text-muted-foreground">100%</p>
              </div>
              <div>
                <p className="font-medium">Budget</p>
                <p className="text-muted-foreground">$9.8M</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
