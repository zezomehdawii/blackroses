import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Control {
  id: string
  framework: string
  originalId: string
  title: string
  status: 'implemented' | 'partial' | 'not-implemented'
  severity: 'critical' | 'high' | 'medium' | 'low'
}

interface Framework {
  code: string
  name: string
  controlCount: number
  implemented: number
  partial: number
  notImplemented: number
}

interface ComplianceState {
  // Data
  frameworks: Framework[]
  controls: Control[]
  selectedFramework: string | null
  
  // Filters
  filters: {
    status: string
    severity: string
    search: string
    framework: string
  }

  // UI State
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  
  // Stats cache
  complianceScore: number | null
  lastRefresh: Date | null

  // Actions
  setFrameworks: (frameworks: Framework[]) => void
  setControls: (controls: Control[]) => void
  setSelectedFramework: (framework: string | null) => void
  updateFilters: (filters: Partial<ComplianceState['filters']>) => void
  resetFilters: () => void
  toggleSidebar: () => void
  setTheme: (theme: 'light' | 'dark') => void
  updateComplianceScore: (score: number) => void
  refresh: () => void
}

export const useComplianceStore = create<ComplianceState>()(
  persist(
    (set, get) => ({
      // Initial state
      frameworks: [],
      controls: [],
      selectedFramework: null,
      
      filters: {
        status: 'all',
        severity: 'all',
        search: '',
        framework: 'all'
      },

      sidebarOpen: true,
      theme: 'light',
      complianceScore: null,
      lastRefresh: null,

      // Actions
      setFrameworks: (frameworks) => set({ frameworks }),
      
      setControls: (controls) => set({ controls }),
      
      setSelectedFramework: (framework) => set({ selectedFramework: framework }),
      
      updateFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters }
        })),
      
      resetFilters: () =>
        set({
          filters: {
            status: 'all',
            severity: 'all',
            search: '',
            framework: 'all'
          }
        }),
      
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      setTheme: (theme) => set({ theme }),
      
      updateComplianceScore: (score) =>
        set({ complianceScore: score, lastRefresh: new Date() }),
      
      refresh: () => set({ lastRefresh: new Date() })
    }),
    {
      name: 'blackroses-compliance-storage',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        filters: state.filters
      })
    }
  )
)

// Selectors
export const selectFilteredControls = (state: ComplianceState) => {
  const { controls, filters } = state
  
  return controls.filter((control) => {
    const matchStatus = filters.status === 'all' || control.status === filters.status
    const matchSeverity = filters.severity === 'all' || control.severity === filters.severity
    const matchFramework = filters.framework === 'all' || control.framework === filters.framework
    const matchSearch = filters.search === '' ||
      control.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      control.id.toLowerCase().includes(filters.search.toLowerCase()) ||
      control.originalId.toLowerCase().includes(filters.search.toLowerCase())
    
    return matchStatus && matchSeverity && matchFramework && matchSearch
  })
}

export const selectComplianceStats = (state: ComplianceState) => {
  const { controls } = state
  
  const total = controls.length
  const implemented = controls.filter(c => c.status === 'implemented').length
  const partial = controls.filter(c => c.status === 'partial').length
  const notImplemented = controls.filter(c => c.status === 'not-implemented').length
  const score = total > 0 ? Math.round(((implemented + (partial * 0.5)) / total) * 100) : 0
  
  return {
    total,
    implemented,
    partial,
    notImplemented,
    score
  }
}
