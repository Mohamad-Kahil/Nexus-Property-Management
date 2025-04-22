import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  BarChart,
  Building,
  Calendar,
  DollarSign,
  Home,
  LineChart,
  PieChart,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

interface KpiCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
}

const KpiCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendDirection = "neutral",
}: KpiCardProps) => {
  const trendColor = {
    up: "text-green-500",
    down: "text-red-500",
    neutral: "text-gray-500",
  };

  return (
    <Card className="bg-background">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && (
          <div
            className={`flex items-center mt-2 text-xs ${trendColor[trendDirection]}`}
          >
            {trendDirection === "up"
              ? "↑"
              : trendDirection === "down"
                ? "↓"
                : "→"}{" "}
            {trend}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface DataTableProps {
  title: string;
  description?: string;
  columns: string[];
  data: any[];
}

const DataTable = ({
  title,
  description,
  columns,
  data = [],
}: DataTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <Card className="w-full bg-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search..."
              className="w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Object.values(row).map((cell: any, cellIndex) => (
                    <TableCell key={cellIndex}>
                      {typeof cell === "object" ? cell : cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-4"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {filteredData.length > itemsPerPage && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  // Mock data for KPIs
  const kpiData = [
    {
      title: "Total Properties",
      value: "124",
      description: "Across all projects",
      icon: <Building className="h-4 w-4" />,
      trend: "12% increase",
      trendDirection: "up" as const,
    },
    {
      title: "Occupancy Rate",
      value: "87%",
      description: "Current occupancy",
      icon: <Home className="h-4 w-4" />,
      trend: "3% increase",
      trendDirection: "up" as const,
    },
    {
      title: "Active Tenants",
      value: "342",
      description: "Total active leases",
      icon: <Users className="h-4 w-4" />,
      trend: "5% increase",
      trendDirection: "up" as const,
    },
    {
      title: "Monthly Revenue",
      value: "$284,500",
      description: "Current month",
      icon: <DollarSign className="h-4 w-4" />,
      trend: "8% increase",
      trendDirection: "up" as const,
    },
  ];

  // Mock data for upcoming expirations
  const expirationData = [
    {
      tenant: (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=tenant1" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>John Doe</div>
        </div>
      ),
      unit: "A-101",
      property: "Skyline Towers",
      expiryDate: "2023-12-15",
      status: (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
          Expiring Soon
        </Badge>
      ),
    },
    {
      tenant: (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=tenant2" />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
          <div>Maria Smith</div>
        </div>
      ),
      unit: "B-205",
      property: "Harbor View",
      expiryDate: "2023-12-20",
      status: (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
          Expiring Soon
        </Badge>
      ),
    },
    {
      tenant: (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=tenant3" />
            <AvatarFallback>RJ</AvatarFallback>
          </Avatar>
          <div>Robert Johnson</div>
        </div>
      ),
      unit: "C-310",
      property: "Parkside Residences",
      expiryDate: "2023-12-28",
      status: (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
          Expiring Soon
        </Badge>
      ),
    },
    {
      tenant: (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=tenant4" />
            <AvatarFallback>EW</AvatarFallback>
          </Avatar>
          <div>Emily Wilson</div>
        </div>
      ),
      unit: "D-412",
      property: "Skyline Towers",
      expiryDate: "2024-01-05",
      status: (
        <Badge variant="outline" className="bg-red-100 text-red-800">
          Renewal Pending
        </Badge>
      ),
    },
    {
      tenant: (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=tenant5" />
            <AvatarFallback>DT</AvatarFallback>
          </Avatar>
          <div>David Thompson</div>
        </div>
      ),
      unit: "A-105",
      property: "Harbor View",
      expiryDate: "2024-01-10",
      status: (
        <Badge variant="outline" className="bg-green-100 text-green-800">
          Renewed
        </Badge>
      ),
    },
    {
      tenant: (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=tenant6" />
            <AvatarFallback>SL</AvatarFallback>
          </Avatar>
          <div>Sarah Lee</div>
        </div>
      ),
      unit: "B-210",
      property: "Parkside Residences",
      expiryDate: "2024-01-15",
      status: (
        <Badge variant="outline" className="bg-red-100 text-red-800">
          Renewal Pending
        </Badge>
      ),
    },
  ];

  // Mock data for recent activities
  const activityData = [
    {
      activity: "New Tenant Registration",
      user: (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" />
            <AvatarFallback>JW</AvatarFallback>
          </Avatar>
          <div>Jessica White</div>
        </div>
      ),
      timestamp: "2023-12-01 09:15 AM",
      details: "Registered new tenant for unit A-201",
    },
    {
      activity: "Maintenance Request",
      user: (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user2" />
            <AvatarFallback>MB</AvatarFallback>
          </Avatar>
          <div>Michael Brown</div>
        </div>
      ),
      timestamp: "2023-12-01 10:30 AM",
      details: "Plumbing issue reported in unit C-105",
    },
    {
      activity: "Lease Renewal",
      user: (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user3" />
            <AvatarFallback>AT</AvatarFallback>
          </Avatar>
          <div>Amanda Taylor</div>
        </div>
      ),
      timestamp: "2023-12-01 11:45 AM",
      details: "Lease renewed for unit B-308 for 12 months",
    },
    {
      activity: "Payment Received",
      user: (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user4" />
            <AvatarFallback>KJ</AvatarFallback>
          </Avatar>
          <div>Kevin Johnson</div>
        </div>
      ),
      timestamp: "2023-12-01 01:20 PM",
      details: "Rent payment received for unit D-210",
    },
    {
      activity: "Maintenance Completed",
      user: (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user5" />
            <AvatarFallback>RM</AvatarFallback>
          </Avatar>
          <div>Ryan Miller</div>
        </div>
      ),
      timestamp: "2023-12-01 03:10 PM",
      details: "AC repair completed in unit A-110",
    },
  ];

  return (
    <div className="w-full h-full bg-background p-6 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Calendar className="h-4 w-4" />
            Today
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {kpiData.map((kpi, index) => (
              <KpiCard
                key={index}
                title={kpi.title}
                value={kpi.value}
                description={kpi.description}
                icon={kpi.icon}
                trend={kpi.trend}
                trendDirection={kpi.trendDirection}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <Card className="bg-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Occupancy by Property
                </CardTitle>
                <CardDescription>Current month occupancy rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">
                    Occupancy Chart Placeholder
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Revenue Trends
                </CardTitle>
                <CardDescription>Last 6 months revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">
                    Revenue Chart Placeholder
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <DataTable
              title="Upcoming Lease Expirations"
              description="Leases expiring in the next 30 days"
              columns={["Tenant", "Unit", "Property", "Expiry Date", "Status"]}
              data={expirationData}
            />
          </motion.div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Property Distribution
                </CardTitle>
                <CardDescription>By property type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">
                    Property Distribution Chart Placeholder
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Tenant Demographics
                </CardTitle>
                <CardDescription>
                  Age and occupation distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">
                    Demographics Chart Placeholder
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Year-over-Year Comparison
                </CardTitle>
                <CardDescription>Revenue and occupancy trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">
                    YoY Comparison Chart Placeholder
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-background">
            <CardHeader>
              <CardTitle>System Notifications</CardTitle>
              <CardDescription>Recent alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                    !
                  </div>
                  <div>
                    <h3 className="font-medium">Maintenance Alert</h3>
                    <p className="text-sm text-muted-foreground">
                      Scheduled maintenance for Building A on December 15, 2023
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    i
                  </div>
                  <div>
                    <h3 className="font-medium">System Update</h3>
                    <p className="text-sm text-muted-foreground">
                      New features have been added to the property management
                      module
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-red-50 border border-red-200">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    !
                  </div>
                  <div>
                    <h3 className="font-medium">Payment Overdue</h3>
                    <p className="text-sm text-muted-foreground">
                      3 tenants have overdue payments that require attention
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <DataTable
            title="Recent Activities"
            description="System activities in the last 24 hours"
            columns={["Activity", "User", "Timestamp", "Details"]}
            data={activityData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
