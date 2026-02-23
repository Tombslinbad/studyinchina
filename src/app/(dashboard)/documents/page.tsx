'use client'

import { useQuery, useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import { useState, useCallback } from 'react'

const documentTypes = [
  { value: 'passport', label: 'Passport', icon: 'passport' },
  { value: 'transcript', label: 'Academic Transcript', icon: 'school' },
  { value: 'recommendation', label: 'Recommendation Letter', icon: 'recommend' },
  { value: 'personal_statement', label: 'Personal Statement', icon: 'description' },
  { value: 'cv', label: 'CV/Resume', icon: 'badge' },
  { value: 'language_test', label: 'Language Test (IELTS/TOEFL/HSK)', icon: 'translate' },
  { value: 'other', label: 'Other Document', icon: 'folder' },
]

const statusConfig: Record<string, { color: string; icon: string; label: string }> = {
  pending: { color: 'bg-yellow-100 text-yellow-600', icon: 'schedule', label: 'Pending Review' },
  verified: { color: 'bg-green-100 text-green-600', icon: 'verified', label: 'Verified' },
  rejected: { color: 'bg-red-100 text-red-600', icon: 'error', label: 'Rejected' },
}

export default function DocumentsPage() {
  const documents = useQuery(api.documents.getMyDocuments)
  const addDocument = useMutation(api.documents.addDocument)
  const deleteDocument = useMutation(api.documents.deleteDocument)
  
  const [uploading, setUploading] = useState(false)
  const [selectedType, setSelectedType] = useState('')
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }, [])

  const handleUpload = async (file: File) => {
    if (!selectedType) return

    setUploading(true)
    
    try {
      // Upload file to Convex storage (simulated for now)
      // In production, this would use Convex file storage
      const fakeFileUrl = URL.createObjectURL(file)
      
      await addDocument({
        name: file.name,
        type: selectedType as any,
        fileUrl: fakeFileUrl,
      })
      
      setSelectedType('')
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const file = e.dataTransfer.files?.[0]
    if (file) await handleUpload(file)
  }, [selectedType])

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) await handleUpload(file)
  }

  const isLoading = documents === undefined

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-black tracking-tight">
          Document <span className="text-primary">Vault</span>
        </h1>
        <p className="text-slate-600">Upload and manage your application documents</p>
      </div>

      {/* Upload Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard 
          icon="folder" 
          label="Total Documents" 
          value={documents?.length || 0} 
        />
        <StatCard 
          icon="verified" 
          label="Verified" 
          value={documents?.filter(d => d.status === 'verified').length || 0}
          color="green"
        />
        <StatCard 
          icon="schedule" 
          label="Pending" 
          value={documents?.filter(d => d.status === 'pending').length || 0}
          color="yellow"
        />
      </div>

      {/* Upload Section */}
      <div className="glass-panel rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">upload_file</span>
          Upload New Document
        </h2>

        {/* Document Type Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
          {documentTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedType === type.value
                  ? 'border-primary bg-primary/5'
                  : 'border-slate-200 hover:border-primary/30'
              }`}
            >
              <span className={`material-symbols-outlined text-2xl mb-2 block ${
                selectedType === type.value ? 'text-primary' : 'text-slate-400'
              }`}>
                {type.icon}
              </span>
              <span className={`text-sm font-medium ${
                selectedType === type.value ? 'text-primary' : 'text-slate-600'
              }`}>
                {type.label}
              </span>
            </button>
          ))}
        </div>

        {/* Drop Zone */}
        <div className="relative">
          <input
            type="file"
            id="document-upload"
            className="hidden"
            onChange={handleFileInput}
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            disabled={!selectedType || uploading}
          />
          
          <label
            htmlFor="document-upload"
            className={`
              block w-full text-center rounded-xl p-8 cursor-pointer transition-all border-2 border-dashed
              ${!selectedType 
                ? 'bg-slate-100 border-slate-200 cursor-not-allowed' 
                : uploading 
                  ? 'bg-slate-100 border-slate-300'
                  : dragActive 
                    ? 'bg-blue-50 border-blue-400'
                    : 'bg-white border-slate-300 hover:border-primary'
              }
            `}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            {uploading ? (
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="text-lg font-medium text-primary">Uploading...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3">
                <span className="material-symbols-outlined text-4xl text-primary">cloud_upload</span>
                <p className="text-lg font-bold text-slate-900">
                  {selectedType ? 'Click or drag file to upload' : 'Select a document type first'}
                </p>
                <p className="text-sm text-slate-600">PDF, JPG, PNG, DOC up to 10MB</p>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Your Documents</h2>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : documents && documents.length > 0 ? (
          <div className="grid gap-3">
            {documents.map((doc) => {
              const docType = documentTypes.find(t => t.value === doc.type)
              const status = statusConfig[doc.status]
              
              return (
                <div 
                  key={doc._id}
                  className="bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">
                        {docType?.icon || 'folder'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{doc.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>{docType?.label || doc.type}</span>
                        <span>•</span>
                        <span>Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${status.color}`}>
                      <span className="material-symbols-outlined text-xs">{status.icon}</span>
                      {status.label}
                    </span>
                    
                    {doc.fileUrl && (
                      <a 
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <span className="material-symbols-outlined text-slate-600">download</span>
                      </a>
                    )}
                    
                    <button 
                      onClick={() => deleteDocument({ documentId: doc._id })}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <span className="material-symbols-outlined text-red-600">delete</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl">
            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">folder_open</span>
            <p className="text-slate-600">No documents uploaded yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ 
  icon, 
  label, 
  value, 
  color = 'blue' 
}: { 
  icon: string
  label: string
  value: number
  color?: 'blue' | 'green' | 'yellow'
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
  }

  return (
    <div className="bg-white rounded-xl p-4 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${colors[color]} flex items-center justify-center`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-sm text-slate-600">{label}</p>
      </div>
    </div>
  )
}
