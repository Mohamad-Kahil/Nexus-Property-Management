export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      building_amenities: {
        Row: {
          amenity_option_id: string
          building_id: string
          created_at: string | null
          id: string
        }
        Insert: {
          amenity_option_id: string
          building_id: string
          created_at?: string | null
          id?: string
        }
        Update: {
          amenity_option_id?: string
          building_id?: string
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "building_amenities_amenity_option_id_fkey"
            columns: ["amenity_option_id"]
            isOneToOne: false
            referencedRelation: "building_amenities_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "building_amenities_building_id_fkey"
            columns: ["building_id"]
            isOneToOne: false
            referencedRelation: "buildings"
            referencedColumns: ["id"]
          },
        ]
      }
      building_amenities_options: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          name_ar: string
          name_en: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name_ar: string
          name_en: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name_ar?: string
          name_en?: string
        }
        Relationships: []
      }
      building_media_gallery: {
        Row: {
          alt_text: string | null
          building_id: string
          created_at: string | null
          id: string
          is_featured: boolean | null
          media_type: string | null
          media_url: string
          sort_order: number | null
        }
        Insert: {
          alt_text?: string | null
          building_id: string
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          media_type?: string | null
          media_url: string
          sort_order?: number | null
        }
        Update: {
          alt_text?: string | null
          building_id?: string
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          media_type?: string | null
          media_url?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "building_media_gallery_building_id_fkey"
            columns: ["building_id"]
            isOneToOne: false
            referencedRelation: "buildings"
            referencedColumns: ["id"]
          },
        ]
      }
      building_specifications: {
        Row: {
          building_id: string
          created_at: string | null
          id: string
          sort_order: number | null
          spec_title_ar: string
          spec_title_en: string
          spec_value_ar: string | null
          spec_value_en: string | null
        }
        Insert: {
          building_id: string
          created_at?: string | null
          id?: string
          sort_order?: number | null
          spec_title_ar: string
          spec_title_en: string
          spec_value_ar?: string | null
          spec_value_en?: string | null
        }
        Update: {
          building_id?: string
          created_at?: string | null
          id?: string
          sort_order?: number | null
          spec_title_ar?: string
          spec_title_en?: string
          spec_value_ar?: string | null
          spec_value_en?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "building_specifications_building_id_fkey"
            columns: ["building_id"]
            isOneToOne: false
            referencedRelation: "buildings"
            referencedColumns: ["id"]
          },
        ]
      }
      buildings: {
        Row: {
          building_code: string
          building_name_ar: string
          building_name_en: string
          building_usage_ar: string | null
          building_usage_en: string | null
          cluster_id: string | null
          company_id: string
          created_at: string | null
          description_ar: string | null
          description_en: string | null
          display_order: number | null
          has_rooftop: boolean | null
          id: string
          is_active: boolean | null
          is_mixed_use: boolean | null
          number_of_basements: number | null
          number_of_floors: number
          number_of_mezzanines: number | null
          phase_id: string | null
          plot_area: number | null
          plot_number: string | null
          project_id: string | null
          updated_at: string | null
          zone_id: string | null
        }
        Insert: {
          building_code: string
          building_name_ar: string
          building_name_en: string
          building_usage_ar?: string | null
          building_usage_en?: string | null
          cluster_id?: string | null
          company_id: string
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          display_order?: number | null
          has_rooftop?: boolean | null
          id?: string
          is_active?: boolean | null
          is_mixed_use?: boolean | null
          number_of_basements?: number | null
          number_of_floors: number
          number_of_mezzanines?: number | null
          phase_id?: string | null
          plot_area?: number | null
          plot_number?: string | null
          project_id?: string | null
          updated_at?: string | null
          zone_id?: string | null
        }
        Update: {
          building_code?: string
          building_name_ar?: string
          building_name_en?: string
          building_usage_ar?: string | null
          building_usage_en?: string | null
          cluster_id?: string | null
          company_id?: string
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          display_order?: number | null
          has_rooftop?: boolean | null
          id?: string
          is_active?: boolean | null
          is_mixed_use?: boolean | null
          number_of_basements?: number | null
          number_of_floors?: number
          number_of_mezzanines?: number | null
          phase_id?: string | null
          plot_area?: number | null
          plot_number?: string | null
          project_id?: string | null
          updated_at?: string | null
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buildings_cluster_id_fkey"
            columns: ["cluster_id"]
            isOneToOne: false
            referencedRelation: "project_clusters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "buildings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "buildings_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "project_phases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "buildings_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "buildings_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "project_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          country: string | null
          created_at: string
          id: string
          is_active: boolean
          language: string
          logo_url: string | null
          name_ar: string | null
          name_en: string
          slug: string | null
          timezone: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          language?: string
          logo_url?: string | null
          name_ar?: string | null
          name_en: string
          slug?: string | null
          timezone?: string
        }
        Update: {
          country?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          language?: string
          logo_url?: string | null
          name_ar?: string | null
          name_en?: string
          slug?: string | null
          timezone?: string
        }
        Relationships: []
      }
      countries: {
        Row: {
          code: string
          currency_ar: string
          currency_en: string
          id: string
          is_active: boolean
          name_ar: string
          name_en: string
          phone_code: string
        }
        Insert: {
          code: string
          currency_ar: string
          currency_en: string
          id?: string
          is_active?: boolean
          name_ar: string
          name_en: string
          phone_code: string
        }
        Update: {
          code?: string
          currency_ar?: string
          currency_en?: string
          id?: string
          is_active?: boolean
          name_ar?: string
          name_en?: string
          phone_code?: string
        }
        Relationships: []
      }
      location_types: {
        Row: {
          id: string
          is_active: boolean | null
          name_ar: string
          name_en: string
        }
        Insert: {
          id?: string
          is_active?: boolean | null
          name_ar: string
          name_en: string
        }
        Update: {
          id?: string
          is_active?: boolean | null
          name_ar?: string
          name_en?: string
        }
        Relationships: []
      }
      project_amenities: {
        Row: {
          amenity_id: string
          created_at: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          note_ar: string | null
          note_en: string | null
          project_id: string
        }
        Insert: {
          amenity_id: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          note_ar?: string | null
          note_en?: string | null
          project_id: string
        }
        Update: {
          amenity_id?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          note_ar?: string | null
          note_en?: string | null
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_amenities_amenity_id_fkey"
            columns: ["amenity_id"]
            isOneToOne: false
            referencedRelation: "project_amenities_options"
            referencedColumns: ["id"]
          },
        ]
      }
      project_amenities_options: {
        Row: {
          icon_url: string | null
          id: string
          is_active: boolean | null
          name_ar: string
          name_en: string
          sort_order: number | null
        }
        Insert: {
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          name_ar: string
          name_en: string
          sort_order?: number | null
        }
        Update: {
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          name_ar?: string
          name_en?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      project_amenity_options: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      project_clusters: {
        Row: {
          cluster_name_ar: string
          cluster_name_en: string
          created_at: string | null
          description_ar: string | null
          description_en: string | null
          id: string
          is_active: boolean | null
          phase_id: string | null
          project_id: string
          sort_order: number | null
          zone_id: string | null
        }
        Insert: {
          cluster_name_ar: string
          cluster_name_en: string
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          id?: string
          is_active?: boolean | null
          phase_id?: string | null
          project_id: string
          sort_order?: number | null
          zone_id?: string | null
        }
        Update: {
          cluster_name_ar?: string
          cluster_name_en?: string
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          id?: string
          is_active?: boolean | null
          phase_id?: string | null
          project_id?: string
          sort_order?: number | null
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_clusters_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "project_phases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_clusters_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_clusters_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "project_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      project_features: {
        Row: {
          created_at: string | null
          description_ar: string | null
          description_en: string | null
          feature_name_ar: string
          feature_name_en: string
          icon_url: string | null
          id: string
          is_active: boolean | null
          is_highlighted: boolean | null
          project_id: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          feature_name_ar: string
          feature_name_en: string
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          is_highlighted?: boolean | null
          project_id: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          feature_name_ar?: string
          feature_name_en?: string
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          is_highlighted?: boolean | null
          project_id?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      project_location_details: {
        Row: {
          address_line_ar: string | null
          address_line_en: string | null
          area: string | null
          city: string | null
          created_at: string | null
          google_place_id: string | null
          id: string
          latitude: number | null
          longitude: number | null
          map_embed_url: string | null
          nearby_json: Json | null
          project_id: string
          region: string | null
          zip_code: string | null
        }
        Insert: {
          address_line_ar?: string | null
          address_line_en?: string | null
          area?: string | null
          city?: string | null
          created_at?: string | null
          google_place_id?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          map_embed_url?: string | null
          nearby_json?: Json | null
          project_id: string
          region?: string | null
          zip_code?: string | null
        }
        Update: {
          address_line_ar?: string | null
          address_line_en?: string | null
          area?: string | null
          city?: string | null
          created_at?: string | null
          google_place_id?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          map_embed_url?: string | null
          nearby_json?: Json | null
          project_id?: string
          region?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      project_media_gallery: {
        Row: {
          created_at: string | null
          description_ar: string | null
          description_en: string | null
          file_url: string
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          media_type: string
          project_id: string
          sort_order: number | null
          thumbnail_url: string | null
          title_ar: string | null
          title_en: string | null
        }
        Insert: {
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          file_url: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          media_type: string
          project_id: string
          sort_order?: number | null
          thumbnail_url?: string | null
          title_ar?: string | null
          title_en?: string | null
        }
        Update: {
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          file_url?: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          media_type?: string
          project_id?: string
          sort_order?: number | null
          thumbnail_url?: string | null
          title_ar?: string | null
          title_en?: string | null
        }
        Relationships: []
      }
      project_phases: {
        Row: {
          created_at: string | null
          delivery_date: string | null
          description_ar: string | null
          description_en: string | null
          id: string
          is_active: boolean | null
          phase_name_ar: string
          phase_name_en: string
          project_id: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          delivery_date?: string | null
          description_ar?: string | null
          description_en?: string | null
          id?: string
          is_active?: boolean | null
          phase_name_ar: string
          phase_name_en: string
          project_id: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          delivery_date?: string | null
          description_ar?: string | null
          description_en?: string | null
          id?: string
          is_active?: boolean | null
          phase_name_ar?: string
          phase_name_en?: string
          project_id?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      project_specifications: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          project_id: string
          sort_order: number | null
          spec_name_ar: string
          spec_name_en: string
          spec_value_ar: string
          spec_value_en: string
          unit: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          project_id: string
          sort_order?: number | null
          spec_name_ar: string
          spec_name_en: string
          spec_value_ar: string
          spec_value_en: string
          unit?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          project_id?: string
          sort_order?: number | null
          spec_name_ar?: string
          spec_name_en?: string
          spec_value_ar?: string
          spec_value_en?: string
          unit?: string | null
        }
        Relationships: []
      }
      project_statuses: {
        Row: {
          id: string
          is_active: boolean | null
          name_ar: string
          name_en: string
        }
        Insert: {
          id?: string
          is_active?: boolean | null
          name_ar: string
          name_en: string
        }
        Update: {
          id?: string
          is_active?: boolean | null
          name_ar?: string
          name_en?: string
        }
        Relationships: []
      }
      project_structures: {
        Row: {
          id: string
          is_active: boolean | null
          name_ar: string
          name_en: string
        }
        Insert: {
          id?: string
          is_active?: boolean | null
          name_ar: string
          name_en: string
        }
        Update: {
          id?: string
          is_active?: boolean | null
          name_ar?: string
          name_en?: string
        }
        Relationships: []
      }
      project_types: {
        Row: {
          id: string
          is_active: boolean | null
          name_ar: string
          name_en: string
        }
        Insert: {
          id?: string
          is_active?: boolean | null
          name_ar: string
          name_en: string
        }
        Update: {
          id?: string
          is_active?: boolean | null
          name_ar?: string
          name_en?: string
        }
        Relationships: []
      }
      project_zones: {
        Row: {
          created_at: string | null
          description_ar: string | null
          description_en: string | null
          id: string
          is_active: boolean | null
          project_id: string
          sort_order: number | null
          usage_type_id: string | null
          zone_name_ar: string
          zone_name_en: string
        }
        Insert: {
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          id?: string
          is_active?: boolean | null
          project_id: string
          sort_order?: number | null
          usage_type_id?: string | null
          zone_name_ar: string
          zone_name_en: string
        }
        Update: {
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          id?: string
          is_active?: boolean | null
          project_id?: string
          sort_order?: number | null
          usage_type_id?: string | null
          zone_name_ar?: string
          zone_name_en?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_zones_usage_type_id_fkey"
            columns: ["usage_type_id"]
            isOneToOne: false
            referencedRelation: "zone_usage_types"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          actual_cost: number | null
          balconies: number | null
          bathrooms: number | null
          bedrooms: number | null
          budget: number | null
          company_id: string
          created_at: string | null
          description: string | null
          description_ar: string | null
          description_en: string | null
          developer_name_ar: string | null
          developer_name_en: string | null
          display_order: number | null
          documents: Json | null
          end_date: string | null
          expected_delivery_year: number | null
          has_buildings: boolean | null
          has_clusters: boolean | null
          has_garden: boolean | null
          has_parking_space: boolean | null
          has_phases: boolean | null
          has_private_pool: boolean | null
          has_roof: boolean | null
          has_villas: boolean | null
          has_zones: boolean | null
          id: string
          is_public: boolean | null
          kitchens: number | null
          latitude: number | null
          living_rooms: number | null
          location: Json | null
          location_type_id: string | null
          longitude: number | null
          main_contractor_ar: string | null
          main_contractor_en: string | null
          manager_id: string | null
          name: string | null
          name_ar: string | null
          plot_number: string | null
          project_logo_url: string | null
          project_main_image_url: string | null
          project_master_plan_url: string | null
          project_name_ar: string
          project_name_en: string
          project_slug: string | null
          project_structure_id: string | null
          project_theme: Json | null
          project_type_id: string | null
          property_id: string | null
          start_date: string | null
          status: string | null
          status_id: string | null
          total_rooms: number | null
          unit_area: number | null
          unit_type_id: string | null
          unit_usage_id: string | null
          updated_at: string | null
        }
        Insert: {
          actual_cost?: number | null
          balconies?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          budget?: number | null
          company_id: string
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          description_en?: string | null
          developer_name_ar?: string | null
          developer_name_en?: string | null
          display_order?: number | null
          documents?: Json | null
          end_date?: string | null
          expected_delivery_year?: number | null
          has_buildings?: boolean | null
          has_clusters?: boolean | null
          has_garden?: boolean | null
          has_parking_space?: boolean | null
          has_phases?: boolean | null
          has_private_pool?: boolean | null
          has_roof?: boolean | null
          has_villas?: boolean | null
          has_zones?: boolean | null
          id?: string
          is_public?: boolean | null
          kitchens?: number | null
          latitude?: number | null
          living_rooms?: number | null
          location?: Json | null
          location_type_id?: string | null
          longitude?: number | null
          main_contractor_ar?: string | null
          main_contractor_en?: string | null
          manager_id?: string | null
          name?: string | null
          name_ar?: string | null
          plot_number?: string | null
          project_logo_url?: string | null
          project_main_image_url?: string | null
          project_master_plan_url?: string | null
          project_name_ar: string
          project_name_en: string
          project_slug?: string | null
          project_structure_id?: string | null
          project_theme?: Json | null
          project_type_id?: string | null
          property_id?: string | null
          start_date?: string | null
          status?: string | null
          status_id?: string | null
          total_rooms?: number | null
          unit_area?: number | null
          unit_type_id?: string | null
          unit_usage_id?: string | null
          updated_at?: string | null
        }
        Update: {
          actual_cost?: number | null
          balconies?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          budget?: number | null
          company_id?: string
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          description_en?: string | null
          developer_name_ar?: string | null
          developer_name_en?: string | null
          display_order?: number | null
          documents?: Json | null
          end_date?: string | null
          expected_delivery_year?: number | null
          has_buildings?: boolean | null
          has_clusters?: boolean | null
          has_garden?: boolean | null
          has_parking_space?: boolean | null
          has_phases?: boolean | null
          has_private_pool?: boolean | null
          has_roof?: boolean | null
          has_villas?: boolean | null
          has_zones?: boolean | null
          id?: string
          is_public?: boolean | null
          kitchens?: number | null
          latitude?: number | null
          living_rooms?: number | null
          location?: Json | null
          location_type_id?: string | null
          longitude?: number | null
          main_contractor_ar?: string | null
          main_contractor_en?: string | null
          manager_id?: string | null
          name?: string | null
          name_ar?: string | null
          plot_number?: string | null
          project_logo_url?: string | null
          project_main_image_url?: string | null
          project_master_plan_url?: string | null
          project_name_ar?: string
          project_name_en?: string
          project_slug?: string | null
          project_structure_id?: string | null
          project_theme?: Json | null
          project_type_id?: string | null
          property_id?: string | null
          start_date?: string | null
          status?: string | null
          status_id?: string | null
          total_rooms?: number | null
          unit_area?: number | null
          unit_type_id?: string | null
          unit_usage_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_location_type_id_fkey"
            columns: ["location_type_id"]
            isOneToOne: false
            referencedRelation: "location_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_project_structure_id_fkey"
            columns: ["project_structure_id"]
            isOneToOne: false
            referencedRelation: "project_structures"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "project_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "project_statuses"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          availability_status: string | null
          company_id: string
          contract_id: string | null
          created_at: string | null
          currency: string | null
          end_date: string | null
          id: string
          is_for_rent: boolean | null
          is_for_sale: boolean | null
          is_managed: boolean | null
          is_public: boolean | null
          listing_type: string | null
          payment_terms: Json | null
          private_notes: string | null
          public_notes: string | null
          rent_price: number | null
          sale_price: number | null
          start_date: string | null
          unit_id: string
          updated_at: string | null
        }
        Insert: {
          availability_status?: string | null
          company_id: string
          contract_id?: string | null
          created_at?: string | null
          currency?: string | null
          end_date?: string | null
          id?: string
          is_for_rent?: boolean | null
          is_for_sale?: boolean | null
          is_managed?: boolean | null
          is_public?: boolean | null
          listing_type?: string | null
          payment_terms?: Json | null
          private_notes?: string | null
          public_notes?: string | null
          rent_price?: number | null
          sale_price?: number | null
          start_date?: string | null
          unit_id: string
          updated_at?: string | null
        }
        Update: {
          availability_status?: string | null
          company_id?: string
          contract_id?: string | null
          created_at?: string | null
          currency?: string | null
          end_date?: string | null
          id?: string
          is_for_rent?: boolean | null
          is_for_sale?: boolean | null
          is_managed?: boolean | null
          is_public?: boolean | null
          listing_type?: string | null
          payment_terms?: Json | null
          private_notes?: string | null
          public_notes?: string | null
          rent_price?: number | null
          sale_price?: number | null
          start_date?: string | null
          unit_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "properties_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          id: string
          is_active: boolean | null
          is_default: boolean | null
          key: string
          name_ar: string | null
          name_en: string | null
          permissions: Json | null
        }
        Insert: {
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          key: string
          name_ar?: string | null
          name_en?: string | null
          permissions?: Json | null
        }
        Update: {
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          key?: string
          name_ar?: string | null
          name_en?: string | null
          permissions?: Json | null
        }
        Relationships: []
      }
      unit_model_amenities: {
        Row: {
          amenity_option_id: string
          created_at: string | null
          id: string
          unit_model_id: string
        }
        Insert: {
          amenity_option_id: string
          created_at?: string | null
          id?: string
          unit_model_id: string
        }
        Update: {
          amenity_option_id?: string
          created_at?: string | null
          id?: string
          unit_model_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "unit_model_amenities_amenity_option_id_fkey"
            columns: ["amenity_option_id"]
            isOneToOne: false
            referencedRelation: "unit_model_amenities_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unit_model_amenities_unit_model_id_fkey"
            columns: ["unit_model_id"]
            isOneToOne: false
            referencedRelation: "unit_models"
            referencedColumns: ["id"]
          },
        ]
      }
      unit_model_amenities_options: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          name_ar: string
          name_en: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name_ar: string
          name_en: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name_ar?: string
          name_en?: string
        }
        Relationships: []
      }
      unit_model_features: {
        Row: {
          created_at: string | null
          feature_name_ar: string
          feature_name_en: string
          feature_value_ar: string | null
          feature_value_en: string | null
          id: string
          sort_order: number | null
          unit_model_id: string
        }
        Insert: {
          created_at?: string | null
          feature_name_ar: string
          feature_name_en: string
          feature_value_ar?: string | null
          feature_value_en?: string | null
          id?: string
          sort_order?: number | null
          unit_model_id: string
        }
        Update: {
          created_at?: string | null
          feature_name_ar?: string
          feature_name_en?: string
          feature_value_ar?: string | null
          feature_value_en?: string | null
          id?: string
          sort_order?: number | null
          unit_model_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "unit_model_features_unit_model_id_fkey"
            columns: ["unit_model_id"]
            isOneToOne: false
            referencedRelation: "unit_models"
            referencedColumns: ["id"]
          },
        ]
      }
      unit_model_media: {
        Row: {
          created_at: string | null
          id: string
          is_featured: boolean | null
          media_type: string | null
          media_url: string
          sort_order: number | null
          unit_model_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          media_type?: string | null
          media_url: string
          sort_order?: number | null
          unit_model_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          media_type?: string | null
          media_url?: string
          sort_order?: number | null
          unit_model_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "unit_model_media_unit_model_id_fkey"
            columns: ["unit_model_id"]
            isOneToOne: false
            referencedRelation: "unit_models"
            referencedColumns: ["id"]
          },
        ]
      }
      unit_model_specifications: {
        Row: {
          created_at: string | null
          id: string
          sort_order: number | null
          spec_title_ar: string
          spec_title_en: string
          spec_value_ar: string | null
          spec_value_en: string | null
          unit_model_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          sort_order?: number | null
          spec_title_ar: string
          spec_title_en: string
          spec_value_ar?: string | null
          spec_value_en?: string | null
          unit_model_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          sort_order?: number | null
          spec_title_ar?: string
          spec_title_en?: string
          spec_value_ar?: string | null
          spec_value_en?: string | null
          unit_model_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "unit_model_specifications_unit_model_id_fkey"
            columns: ["unit_model_id"]
            isOneToOne: false
            referencedRelation: "unit_models"
            referencedColumns: ["id"]
          },
        ]
      }
      unit_models: {
        Row: {
          balconies: number | null
          bathrooms: number | null
          bedrooms: number | null
          built_up_area: number | null
          company_id: string
          created_at: string | null
          description_ar: string | null
          description_en: string | null
          display_order: number | null
          has_garden: boolean | null
          has_parking_space: boolean | null
          has_private_pool: boolean | null
          has_roof: boolean | null
          id: string
          is_active: boolean | null
          kitchens: number | null
          living_rooms: number | null
          model_name_ar: string
          model_name_en: string
          project_id: string
          total_rooms: number | null
          unit_area: number | null
          unit_type_id: string | null
          unit_usage_id: string | null
          updated_at: string | null
        }
        Insert: {
          balconies?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          built_up_area?: number | null
          company_id: string
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          display_order?: number | null
          has_garden?: boolean | null
          has_parking_space?: boolean | null
          has_private_pool?: boolean | null
          has_roof?: boolean | null
          id?: string
          is_active?: boolean | null
          kitchens?: number | null
          living_rooms?: number | null
          model_name_ar: string
          model_name_en: string
          project_id: string
          total_rooms?: number | null
          unit_area?: number | null
          unit_type_id?: string | null
          unit_usage_id?: string | null
          updated_at?: string | null
        }
        Update: {
          balconies?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          built_up_area?: number | null
          company_id?: string
          created_at?: string | null
          description_ar?: string | null
          description_en?: string | null
          display_order?: number | null
          has_garden?: boolean | null
          has_parking_space?: boolean | null
          has_private_pool?: boolean | null
          has_roof?: boolean | null
          id?: string
          is_active?: boolean | null
          kitchens?: number | null
          living_rooms?: number | null
          model_name_ar?: string
          model_name_en?: string
          project_id?: string
          total_rooms?: number | null
          unit_area?: number | null
          unit_type_id?: string | null
          unit_usage_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "unit_models_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unit_models_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unit_models_unit_type_id_fkey"
            columns: ["unit_type_id"]
            isOneToOne: false
            referencedRelation: "unit_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unit_models_unit_usage_id_fkey"
            columns: ["unit_usage_id"]
            isOneToOne: false
            referencedRelation: "unit_usage"
            referencedColumns: ["id"]
          },
        ]
      }
      unit_orientation: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          name_ar: string
          name_en: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name_ar: string
          name_en: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name_ar?: string
          name_en?: string
        }
        Relationships: []
      }
      unit_type: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          name_ar: string
          name_en: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name_ar: string
          name_en: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name_ar?: string
          name_en?: string
        }
        Relationships: []
      }
      unit_usage: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          name_ar: string
          name_en: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name_ar: string
          name_en: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name_ar?: string
          name_en?: string
        }
        Relationships: []
      }
      unit_view: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          name_ar: string
          name_en: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name_ar: string
          name_en: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name_ar?: string
          name_en?: string
        }
        Relationships: []
      }
      units: {
        Row: {
          actual_unit_area: number | null
          building_id: string | null
          cluster_id: string | null
          company_id: string
          created_at: string | null
          floor_number: string | null
          garden_area: number | null
          has_garden: boolean | null
          has_terrace: boolean | null
          id: string
          is_active: boolean | null
          is_available: boolean | null
          notes: string | null
          number_of_parking: number | null
          orientation_id: string | null
          phase_id: string | null
          plot_area: number | null
          plot_number: string | null
          project_id: string
          terrace_area: number | null
          unit_code: string
          unit_main_image_url: string | null
          unit_model_id: string
          updated_at: string | null
          view_id: string | null
          zone_id: string | null
        }
        Insert: {
          actual_unit_area?: number | null
          building_id?: string | null
          cluster_id?: string | null
          company_id: string
          created_at?: string | null
          floor_number?: string | null
          garden_area?: number | null
          has_garden?: boolean | null
          has_terrace?: boolean | null
          id?: string
          is_active?: boolean | null
          is_available?: boolean | null
          notes?: string | null
          number_of_parking?: number | null
          orientation_id?: string | null
          phase_id?: string | null
          plot_area?: number | null
          plot_number?: string | null
          project_id: string
          terrace_area?: number | null
          unit_code: string
          unit_main_image_url?: string | null
          unit_model_id: string
          updated_at?: string | null
          view_id?: string | null
          zone_id?: string | null
        }
        Update: {
          actual_unit_area?: number | null
          building_id?: string | null
          cluster_id?: string | null
          company_id?: string
          created_at?: string | null
          floor_number?: string | null
          garden_area?: number | null
          has_garden?: boolean | null
          has_terrace?: boolean | null
          id?: string
          is_active?: boolean | null
          is_available?: boolean | null
          notes?: string | null
          number_of_parking?: number | null
          orientation_id?: string | null
          phase_id?: string | null
          plot_area?: number | null
          plot_number?: string | null
          project_id?: string
          terrace_area?: number | null
          unit_code?: string
          unit_main_image_url?: string | null
          unit_model_id?: string
          updated_at?: string | null
          view_id?: string | null
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "units_building_id_fkey"
            columns: ["building_id"]
            isOneToOne: false
            referencedRelation: "buildings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "units_cluster_id_fkey"
            columns: ["cluster_id"]
            isOneToOne: false
            referencedRelation: "project_clusters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "units_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "units_orientation_id_fkey"
            columns: ["orientation_id"]
            isOneToOne: false
            referencedRelation: "unit_orientation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "units_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "project_phases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "units_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "units_unit_model_id_fkey"
            columns: ["unit_model_id"]
            isOneToOne: false
            referencedRelation: "unit_models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "units_view_id_fkey"
            columns: ["view_id"]
            isOneToOne: false
            referencedRelation: "unit_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "units_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "project_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      user_types: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          key: string
          name_ar: string
          name_en: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          key: string
          name_ar: string
          name_en: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          key?: string
          name_ar?: string
          name_en?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          company_id: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          is_active: boolean
          phone: string | null
          role_id: string | null
          user_type_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_id?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          is_active?: boolean
          phone?: string | null
          role_id?: string | null
          user_type_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_id?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean
          phone?: string | null
          role_id?: string | null
          user_type_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_user_type_id_fkey"
            columns: ["user_type_id"]
            isOneToOne: false
            referencedRelation: "user_types"
            referencedColumns: ["id"]
          },
        ]
      }
      zone_usage_types: {
        Row: {
          id: string
          is_active: boolean | null
          name_ar: string
          name_en: string
        }
        Insert: {
          id?: string
          is_active?: boolean | null
          name_ar: string
          name_en: string
        }
        Update: {
          id?: string
          is_active?: boolean | null
          name_ar?: string
          name_en?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_authenticated: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
