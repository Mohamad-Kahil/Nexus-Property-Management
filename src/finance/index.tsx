import React from "react";
import { motion } from "framer-motion";

const Finance = () => {
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
          <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Add Transaction
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">
                Monthly Revenue
              </h3>
            </div>
            <div className="text-2xl font-bold">$245,000</div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Expenses</h3>
            </div>
            <div className="text-2xl font-bold">$78,500</div>
            <p className="text-xs text-muted-foreground">
              -2.1% from last month
            </p>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Net Income</h3>
            </div>
            <div className="text-2xl font-bold">$166,500</div>
            <p className="text-xs text-muted-foreground">
              +8.4% from last month
            </p>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">
                Outstanding Payments
              </h3>
            </div>
            <div className="text-2xl font-bold">$12,800</div>
            <p className="text-xs text-muted-foreground">
              3 tenants with overdue rent
            </p>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-green-100 p-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <div>
                <p className="font-medium">Rent Payment Received</p>
                <p className="text-sm text-muted-foreground">
                  Sarah Johnson - Unit 205, Marina Towers
                </p>
                <p className="text-xs text-muted-foreground">
                  $950 - Jun 1, 2023
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-red-100 p-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
              </div>
              <div>
                <p className="font-medium">Maintenance Expense</p>
                <p className="text-sm text-muted-foreground">
                  Plumbing repair - Unit 105, Sunset Heights
                </p>
                <p className="text-xs text-muted-foreground">
                  $350 - Jun 12, 2023
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-green-100 p-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <div>
                <p className="font-medium">Rent Payment Received</p>
                <p className="text-sm text-muted-foreground">
                  John Smith - Unit 101, Sunset Heights
                </p>
                <p className="text-xs text-muted-foreground">
                  $1,200 - Jun 1, 2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Finance;
