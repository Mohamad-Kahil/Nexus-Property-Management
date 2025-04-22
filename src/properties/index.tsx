import React from "react";
import { motion } from "framer-motion";

const Properties = () => {
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
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Add New Property
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
                <p className="font-medium">Type</p>
                <p className="text-muted-foreground">Residential</p>
              </div>
              <div>
                <p className="font-medium">Units</p>
                <p className="text-muted-foreground">120</p>
              </div>
              <div>
                <p className="font-medium">Occupancy</p>
                <p className="text-muted-foreground">85%</p>
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
              Mixed-use development with retail spaces
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Type</p>
                <p className="text-muted-foreground">Mixed-use</p>
              </div>
              <div>
                <p className="font-medium">Units</p>
                <p className="text-muted-foreground">80</p>
              </div>
              <div>
                <p className="font-medium">Occupancy</p>
                <p className="text-muted-foreground">72%</p>
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
                <p className="font-medium">Type</p>
                <p className="text-muted-foreground">Residential</p>
              </div>
              <div>
                <p className="font-medium">Units</p>
                <p className="text-muted-foreground">45</p>
              </div>
              <div>
                <p className="font-medium">Occupancy</p>
                <p className="text-muted-foreground">95%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Properties;
