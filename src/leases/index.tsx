import React from "react";
import { motion } from "framer-motion";

const Leases = () => {
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
          <h1 className="text-3xl font-bold tracking-tight">Leases</h1>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Add New Lease
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Lease #1042
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              John Smith - Unit 101, Sunset Heights
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Term</p>
                <p className="text-muted-foreground">12 months</p>
              </div>
              <div>
                <p className="font-medium">Start Date</p>
                <p className="text-muted-foreground">Jan 15, 2023</p>
              </div>
              <div>
                <p className="font-medium">End Date</p>
                <p className="text-muted-foreground">Jan 14, 2024</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Lease #1043
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Sarah Johnson - Unit 205, Marina Towers
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Term</p>
                <p className="text-muted-foreground">12 months</p>
              </div>
              <div>
                <p className="font-medium">Start Date</p>
                <p className="text-muted-foreground">Mar 1, 2023</p>
              </div>
              <div>
                <p className="font-medium">End Date</p>
                <p className="text-muted-foreground">Feb 28, 2024</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Lease #1044
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Michael Brown - Unit 403, Green Valley
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Term</p>
                <p className="text-muted-foreground">6 months</p>
              </div>
              <div>
                <p className="font-medium">Start Date</p>
                <p className="text-muted-foreground">Apr 15, 2023</p>
              </div>
              <div>
                <p className="font-medium">End Date</p>
                <p className="text-muted-foreground">Oct 14, 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Leases;
