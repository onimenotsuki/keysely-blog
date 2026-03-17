export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      amenities: {
        Row: {
          created_at: string
          description: string | null
          icon_url: string | null
          id: string
          name: string
          slug: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          name: string
          slug?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          name?: string
          slug?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          created_at: string
          distinct_id: string
          event_name: string
          id: string
          properties: Json
        }
        Insert: {
          created_at?: string
          distinct_id: string
          event_name: string
          id?: string
          properties?: Json
        }
        Update: {
          created_at?: string
          distinct_id?: string
          event_name?: string
          id?: string
          properties?: Json
        }
        Relationships: []
      }
      booking_add_ons: {
        Row: {
          booking_id: string
          hours: number
          id: string
          quantity: number
          space_add_on_id: string
        }
        Insert: {
          booking_id: string
          hours: number
          id?: string
          quantity: number
          space_add_on_id: string
        }
        Update: {
          booking_id?: string
          hours?: number
          id?: string
          quantity?: number
          space_add_on_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_add_ons_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_add_ons_space_add_on_id_fkey"
            columns: ["space_add_on_id"]
            isOneToOne: false
            referencedRelation: "space_add_ons"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_payments: {
        Row: {
          amount_total_cents: number
          booking_id: string
          commission_discount_cents: number | null
          commission_discount_reason: string | null
          created_at: string
          currency: string
          host_amount_cents: number | null
          id: string
          platform_commission_cents: number | null
          refund_status: string | null
          refunded_amount_cents: number | null
          status: string
          stripe_charge_id: string | null
          stripe_payment_intent_id: string
          stripe_promotion_code_id: string | null
          stripe_refund_id: string | null
          updated_at: string
        }
        Insert: {
          amount_total_cents: number
          booking_id: string
          commission_discount_cents?: number | null
          commission_discount_reason?: string | null
          created_at?: string
          currency?: string
          host_amount_cents?: number | null
          id?: string
          platform_commission_cents?: number | null
          refund_status?: string | null
          refunded_amount_cents?: number | null
          status: string
          stripe_charge_id?: string | null
          stripe_payment_intent_id: string
          stripe_promotion_code_id?: string | null
          stripe_refund_id?: string | null
          updated_at?: string
        }
        Update: {
          amount_total_cents?: number
          booking_id?: string
          commission_discount_cents?: number | null
          commission_discount_reason?: string | null
          created_at?: string
          currency?: string
          host_amount_cents?: number | null
          id?: string
          platform_commission_cents?: number | null
          refund_status?: string | null
          refunded_amount_cents?: number | null
          status?: string
          stripe_charge_id?: string | null
          stripe_payment_intent_id?: string
          stripe_promotion_code_id?: string | null
          stripe_refund_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_policies: {
        Row: {
          cancellation_rules: Json | null
          created_at: string
          description: string | null
          id: string
          name: string
          policy_type: Database["public"]["Enums"]["booking_policy_type"]
          reservation_config: Json | null
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          cancellation_rules?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          policy_type: Database["public"]["Enums"]["booking_policy_type"]
          reservation_config?: Json | null
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          cancellation_rules?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          policy_type?: Database["public"]["Enums"]["booking_policy_type"]
          reservation_config?: Json | null
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_type: string
          cancellation_reason: string | null
          cancelled_at: string | null
          cancelled_by_profile_id: string | null
          cancelled_by_role: string | null
          created_at: string
          discount_percentage: number | null
          ends_at: string | null
          final_price_paid: number | null
          id: string
          original_price: number | null
          profile_id: string
          promo_code_used: string | null
          rate_type: Database["public"]["Enums"]["booking_rate_type"] | null
          readable_id: string
          space_id: string
          starts_at: string
          status: Database["public"]["Enums"]["booking_status"]
          updated_at: string
        }
        Insert: {
          booking_type: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          cancelled_by_profile_id?: string | null
          cancelled_by_role?: string | null
          created_at?: string
          discount_percentage?: number | null
          ends_at?: string | null
          final_price_paid?: number | null
          id?: string
          original_price?: number | null
          profile_id: string
          promo_code_used?: string | null
          rate_type?: Database["public"]["Enums"]["booking_rate_type"] | null
          readable_id: string
          space_id: string
          starts_at: string
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
        }
        Update: {
          booking_type?: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          cancelled_by_profile_id?: string | null
          cancelled_by_role?: string | null
          created_at?: string
          discount_percentage?: number | null
          ends_at?: string | null
          final_price_paid?: number | null
          id?: string
          original_price?: number | null
          profile_id?: string
          promo_code_used?: string | null
          rate_type?: Database["public"]["Enums"]["booking_rate_type"] | null
          readable_id?: string
          space_id?: string
          starts_at?: string
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_cancelled_by_profile_id_fkey"
            columns: ["cancelled_by_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_tiers: {
        Row: {
          created_at: string
          currency: string
          id: string
          max_amount_cents: number | null
          min_amount_cents: number
          percentage: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string
          id?: string
          max_amount_cents?: number | null
          min_amount_cents: number
          percentage: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          id?: string
          max_amount_cents?: number | null
          min_amount_cents?: number
          percentage?: number
          updated_at?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          booking_id: string | null
          created_at: string
          guest_id: string
          id: string
          space_id: string
          updated_at: string
        }
        Insert: {
          booking_id?: string | null
          created_at?: string
          guest_id: string
          id?: string
          space_id: string
          updated_at?: string
        }
        Update: {
          booking_id?: string | null
          created_at?: string
          guest_id?: string
          id?: string
          space_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      cookie_consent_events: {
        Row: {
          consent_analytical: boolean
          consent_client_id: string
          consent_essential: boolean
          consent_expires_at: string
          consent_functional: boolean
          consent_given_at: string
          consent_marketing: boolean
          consent_version: string
          created_at: string
          decision_type: string
          id: number
          user_agent: string | null
        }
        Insert: {
          consent_analytical: boolean
          consent_client_id: string
          consent_essential?: boolean
          consent_expires_at: string
          consent_functional: boolean
          consent_given_at?: string
          consent_marketing: boolean
          consent_version: string
          created_at?: string
          decision_type: string
          id?: number
          user_agent?: string | null
        }
        Update: {
          consent_analytical?: boolean
          consent_client_id?: string
          consent_essential?: boolean
          consent_expires_at?: string
          consent_functional?: boolean
          consent_given_at?: string
          consent_marketing?: boolean
          consent_version?: string
          created_at?: string
          decision_type?: string
          id?: number
          user_agent?: string | null
        }
        Relationships: []
      }
      didit_sessions: {
        Row: {
          created_at: string
          decision: Json | null
          metadata: Json | null
          session_id: string
          status: string
          updated_at: string
          vendor_data: string | null
          webhook_type: string
          workflow_id: string | null
        }
        Insert: {
          created_at?: string
          decision?: Json | null
          metadata?: Json | null
          session_id: string
          status: string
          updated_at?: string
          vendor_data?: string | null
          webhook_type: string
          workflow_id?: string | null
        }
        Update: {
          created_at?: string
          decision?: Json | null
          metadata?: Json | null
          session_id?: string
          status?: string
          updated_at?: string
          vendor_data?: string | null
          webhook_type?: string
          workflow_id?: string | null
        }
        Relationships: []
      }
      fiscal_data: {
        Row: {
          cfdi_usage_code: Database["public"]["Enums"]["cfdi_usage"] | null
          country_code: string | null
          created_at: string
          exterior_number: string | null
          fiscal_postal_code: string
          id: string
          interior_number: string | null
          municipality: string | null
          neighborhood: string | null
          profile_id: string
          rfc: string
          state: string | null
          street: string | null
          tax_business_name: string
          tax_regime_code: Database["public"]["Enums"]["tax_regime"]
          updated_at: string
        }
        Insert: {
          cfdi_usage_code?: Database["public"]["Enums"]["cfdi_usage"] | null
          country_code?: string | null
          created_at?: string
          exterior_number?: string | null
          fiscal_postal_code: string
          id?: string
          interior_number?: string | null
          municipality?: string | null
          neighborhood?: string | null
          profile_id: string
          rfc: string
          state?: string | null
          street?: string | null
          tax_business_name: string
          tax_regime_code: Database["public"]["Enums"]["tax_regime"]
          updated_at?: string
        }
        Update: {
          cfdi_usage_code?: Database["public"]["Enums"]["cfdi_usage"] | null
          country_code?: string | null
          created_at?: string
          exterior_number?: string | null
          fiscal_postal_code?: string
          id?: string
          interior_number?: string | null
          municipality?: string | null
          neighborhood?: string | null
          profile_id?: string
          rfc?: string
          state?: string | null
          street?: string | null
          tax_business_name?: string
          tax_regime_code?: Database["public"]["Enums"]["tax_regime"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fiscal_data_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      host_bank_accounts: {
        Row: {
          account_holder_name: string
          bank_code: Database["public"]["Enums"]["mexican_bank_code"]
          clabe_encrypted: string
          clabe_iv: string | null
          clabe_last4: string
          created_at: string
          id: string
          profile_id: string
          rfc: string | null
          updated_at: string
        }
        Insert: {
          account_holder_name: string
          bank_code?: Database["public"]["Enums"]["mexican_bank_code"]
          clabe_encrypted: string
          clabe_iv?: string | null
          clabe_last4: string
          created_at?: string
          id?: string
          profile_id: string
          rfc?: string | null
          updated_at?: string
        }
        Update: {
          account_holder_name?: string
          bank_code?: Database["public"]["Enums"]["mexican_bank_code"]
          clabe_encrypted?: string
          clabe_iv?: string | null
          clabe_last4?: string
          created_at?: string
          id?: string
          profile_id?: string
          rfc?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "host_bank_accounts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      host_referral_commission_discounts: {
        Row: {
          booking_id: string
          booking_payment_id: string
          commission_discount_cents: number
          created_at: string
          id: string
          referee_host_id: string
        }
        Insert: {
          booking_id: string
          booking_payment_id: string
          commission_discount_cents: number
          created_at?: string
          id?: string
          referee_host_id: string
        }
        Update: {
          booking_id?: string
          booking_payment_id?: string
          commission_discount_cents?: number
          created_at?: string
          id?: string
          referee_host_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "host_referral_commission_discounts_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "host_referral_commission_discounts_booking_payment_id_fkey"
            columns: ["booking_payment_id"]
            isOneToOne: false
            referencedRelation: "booking_payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "host_referral_commission_discounts_referee_host_id_fkey"
            columns: ["referee_host_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hosts: {
        Row: {
          created_at: string
          host_since: string
          host_verified: boolean
          id: string
          profile_id: string
          stripe_connect_account_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          host_since?: string
          host_verified?: boolean
          id?: string
          profile_id: string
          stripe_connect_account_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          host_since?: string
          host_verified?: boolean
          id?: string
          profile_id?: string
          stripe_connect_account_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hosts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      identity_documents: {
        Row: {
          attachments: string[] | null
          created_at: string
          id: string
          identity_type: string | null
          is_verified: boolean | null
        }
        Insert: {
          attachments?: string[] | null
          created_at?: string
          id?: string
          identity_type?: string | null
          is_verified?: boolean | null
        }
        Update: {
          attachments?: string[] | null
          created_at?: string
          id?: string
          identity_type?: string | null
          is_verified?: boolean | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          body: string
          conversation_id: string
          created_at: string
          id: string
          sender_id: string
        }
        Insert: {
          body: string
          conversation_id: string
          created_at?: string
          id?: string
          sender_id: string
        }
        Update: {
          body?: string
          conversation_id?: string
          created_at?: string
          id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          channel: Database["public"]["Enums"]["notification_channel"]
          enabled: boolean
          id: string
          notification_type: Database["public"]["Enums"]["notification_type"]
          profile_id: string
        }
        Insert: {
          channel: Database["public"]["Enums"]["notification_channel"]
          enabled?: boolean
          id?: string
          notification_type: Database["public"]["Enums"]["notification_type"]
          profile_id: string
        }
        Update: {
          channel?: Database["public"]["Enums"]["notification_channel"]
          enabled?: boolean
          id?: string
          notification_type?: Database["public"]["Enums"]["notification_type"]
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          data: Json
          id: string
          profile_id: string
          read_at: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
        }
        Insert: {
          body?: string | null
          created_at?: string
          data?: Json
          id?: string
          profile_id: string
          read_at?: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
        }
        Update: {
          body?: string | null
          created_at?: string
          data?: Json
          id?: string
          profile_id?: string
          read_at?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
        }
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      occupations: {
        Row: {
          id: number
          occupation_name: string
        }
        Insert: {
          id?: number
          occupation_name: string
        }
        Update: {
          id?: number
          occupation_name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          first_name: string
          full_name: string | null
          id: string
          identity_document_id: string | null
          last_name: string
          location: Json
          occupation_id: number | null
          phone_number: string | null
          space_type_preferences: number[] | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          first_name: string
          full_name?: string | null
          id: string
          identity_document_id?: string | null
          last_name: string
          location?: Json
          occupation_id?: number | null
          phone_number?: string | null
          space_type_preferences?: number[] | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          first_name?: string
          full_name?: string | null
          id?: string
          identity_document_id?: string | null
          last_name?: string
          location?: Json
          occupation_id?: number | null
          phone_number?: string | null
          space_type_preferences?: number[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_identity_document_id_fkey"
            columns: ["identity_document_id"]
            isOneToOne: false
            referencedRelation: "identity_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_identity_document_id_fkey"
            columns: ["identity_document_id"]
            isOneToOne: false
            referencedRelation: "identity_documents_verification"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_occupation_id_fkey"
            columns: ["occupation_id"]
            isOneToOne: false
            referencedRelation: "occupations"
            referencedColumns: ["id"]
          },
        ]
      }
      promotion_code_assignments: {
        Row: {
          active: boolean
          code: string
          created_at: string
          id: string
          max_redemptions: number | null
          minimum_amount_cents: number | null
          minimum_amount_currency: string | null
          percent_off: number
          profile_id: string
          redeem_by: string | null
          stripe_coupon_id: string
          stripe_promotion_code_id: string
          times_redeemed: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          id?: string
          max_redemptions?: number | null
          minimum_amount_cents?: number | null
          minimum_amount_currency?: string | null
          percent_off: number
          profile_id: string
          redeem_by?: string | null
          stripe_coupon_id: string
          stripe_promotion_code_id: string
          times_redeemed?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          id?: string
          max_redemptions?: number | null
          minimum_amount_cents?: number | null
          minimum_amount_currency?: string | null
          percent_off?: number
          profile_id?: string
          redeem_by?: string | null
          stripe_coupon_id?: string
          stripe_promotion_code_id?: string
          times_redeemed?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "promotion_code_assignments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_credit_balances: {
        Row: {
          balance_cents: number
          currency: string
          profile_id: string
          updated_at: string
        }
        Insert: {
          balance_cents?: number
          currency?: string
          profile_id: string
          updated_at?: string
        }
        Update: {
          balance_cents?: number
          currency?: string
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_credit_balances_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_redemptions: {
        Row: {
          booking_id: string
          created_at: string
          credit_granted_cents: number
          currency: string
          id: string
          referrer_id: string
          stripe_promotion_code_id: string
        }
        Insert: {
          booking_id: string
          created_at?: string
          credit_granted_cents: number
          currency: string
          id?: string
          referrer_id: string
          stripe_promotion_code_id: string
        }
        Update: {
          booking_id?: string
          created_at?: string
          credit_granted_cents?: number
          currency?: string
          id?: string
          referrer_id?: string
          stripe_promotion_code_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_redemptions_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_redemptions_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          referee_id: string
          referrer_id: string
          reward_type:
            | Database["public"]["Enums"]["referral_reward_type"]
            | null
          status: Database["public"]["Enums"]["referral_status"]
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          referee_id: string
          referrer_id: string
          reward_type?:
            | Database["public"]["Enums"]["referral_reward_type"]
            | null
          status?: Database["public"]["Enums"]["referral_status"]
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          referee_id?: string
          referrer_id?: string
          reward_type?:
            | Database["public"]["Enums"]["referral_reward_type"]
            | null
          status?: Database["public"]["Enums"]["referral_status"]
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referee_id_fkey"
            columns: ["referee_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      review_tags: {
        Row: {
          id: string
          review_id: string
          tag_label: string
        }
        Insert: {
          id?: string
          review_id: string
          tag_label: string
        }
        Update: {
          id?: string
          review_id?: string
          tag_label?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_tags_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          body: string
          booking_id: string
          created_at: string
          guest_id: string
          id: string
          rating: number
          reviewer_id: string
          space_id: string
          target_type: Database["public"]["Enums"]["review_target_type"]
        }
        Insert: {
          body: string
          booking_id: string
          created_at?: string
          guest_id: string
          id?: string
          rating: number
          reviewer_id: string
          space_id: string
          target_type: Database["public"]["Enums"]["review_target_type"]
        }
        Update: {
          body?: string
          booking_id?: string
          created_at?: string
          guest_id?: string
          id?: string
          rating?: number
          reviewer_id?: string
          space_id?: string
          target_type?: Database["public"]["Enums"]["review_target_type"]
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      space_add_ons: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          price_per_hour: number
          quantity_available: number
          sort_order: number | null
          space_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price_per_hour: number
          quantity_available?: number
          sort_order?: number | null
          space_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price_per_hour?: number
          quantity_available?: number
          sort_order?: number | null
          space_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "space_add_ons_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      space_amenities: {
        Row: {
          amenity_id: string | null
          custom_label: string | null
          id: string
          space_id: string
        }
        Insert: {
          amenity_id?: string | null
          custom_label?: string | null
          id?: string
          space_id: string
        }
        Update: {
          amenity_id?: string | null
          custom_label?: string | null
          id?: string
          space_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "space_amenities_amenity_id_fkey"
            columns: ["amenity_id"]
            isOneToOne: false
            referencedRelation: "amenities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "space_amenities_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      space_categories: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          picture_url: string | null
          slug: string | null
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          picture_url?: string | null
          slug?: string | null
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          picture_url?: string | null
          slug?: string | null
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      space_category_amenities: {
        Row: {
          amenity_id: string
          sort_order: number | null
          space_category_id: number
        }
        Insert: {
          amenity_id: string
          sort_order?: number | null
          space_category_id: number
        }
        Update: {
          amenity_id?: string
          sort_order?: number | null
          space_category_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "space_category_amenities_amenity_id_fkey"
            columns: ["amenity_id"]
            isOneToOne: false
            referencedRelation: "amenities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "space_category_amenities_space_category_id_fkey"
            columns: ["space_category_id"]
            isOneToOne: false
            referencedRelation: "space_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      space_category_booking_policies: {
        Row: {
          booking_policy_id: string
          space_category_id: number
        }
        Insert: {
          booking_policy_id: string
          space_category_id: number
        }
        Update: {
          booking_policy_id?: string
          space_category_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "space_category_booking_policies_booking_policy_id_fkey"
            columns: ["booking_policy_id"]
            isOneToOne: false
            referencedRelation: "booking_policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "space_category_booking_policies_space_category_id_fkey"
            columns: ["space_category_id"]
            isOneToOne: false
            referencedRelation: "space_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      space_favorites: {
        Row: {
          created_at: string
          profile_id: string
          space_id: string
        }
        Insert: {
          created_at?: string
          profile_id: string
          space_id: string
        }
        Update: {
          created_at?: string
          profile_id?: string
          space_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "space_favorites_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "space_favorites_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      space_pricing: {
        Row: {
          base_price_per_hour: number | null
          created_at: string
          currency: string
          discount_percent_day: number | null
          discount_percent_week: number | null
          effective_from: string | null
          effective_to: string | null
          hours_included_per_day: number | null
          hours_included_per_week: number | null
          id: string
          min_booking_days: number | null
          min_booking_hours: number | null
          min_booking_weeks: number | null
          price_per_day: number | null
          price_per_hour: number | null
          price_per_week: number | null
          pricing_mode: string | null
          space_id: string
          updated_at: string
        }
        Insert: {
          base_price_per_hour?: number | null
          created_at?: string
          currency?: string
          discount_percent_day?: number | null
          discount_percent_week?: number | null
          effective_from?: string | null
          effective_to?: string | null
          hours_included_per_day?: number | null
          hours_included_per_week?: number | null
          id?: string
          min_booking_days?: number | null
          min_booking_hours?: number | null
          min_booking_weeks?: number | null
          price_per_day?: number | null
          price_per_hour?: number | null
          price_per_week?: number | null
          pricing_mode?: string | null
          space_id: string
          updated_at?: string
        }
        Update: {
          base_price_per_hour?: number | null
          created_at?: string
          currency?: string
          discount_percent_day?: number | null
          discount_percent_week?: number | null
          effective_from?: string | null
          effective_to?: string | null
          hours_included_per_day?: number | null
          hours_included_per_week?: number | null
          id?: string
          min_booking_days?: number | null
          min_booking_hours?: number | null
          min_booking_weeks?: number | null
          price_per_day?: number | null
          price_per_hour?: number | null
          price_per_week?: number | null
          pricing_mode?: string | null
          space_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "space_pricing_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      space_schedule_exceptions: {
        Row: {
          closes_at: string | null
          exception_date: string
          id: string
          is_closed: boolean
          opens_at: string | null
          reason: string | null
          space_id: string
        }
        Insert: {
          closes_at?: string | null
          exception_date: string
          id?: string
          is_closed?: boolean
          opens_at?: string | null
          reason?: string | null
          space_id: string
        }
        Update: {
          closes_at?: string | null
          exception_date?: string
          id?: string
          is_closed?: boolean
          opens_at?: string | null
          reason?: string | null
          space_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "space_schedule_exceptions_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      space_service_hours: {
        Row: {
          closes_at: string
          day_of_week: number
          id: string
          opens_at: string
          space_id: string
        }
        Insert: {
          closes_at: string
          day_of_week: number
          id?: string
          opens_at: string
          space_id: string
        }
        Update: {
          closes_at?: string
          day_of_week?: number
          id?: string
          opens_at?: string
          space_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "space_service_hours_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      space_type_amenities: {
        Row: {
          amenity_id: string
          sort_order: number | null
          space_type_id: number
        }
        Insert: {
          amenity_id: string
          sort_order?: number | null
          space_type_id: number
        }
        Update: {
          amenity_id?: string
          sort_order?: number | null
          space_type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "space_type_amenities_amenity_id_fkey"
            columns: ["amenity_id"]
            isOneToOne: false
            referencedRelation: "amenities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "space_type_amenities_space_type_id_fkey"
            columns: ["space_type_id"]
            isOneToOne: false
            referencedRelation: "space_types"
            referencedColumns: ["id"]
          },
        ]
      }
      space_type_categories: {
        Row: {
          space_category_id: number
          space_type_id: number
        }
        Insert: {
          space_category_id: number
          space_type_id: number
        }
        Update: {
          space_category_id?: number
          space_type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "space_type_categories_space_category_id_fkey"
            columns: ["space_category_id"]
            isOneToOne: false
            referencedRelation: "space_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "space_type_categories_space_type_id_fkey"
            columns: ["space_type_id"]
            isOneToOne: false
            referencedRelation: "space_types"
            referencedColumns: ["id"]
          },
        ]
      }
      space_types: {
        Row: {
          id: number
          picture_url: string | null
          space_name: string
        }
        Insert: {
          id?: number
          picture_url?: string | null
          space_name: string
        }
        Update: {
          id?: number
          picture_url?: string | null
          space_name?: string
        }
        Relationships: []
      }
      space_wifi: {
        Row: {
          created_at: string
          network_name: string
          password_encrypted: string
          password_iv: string | null
          space_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          network_name: string
          password_encrypted: string
          password_iv?: string | null
          space_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          network_name?: string
          password_encrypted?: string
          password_iv?: string | null
          space_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "space_wifi_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: true
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      spaces: {
        Row: {
          address: string | null
          address_verification_session_id: string | null
          address_verification_status: string | null
          area_sqm: number | null
          cancellation_policy_id: string | null
          created_at: string
          description: string | null
          geo_location: unknown
          id: string
          image_url: string[] | null
          location: string
          name: string
          owner_id: string
          reservation_policy_id: string | null
          rules: string | null
          space_type_id: number | null
          status: Database["public"]["Enums"]["space_status"]
          timezone: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          address_verification_session_id?: string | null
          address_verification_status?: string | null
          area_sqm?: number | null
          cancellation_policy_id?: string | null
          created_at?: string
          description?: string | null
          geo_location?: unknown
          id?: string
          image_url?: string[] | null
          location: string
          name: string
          owner_id: string
          reservation_policy_id?: string | null
          rules?: string | null
          space_type_id?: number | null
          status?: Database["public"]["Enums"]["space_status"]
          timezone?: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          address_verification_session_id?: string | null
          address_verification_status?: string | null
          area_sqm?: number | null
          cancellation_policy_id?: string | null
          created_at?: string
          description?: string | null
          geo_location?: unknown
          id?: string
          image_url?: string[] | null
          location?: string
          name?: string
          owner_id?: string
          reservation_policy_id?: string | null
          rules?: string | null
          space_type_id?: number | null
          status?: Database["public"]["Enums"]["space_status"]
          timezone?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "spaces_address_verification_session_id_fkey"
            columns: ["address_verification_session_id"]
            isOneToOne: false
            referencedRelation: "didit_sessions"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "spaces_cancellation_policy_id_fkey"
            columns: ["cancellation_policy_id"]
            isOneToOne: false
            referencedRelation: "booking_policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spaces_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spaces_reservation_policy_id_fkey"
            columns: ["reservation_policy_id"]
            isOneToOne: false
            referencedRelation: "booking_policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spaces_space_type_id_fkey"
            columns: ["space_type_id"]
            isOneToOne: false
            referencedRelation: "space_types"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_customers: {
        Row: {
          created_at: string
          id: string
          profile_id: string
          stripe_customer_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id: string
          stripe_customer_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string
          stripe_customer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stripe_customers_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      telegram_admins: {
        Row: {
          created_at: string
          telegram_user_id: number
        }
        Insert: {
          created_at?: string
          telegram_user_id: number
        }
        Update: {
          created_at?: string
          telegram_user_id?: number
        }
        Relationships: []
      }
      telegram_coupon_wizards: {
        Row: {
          chat_id: number
          code: string | null
          created_at: string
          email: string | null
          expires_at: string | null
          id: string
          max_redemptions: number | null
          percent_off: number | null
          profile_id: string | null
          step: string
          telegram_user_id: number
          updated_at: string
        }
        Insert: {
          chat_id: number
          code?: string | null
          created_at?: string
          email?: string | null
          expires_at?: string | null
          id?: string
          max_redemptions?: number | null
          percent_off?: number | null
          profile_id?: string | null
          step: string
          telegram_user_id: number
          updated_at?: string
        }
        Update: {
          chat_id?: number
          code?: string | null
          created_at?: string
          email?: string | null
          expires_at?: string | null
          id?: string
          max_redemptions?: number | null
          percent_off?: number | null
          profile_id?: string | null
          step?: string
          telegram_user_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "telegram_coupon_wizards_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      terms_definitions: {
        Row: {
          content_hash: string
          created_at: string
          effective_at: string
          id: string
          is_active: boolean
          type: string
          version: string
        }
        Insert: {
          content_hash: string
          created_at?: string
          effective_at: string
          id?: string
          is_active?: boolean
          type: string
          version: string
        }
        Update: {
          content_hash?: string
          created_at?: string
          effective_at?: string
          id?: string
          is_active?: boolean
          type?: string
          version?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_terms_acceptance: {
        Row: {
          accepted_at: string
          id: string
          profile_id: string
          term_id: string
        }
        Insert: {
          accepted_at?: string
          id?: string
          profile_id: string
          term_id: string
        }
        Update: {
          accepted_at?: string
          id?: string
          profile_id?: string
          term_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_terms_acceptance_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_terms_acceptance_term_id_fkey"
            columns: ["term_id"]
            isOneToOne: false
            referencedRelation: "terms_definitions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      identity_documents_verification: {
        Row: {
          id: string | null
          is_verified: boolean | null
        }
        Insert: {
          id?: string | null
          is_verified?: boolean | null
        }
        Update: {
          id?: string | null
          is_verified?: boolean | null
        }
        Relationships: []
      }
      referral_coupon_space_report: {
        Row: {
          currency: string | null
          max_redemptions: number | null
          percent_off: number | null
          promo_code: string | null
          referrer_email: string | null
          referrer_id: string | null
          space_id: string | null
          space_name: string | null
          times_redeemed: number | null
          total_bookings_referred: number | null
          total_credit_cents: number | null
          total_discount_amount: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_redemptions_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      apply_host_referral_commission_discount: {
        Args: { p_booking_id: string; p_discount_percent?: number }
        Returns: Json
      }
      booking_within_service_hours: {
        Args: { p_ends_at: string; p_space_id: string; p_starts_at: string }
        Returns: boolean
      }
      calculate_pricing_from_base: {
        Args: {
          p_active_days_per_week: number
          p_base_price_per_hour: number
          p_discount_percent_day: number
          p_discount_percent_week: number
          p_hours_per_day: number
        }
        Returns: {
          price_per_day: number
          price_per_hour: number
          price_per_week: number
        }[]
      }
      conversation_is_read_only: {
        Args: { p_conversation_id: string }
        Returns: boolean
      }
      create_booking_review: {
        Args: {
          p_body: string
          p_booking_id: string
          p_rating: number
          p_tags?: string[]
          p_target_type: Database["public"]["Enums"]["review_target_type"]
        }
        Returns: {
          body: string
          booking_id: string
          created_at: string
          guest_id: string
          id: string
          rating: number
          reviewer_id: string
          space_id: string
          target_type: Database["public"]["Enums"]["review_target_type"]
        }
        SetofOptions: {
          from: "*"
          to: "reviews"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      deactivate_account: {
        Args: { p_profile_id: string }
        Returns: {
          error_code: string
          success: boolean
        }[]
      }
      delete_space: {
        Args: { p_space_id: string }
        Returns: {
          deleted: boolean
          error_code: string
        }[]
      }
      get_booking_payment_status: {
        Args: { p_booking_id: string }
        Returns: {
          amount_total_cents: number
          booking_id: string
          created_at: string
          currency: string
          host_amount_cents: number
          id: string
          platform_commission_cents: number
          refund_status: string
          refunded_amount_cents: number
          status: string
          stripe_payment_intent_id: string
          stripe_refund_id: string
          updated_at: string
        }[]
      }
      get_bookings_by_status_and_date_range: {
        Args: {
          p_ascending?: boolean
          p_date_from: string
          p_date_to: string
          p_limit: number
          p_offset: number
          p_profile_id: string
          p_status: string
        }
        Returns: Json
      }
      get_commission_for_amount: {
        Args: { p_amount_cents: number; p_currency: string }
        Returns: {
          commission_cents: number
          percentage: number
        }[]
      }
      get_conversation_by_booking_id: {
        Args: { p_booking_id: string }
        Returns: string
      }
      get_featured_recommended_spaces: {
        Args: {
          p_limit?: number
          p_max_distance_km?: number
          p_profile_id: string
        }
        Returns: {
          address: string
          area_sqm: number
          average_rating: number
          currency: string
          image_url: string[]
          is_favorited: boolean
          location: string
          name: string
          price: number
          reviews_count: number
          space_id: string
        }[]
      }
      get_host_addresses_for_reuse: {
        Args: never
        Returns: {
          address: string
          geo_lat: number
          geo_lng: number
          source_space_id: string
          space_name: string
        }[]
      }
      get_host_bookings_search: {
        Args: {
          p_date_from?: string
          p_date_to?: string
          p_guest_profile_id?: string
          p_limit?: number
          p_offset?: number
          p_profile_id?: string
          p_query?: string
          p_space_id?: string
          p_status?: Database["public"]["Enums"]["booking_status"]
        }
        Returns: {
          amount_total_cents: number
          booking_id: string
          booking_status: Database["public"]["Enums"]["booking_status"]
          booking_type: string
          created_at: string
          currency: string
          ends_at: string
          guest_avatar_url: string
          guest_email: string
          guest_full_name: string
          guest_profile_id: string
          payment_status: string
          readable_id: string
          refund_status: string
          refunded_amount_cents: number
          space_address: string
          space_id: string
          space_image_url: string[]
          space_location: string
          space_name: string
          starts_at: string
          total_count: number
        }[]
      }
      get_host_dashboard_stats: {
        Args: {
          p_date_from?: string
          p_date_to?: string
          p_profile_id?: string
          p_space_id?: string
          p_upcoming_days?: number
        }
        Returns: {
          available_minutes: number
          booked_minutes: number
          bookings_cancelled: number
          bookings_completed: number
          bookings_pending: number
          bookings_upcoming: number
          bookings_upcoming_soon: number
          cancellation_rate: number
          occupancy_rate: number
          revenue_by_currency: Json
          reviews_average_rating: number
          reviews_count: number
          space_id: string
          space_name: string
          stars_1_count: number
          stars_2_count: number
          stars_3_count: number
          stars_4_count: number
          stars_5_count: number
        }[]
      }
      get_host_for_typesense: {
        Args: { p_host_id: string }
        Returns: {
          avatar_url: string
          average_rating: number
          bio: string
          full_name: string
          id: string
          profile_id: string
          reviews_count: number
          updated_at: string
        }[]
      }
      get_host_spaces_counts: {
        Args: { p_profile_id?: string }
        Returns: {
          archived_count: number
          draft_count: number
          in_review_count: number
          published_count: number
          rejected_count: number
        }[]
      }
      get_host_spaces_search: {
        Args: {
          p_limit?: number
          p_min_rating?: number
          p_offset?: number
          p_profile_id?: string
          p_query?: string
          p_status?: Database["public"]["Enums"]["space_status"]
          p_updated_from?: string
          p_updated_to?: string
        }
        Returns: {
          address: string
          area_sqm: number
          average_rating: number
          base_price_per_hour: number
          currency: string
          discount_percent_day: number
          discount_percent_week: number
          has_wifi: boolean
          hours_included_per_day: number
          hours_included_per_week: number
          id: string
          image_url: string[]
          location: string
          min_booking_days: number
          min_booking_hours: number
          min_booking_weeks: number
          name: string
          price_per_day: number
          price_per_hour: number
          price_per_week: number
          pricing_mode: string
          reviews_count: number
          space_type_name: string
          status: Database["public"]["Enums"]["space_status"]
          total_count: number
          updated_at: string
        }[]
      }
      get_hosts_for_typesense: {
        Args: { p_limit: number; p_offset: number }
        Returns: {
          avatar_url: string
          average_rating: number
          bio: string
          full_name: string
          id: string
          profile_id: string
          reviews_count: number
          updated_at: string
        }[]
      }
      get_main_recommended_spaces: {
        Args: {
          p_lat?: number
          p_limit?: number
          p_lng?: number
          p_max_distance_km?: number
          p_profile_id?: string
          p_score_window?: number
          p_space_category_id?: number
        }
        Returns: {
          address: string
          area_sqm: number
          average_rating: number
          currency: string
          description: string
          distance_meters: number
          geo_lat: number
          geo_lng: number
          image_url: string[]
          is_favorited: boolean
          location: string
          name: string
          price: number
          reviews_count: number
          rules: string
          score: number
          space_id: string
          space_type_id: number
          status: Database["public"]["Enums"]["space_status"]
          timezone: string
        }[]
      }
      get_my_favorite_spaces: {
        Args: { p_profile_id: string }
        Returns: {
          address: string
          address_verification_session_id: string
          address_verification_status: string
          area_sqm: number
          description: string
          geo_lat: number
          geo_lng: number
          id: string
          image_url: string[]
          location: string
          name: string
          owner_id: string
          rules: string
          space_type_id: number
          status: Database["public"]["Enums"]["space_status"]
          timezone: string
        }[]
      }
      get_my_pending_reviews: {
        Args: never
        Returns: {
          booking_id: string
          pending_guest_review: boolean
          pending_host_review: boolean
          pending_space_review: boolean
          role: string
          space_id: string
        }[]
      }
      get_my_sessions: {
        Args: never
        Returns: {
          created_at: string
          id: string
          ip: string
          updated_at: string
          user_agent: string
        }[]
      }
      get_or_create_inquiry_conversation: {
        Args: { p_space_id: string }
        Returns: string
      }
      get_pending_terms: {
        Args: never
        Returns: {
          term_id: string
          type: string
          version: string
        }[]
      }
      get_profile_reviews_summary: {
        Args: {
          p_profile_id: string
          p_target_type: Database["public"]["Enums"]["review_target_type"]
        }
        Returns: {
          average_rating: number
          profile_id: string
          reviews_count: number
          target_type: Database["public"]["Enums"]["review_target_type"]
        }[]
      }
      get_recommended_spaces: {
        Args: {
          p_limit?: number
          p_max_distance_km?: number
          p_offset?: number
          p_profile_id: string
          p_space_id: string
        }
        Returns: {
          area_sqm: number
          average_rating: number
          currency: string
          distance_meters: number
          image_url: string
          location: string
          name: string
          price: number
          reviews_count: number
          score: number
          space_id: string
          space_type_id: number
          status: Database["public"]["Enums"]["space_status"]
        }[]
      }
      get_space_availability: {
        Args: { p_end_date: string; p_space_id: string; p_start_date: string }
        Returns: string[]
      }
      get_space_for_typesense: {
        Args: { p_space_id: string }
        Returns: {
          address: string
          amenity_ids: string[]
          area_sqm: number
          available_dates: string[]
          average_rating: number
          category_ids: number[]
          currency: string
          description: string
          geo_lat: number
          geo_lng: number
          id: string
          image_url: string[]
          location: string
          name: string
          price_per_day: number
          price_per_hour: number
          price_per_week: number
          reviews_count: number
          updated_at: string
        }[]
      }
      get_space_occupancy_for_period: {
        Args: {
          p_period_end: string
          p_period_start: string
          p_space_id: string
        }
        Returns: {
          available_minutes: number
          booked_minutes: number
        }[]
      }
      get_space_reviews: {
        Args: { p_limit?: number; p_offset?: number; p_space_id: string }
        Returns: {
          body: string
          booking_id: string
          created_at: string
          id: string
          rating: number
          reviewer_id: string
          tags: string[]
        }[]
      }
      get_space_reviews_summary: {
        Args: { p_space_id: string }
        Returns: {
          average_rating: number
          reviews_count: number
          space_id: string
          stars_1_count: number
          stars_2_count: number
          stars_3_count: number
          stars_4_count: number
          stars_5_count: number
        }[]
      }
      get_space_schedule_consistency: {
        Args: { p_space_id: string }
        Returns: {
          active_days_per_week: number
          hours_per_day: number
          is_consistent: boolean
        }[]
      }
      get_space_with_geo: {
        Args: { p_space_id: string }
        Returns: {
          address: string
          address_verification_session_id: string
          address_verification_status: string
          area_sqm: number
          description: string
          geo_lat: number
          geo_lng: number
          id: string
          image_url: string[]
          location: string
          name: string
          owner_id: string
          rules: string
          space_type_id: number
          status: Database["public"]["Enums"]["space_status"]
          timezone: string
        }[]
      }
      get_space_with_geo_for_user: {
        Args: { p_profile_id: string; p_space_id: string }
        Returns: {
          address: string
          address_verification_session_id: string
          address_verification_status: string
          area_sqm: number
          description: string
          geo_lat: number
          geo_lng: number
          id: string
          image_url: string[]
          is_favorited: boolean
          location: string
          name: string
          owner_id: string
          rules: string
          space_type_id: number
          status: Database["public"]["Enums"]["space_status"]
          timezone: string
        }[]
      }
      get_spaces_for_typesense: {
        Args: { p_limit: number; p_offset: number }
        Returns: {
          address: string
          amenity_ids: string[]
          area_sqm: number
          available_dates: string[]
          average_rating: number
          category_ids: number[]
          currency: string
          description: string
          geo_lat: number
          geo_lng: number
          id: string
          image_url: string[]
          location: string
          name: string
          price_per_day: number
          price_per_hour: number
          price_per_week: number
          reviews_count: number
          updated_at: string
        }[]
      }
      link_conversation_to_booking: {
        Args: { p_booking_id: string; p_conversation_id: string }
        Returns: undefined
      }
      referral_rewards_webhook_send: {
        Args: { _payload: Json }
        Returns: undefined
      }
      slugify: { Args: { text_input: string }; Returns: string }
      sync_all_spaces_availability: { Args: never; Returns: undefined }
      telegram_admin_webhook_send: {
        Args: { _payload: Json }
        Returns: undefined
      }
      user_can_access_conversation: {
        Args: { p_conversation_id: string; p_profile_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
      booking_policy_type: "cancellation" | "reservation"
      booking_rate_type: "hour" | "day" | "week"
      booking_status: "COMPLETED" | "UPCOMING" | "CANCELLED" | "PENDING"
      cfdi_usage:
        | "G01"
        | "G02"
        | "G03"
        | "I01"
        | "I02"
        | "I03"
        | "I04"
        | "I05"
        | "I06"
        | "I07"
        | "I08"
        | "D01"
        | "D02"
        | "D03"
        | "D04"
        | "D05"
        | "D06"
        | "D07"
        | "D08"
        | "D09"
        | "D010"
        | "S01"
        | "CP01"
        | "CN01"
      mexican_bank_code:
        | "002"
        | "006"
        | "009"
        | "012"
        | "014"
        | "019"
        | "021"
        | "030"
        | "032"
        | "036"
        | "037"
        | "042"
        | "044"
        | "058"
        | "059"
        | "060"
        | "062"
        | "072"
        | "102"
        | "103"
        | "106"
        | "108"
        | "110"
        | "112"
        | "113"
        | "126"
        | "127"
        | "128"
        | "129"
        | "130"
        | "132"
        | "133"
        | "134"
        | "135"
        | "136"
        | "137"
        | "138"
        | "139"
        | "140"
        | "141"
        | "166"
        | "601"
        | "602"
        | "646"
        | "647"
        | "648"
        | "649"
        | "670"
        | "901"
        | "902"
        | "999"
      notification_channel: "in_app" | "email"
      notification_type:
        | "booking_created"
        | "booking_confirmed"
        | "booking_cancelled"
        | "booking_reminder"
        | "booking_completed"
        | "payment_received"
        | "payment_failed"
        | "space_favorited"
        | "review_received"
        | "message_received"
        | "booking_created_host"
        | "booking_confirmed_host"
        | "booking_cancelled_host"
        | "booking_reminder_host"
        | "space_in_review"
        | "space_published"
        | "space_rejected"
        | "invoice_request_received"
        | "promo_code_assigned"
        | "referral_signed_up"
        | "referral_reward_earned_renter"
        | "referral_reward_earned_host"
      referral_reward_type:
        | "renter_first_booking_discount"
        | "host_first_commission_discount"
      referral_status: "pending" | "completed" | "cancelled"
      review_target_type: "space" | "host" | "guest"
      space_status:
        | "draft"
        | "in_review"
        | "published"
        | "archived"
        | "rejected"
      tax_regime:
        | "601"
        | "603"
        | "605"
        | "606"
        | "607"
        | "608"
        | "610"
        | "611"
        | "612"
        | "614"
        | "615"
        | "616"
        | "620"
        | "621"
        | "622"
        | "623"
        | "624"
        | "625"
        | "626"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
      booking_policy_type: ["cancellation", "reservation"],
      booking_rate_type: ["hour", "day", "week"],
      booking_status: ["COMPLETED", "UPCOMING", "CANCELLED", "PENDING"],
      cfdi_usage: [
        "G01",
        "G02",
        "G03",
        "I01",
        "I02",
        "I03",
        "I04",
        "I05",
        "I06",
        "I07",
        "I08",
        "D01",
        "D02",
        "D03",
        "D04",
        "D05",
        "D06",
        "D07",
        "D08",
        "D09",
        "D010",
        "S01",
        "CP01",
        "CN01",
      ],
      mexican_bank_code: [
        "002",
        "006",
        "009",
        "012",
        "014",
        "019",
        "021",
        "030",
        "032",
        "036",
        "037",
        "042",
        "044",
        "058",
        "059",
        "060",
        "062",
        "072",
        "102",
        "103",
        "106",
        "108",
        "110",
        "112",
        "113",
        "126",
        "127",
        "128",
        "129",
        "130",
        "132",
        "133",
        "134",
        "135",
        "136",
        "137",
        "138",
        "139",
        "140",
        "141",
        "166",
        "601",
        "602",
        "646",
        "647",
        "648",
        "649",
        "670",
        "901",
        "902",
        "999",
      ],
      notification_channel: ["in_app", "email"],
      notification_type: [
        "booking_created",
        "booking_confirmed",
        "booking_cancelled",
        "booking_reminder",
        "booking_completed",
        "payment_received",
        "payment_failed",
        "space_favorited",
        "review_received",
        "message_received",
        "booking_created_host",
        "booking_confirmed_host",
        "booking_cancelled_host",
        "booking_reminder_host",
        "space_in_review",
        "space_published",
        "space_rejected",
        "invoice_request_received",
        "promo_code_assigned",
        "referral_signed_up",
        "referral_reward_earned_renter",
        "referral_reward_earned_host",
      ],
      referral_reward_type: [
        "renter_first_booking_discount",
        "host_first_commission_discount",
      ],
      referral_status: ["pending", "completed", "cancelled"],
      review_target_type: ["space", "host", "guest"],
      space_status: ["draft", "in_review", "published", "archived", "rejected"],
      tax_regime: [
        "601",
        "603",
        "605",
        "606",
        "607",
        "608",
        "610",
        "611",
        "612",
        "614",
        "615",
        "616",
        "620",
        "621",
        "622",
        "623",
        "624",
        "625",
        "626",
      ],
    },
  },
} as const
