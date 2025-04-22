import React from "react";
import { motion } from "framer-motion";

const CRM = () => {
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
          <h1 className="text-3xl font-bold tracking-tight">CRM</h1>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Add Contact
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Prospective Tenants
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Leads interested in renting properties
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Total</p>
                <p className="text-muted-foreground">24</p>
              </div>
              <div>
                <p className="font-medium">New This Week</p>
                <p className="text-muted-foreground">5</p>
              </div>
              <div>
                <p className="font-medium">Conversion</p>
                <p className="text-muted-foreground">18%</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Property Inquiries
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Questions about available properties
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Total</p>
                <p className="text-muted-foreground">36</p>
              </div>
              <div>
                <p className="font-medium">New This Week</p>
                <p className="text-muted-foreground">8</p>
              </div>
              <div>
                <p className="font-medium">Response Time</p>
                <p className="text-muted-foreground">4 hours</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-lg font-medium">
                Vendor Contacts
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Service providers and contractors
            </p>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-medium">Total</p>
                <p className="text-muted-foreground">18</p>
              </div>
              <div>
                <p className="font-medium">Active</p>
                <p className="text-muted-foreground">12</p>
              </div>
              <div>
                <p className="font-medium">New This Month</p>
                <p className="text-muted-foreground">2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CRM;
