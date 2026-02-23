'use client'

import { useQuery, useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function UniversitiesPage() {
  const universities = useQuery(api.universities.getAll)
  const deleteUniversity = useMutation(api.universities.remove)
  
  const [searchQuery, setSearchQuery] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)

  const filteredUniversities = universities?.filter(u => 
    searchQuery === '' || 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    setDeleting(id)
    try {
      await deleteUniversity({ id: id as any })
    } catch (error) {
      console.error('Delete failed:', error)
    } finally {
      setDeleting(null)
    }
  }

  const isLoading = universities === undefined

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-black tracking-tight">
            <span className="text-primary">Universities</span>
          </h1>
          <p className="text-slate-600">Manage university database</p>
        </div>
        <Link href="/universities/new" className="btn-primary">
          <span className="material-symbols-outlined">add</span>
          Add University
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search universities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 bg-white border-2 border-slate-200 rounded-xl pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          search
        </span>
      </div>

      {/* Universities Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredUniversities && filteredUniversities.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredUniversities.map((uni) => (
            <div key={uni._id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0 relative">
                  {uni.imageUrl ? (
                    <Image
                      src={uni.imageUrl}
                      alt={uni.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl text-slate-300">school</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-slate-900 truncate">{uni.name}</h3>
                      <p className="text-sm text-slate-500">{uni.city}, {uni.province}</p>
                    </div>
                    {uni.isMoeCertified && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full font-medium shrink-0">
                        MOE
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {uni.techHubs?.slice(0, 3).map((hub) => (
                      <span key={hub} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                        {hub}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                    <span>Tuition: ¥{uni.tuitionBachelor?.toLocaleString() || 'N/A'}</span>
                    <span>{uni.hasDorm ? '✓ Dorm' : '✗ No Dorm'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                <Link 
                  href={`/universities/${uni._id}`}
                  className="flex-1 btn-secondary text-sm text-center"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(uni._id)}
                  disabled={deleting === uni._id}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                >
                  {deleting === uni._id ? '...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl">
          <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">school</span>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {searchQuery ? 'No universities found' : 'No universities yet'}
          </h3>
          <p className="text-slate-600 mb-6">
            {searchQuery ? 'Try a different search term' : 'Add your first university to the database'}
          </p>
          <Link href="/universities/new" className="btn-primary">
            Add University
          </Link>
        </div>
      )}
    </div>
  )
}
