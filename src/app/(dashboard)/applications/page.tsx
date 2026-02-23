'use client'

import { useQuery, useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import Link from 'next/link'
import { useState } from 'react'

const statusOptions = [
  { value: 'all', label: 'All Applications' },
  { value: 'draft', label: 'Draft' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
]

export default function ApplicationsPage() {
  const [filter, setFilter] = useState('all')
  const applications = useQuery(api.applications.getMyApplications)
  const deleteApplication = useMutation(api.applications.deleteApplication)

  const filteredApplications = applications?.filter(
    app => filter === 'all' || app.status === filter
  )

  const isLoading = applications === undefined

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-black tracking-tight">
            My <span className="text-primary">Applications</span>
          </h1>
          <p className="text-slate-600">Manage your university applications</p>
        </div>
        <Link href="/search" className="btn-primary">
          <span className="material-symbols-outlined">add</span>
          New Application
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === option.value
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Applications List */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredApplications && filteredApplications.length > 0 ? (
        <div className="grid gap-4">
          {filteredApplications.map((app) => (
            <ApplicationCard 
              key={app._id} 
              application={app} 
              onDelete={() => deleteApplication({ applicationId: app._id })}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl">
          <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
            school
          </span>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {filter === 'all' ? 'No applications yet' : `No ${filter} applications`}
          </h3>
          <p className="text-slate-600 mb-6">
            {filter === 'all' 
              ? 'Start your journey by applying to a university'
              : 'Try a different filter or create a new application'
            }
          </p>
          <Link href="/search" className="btn-primary">
            Browse Universities
          </Link>
        </div>
      )}
    </div>
  )
}

function ApplicationCard({ 
  application, 
  onDelete 
}: { 
  application: any
  onDelete: () => void 
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const statusConfig: Record<string, { color: string; icon: string; label: string }> = {
    draft: { color: 'bg-slate-100 text-slate-600', icon: 'edit', label: 'Draft' },
    submitted: { color: 'bg-blue-100 text-blue-600', icon: 'send', label: 'Submitted' },
    under_review: { color: 'bg-yellow-100 text-yellow-600', icon: 'hourglass_top', label: 'Under Review' },
    accepted: { color: 'bg-green-100 text-green-600', icon: 'check_circle', label: 'Accepted' },
    rejected: { color: 'bg-red-100 text-red-600', icon: 'cancel', label: 'Rejected' },
  }

  const status = statusConfig[application.status] || statusConfig.draft

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-2xl">school</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{application.universityName}</h3>
            <p className="text-slate-600">{application.programName}</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-500">
              <span className="capitalize">{application.degreeType}</span>
              <span>•</span>
              <span>Updated {new Date(application.updatedAt).toLocaleDateString()}</span>
              {application.submittedAt && (
                <>
                  <span>•</span>
                  <span>Submitted {new Date(application.submittedAt).toLocaleDateString()}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${status.color}`}>
            <span className="material-symbols-outlined text-sm">{status.icon}</span>
            {status.label}
          </span>

          {application.status === 'draft' && (
            <>
              <Link 
                href={`/applications/${application._id}/edit`}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                title="Edit"
              >
                <span className="material-symbols-outlined text-slate-600">edit</span>
              </Link>
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                title="Delete"
              >
                <span className="material-symbols-outlined text-red-600">delete</span>
              </button>
            </>
          )}

          <Link 
            href={`/applications/${application._id}`}
            className="btn-secondary text-sm"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
          <p className="text-red-800 font-medium mb-3">
            Are you sure you want to delete this application?
          </p>
          <div className="flex gap-3">
            <button 
              onClick={onDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Yes, Delete
            </button>
            <button 
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 bg-white text-slate-600 rounded-lg font-medium hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
