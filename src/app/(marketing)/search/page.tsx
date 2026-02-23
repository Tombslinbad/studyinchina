'use client'

import { useState } from 'react'
import { getAllSchools, searchSchools } from '@/lib/data'
import { School } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const allSchools = getAllSchools()
  const schools = query ? searchSchools(query) : allSchools

  return (
    <div className="min-h-screen bg-background-light pt-20">
      <main className="max-w-7xl mx-auto px-6 lg:px-20 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-display font-black tracking-tight mb-4">
            Find Your <span className="text-primary">Perfect University</span>
          </h1>
          <p className="text-xl text-slate-600">
            Search through MOE-certified Chinese universities
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-10">
          <input
            type="text"
            placeholder="Search by university name, city, or field..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-16 bg-white border-2 border-slate-200 rounded-2xl pl-14 pr-6 text-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
          <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-2xl">
            search
          </span>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>

        {schools.length === 0 && (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
              school
            </span>
            <p className="text-xl text-slate-600">No universities found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  )
}

function SchoolCard({ school }: { school: School }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="h-48 bg-slate-200 relative overflow-hidden">
        {school.imageUrl ? (
          <Image
            src={school.imageUrl}
            alt={school.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10">
            <span className="material-symbols-outlined text-6xl text-primary/30">
              school
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-bold text-primary">#{school.ranking}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-slate-400 text-sm">location_on</span>
          <span className="text-sm text-slate-600">{school.city}, {school.province}</span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{school.name}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {school.techHubs.slice(0, 3).map((hub) => (
            <span key={hub} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
              {hub}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
          <span>Tuition: ¥{school.tuitionBachelor.toLocaleString()}/year</span>
          <span className={school.hasDorm ? 'text-green-600' : 'text-red-600'}>
            {school.hasDorm ? 'Dorm Available' : 'No Dorm'}
          </span>
        </div>

        {school.isMoeCertified && (
          <div className="flex items-center gap-2 mb-4 p-2 bg-green-50 rounded-lg">
            <span className="material-symbols-outlined text-green-600 text-sm">verified</span>
            <span className="text-sm font-medium text-green-700">MOE Certified</span>
          </div>
        )}

        <Link 
          href={`/auth?redirect=/applications&university=${school.id}`}
          className="btn-primary w-full text-center block"
        >
          Apply Now
        </Link>
      </div>
    </div>
  )
}
