'use client'

import { useQuery } from 'convex/react'
import { api } from '@convex/_generated/api'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const users = useQuery(api.users.getAllUsers)
  const applications = useQuery(api.applications.getAllApplications)

  const isLoading = users === undefined || applications === undefined

  // Calculate stats
  const totalStudents = users?.filter(u => u.role === 'student').length || 0
  const totalApplications = applications?.length || 0
  const pendingApplications = applications?.filter(a => a.status === 'submitted' || a.status === 'under_review').length || 0
  const acceptedApplications = applications?.filter(a => a.status === 'accepted').length || 0

  // Recent applications
  const recentApplications = applications?.slice(0, 5) || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-black tracking-tight">
          Admin <span className="text-primary">Dashboard</span>
        </h1>
        <p className="text-slate-600">Manage universities, students, and applications</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon="group" 
          label="Total Students" 
          value={totalStudents}
          color="blue"
        />
        <StatCard 
          icon="school" 
          label="Applications" 
          value={totalApplications}
          color="purple"
        />
        <StatCard 
          icon="hourglass_top" 
          label="Pending Review" 
          value={pendingApplications}
          color="yellow"
        />
        <StatCard 
          icon="check_circle" 
          label="Accepted" 
          value={acceptedApplications}
          color="green"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Recent Applications</h2>
            <Link href="/pipeline" className="text-primary text-sm font-medium hover:underline">
              View Pipeline
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : recentApplications.length > 0 ? (
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div 
                  key={app._id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                >
                  <div>
                    <p className="font-medium text-slate-900">{app.universityName}</p>
                    <p className="text-sm text-slate-500">{app.programName}</p>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 py-8">No applications yet</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <ActionCard 
              icon="school"
              label="Add University"
              description="Add new university to database"
              href="/universities/new"
            />
            <ActionCard 
              icon="group"
              label="View Students"
              description="Manage student accounts"
              href="/students"
            />
            <ActionCard 
              icon="view_kanban"
              label="Pipeline"
              description="Track application progress"
              href="/pipeline"
            />
            <ActionCard 
              icon="settings"
              label="Settings"
              description="Configure platform settings"
              href="/admin/settings"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ 
  icon, 
  label, 
  value, 
  color 
}: { 
  icon: string
  label: string
  value: number
  color: 'blue' | 'green' | 'yellow' | 'purple'
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className={`w-10 h-10 rounded-xl ${colors[color]} flex items-center justify-center mb-3`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-600">{label}</p>
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

  const labels: Record<string, string> = {
    draft: 'Draft',
    submitted: 'Submitted',
    under_review: 'Review',
    accepted: 'Accepted',
    rejected: 'Rejected',
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-bold ${styles[status] || styles.draft}`}>
      {labels[status] || status}
    </span>
  )
}

function ActionCard({ icon, label, description, href }: { 
  icon: string
  label: string
  description: string
  href: string
}) {
  return (
    <Link 
      href={href}
      className="p-4 bg-slate-50 rounded-xl hover:bg-primary/5 hover:border-primary/20 border-2 border-transparent transition-all group"
    >
      <span className="material-symbols-outlined text-2xl text-slate-400 group-hover:text-primary mb-2 block">
        {icon}
      </span>
      <p className="font-medium text-slate-900">{label}</p>
      <p className="text-sm text-slate-500">{description}</p>
    </Link>
  )
}
