'use client'

import { useQuery } from 'convex/react'
import { api } from '@convex/_generated/api'
import Link from 'next/link'
import { useState } from 'react'

// Document types for The Vault
const documentTypes = [
  { value: 'passport', label: 'Passport', icon: 'passport' },
  { value: 'transcript', label: 'Academic Transcript', icon: 'school' },
  { value: 'recommendation', label: 'Recommendation Letter', icon: 'recommend' },
  { value: 'personal_statement', label: 'Personal Statement', icon: 'description' },
  { value: 'cv', label: 'CV/Resume', icon: 'badge' },
  { value: 'language_test', label: 'Language Test', icon: 'translate' },
]

// Countries for visa tracker
const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
]

export default function DashboardPage() {
  const applications = useQuery(api.applications.getMyApplications)
  const documents = useQuery(api.documents.getMyDocuments)
  const tasks = useQuery(api.tasks.getMyTasks)
  
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedDocType, setSelectedDocType] = useState('')

  const isLoading = applications === undefined || documents === undefined || tasks === undefined

  // Stats
  const appCount = applications?.length || 0
  const docCount = documents?.length || 0
  const pendingTasks = tasks?.filter(t => !t.completed).length || 0
  const verifiedDocs = documents?.filter(d => d.status === 'verified').length || 0

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          icon="school" 
          label="Applications" 
          value={appCount}
          subtext="Active"
          color="blue"
        />
        <StatCard 
          icon="folder" 
          label="Documents" 
          value={docCount}
          subtext="Uploaded"
          color="emerald"
        />
        <StatCard 
          icon="pending_actions" 
          label="Pending Tasks" 
          value={pendingTasks}
          subtext="To complete"
          color="amber"
        />
        <Link href="/visa-tracker" className="group">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all h-full">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">Check</p>
            <p className="text-sm text-slate-500">Visa Status</p>
          </div>
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Application Pipeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Application Pipeline */}
          <section className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">menu_book</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Application Pipeline</h2>
                  <p className="text-sm text-slate-500">{appCount} active application{appCount !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <Link 
                href="/applications" 
                className="text-sm font-medium text-slate-600 hover:text-blue-600 px-4 py-2 border border-gray-200 rounded-lg hover:border-blue-300 transition-all"
              >
                View All
              </Link>
            </div>

            {appCount > 0 ? (
              <div className="space-y-3">
                {applications?.slice(0, 3).map((app) => (
                  <div 
                    key={app._id} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-900">{app.universityName}</h3>
                      <p className="text-sm text-slate-500">{app.programName}</p>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl text-gray-400">school</span>
                </div>
                <p className="text-slate-500 mb-6">No applications yet</p>
                <Link 
                  href="/search" 
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25"
                >
                  Browse Universities
                </Link>
              </div>
            )}
          </section>

          {/* 30-Day Visa-Free Scouting */}
          <section className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined">travel_explore</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">30-Day Visa-Free Scouting</h2>
                <p className="text-sm text-slate-500">Check 2026 eligibility</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Your Country
                </label>
                <div className="relative">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                  >
                    <option value="">Choose your country...</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
                    public
                  </span>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              <button
                disabled={!selectedCountry}
                className="w-full py-3 bg-gray-100 text-gray-400 rounded-xl font-semibold disabled:cursor-not-allowed hover:bg-blue-600 hover:text-white transition-all disabled:hover:bg-gray-100 disabled:hover:text-gray-400"
              >
                Check Eligibility
              </button>
            </div>
          </section>
        </div>

        {/* Right Column - The Vault */}
        <div className="space-y-6">
          {/* The Vault */}
          <section className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600">safe</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">The Vault</h2>
                <p className="text-sm text-slate-500">{verifiedDocs}/{docCount} Verified</p>
              </div>
            </div>

            {docCount > 0 ? (
              <div className="space-y-2 mb-6">
                {documents?.slice(0, 4).map((doc) => (
                  <div key={doc._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-sm">description</span>
                      <span className="text-sm font-medium text-slate-700">{doc.name}</span>
                    </div>
                    <span className={`w-2 h-2 rounded-full ${
                      doc.status === 'verified' ? 'bg-green-500' : 
                      doc.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 mb-6">
                <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">folder_open</span>
                <p className="text-sm text-slate-500">No documents yet</p>
              </div>
            )}

            {/* Upload New Document */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Upload New Document</h3>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                {documentTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedDocType(type.value)}
                    className={`p-3 text-xs font-medium rounded-lg border transition-all text-left ${
                      selectedDocType === type.value
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-white border-gray-200 text-slate-600 hover:border-blue-300'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              <div className="relative">
                <input
                  type="file"
                  disabled={!selectedDocType}
                  className="hidden"
                  id="document-upload"
                />
                <label
                  htmlFor="document-upload"
                  className={`flex items-center gap-2 w-full px-4 py-3 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                    selectedDocType
                      ? 'border-blue-300 bg-blue-50 hover:bg-blue-100'
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                  }`}
                >
                  <span className="material-symbols-outlined text-blue-600">upload_file</span>
                  <span className="text-sm text-slate-600">
                    {selectedDocType ? 'Click to upload' : 'Select type first'}
                  </span>
                </label>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function StatCard({ 
  icon, 
  label, 
  value, 
  subtext,
  color 
}: { 
  icon: string
  label: string
  value: number
  subtext: string
  color: 'blue' | 'emerald' | 'amber'
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all">
      <div className={`w-10 h-10 ${colors[color]} rounded-xl flex items-center justify-center mb-3`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-600',
    submitted: 'bg-blue-100 text-blue-600',
    under_review: 'bg-amber-100 text-amber-600',
    accepted: 'bg-emerald-100 text-emerald-600',
    rejected: 'bg-red-100 text-red-600',
  }

  const labels: Record<string, string> = {
    draft: 'Draft',
    submitted: 'Submitted',
    under_review: 'Under Review',
    accepted: 'Accepted',
    rejected: 'Rejected',
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || styles.draft}`}>
      {labels[status] || status}
    </span>
  )
}
