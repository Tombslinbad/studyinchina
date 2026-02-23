'use client'

import { useState } from 'react'
import { getVisaFreeCountry, getAllVisaFreeCountries } from '@/lib/data'
import Link from 'next/link'

const visaStages = [
  { id: 'inquiry', label: 'Inquiry', description: 'Initial consultation and eligibility check', icon: 'contact_support' },
  { id: 'documents', label: 'Documents', description: 'Collect and verify all required documents', icon: 'folder_copy' },
  { id: 'submitted', label: 'Submitted', description: 'Application submitted to university', icon: 'send' },
  { id: 'review', label: 'Under Review', description: 'University reviewing application', icon: 'hourglass_top' },
  { id: 'jw202', label: 'JW202 Issued', description: 'Visa application form issued', icon: 'description' },
  { id: 'embassy', label: 'Embassy', description: 'Apply at Chinese embassy/consulate', icon: 'account_balance' },
  { id: 'approved', label: 'Approved', description: 'Visa stamped in passport', icon: 'check_circle' },
]

export default function VisaTrackerPage() {
  const [countryCode, setCountryCode] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [currentStage, setCurrentStage] = useState(2) // Mock current stage
  const [loading, setLoading] = useState(false)
  
  const countries = getAllVisaFreeCountries()
  const result = countryCode ? getVisaFreeCountry(countryCode) : null

  const handleCheck = async () => {
    if (!countryCode) return
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
    setShowResult(true)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-black tracking-tight">
          Visa <span className="text-primary">Tracker</span>
        </h1>
        <p className="text-slate-600">Track your visa application progress and check eligibility</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Visa Free Checker */}
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-xl">travel_explore</span>
            </div>
            <div>
              <h2 className="text-xl font-display font-bold">30-Day Visa-Free Scouting</h2>
              <p className="text-sm text-slate-600">Check 2026 eligibility</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Select Your Country
              </label>
              <div className="relative">
                <select
                  value={countryCode}
                  onChange={(e) => {
                    setCountryCode(e.target.value)
                    setShowResult(false)
                  }}
                  className="w-full h-12 bg-white border-2 border-slate-200 rounded-xl pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 appearance-none cursor-pointer"
                >
                  <option value="">Choose your country...</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400">expand_more</span>
                </div>
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <span className="material-symbols-outlined text-primary">public</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleCheck}
              disabled={loading || !countryCode}
              className={`w-full h-12 rounded-xl font-bold transition-all ${
                loading || !countryCode
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-blue-600 shadow-lg shadow-primary/30'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Checking...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">verified</span>
                  <span>Check Eligibility</span>
                </div>
              )}
            </button>
          </div>
          
          {showResult && result && (
            <div className={`mt-6 p-4 rounded-xl border-2 ${
              result.eligible ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'
            }`}>
              {result.eligible ? (
                <div className="text-center">
                  <div className="text-4xl mb-2">{result.flag}</div>
                  <h3 className="text-lg font-bold text-green-600 mb-1">
                    🎉 {result.days} Days Visa-Free!
                  </h3>
                  <p className="text-sm text-green-700">
                    Citizens of {result.name} can enter China visa-free for up to {result.days} days for scouting purposes.
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-4xl mb-2">{result.flag}</div>
                  <h3 className="text-lg font-bold text-blue-600 mb-1">
                    Student Visa Required
                  </h3>
                  <p className="text-sm text-blue-700">
                    You&apos;ll need to apply for an X1 or X2 visa to study in China.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <h2 className="text-xl font-display font-bold">Your Visa Status</h2>
          
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-slate-600">Current Stage</p>
                <p className="text-xl font-bold text-slate-900">{visaStages[currentStage].label}</p>
              </div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">
                  {visaStages[currentStage].icon}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Progress</span>
                <span className="font-bold text-primary">{Math.round(((currentStage + 1) / visaStages.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${((currentStage + 1) / visaStages.length) * 100}%` }}
                />
              </div>
            </div>
            
            <p className="text-sm text-slate-600 mb-4">{visaStages[currentStage].description}</p>
            
            <Link href="#timeline" className="btn-secondary w-full text-center block text-sm">
              View Full Timeline
            </Link>
          </div>

          {/* Important Dates */}
          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">event</span>
              Important Dates
            </h3>
            <div className="space-y-3">
              <DateRow 
                label="Application Deadline" 
                date="March 31, 2026" 
                daysLeft={45}
                urgent
              />
              <DateRow 
                label="JW202 Expected" 
                date="May 15, 2026" 
                daysLeft={90}
              />
              <DateRow 
                label="Semester Start" 
                date="September 1, 2026" 
                daysLeft={180}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Full Timeline */}
      <section id="timeline" className="glass-panel rounded-2xl p-6">
        <h2 className="text-xl font-display font-bold mb-6">Visa Application Timeline</h2>
        
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200">
            <div 
              className="absolute top-0 left-0 w-full bg-primary transition-all duration-500"
              style={{ height: `${(currentStage / (visaStages.length - 1)) * 100}%` }}
            />
          </div>
          
          {/* Stages */}
          <div className="space-y-6">
            {visaStages.map((stage, index) => {
              const isCompleted = index < currentStage
              const isCurrent = index === currentStage
              const isPending = index > currentStage
              
              return (
                <div key={stage.id} className="relative flex items-start gap-4 pl-1">
                  {/* Status Icon */}
                  <div className={`
                    relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0
                    ${isCompleted ? 'bg-primary text-white' : ''}
                    ${isCurrent ? 'bg-primary text-white ring-4 ring-primary/30 animate-pulse' : ''}
                    ${isPending ? 'bg-slate-200 text-slate-400' : ''}
                  `}>
                    <span className="material-symbols-outlined text-sm">
                      {isCompleted ? 'check' : stage.icon}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className={`
                    flex-1 p-4 rounded-xl transition-all
                    ${isCurrent ? 'bg-primary/5 border-2 border-primary/20' : 'bg-white'}
                  `}>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-bold ${isCurrent ? 'text-primary' : 'text-slate-900'}`}>
                        {stage.label}
                      </h3>
                      {isCurrent && (
                        <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full font-medium">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{stage.description}</p>
                    
                    {isCurrent && (
                      <div className="mt-3 flex gap-2">
                        <button className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg font-medium hover:bg-blue-600 transition-colors">
                          Update Progress
                        </button>
                        <button className="px-3 py-1.5 bg-white border-2 border-slate-200 text-slate-600 text-sm rounded-lg font-medium hover:bg-slate-50 transition-colors">
                          View Requirements
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-blue-600">help</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-2">Need Help?</h3>
            <p className="text-blue-700 mb-4">
              Our visa specialists are here to guide you through every step of the process.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Schedule Consultation
              </button>
              <Link href="/documents" className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                View Document Checklist
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function DateRow({ label, date, daysLeft, urgent }: { 
  label: string
  date: string
  daysLeft: number
  urgent?: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-slate-900">{label}</p>
        <p className="text-sm text-slate-500">{date}</p>
      </div>
      <span className={`text-lg font-bold ${urgent ? 'text-red-500' : 'text-slate-400'}`}>
        {daysLeft}d
      </span>
    </div>
  )
}
