// Base entity interface with common properties
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

// Property entity
export interface Property extends BaseEntity {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  property_type: "residential" | "commercial" | "industrial" | "land";
  status: "active" | "inactive" | "under_construction" | "sold";
  purchase_date?: string;
  purchase_price?: number;
  market_value?: number;
  description?: string;
  features?: string[];
  images?: string[];
  owner_id?: string;
}

// Unit entity (part of a property)
export interface Unit extends BaseEntity {
  property_id: string;
  unit_number: string;
  floor?: number;
  size?: number; // in square feet/meters
  bedrooms?: number;
  bathrooms?: number;
  rent_amount?: number;
  status: "vacant" | "occupied" | "maintenance" | "reserved";
  features?: string[];
  images?: string[];
}

// Tenant entity
export interface Tenant extends BaseEntity {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth?: string;
  identification_type?: "passport" | "driver_license" | "id_card" | "other";
  identification_number?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  status: "active" | "inactive" | "prospective" | "former";
}

// Lease entity
export interface Lease extends BaseEntity {
  property_id: string;
  unit_id?: string;
  tenant_id: string;
  start_date: string;
  end_date: string;
  rent_amount: number;
  security_deposit: number;
  payment_frequency: "monthly" | "quarterly" | "annually";
  payment_day: number; // day of month/quarter/year when payment is due
  status: "active" | "expired" | "terminated" | "pending";
  documents?: string[];
}

// Maintenance request entity
export interface MaintenanceRequest extends BaseEntity {
  property_id: string;
  unit_id?: string;
  tenant_id?: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "emergency";
  status: "open" | "in_progress" | "completed" | "cancelled";
  category:
    | "plumbing"
    | "electrical"
    | "hvac"
    | "structural"
    | "appliance"
    | "other";
  assigned_to?: string;
  scheduled_date?: string;
  completed_date?: string;
  images?: string[];
  notes?: string;
}

// Payment entity
export interface Payment extends BaseEntity {
  lease_id: string;
  tenant_id: string;
  amount: number;
  payment_date: string;
  payment_method: "cash" | "check" | "bank_transfer" | "credit_card" | "other";
  reference_number?: string;
  status: "pending" | "completed" | "failed" | "refunded";
  notes?: string;
}

// Project entity
export interface Project extends BaseEntity {
  name: string;
  name_ar?: string;
  description?: string;
  description_ar?: string;
  property_id?: string;
  start_date: string;
  end_date?: string;
  budget?: number;
  actual_cost?: number;
  status: "planning" | "in_progress" | "completed" | "on_hold" | "cancelled";
  manager_id?: string;
  documents?: string[];
  location?: ProjectLocation;
  // Unit model properties
  has_garden?: boolean;
  has_roof?: boolean;
  has_private_pool?: boolean;
  has_parking_space?: boolean;
  total_rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  balconies?: number;
  living_rooms?: number;
  kitchens?: number;
  unit_area?: number;
  display_order?: number;
  unit_type_id?: string;
  unit_usage_id?: string;
}

// Project Location
export interface ProjectLocation {
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  coordinates?: {
    latitude?: number;
    longitude?: number;
  };
}

// Project Feature
export interface ProjectFeature extends BaseEntity {
  project_id: string;
  name: string;
  description?: string;
  status: "planned" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
}

// Project Specification
export interface ProjectSpecification extends BaseEntity {
  project_id: string;
  category: string;
  name: string;
  value: string;
  unit?: string;
  notes?: string;
}

// Project Amenity Option
export interface ProjectAmenityOption extends BaseEntity {
  name: string;
  category: string;
  icon?: string;
  description?: string;
}

// Project Amenity
export interface ProjectAmenity extends BaseEntity {
  project_id: string;
  amenity_option_id: string;
  amenity_name?: string; // Denormalized for convenience
  category?: string; // Denormalized for convenience
  status: "planned" | "in_progress" | "completed";
  notes?: string;
}
