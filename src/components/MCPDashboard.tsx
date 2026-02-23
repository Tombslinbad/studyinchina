'use client'

import { useState, useEffect } from 'react'

interface MCPData {
  schema?: any
  dashboard?: any
  error?: string
  loading: boolean
}

export default function MCPDashboard() {
  const [data, setData] = useState<MCPData>({ loading: true })
  const [activeTool, setActiveTool] = useState<string>('schema')

  useEffect(() => {
    fetchMCPData('schema')
  }, [])

  const fetchMCPData = async (tool: string) => {
    setData({ loading: true })
    try {
      const response = await fetch(`/api/mcp?tool=${tool}`)
      const result = await response.json()
      
      if (result.error) {
        setData({ error: result.error, loading: false })
      } else {
        setData({ [tool]: result, loading: false })
      }
    } catch (err) {
      setData({ 
        error: 'Failed to connect to MCP server. Make sure it is running on port 3001.',
        loading: false 
      })
    }
  }

  const tools = [
    { id: 'schema', name: 'Schema', icon: 'database' },
    { id: 'dashboard', name: 'Dashboard', icon: 'dashboard' },
    { id: 'diagram', name: 'ER Diagram', icon: 'schema' },
    { id: 'subway', name: 'Codebase Map', icon: 'map' },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">analytics</span>
          Convex MCP Explorer
        </h2>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
          Connected
        </span>
      </div>

      {/* Tool Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => {
              setActiveTool(tool.id)
              fetchMCPData(tool.id)
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
              activeTool === tool.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{tool.icon}</span>
            {tool.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[300px]">
        {data.loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : data.error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <span className="material-symbols-outlined text-red-500 text-4xl mb-2">error</span>
            <p className="text-red-700 font-medium">{data.error}</p>
            <p className="text-red-600 text-sm mt-2">
              Run: <code className="bg-red-100 px-2 py-1 rounded">./scripts/start-mcp.sh</code>
            </p>
          </div>
        ) : (
          <div className="bg-slate-50 rounded-xl p-4 overflow-auto max-h-[400px]">
            <pre className="text-xs text-slate-700">
              {JSON.stringify(data[activeTool as keyof MCPData], null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Connection Info */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Project: impartial-spoonbill-973</span>
          <span>MCP Server: localhost:3001</span>
        </div>
      </div>
    </div>
  )
}
