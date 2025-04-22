import React from "react";
import { motion } from "framer-motion";

const Tenants = () => {
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
          <h1 className="text-3xl font-bold tracking-tight">Tenants</h1>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Add New Tenant
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">John Smith</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Unit 101 - Sunset Heights
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Contact</p>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
              <div>
                <p className="font-medium">Move-in</p>
                <p className="text-muted-foreground">Jan 15, 2023</p>
              </div>
              <div>
                <p className="font-medium">Status</p>
                <p className="text-muted-foreground">Active</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Sarah Johnson
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Unit 205 - Marina Towers
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Contact</p>
                <p className="text-muted-foreground">+1 (555) 987-6543</p>
              </div>
              <div>
                <p className="font-medium">Move-in</p>
                <p className="text-muted-foreground">Mar 1, 2023</p>
              </div>
              <div>
                <p className="font-medium">Status</p>
                <p className="text-muted-foreground">Active</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Michael Brown
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Unit 403 - Green Valley
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Contact</p>
                <p className="text-muted-foreground">+1 (555) 456-7890</p>
              </div>
              <div>
                <p className="font-medium">Move-in</p>
                <p className="text-muted-foreground">Apr 15, 2023</p>
              </div>
              <div>
                <p className="font-medium">Status</p>
                <p className="text-muted-foreground">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Tenants;
