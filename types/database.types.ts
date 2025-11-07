// This file will contain your Supabase database types
// Generate these types from your Supabase project using:
// npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.types.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      departments: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
        }
      }
      roles: {
        Row: {
          id: string
          name: string
          department_id: string | null
          description: string | null
          is_critical: boolean
          min_coverage_depth: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          department_id?: string | null
          description?: string | null
          is_critical?: boolean
          min_coverage_depth?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          department_id?: string | null
          description?: string | null
          is_critical?: boolean
          min_coverage_depth?: number
          created_at?: string
        }
      }
      role_levels: {
        Row: {
          id: string
          role_id: string
          level_name: string
          sort_order: number
          rubric: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          role_id: string
          level_name: string
          sort_order: number
          rubric?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          role_id?: string
          level_name?: string
          sort_order?: number
          rubric?: Json | null
          created_at?: string
        }
      }
      employees: {
        Row: {
          id: string
          full_name: string
          email: string | null
          phone: string | null
          hired_on: string | null
          status: string
          primary_role_id: string | null
          primary_role_level_id: string | null
          availability: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email?: string | null
          phone?: string | null
          hired_on?: string | null
          status?: string
          primary_role_id?: string | null
          primary_role_level_id?: string | null
          availability?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string | null
          phone?: string | null
          hired_on?: string | null
          status?: string
          primary_role_id?: string | null
          primary_role_level_id?: string | null
          availability?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      pay_bands: {
        Row: {
          id: string
          role_level_id: string | null
          min_rate: number
          mid_rate: number
          max_rate: number
          effective_from: string
          effective_to: string | null
          created_at: string
        }
        Insert: {
          id?: string
          role_level_id?: string | null
          min_rate: number
          mid_rate: number
          max_rate: number
          effective_from: string
          effective_to?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          role_level_id?: string | null
          min_rate?: number
          mid_rate?: number
          max_rate?: number
          effective_from?: string
          effective_to?: string | null
          created_at?: string
        }
      }
      employee_compensation: {
        Row: {
          id: string
          employee_id: string
          role_level_id: string | null
          current_rate: number
          effective_from: string
          effective_to: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          employee_id: string
          role_level_id?: string | null
          current_rate: number
          effective_from: string
          effective_to?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          role_level_id?: string | null
          current_rate?: number
          effective_from?: string
          effective_to?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string | null
          description?: string | null
          created_at?: string
        }
      }
      employee_skills: {
        Row: {
          id: string
          employee_id: string
          skill_id: string
          role_level_id: string | null
          proficiency: number | null
          verified_on: string | null
          verified_by: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          employee_id: string
          skill_id: string
          role_level_id?: string | null
          proficiency?: number | null
          verified_on?: string | null
          verified_by?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          skill_id?: string
          role_level_id?: string | null
          proficiency?: number | null
          verified_on?: string | null
          verified_by?: string | null
          status?: string
          created_at?: string
        }
      }
      certifications: {
        Row: {
          id: string
          name: string
          skill_id: string | null
          validity_months: number | null
          issuer: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          skill_id?: string | null
          validity_months?: number | null
          issuer?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          skill_id?: string | null
          validity_months?: number | null
          issuer?: string | null
          description?: string | null
          created_at?: string
        }
      }
      employee_certifications: {
        Row: {
          id: string
          employee_id: string
          certification_id: string | null
          issued_on: string
          expires_on: string | null
          file_url: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          employee_id: string
          certification_id?: string | null
          issued_on: string
          expires_on?: string | null
          file_url?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          certification_id?: string | null
          issued_on?: string
          expires_on?: string | null
          file_url?: string | null
          status?: string
          created_at?: string
        }
      }
    }
    Views: {
      // Add your views here
    }
    Functions: {
      // Add your functions here
    }
    Enums: {
      // Add your enums here
    }
  }
}
