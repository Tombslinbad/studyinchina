'use client'

import { useQuery } from 'convex/react'
import { api } from '@convex/_generated/api'
import { useState } from 'react'

export default function StudentsPage() {
  const users = useQuery(api.users.getAllUsers)
  const applications = useQuery(api.applications.getAllApplications)
  
  const [searchQuery, setSearchQuery] = useState('')

  const students = users?.filter(u => u.role === 'student') || []
  
  const filteredStudents = students.filter(s => 
    searchQuery === '' || 
    s.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.country?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStudentApplications = (userId: string) => {
    return applications?.filter(a => a.userId === userId) || []
  }

  const isLoading = users === undefined || applications === undefined

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-black tracking-tight">
          <span className="text-primary">Students</span>
        </h1>
        <p className="text-slate-600">Manage student accounts and applications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Students" value={students.length} />
        <StatCard label="Active Applications" value={applications?.length || 0} color="blue" />
        <StatCard label="Accepted" value={applications?.filter(a => a.status === 'accepted').length || 0} color="green" />
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search students by name, email, or country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 bg-white border-2 border-slate-200 rounded-xl pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          search
        </span>
      </div>

      {/* Students List */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredStudents.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-bold text-slate-700">Student</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-slate-700">Country</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-slate-700">Applications</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-slate-700">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-slate-700">Joined</th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => {
                  const studentApps = getStudentApplications(student._id)
                  return (
                    <tr key={student._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="font-bold text-primary text-sm">
                              {student.fullName?.charAt(0) || student.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{student.fullName || 'Unnamed'}</p>
                            <p className="text-sm text-slate-500">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600">{student.country || 'Not specified'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-100 rounded-full text-sm font-bold text-slate-600">
                          {studentApps.length}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {studentApps.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {studentApps.slice(0, 2).map((app, i) => (
                              <span key={i} className={`px-2 py-0.5 rounded-full text-xs ${
                                app.status === 'accepted' ? 'bg-green-100 text-green-600' :
                                app.status === 'submitted' ? 'bg-blue-100 text-blue-600' :
                                'bg-slate-100 text-slate-600'
                              }`}>
                                {app.status.replace('_', ' ')}
                              </span>
                            ))}
                            {studentApps.length > 2 && (
                              <span className="text-xs text-slate-400">+{studentApps.length - 2}</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400">No applications</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(student.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                          <span className="material-symbols-outlined text-slate-600">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl">
          <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">group</span>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {searchQuery ? 'No students found' : 'No students yet'}
          </h3>
          <p className="text-slate-600">
            {searchQuery ? 'Try a different search term' : 'Students will appear here when they sign up'}
          </p>
        </div>
      )}
    </div>
  )
}

function StatCard({ 
  label, 
  value, 
  color = 'default' 
}: { 
  label: string
  value: number
  color?: 'default' | 'blue' | 'green'
}) {
  const colors = {
    default: 'bg-white',
    blue: 'bg-blue-50',
    green: 'bg-green-50',
  }

  return (
    <div className={`${colors[color]} rounded-2xl p-4 shadow-sm`}>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-600">{label}</p>
    </div>
  )
}
