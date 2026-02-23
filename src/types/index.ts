export interface School {
  id: string
  name: string
  ranking: number
  city: string
  province: string
  isMoeCertified: boolean
  tuitionBachelor: number
  tuitionMaster: number
  tuitionLanguage: number
  hasDorm: boolean
  techHubs: string[]
  programs: Program[]
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

export interface Program {
  id: string
  name: string
  degree: string
  duration: string
  language: string
  requirements: {
    hsk: number | null
    ielts: number | null
    toefl: number | null
  }
  tuition: number
  description: string
  tags: string[]
}

export interface StudentLead {
  id: string
  name: string
  email: string
  country: string
  status: 'Lead' | 'Applied' | 'Accepted' | 'Visa Approved' | 'Landed'
  passportStatus: 'Verified' | 'Pending' | 'Not Submitted'
  medicalStatus: 'Verified' | 'Pending' | 'Not Submitted'
  policeClearanceStatus: 'Verified' | 'Pending' | 'Not Submitted'
  createdAt: string
  lastContact: string
}

export interface VisaFreeCountry {
  code: string
  name: string
  days: number
  eligible: boolean
  flag?: string
}

export interface DocumentFile {
  id: string
  name: string
  type: 'passport' | 'transcript' | 'recommendation' | 'personal_statement' | 'cv' | 'language_test' | 'jw202_form' | 'dq_form' | 'other'
  status: 'pending' | 'verified' | 'rejected'
  uploadDate: string
  fileUrl?: string
}

export interface University {
  _id: string
  name: string
  city: string
  province: string
  ranking?: number
  isMoeCertified: boolean
  tuitionBachelor?: number
  tuitionMaster?: number
  tuitionPhd?: number
  tuitionLanguage?: number
  hasDorm: boolean
  techHubs?: string[]
  imageUrl?: string
  website?: string
  description?: string
  hskRequirement?: number
  ieltsRequirement?: number
  toeflRequirement?: number
  scholarships?: Scholarship[]
  createdAt: number
  updatedAt: number
}

export interface Scholarship {
  name: string
  amount?: number
  coverage?: string
}

export interface Application {
  _id: string
  userId: string
  universityId?: string
  universityName: string
  programName: string
  degreeType: 'bachelor' | 'master' | 'phd'
  status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected'
  pipelineStage?: 'inquiry' | 'documents' | 'submitted' | 'review' | 'jw202' | 'embassy' | 'approved'
  submittedAt?: number
  updatedAt: number
  assignedTo?: string
  notes?: string
}

export interface VisaApplication {
  _id: string
  userId: string
  applicationId: string
  country: string
  currentStage: 'inquiry' | 'documents_collected' | 'submitted' | 'under_review' | 'approved' | 'jw202_issued' | 'visa_stamped'
  progress: number
  jw202Number?: string
  dqNumber?: string
  embassyLocation?: string
  appointmentDate?: number
  timeline?: VisaTimelineEvent[]
  createdAt: number
  updatedAt: number
}

export interface VisaTimelineEvent {
  stage: string
  date: number
  notes?: string
}
