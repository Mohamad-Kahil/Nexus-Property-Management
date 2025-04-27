import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Layers, Grid3X3, PenTool } from "lucide-react";

const BuildingDesigner = () => {
  return (
    <div className="h-full w-full bg-background p-6">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Building Designer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="layout" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="layout">
                <Grid3X3 className="mr-2 h-4 w-4" />
                Layout
              </TabsTrigger>
              <TabsTrigger value="floors">
                <Layers className="mr-2 h-4 w-4" />
                Floors
              </TabsTrigger>
              <TabsTrigger value="design">
                <PenTool className="mr-2 h-4 w-4" />
                Design
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="layout"
              className="h-[500px] border rounded-md p-4"
            >
              <div className="flex items-center justify-center h-full bg-muted/20">
                <p className="text-muted-foreground">
                  Building layout designer will be implemented here
                </p>
              </div>
            </TabsContent>

            <TabsContent
              value="floors"
              className="h-[500px] border rounded-md p-4"
            >
              <div className="flex items-center justify-center h-full bg-muted/20">
                <p className="text-muted-foreground">
                  Floor plan designer will be implemented here
                </p>
              </div>
            </TabsContent>

            <TabsContent
              value="design"
              className="h-[500px] border rounded-md p-4"
            >
              <div className="flex items-center justify-center h-full bg-muted/20">
                <p className="text-muted-foreground">
                  Interior design tools will be implemented here
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuildingDesigner;
