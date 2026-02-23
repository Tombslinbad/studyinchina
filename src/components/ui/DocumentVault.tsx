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
  { value: 'language_test', label: 'Language Test', icon: 'translate' },
  { value: 'jw202_form', label: 'JW202 Form', icon: 'description' },
  { value: 'dq_form', label: 'DQ Form', icon: 'article' },
  { value: 'other', label: 'Other', icon: 'folder' },
]

const statusConfig: Record<string, { color: string; icon: string; label: string }> = {
  pending: { color: 'bg-yellow-100 text-yellow-600', icon: 'schedule', label: 'Pending Review' },
  verified: { color: 'bg-green-100 text-green-600', icon: 'verified', label: 'Verified' },
  rejected: { color: 'bg-red-100 text-red-600', icon: 'error', label: 'Rejected' },
}

export default function DocumentVault() {
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
      // Simulate file upload - in production, upload to Convex storage
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
    <div className="glass-panel rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-blue-600 text-xl">safe</span>
          </div>
          <div>
            <h3 className="text-xl font-display font-bold">The Vault</h3>
            <p className="text-sm text-slate-500">
              {isLoading ? 'Loading...' : `${documents?.filter(d => d.status === 'verified').length || 0}/${documents?.length || 0} Verified`}
            </p>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-3 mb-6 max-h-80 overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center h-20">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        ) : documents && documents.length > 0 ? (
          documents.map((doc) => {
            const docType = documentTypes.find(t => t.value === doc.type)
            const status = statusConfig[doc.status]
            
            return (
              <div 
                key={doc._id}
                className="flex items-center justify-between p-3 rounded-xl border-2 border-slate-100 hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    doc.status === 'verified' ? 'bg-green-100' : 
                    doc.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    <span className="material-symbols-outlined text-sm">
                      {docType?.icon || 'folder'}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 text-sm truncate">{doc.name}</p>
                    <p className="text-xs text-slate-500">{docType?.label || doc.type}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${status.color}`}>
                    <span className="material-symbols-outlined text-xs">{status.icon}</span>
                    {status.label}
                  </span>
                  
                  <button 
                    onClick={() => deleteDocument({ documentId: doc._id })}
                    className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <span className="material-symbols-outlined text-red-600 text-sm">delete</span>
                  </button>
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-8 bg-slate-50 rounded-xl">
            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">folder_open</span>
            <p className="text-slate-500 text-sm">No documents yet</p>
          </div>
        )}
      </div>

      {/* Upload Section */}
      <div className="border-t border-slate-200 pt-4">
        <p className="text-sm font-medium text-slate-700 mb-3">Upload New Document</p>
        
        {/* Type Selection */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {documentTypes.slice(0, 6).map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`p-2 rounded-lg border-2 text-xs font-medium transition-all ${
                selectedType === type.value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-slate-200 hover:border-primary/30 text-slate-600'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Drop Zone */}
        <div className="relative">
          <input
            type="file"
            id="vault-upload"
            className="hidden"
            onChange={handleFileInput}
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            disabled={!selectedType || uploading}
          />
          
          <label
            htmlFor="vault-upload"
            className={`
              block w-full text-center rounded-xl p-4 cursor-pointer transition-all border-2 border-dashed
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
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <span className="text-sm font-medium text-primary">Uploading...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-primary">upload_file</span>
                <span className="text-sm text-slate-600">
                  {selectedType ? 'Click or drop file' : 'Select type first'}
                </span>
              </div>
            )}
          </label>
        </div>
      </div>
    </div>
  )
}
