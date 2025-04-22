import React from "react";
import { motion } from "framer-motion";

const Units = () => {
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
          <h1 className="text-3xl font-bold tracking-tight">Units</h1>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Add New Unit
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">Unit 101</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Sunset Heights - 2 Bedroom Apartment
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Status</p>
                <p className="text-muted-foreground">Occupied</p>
              </div>
              <div>
                <p className="font-medium">Rent</p>
                <p className="text-muted-foreground">$1,200/mo</p>
              </div>
              <div>
                <p className="font-medium">Size</p>
                <p className="text-muted-foreground">850 sq ft</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">Unit 205</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Marina Towers - 1 Bedroom Studio
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Status</p>
                <p className="text-muted-foreground">Vacant</p>
              </div>
              <div>
                <p className="font-medium">Rent</p>
                <p className="text-muted-foreground">$950/mo</p>
              </div>
              <div>
                <p className="font-medium">Size</p>
                <p className="text-muted-foreground">650 sq ft</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">Unit 310</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Green Valley - 3 Bedroom Townhouse
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Status</p>
                <p className="text-muted-foreground">Occupied</p>
              </div>
              <div>
                <p className="font-medium">Rent</p>
                <p className="text-muted-foreground">$1,800/mo</p>
              </div>
              <div>
                <p className="font-medium">Size</p>
                <p className="text-muted-foreground">1,200 sq ft</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Units;
