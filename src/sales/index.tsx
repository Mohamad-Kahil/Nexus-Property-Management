import React from "react";
import { motion } from "framer-motion";

const Sales = () => {
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
          <h1 className="text-3xl font-bold tracking-tight">Sales</h1>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Add New Sale
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Unit 502 - Marina Towers
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Sold to James Wilson on June 15, 2023
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Sale Price</p>
                <p className="text-muted-foreground">$425,000</p>
              </div>
              <div>
                <p className="font-medium">Commission</p>
                <p className="text-muted-foreground">$12,750</p>
              </div>
              <div>
                <p className="font-medium">Status</p>
                <p className="text-muted-foreground">Closed</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Unit 305 - Sunset Heights
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Sold to Maria Garcia on August 3, 2023
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Sale Price</p>
                <p className="text-muted-foreground">$380,000</p>
              </div>
              <div>
                <p className="font-medium">Commission</p>
                <p className="text-muted-foreground">$11,400</p>
              </div>
              <div>
                <p className="font-medium">Status</p>
                <p className="text-muted-foreground">Closed</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Unit 210 - Green Valley
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              In negotiation with David Chen
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">List Price</p>
                <p className="text-muted-foreground">$450,000</p>
              </div>
              <div>
                <p className="font-medium">Offer</p>
                <p className="text-muted-foreground">$435,000</p>
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

export default Sales;
