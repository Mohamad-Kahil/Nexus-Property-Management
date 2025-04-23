import {
  fetchData,
  fetchById,
  createRecord,
  updateRecord,
  deleteRecord,
} from "../services/database";

import type {
  Property,
  Unit,
  Tenant,
  Lease,
  MaintenanceRequest,
  Payment,
  Project,
} from "../models/entityModels";

// Generic type for query options
type QueryOptions = {
  page?: number;
  pageSize?: number;
  filters?: Record<string, any>;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

// Properties API
export const propertiesApi = {
  getProperties: (options?: QueryOptions) =>
    fetchData<Property>("properties", options),
  getPropertyById: (id: string) => fetchById<Property>("properties", id),
  createProperty: (property: Partial<Property>) =>
    createRecord<Property>("properties", property),
  updateProperty: (id: string, updates: Partial<Property>) =>
    updateRecord<Property>("properties", id, updates),
  deleteProperty: (id: string) => deleteRecord("properties", id),
};

// Units API
export const unitsApi = {
  getUnits: (options?: QueryOptions) => fetchData<Unit>("units", options),
  getUnitById: (id: string) => fetchById<Unit>("units", id),
  getUnitsByPropertyId: (propertyId: string, options?: QueryOptions) => {
    return fetchData<Unit>("units", {
      ...options,
      filters: { ...options?.filters, property_id: propertyId },
    });
  },
  createUnit: (unit: Partial<Unit>) => createRecord<Unit>("units", unit),
  updateUnit: (id: string, updates: Partial<Unit>) =>
    updateRecord<Unit>("units", id, updates),
  deleteUnit: (id: string) => deleteRecord("units", id),
};

// Tenants API
export const tenantsApi = {
  getTenants: (options?: QueryOptions) => fetchData<Tenant>("tenants", options),
  getTenantById: (id: string) => fetchById<Tenant>("tenants", id),
  createTenant: (tenant: Partial<Tenant>) =>
    createRecord<Tenant>("tenants", tenant),
  updateTenant: (id: string, updates: Partial<Tenant>) =>
    updateRecord<Tenant>("tenants", id, updates),
  deleteTenant: (id: string) => deleteRecord("tenants", id),
};

// Leases API
export const leasesApi = {
  getLeases: (options?: QueryOptions) => fetchData<Lease>("leases", options),
  getLeaseById: (id: string) => fetchById<Lease>("leases", id),
  getLeasesByPropertyId: (propertyId: string, options?: QueryOptions) => {
    return fetchData<Lease>("leases", {
      ...options,
      filters: { ...options?.filters, property_id: propertyId },
    });
  },
  getLeasesByTenantId: (tenantId: string, options?: QueryOptions) => {
    return fetchData<Lease>("leases", {
      ...options,
      filters: { ...options?.filters, tenant_id: tenantId },
    });
  },
  createLease: (lease: Partial<Lease>) => createRecord<Lease>("leases", lease),
  updateLease: (id: string, updates: Partial<Lease>) =>
    updateRecord<Lease>("leases", id, updates),
  deleteLease: (id: string) => deleteRecord("leases", id),
};

// Maintenance Requests API
export const maintenanceApi = {
  getMaintenanceRequests: (options?: QueryOptions) =>
    fetchData<MaintenanceRequest>("maintenance_requests", options),
  getMaintenanceRequestById: (id: string) =>
    fetchById<MaintenanceRequest>("maintenance_requests", id),
  getMaintenanceRequestsByPropertyId: (
    propertyId: string,
    options?: QueryOptions,
  ) => {
    return fetchData<MaintenanceRequest>("maintenance_requests", {
      ...options,
      filters: { ...options?.filters, property_id: propertyId },
    });
  },
  createMaintenanceRequest: (request: Partial<MaintenanceRequest>) =>
    createRecord<MaintenanceRequest>("maintenance_requests", request),
  updateMaintenanceRequest: (
    id: string,
    updates: Partial<MaintenanceRequest>,
  ) => updateRecord<MaintenanceRequest>("maintenance_requests", id, updates),
  deleteMaintenanceRequest: (id: string) =>
    deleteRecord("maintenance_requests", id),
};

// Payments API
export const paymentsApi = {
  getPayments: (options?: QueryOptions) =>
    fetchData<Payment>("payments", options),
  getPaymentById: (id: string) => fetchById<Payment>("payments", id),
  getPaymentsByLeaseId: (leaseId: string, options?: QueryOptions) => {
    return fetchData<Payment>("payments", {
      ...options,
      filters: { ...options?.filters, lease_id: leaseId },
    });
  },
  getPaymentsByTenantId: (tenantId: string, options?: QueryOptions) => {
    return fetchData<Payment>("payments", {
      ...options,
      filters: { ...options?.filters, tenant_id: tenantId },
    });
  },
  createPayment: (payment: Partial<Payment>) =>
    createRecord<Payment>("payments", payment),
  updatePayment: (id: string, updates: Partial<Payment>) =>
    updateRecord<Payment>("payments", id, updates),
  deletePayment: (id: string) => deleteRecord("payments", id),
};

// Projects API
export const projectsApi = {
  getProjects: (options?: QueryOptions) =>
    fetchData<Project>("projects", options),
  getProjectById: (id: string) => fetchById<Project>("projects", id),
  getProjectsByPropertyId: (propertyId: string, options?: QueryOptions) => {
    return fetchData<Project>("projects", {
      ...options,
      filters: { ...options?.filters, property_id: propertyId },
    });
  },
  createProject: (project: Partial<Project>) =>
    createRecord<Project>("projects", project),
  updateProject: (id: string, updates: Partial<Project>) =>
    updateRecord<Project>("projects", id, updates),
  deleteProject: (id: string) => deleteRecord("projects", id),
};
