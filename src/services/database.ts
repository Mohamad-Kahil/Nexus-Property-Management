import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Generic function to fetch data from any table
export async function fetchData<T>(
  table: string,
  options?: {
    page?: number;
    pageSize?: number;
    filters?: Record<string, any>;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  },
) {
  const {
    page = 1,
    pageSize = 10,
    filters = {},
    sortBy,
    sortOrder = "asc",
  } = options || {};

  // Start building the query
  let query = supabase.from(table).select("*", { count: "exact" });

  // Apply filters
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

  // Apply sorting
  if (sortBy) {
    query = query.order(sortBy, { ascending: sortOrder === "asc" });
  }

  // Apply pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  // Execute the query
  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching data:", error);
    throw error;
  }

  return {
    data: data as T[],
    count: count || 0,
    page,
    pageSize,
  };
}

// Generic function to fetch a single record by ID
export async function fetchById<T>(table: string, id: string) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching ${table} by ID:`, error);
    throw error;
  }

  return data as T;
}

// Generic function to create a record
export async function createRecord<T>(table: string, record: Partial<T>) {
  const { data, error } = await supabase.from(table).insert(record).select();

  if (error) {
    console.error(`Error creating ${table}:`, error);
    throw error;
  }

  return data[0] as T;
}

// Generic function to update a record
export async function updateRecord<T>(
  table: string,
  id: string,
  updates: Partial<T>,
) {
  const { data, error } = await supabase
    .from(table)
    .update(updates)
    .eq("id", id)
    .select();

  if (error) {
    console.error(`Error updating ${table}:`, error);
    throw error;
  }

  return data[0] as T;
}

// Generic function to delete a record
export async function deleteRecord(table: string, id: string) {
  const { error } = await supabase.from(table).delete().eq("id", id);

  if (error) {
    console.error(`Error deleting ${table}:`, error);
    throw error;
  }

  return true;
}
