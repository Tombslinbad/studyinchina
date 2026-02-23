'use client'

import { useQuery, useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import { useState } from 'react'

const pipelineStages = [
  { id: 'inquiry', label: 'Inquiry', color: 'bg-slate-100' },
  { id: 'documents', label: 'Documents', color: 'bg-blue-100' },
  { id: 'submitted', label: 'Submitted', color: 'bg-yellow-100' },
  { id: 'review', label: 'Under Review', color: 'bg-orange-100' },
  { id: 'jw202', label: 'JW202 Issued', color: 'bg-purple-100' },
  { id: 'embassy', label: 'Embassy', color: 'bg-pink-100' },
  { id: 'approved', label: 'Approved', color: 'bg-green-100' },
]

export default function PipelinePage() {
  const applications = useQuery(api.applications.getAllApplications)
  const users = useQuery(api.users.getAllUsers)
  const updateStage = useMutation(api.applications.updatePipelineStage)
  
  const [draggedApp, setDraggedApp] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  const getUserName = (userId: string) => {
    const user = users?.find(u => u._id === userId)
    return user?.fullName || user?.email || 'Unknown'
  }

  const handleDragStart = (appId: string) => {
    setDraggedApp(appId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (e: React.DragEvent, stage: string) => {
    e.preventDefault()
    if (!draggedApp) return

    setUpdating(draggedApp)
    try {
      await updateStage({ 
        applicationId: draggedApp as any, 
        pipelineStage: stage as any 
      })
    } catch (error) {
      console.error('Update failed:', error)
    } finally {
      setUpdating(null)
      setDraggedApp(null)
    }
  }

  const isLoading = applications === undefined || users === undefined

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-black tracking-tight">
          Application <span className="text-primary">Pipeline</span>
        </h1>
        <p className="text-slate-600">Drag and drop to move applications through stages</p>
      </div>

      {/* Kanban Board */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {pipelineStages.map((stage) => {
              const stageApps = applications?.filter(
                app => app.pipelineStage === stage.id || 
                (stage.id === 'inquiry' && !app.pipelineStage)
              ) || []

              return (
                <div 
                  key={stage.id}
                  className="w-72 shrink-0"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, stage.id)}
                >
                  {/* Column Header */}
                  <div className={`${stage.color} rounded-t-2xl p-4`}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-900">{stage.label}</h3>
                      <span className="bg-white/50 px-2 py-0.5 rounded-full text-sm font-medium">
                        {stageApps.length}
                      </span>
                    </div>
                  </div>

                  {/* Column Content */}
                  <div className={`${stage.color} rounded-b-2xl p-3 pt-0 min-h-96`}>
                    <div className="space-y-3">
                      {stageApps.map((app) => (
                        <div
                          key={app._id}
                          draggable
                          onDragStart={() => handleDragStart(app._id)}
                          className={`bg-white rounded-xl p-4 shadow-sm cursor-move hover:shadow-md transition-all ${
                            updating === app._id ? 'opacity-50' : ''
                          } ${draggedApp === app._id ? 'rotate-2 scale-105' : ''}`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-bold text-slate-900 text-sm line-clamp-2">
                              {app.universityName}
                            </h4>
                            <StatusBadge status={app.status} />
                          </div>
                          
                          <p className="text-xs text-slate-500 mb-3">{app.programName}</p>
                          
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="material-symbols-outlined text-sm">person</span>
                            <span className="truncate">{getUserName(app.userId)}</span>
                          </div>

                          {app.notes && (
                            <div className="mt-2 pt-2 border-t border-slate-100">
                              <p className="text-xs text-slate-500 line-clamp-2">{app.notes}</p>
                            </div>
                          )}

                          <div className="mt-3 flex gap-2">
                            <button className="flex-1 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors">
                              View
                            </button>
                            <button className="px-2 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                              <span className="material-symbols-outlined text-sm">more_vert</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: 'bg-slate-100 text-slate-600',
    submitted: 'bg-blue-100 text-blue-600',
    under_review: 'bg-yellow-100 text-yellow-600',
    accepted: 'bg-green-100 text-green-600',
    rejected: 'bg-red-100 text-red-600',
  }

  return (
    <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${styles[status] || styles.draft}`}>
      {status.replace('_', ' ')}
    </span>
  )
}
