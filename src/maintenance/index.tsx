import React from "react";
import { motion } from "framer-motion";

const Maintenance = () => {
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
          <h1 className="text-3xl font-bold tracking-tight">Maintenance</h1>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Add New Request
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Request #89
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Plumbing issue in Unit 105, Sunset Heights
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Reported</p>
                <p className="text-muted-foreground">Jun 10, 2023</p>
              </div>
              <div>
                <p className="font-medium">Priority</p>
                <p className="text-muted-foreground">High</p>
              </div>
              <div>
                <p className="font-medium">Status</p>
                <p className="text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Request #90
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              AC repair in Unit 210, Marina Towers
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Reported</p>
                <p className="text-muted-foreground">Jun 12, 2023</p>
              </div>
              <div>
                <p className="font-medium">Priority</p>
                <p className="text-muted-foreground">Medium</p>
              </div>
              <div>
                <p className="font-medium">Status</p>
                <p className="text-muted-foreground">In Progress</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Request #91
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Electrical issue in Unit 305, Green Valley
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Reported</p>
                <p className="text-muted-foreground">Jun 15, 2023</p>
              </div>
              <div>
                <p className="font-medium">Priority</p>
                <p className="text-muted-foreground">High</p>
              </div>
              <div>
                <p className="font-medium">Status</p>
                <p className="text-muted-foreground">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Maintenance;
