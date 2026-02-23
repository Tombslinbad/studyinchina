'use client'

import { useState, useEffect } from 'react'
import { getVisaFreeCountry, getAllVisaFreeCountries } from '@/lib/data'
import Link from 'next/link'

interface VisaTrackerProps {
  initialCountry?: string
}

export default function VisaTracker({ initialCountry = '' }: VisaTrackerProps) {
  const [countryCode, setCountryCode] = useState(initialCountry)
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const countries = getAllVisaFreeCountries()

  useEffect(() => {
    if (initialCountry) {
      handleCheck()
    }
  }, [initialCountry])

  const handleCheck = async () => {
    if (!countryCode) return
    
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
    setShowResult(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCheck()
  }

  const result = countryCode ? getVisaFreeCountry(countryCode) : null

  return (
    <div className="glass-panel rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-xl">travel_explore</span>
        </div>
        <div>
          <h3 className="text-xl font-display font-bold">30-Day Visa-Free Scouting</h3>
          <p className="text-sm text-slate-600">Check 2026 eligibility</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-2 text-slate-700">
            Select Your Country
          </label>
          <div className="relative">
            <select
              id="country"
              value={countryCode}
              onChange={(e) => {
                setCountryCode(e.target.value)
                setShowResult(false)
              }}
              className="w-full h-12 bg-white border-2 border-slate-200 rounded-xl pl-12 pr-4 text-base focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 appearance-none cursor-pointer"
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
          type="submit"
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
      </form>
      
      {showResult && result && (
        <div className="mt-6 p-4 rounded-xl border-2 animate-fade-in">
          {result.eligible ? (
            <div className="text-center">
              <div className="text-4xl mb-2">{result.flag}</div>
              <h4 className="text-lg font-bold text-green-600 mb-2">
                🎉 {result.days} Days Visa-Free!
              </h4>
              <p className="text-sm text-slate-600 mb-4">
                Citizens of {result.name} can enter China visa-free for scouting.
              </p>
              <Link href="/search" className="btn-primary text-sm">
                Plan Your Trip
              </Link>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-2">{result.flag}</div>
              <h4 className="text-lg font-bold text-blue-600 mb-2">
                Student Visa Required
              </h4>
              <p className="text-sm text-slate-600 mb-4">
                You&apos;ll need an X1 or X2 visa to study in China.
              </p>
              <Link href="/visa-tracker" className="btn-primary text-sm">
                Start Visa Application
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
