import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Building2, Key, LineChart, Settings, Users } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";

const Home = () => {
  const navigate = useNavigate();

  // Mock translation function (would be replaced with actual i18next implementation)
  const t = (key: string) => {
    const translations: Record<string, string> = {
      "home.welcome": "Welcome to Nexus Property Management System",
      "home.description":
        "A comprehensive solution for multi-tenant property management",
      "home.quickAccess": "Quick Access",
      "home.recentActivity": "Recent Activity",
      "home.statistics": "Statistics",
      "home.properties": "Properties",
      "home.tenants": "Tenants",
      "home.finance": "Finance",
      "home.settings": "Settings",
      "home.viewAll": "View All",
      "home.noRecentActivity": "No recent activity to display",
      "home.totalProperties": "Total Properties",
      "home.occupancyRate": "Occupancy Rate",
      "home.monthlyRevenue": "Monthly Revenue",
      "home.pendingMaintenance": "Pending Maintenance",
    };
    return translations[key] || key;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const quickAccessItems = [
    {
      icon: <Building2 className="h-5 w-5" />,
      title: t("home.properties"),
      path: "/properties",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: t("home.tenants"),
      path: "/tenants",
    },
    {
      icon: <LineChart className="h-5 w-5" />,
      title: t("home.finance"),
      path: "/finance",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: t("home.settings"),
      path: "/settings",
    },
  ];

  const recentActivities = [
    { id: 1, title: "Lease #1042 signed", date: "2 hours ago", type: "lease" },
    {
      id: 2,
      title: "Maintenance request #89 completed",
      date: "5 hours ago",
      type: "maintenance",
    },
    {
      id: 3,
      title: "Payment received from Tenant #56",
      date: "Yesterday",
      type: "payment",
    },
    {
      id: 4,
      title: "New property added: Sunset Apartments",
      date: "2 days ago",
      type: "property",
    },
  ];

  const statisticsData = [
    {
      title: t("home.totalProperties"),
      value: "128",
      change: "+3",
      isPositive: true,
    },
    {
      title: t("home.occupancyRate"),
      value: "92%",
      change: "+2.5%",
      isPositive: true,
    },
    {
      title: t("home.monthlyRevenue"),
      value: "$245,000",
      change: "+5.2%",
      isPositive: true,
    },
    {
      title: t("home.pendingMaintenance"),
      value: "24",
      change: "-3",
      isPositive: true,
    },
  ];

  return (
    <MainLayout>
      <div className="p-6 bg-background">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tight">
            {t("home.welcome")}{" "}
            <span className="text-primary">Real Estate</span>
          </h1>
          <p className="text-muted-foreground mt-2">{t("home.description")}</p>
        </motion.div>

        <Tabs defaultValue="quickAccess" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="quickAccess">
              {t("home.quickAccess")}
            </TabsTrigger>
            <TabsTrigger value="recentActivity">
              {t("home.recentActivity")}
            </TabsTrigger>
            <TabsTrigger value="statistics">{t("home.statistics")}</TabsTrigger>
          </TabsList>

          <TabsContent value="quickAccess">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {quickAccessItems.map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card
                    className="h-full hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate(item.path)}
                  >
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg font-medium">
                        {item.title}
                      </CardTitle>
                      <div className="p-2 bg-primary/10 rounded-full">
                        {item.icon}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {`Quick access to ${item.title.toLowerCase()} management`}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="recentActivity">
            <Card>
              <CardHeader>
                <CardTitle>{t("home.recentActivity")}</CardTitle>
                <CardDescription>Your recent system activities</CardDescription>
              </CardHeader>
              <CardContent>
                {recentActivities.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.date}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {activity.type === "lease" && (
                            <Key className="h-4 w-4 text-blue-500" />
                          )}
                          {activity.type === "maintenance" && (
                            <Settings className="h-4 w-4 text-yellow-500" />
                          )}
                          {activity.type === "payment" && (
                            <LineChart className="h-4 w-4 text-green-500" />
                          )}
                          {activity.type === "property" && (
                            <Building2 className="h-4 w-4 text-purple-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    {t("home.noRecentActivity")}
                  </p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  {t("home.viewAll")}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="statistics">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {statisticsData.map((stat, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline justify-between">
                        <div className="text-3xl font-bold">{stat.value}</div>
                        <div
                          className={`text-sm font-medium ${stat.isPositive ? "text-green-500" : "text-red-500"}`}
                        >
                          {stat.change}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Home;
