import React from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
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
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">
                Total Properties
              </h3>
            </div>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">
                Vacant Units
              </h3>
            </div>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">-3 from last month</p>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">
                Active Tenants
              </h3>
            </div>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">
                Maintenance Requests
              </h3>
            </div>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <p className="font-medium">New tenant signed lease</p>
                <p className="text-sm text-muted-foreground">
                  John Doe signed a lease for Unit 302
                </p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <p className="font-medium">Maintenance request completed</p>
                <p className="text-sm text-muted-foreground">
                  Fixed plumbing issue in Unit 105
                </p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <p className="font-medium">Rent payment received</p>
                <p className="text-sm text-muted-foreground">
                  Sarah Johnson paid $1,200 for Unit 201
                </p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
