export type PlanType = 'starter' | 'pro' | 'elite'
export type PlanStatus = 'active' | 'inactive' | 'trial' | 'cancelled'
export type AlertResult = 'win' | 'loss' | 'ignored'
export type PatternType = '3x3' | '4x2'
export type DominantColor = 'R' | 'B'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  user_id: string
  plan: PlanType
  status: PlanStatus
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  current_period_start: string | null
  current_period_end: string | null
  trial_ends_at: string | null
  created_at: string
  updated_at: string
}

export interface Analysis {
  id: string
  user_id: string
  image_url: string | null
  grid_data: DominantColor[][]
  rows_count: number
  cols_count: number
  total_red: number
  total_blue: number
  created_at: string
}

export interface Alert {
  id: string
  analysis_id: string
  user_id: string
  col_index: number
  alert_color: DominantColor
  sequence_length: number
  confidence_pct: number
  is_top_alert: boolean
  result: AlertResult | null
  followed: boolean | null
  resolved_at: string | null
  created_at: string
}

export interface PerformanceSummary {
  id: string
  user_id: string
  total_followed: number
  total_wins: number
  total_losses: number
  win_rate: number
  best_pattern: string | null
  best_pattern_rate: number
  updated_at: string
}
