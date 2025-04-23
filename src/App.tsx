import { Suspense, lazy, useEffect } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import MainLayout from "./layouts/MainLayout";

// Lazy load module pages
const Dashboard = lazy(() => import("./dashboard"));
const Projects = lazy(() => import("./projects"));
const EditProject = lazy(() => import("./projects/editProjects"));
const Properties = lazy(() => import("./properties"));
const Units = lazy(() => import("./units"));
const Sales = lazy(() => import("./sales"));
const Rentals = lazy(() => import("./rentals"));
const Tenants = lazy(() => import("./tenants"));
const Leases = lazy(() => import("./leases"));
const Maintenance = lazy(() => import("./maintenance"));
const Finance = lazy(() => import("./finance"));
const CRM = lazy(() => import("./crm"));
const Reports = lazy(() => import("./reports"));
const Settings = lazy(() => import("./settings"));

// Preload all module pages
const preloadModules = () => {
  import("./dashboard");
  import("./projects/projects");
  import("./properties");
  import("./units");
  import("./sales");
  import("./rentals");
  import("./tenants");
  import("./leases");
  import("./maintenance");
  import("./finance");
  import("./crm");
  import("./reports");
  import("./settings");
};

function App() {
  // Preload all modules on initial load
  useEffect(() => {
    preloadModules();
  }, []);

  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/projects"
            element={
              <MainLayout>
                <Projects />
              </MainLayout>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <MainLayout>
                <EditProject />
              </MainLayout>
            }
          />
          <Route
            path="/projects/new"
            element={
              <MainLayout>
                <EditProject />
              </MainLayout>
            }
          />
          <Route
            path="/properties"
            element={
              <MainLayout>
                <Properties />
              </MainLayout>
            }
          />
          <Route
            path="/units"
            element={
              <MainLayout>
                <Units />
              </MainLayout>
            }
          />
          <Route
            path="/sales"
            element={
              <MainLayout>
                <Sales />
              </MainLayout>
            }
          />
          <Route
            path="/rentals"
            element={
              <MainLayout>
                <Rentals />
              </MainLayout>
            }
          />
          <Route
            path="/tenants"
            element={
              <MainLayout>
                <Tenants />
              </MainLayout>
            }
          />
          <Route
            path="/leases"
            element={
              <MainLayout>
                <Leases />
              </MainLayout>
            }
          />
          <Route
            path="/maintenance"
            element={
              <MainLayout>
                <Maintenance />
              </MainLayout>
            }
          />
          <Route
            path="/finance"
            element={
              <MainLayout>
                <Finance />
              </MainLayout>
            }
          />
          <Route
            path="/crm"
            element={
              <MainLayout>
                <CRM />
              </MainLayout>
            }
          />
          <Route
            path="/reports"
            element={
              <MainLayout>
                <Reports />
              </MainLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <MainLayout>
                <Settings />
              </MainLayout>
            }
          />

          {/* Add Tempo routes before the catch-all route */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
