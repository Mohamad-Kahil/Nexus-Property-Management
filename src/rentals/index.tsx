import React from "react";
import { motion } from "framer-motion";

const Rentals = () => {
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
          <h1 className="text-3xl font-bold tracking-tight">Rentals</h1>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Add New Rental
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Unit 101 - Sunset Heights
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Rented to John Smith since Jan 15, 2023
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Monthly Rent</p>
                <p className="text-muted-foreground">$1,200</p>
              </div>
              <div>
                <p className="font-medium">Lease End</p>
                <p className="text-muted-foreground">Jan 14, 2024</p>
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
                Unit 205 - Marina Towers
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Rented to Sarah Johnson since Mar 1, 2023
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Monthly Rent</p>
                <p className="text-muted-foreground">$950</p>
              </div>
              <div>
                <p className="font-medium">Lease End</p>
                <p className="text-muted-foreground">Feb 28, 2024</p>
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
                Unit 310 - Green Valley
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Available for rent
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Monthly Rent</p>
                <p className="text-muted-foreground">$1,800</p>
              </div>
              <div>
                <p className="font-medium">Available</p>
                <p className="text-muted-foreground">Immediately</p>
              </div>
              <div>
                <p className="font-medium">Status</p>
                <p className="text-muted-foreground">Vacant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Rentals;
