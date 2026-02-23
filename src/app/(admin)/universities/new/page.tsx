'use client'

import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewUniversityPage() {
  const router = useRouter()
  const createUniversity = useMutation(api.universities.create)
  
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    province: '',
    ranking: '',
    isMoeCertified: true,
    hasDorm: true,
    tuitionBachelor: '',
    tuitionMaster: '',
    tuitionLanguage: '',
    techHubs: '',
    website: '',
    description: '',
    hskRequirement: '',
    ieltsRequirement: '',
    toeflRequirement: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createUniversity({
        name: formData.name,
        city: formData.city,
        province: formData.province,
        ranking: formData.ranking ? parseInt(formData.ranking) : undefined,
        isMoeCertified: formData.isMoeCertified,
        hasDorm: formData.hasDorm,
        tuitionBachelor: formData.tuitionBachelor ? parseInt(formData.tuitionBachelor) : undefined,
        tuitionMaster: formData.tuitionMaster ? parseInt(formData.tuitionMaster) : undefined,
        tuitionLanguage: formData.tuitionLanguage ? parseInt(formData.tuitionLanguage) : undefined,
        techHubs: formData.techHubs.split(',').map(s => s.trim()).filter(Boolean),
        website: formData.website || undefined,
        description: formData.description || undefined,
        hskRequirement: formData.hskRequirement ? parseInt(formData.hskRequirement) : undefined,
        ieltsRequirement: formData.ieltsRequirement ? parseFloat(formData.ieltsRequirement) : undefined,
        toeflRequirement: formData.toeflRequirement ? parseInt(formData.toeflRequirement) : undefined,
      })
      
      router.push('/universities')
    } catch (error) {
      console.error('Create failed:', error)
      alert('Failed to create university')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-display font-black tracking-tight">
          Add <span className="text-primary">University</span>
        </h1>
        <p className="text-slate-600">Add a new university to the database</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold border-b pb-2">Basic Information</h2>
          
          <div>
            <label className="block text-sm font-medium mb-1">University Name *</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full h-11 px-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary"
              placeholder="e.g., Tsinghua University"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City *</label>
              <input
                required
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full h-11 px-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                placeholder="e.g., Beijing"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Province *</label>
              <input
                required
                type="text"
                value={formData.province}
                onChange={(e) => setFormData({...formData, province: e.target.value})}
                className="w-full h-11 px-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                placeholder="e.g., Beijing"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ranking</label>
              <input
                type="number"
                value={formData.ranking}
                onChange={(e) => setFormData({...formData, ranking: e.target.value})}
                className="w-full h-11 px-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                placeholder="e.g., 1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="w-full h-11 px-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary h-24 resize-none"
              placeholder="Brief description of the university..."
            />
          </div>
        </div>

        {/* Tuition */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold border-b pb-2">Tuition Fees (CNY/year)</h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Bachelor</label>
              <input
                type="number"
                value={formData.tuitionBachelor}
                onChange={(e) => setFormData({...formData, tuitionBachelor: e.target.value})}
                className="w-full h-11 px-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                placeholder="28000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Master</label>
              <input
                type="number"
                value={formData.tuitionMaster}
                onChange={(e) => setFormData({...formData, tuitionMaster: e.target.value})}
                className="w-full h-11 px-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                placeholder="32000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Language</label>
              <input
                type="number"
                value={formData.tuitionLanguage}
                onChange={(e) => setFormData({...formData, tuitionLanguage: e.target.value})}
                className="w-full h-11 px-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                placeholder="18000"
              />
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold border-b pb-2">Requirements</h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">HSK Level</label>
              <input
                type="number"
                min="0"
                max="6"
                value={formData.hskRequirement}
                onChange={(e) => setFormData({...formData, hskRequirement: e.target.value})}
                className="w-full h-11 px-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                placeholder="4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">IELTS</label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="9"
                value={formData.ieltsRequirement}
                onChange={(e) => setFormData({...formData, ieltsRequirement: e.target.value})}
                className="w-full h-11 px-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                placeholder="6.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">TOEFL</label>
              <input
                type="number"
                value={formData.toeflRequirement}
                onChange={(e) => setFormData({...formData, toeflRequirement: e.target.value})}
                className="w-full h-11 px-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                placeholder="80"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold border-b pb-2">Features</h2>
          
          <div>
            <label className="block text-sm font-medium mb-1">Tech Hubs (comma separated)</label>
            <input
              type="text"
              value={formData.techHubs}
              onChange={(e) => setFormData({...formData, techHubs: e.target.value})}
              className="w-full h-11 px-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary"
              placeholder="AI, Robotics, Semiconductors"
            />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isMoeCertified}
                onChange={(e) => setFormData({...formData, isMoeCertified: e.target.checked})}
                className="w-5 h-5 rounded border-2 border-slate-300 text-primary focus:ring-primary"
              />
              <span className="text-sm">MOE Certified</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasDorm}
                onChange={(e) => setFormData({...formData, hasDorm: e.target.checked})}
                className="w-5 h-5 rounded border-2 border-slate-300 text-primary focus:ring-primary"
              />
              <span className="text-sm">Has Dormitory</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4 border-t">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Creating...</span>
              </div>
            ) : (
              'Create University'
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push('/universities')}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
