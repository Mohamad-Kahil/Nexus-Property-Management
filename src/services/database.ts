// Database service using Supabase
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Generic type for query options
type QueryOptions = {
  page?: number;
  pageSize?: number;
  filters?: Record<string, any>;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

// Empty mock database for fallback
const mockDatabase: Record<string, any[]> = {
  properties: [],
  units: [],
  tenants: [],
  leases: [],
  maintenance_requests: [],
  payments: [],
  projects: [],
  project_features: [],
  project_specifications: [],
  project_amenities: [],
  project_amenity_options: [],
};

// Helper function to generate a UUID
function generateId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

// Helper function to apply filters
function applyFilters<T>(data: T[], filters?: Record<string, any>): T[] {
  if (!filters) return data;

  return data.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === undefined || value === null || value === "") return true;

      const itemValue = (item as any)[key];

      // Handle string search (case insensitive partial match)
      if (typeof itemValue === "string" && typeof value === "string") {
        return itemValue.toLowerCase().includes(value.toLowerCase());
      }

      // Handle exact match
      return itemValue === value;
    });
  });
}

// Helper function to sort data
function sortData<T>(
  data: T[],
  sortBy?: string,
  sortOrder: "asc" | "desc" = "asc",
): T[] {
  if (!sortBy) return data;

  return [...data].sort((a, b) => {
    const aValue = (a as any)[sortBy];
    const bValue = (b as any)[sortBy];

    if (aValue === bValue) return 0;

    const comparison = aValue < bValue ? -1 : 1;
    return sortOrder === "asc" ? comparison : -comparison;
  });
}

// Helper function to paginate data
function paginateData<T>(data: T[], page = 1, pageSize = 10): T[] {
  const startIndex = (page - 1) * pageSize;
  return data.slice(startIndex, startIndex + pageSize);
}

// Fetch data with optional filtering, sorting, and pagination
export async function fetchData<T>(
  entityType: string,
  options?: QueryOptions,
): Promise<{ data: T[]; count: number; page: number; pageSize: number }> {
  const { page = 1, pageSize = 10, filters, sortBy, sortOrder } = options || {};

  try {
    // Build the Supabase query
    let query = supabase.from(entityType).select("*", { count: "exact" });

    // Apply filters if provided
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          if (typeof value === "string") {
            // For string values, use ilike for case-insensitive partial matching
            query = query.ilike(key, `%${value}%`);
          } else {
            // For other values, use exact matching
            query = query.eq(key, value);
          }
        }
      });
    }

    // Apply sorting if provided
    if (sortBy) {
      query = query.order(sortBy, { ascending: sortOrder === "asc" });
    } else {
      // Default sort by updated_at if no sort is specified
      query = query.order("updated_at", { ascending: false });
    }

    // Apply pagination
    if (pageSize) {
      const startIndex = (page - 1) * pageSize;
      query = query.range(startIndex, startIndex + pageSize - 1);
    }

    // Execute the query
    const { data, error, count } = await query;

    if (error) {
      console.error(`Error fetching ${entityType}:`, error);
      throw error;
    }

    return {
      data: (data || []) as T[],
      count: count || 0,
      page,
      pageSize,
    };
  } catch (error) {
    console.error(`Error in fetchData for ${entityType}:`, error);
    throw error;
  }
}

// Fetch a single entity by ID
export async function fetchById<T>(entityType: string, id: string): Promise<T> {
  try {
    const { data, error } = await supabase
      .from(entityType)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Error fetching ${entityType} with ID ${id}:`, error);
      throw error;
    }

    if (!data) {
      throw new Error(`Entity with ID ${id} not found in ${entityType}`);
    }

    return data as T;
  } catch (error) {
    console.error(`Error in fetchById for ${entityType}:`, error);
    throw error;
  }
}

// Create a new record
export async function createRecord<T>(
  entityType: string,
  data: Partial<T>,
): Promise<T> {
  try {
    const now = new Date().toISOString();
    const recordData = {
      created_at: now,
      updated_at: now,
      ...data,
    };

    const { data: newRecord, error } = await supabase
      .from(entityType)
      .insert(recordData)
      .select()
      .single();

    if (error) {
      console.error(`Error creating record in ${entityType}:`, error);
      throw error;
    }

    return newRecord as T;
  } catch (error) {
    console.error(`Error in createRecord for ${entityType}:`, error);
    throw error;
  }
}

// Update an existing record
export async function updateRecord<T>(
  entityType: string,
  id: string,
  updates: Partial<T>,
): Promise<T> {
  try {
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const { data: updatedRecord, error } = await supabase
      .from(entityType)
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating record in ${entityType}:`, error);
      throw error;
    }

    if (!updatedRecord) {
      throw new Error(`Entity with ID ${id} not found in ${entityType}`);
    }

    return updatedRecord as T;
  } catch (error) {
    console.error(`Error in updateRecord for ${entityType}:`, error);
    throw error;
  }
}

// Delete a record
export async function deleteRecord(
  entityType: string,
  id: string,
): Promise<boolean> {
  try {
    const { error } = await supabase.from(entityType).delete().eq("id", id);

    if (error) {
      console.error(`Error deleting record from ${entityType}:`, error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error(`Error in deleteRecord for ${entityType}:`, error);
    throw error;
  }
}
