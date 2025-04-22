import React from "react";
import { motion } from "framer-motion";

const Reports = () => {
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
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Generate Report
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Financial Reports
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Revenue, expenses, and profit analysis
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Monthly</p>
                <p className="text-muted-foreground">Available</p>
              </div>
              <div>
                <p className="font-medium">Quarterly</p>
                <p className="text-muted-foreground">Available</p>
              </div>
              <div>
                <p className="font-medium">Annual</p>
                <p className="text-muted-foreground">Available</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Occupancy Reports
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Vacancy rates and tenant turnover
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">By Property</p>
                <p className="text-muted-foreground">Available</p>
              </div>
              <div>
                <p className="font-medium">By Unit Type</p>
                <p className="text-muted-foreground">Available</p>
              </div>
              <div>
                <p className="font-medium">Trends</p>
                <p className="text-muted-foreground">Available</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Maintenance Reports
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Service requests and resolution times
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">By Property</p>
                <p className="text-muted-foreground">Available</p>
              </div>
              <div>
                <p className="font-medium">By Type</p>
                <p className="text-muted-foreground">Available</p>
              </div>
              <div>
                <p className="font-medium">Response Time</p>
                <p className="text-muted-foreground">Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Reports;
