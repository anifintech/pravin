export type ServiceType = 'washing-machine' | 'refrigerator' | 'dishwasher' | 'other'

export type LeadStatus = 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled'

export interface Lead {
  id: string
  name: string
  phone: string
  email?: string
  service_type: ServiceType
  appliance_brand?: string
  issue_description: string
  address: string
  area: string
  preferred_date?: string
  preferred_time?: string
  status: LeadStatus
  notes?: string
  created_at: string
  updated_at: string
}

export interface LeadFormData {
  name: string
  phone: string
  email?: string
  service_type: ServiceType
  appliance_brand?: string
  issue_description: string
  address: string
  area: string
  preferred_date?: string
  preferred_time?: string
}
