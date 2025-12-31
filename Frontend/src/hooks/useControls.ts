'use client'

import { useState, useEffect } from 'react'

interface Control {
  id: string
  framework: string
  originalId: string
  title: string
  description: string
  status: 'implemented' | 'partial' | 'not-implemented'
  severity: 'critical' | 'high' | 'medium' | 'low'
  category: string
  evidenceCount: number
  lastScan: string
  policyLinked: boolean
}

interface UseControlsOptions {
  framework?: string
  status?: string
  severity?: string
  search?: string
  page?: number
  limit?: number
}

export function useControls(options: UseControlsOptions = {}) {
  const [controls, setControls] = useState<Control[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchControls = async () => {
      try {
        setLoading(true)
        
        // Build query params
        const params = new URLSearchParams()
        if (options.framework) params.append('framework', options.framework)
        if (options.status) params.append('status', options.status)
        if (options.severity) params.append('severity', options.severity)
        if (options.search) params.append('search', options.search)
        if (options.page) params.append('page', options.page.toString())
        if (options.limit) params.append('limit', options.limit.toString())
        
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/controls?${params}`)
        // const data = await response.json()
        
        // Mock data for now
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const mockControls: Control[] = [
          {
            id: 'BR-001',
            framework: 'CIS',
            originalId: 'CIS 1.1',
            title: 'Establish and Maintain Detailed Enterprise Asset Inventory',
            description: 'Maintain an accurate and up-to-date inventory of all enterprise assets.',
            status: 'implemented',
            severity: 'critical',
            category: 'Asset Management',
            evidenceCount: 12,
            lastScan: '2025-12-30',
            policyLinked: true
          },
          {
            id: 'BR-002',
            framework: 'CIS',
            originalId: 'CIS 1.2',
            title: 'Address Unauthorized Assets',
            description: 'Ensure that only authorized assets are given access.',
            status: 'partial',
            severity: 'high',
            category: 'Asset Management',
            evidenceCount: 5,
            lastScan: '2025-12-30',
            policyLinked: true
          }
        ]
        
        setControls(mockControls)
        setTotal(mockControls.length)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch controls'))
      } finally {
        setLoading(false)
      }
    }

    fetchControls()
  }, [options.framework, options.status, options.severity, options.search, options.page, options.limit])

  const refresh = () => {
    setLoading(true)
    setError(null)
  }

  const updateControlStatus = async (controlId: string, status: Control['status']) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/controls/${controlId}`, {
      //   method: 'PATCH',
      //   body: JSON.stringify({ status })
      // })
      
      setControls(prev =>
        prev.map(c => c.id === controlId ? { ...c, status } : c)
      )
    } catch (err) {
      throw new Error('Failed to update control status')
    }
  }

  return { 
    controls, 
    loading, 
    error, 
    total, 
    refresh, 
    updateControlStatus 
  }
}

export function useControl(controlId: string) {
  const [control, setControl] = useState<Control | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchControl = async () => {
      try {
        setLoading(true)
        
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/controls/${controlId}`)
        // const data = await response.json()
        
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const mockControl: Control = {
          id: controlId,
          framework: 'CIS',
          originalId: 'CIS 1.1',
          title: 'Establish and Maintain Detailed Enterprise Asset Inventory',
          description: 'Maintain an accurate and up-to-date inventory of all enterprise assets.',
          status: 'implemented',
          severity: 'critical',
          category: 'Asset Management',
          evidenceCount: 12,
          lastScan: '2025-12-30',
          policyLinked: true
        }
        
        setControl(mockControl)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch control'))
      } finally {
        setLoading(false)
      }
    }

    if (controlId) {
      fetchControl()
    }
  }, [controlId])

  return { control, loading, error }
}
