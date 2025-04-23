import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyList from "./PropertyList";

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
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Properties</TabsTrigger>
            <TabsTrigger value="residential">Residential</TabsTrigger>
            <TabsTrigger value="commercial">Commercial</TabsTrigger>
            <TabsTrigger value="industrial">Industrial</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <PropertyList />
          </TabsContent>
          <TabsContent value="residential">
            <PropertyList />
          </TabsContent>
          <TabsContent value="commercial">
            <PropertyList />
          </TabsContent>
          <TabsContent value="industrial">
            <PropertyList />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Properties;
