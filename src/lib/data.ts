import { School, StudentLead, VisaFreeCountry } from '@/types'
import schoolsData from '@/data/schools.json'
import visaFreeCountriesData from '@/data/visaFreeCountries.json'

export function getAllSchools(): School[] {
  return schoolsData as School[]
}

export function getSchoolById(id: string): School | undefined {
  return schoolsData.find((school: School) => school.id === id)
}

export function searchSchools(query: string): School[] {
  const q = query.toLowerCase()
  return schoolsData.filter((school: School) => 
    school.name.toLowerCase().includes(q) ||
    school.city.toLowerCase().includes(q) ||
    school.province.toLowerCase().includes(q) ||
    school.techHubs.some(hub => hub.toLowerCase().includes(q))
  )
}

export function getAllVisaFreeCountries(): VisaFreeCountry[] {
  return visaFreeCountriesData as VisaFreeCountry[]
}

export function getVisaFreeCountry(code: string): VisaFreeCountry | undefined {
  return visaFreeCountriesData.find((country: VisaFreeCountry) => 
    country.code.toUpperCase() === code.toUpperCase()
  )
}

export function getStudentLeads(): StudentLead[] {
  return [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      country: 'US',
      status: 'Visa Approved',
      passportStatus: 'Verified',
      medicalStatus: 'Verified',
      policeClearanceStatus: 'Verified',
      createdAt: '2024-01-15',
      lastContact: '2024-02-10'
    },
    {
      id: '2',
      name: 'Emma Johnson',
      email: 'emma.j@example.com',
      country: 'GB',
      status: 'Applied',
      passportStatus: 'Verified',
      medicalStatus: 'Pending',
      policeClearanceStatus: 'Not Submitted',
      createdAt: '2024-01-20',
      lastContact: '2024-02-08'
    },
    {
      id: '3',
      name: 'Liu Wei',
      email: 'liu.wei@example.com',
      country: 'CN',
      status: 'Lead',
      passportStatus: 'Not Submitted',
      medicalStatus: 'Not Submitted',
      policeClearanceStatus: 'Not Submitted',
      createdAt: '2024-02-01',
      lastContact: '2024-02-01'
    }
  ]
}

export function formatCurrency(amount: number, currency: 'CNY' | 'USD' | 'EUR' = 'CNY'): string {
  const rates = {
    CNY: 1,
    USD: 0.14,
    EUR: 0.13
  }
  
  const converted = amount * rates[currency]
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(converted)
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Landed': return 'text-green-600 bg-green-50';
    case 'Visa Approved': return 'text-blue-600 bg-blue-50';
    case 'Accepted': return 'text-primary bg-blue-50';
    case 'Applied': return 'text-yellow-600 bg-yellow-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export function getDocumentStatusColor(status: string): string {
  switch (status) {
    case 'Verified': return 'text-green-600';
    case 'Pending': return 'text-yellow-600';
    default: return 'text-red-600';
  }
}

export const campusImages = {
  main: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwMlHYE-miz0PiqUTYQayq5nRMAG7p1sq1Hyt4E5JNQioHwpCaLESpWDr5kxlJ2lm50WNQkfKEul6guLYLLZC0Zq1yKt6j_IpaIM66431xmXdOhm06QRZmyTJ2TpdjlE54Z0jbTObyeYYhrsqeshuuKJ9rPV87DsrUdDlJt3W5m0VeHBiNjtQxLnM5gR2xGdFA-h1ynI_2EgIeVBeF8aephUUmnQnXLru1ytBNJKeBFgkBU5D55Me2KwvpyREYrKsKU2lN2bZACg",
  corporate: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKRnKsSlKD6T_DmCiW6TB2f3_PMGbFsSCwErfJgiFanhAwasp_9q0uT-ae3eS_3284e0lBAon8ytN5Evuh_aYCKMU85lxrpzS6gPReXaTn-x0izMnJEfe6UMY4lCHY2ycAWKsb_dMWoot0O7I1qX_2pPqZUguRQZiudvQoWVMMFj-Kn7yDn53ZZmLxwCf1nmaQFmbPQzutWX1TkqY98bcNS7x5WDIvKskVUFe0nDa-bdS8ihl_4lnqSA9KN9HX6Q-ZsjNbjvOvng",
  lab: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbq4tvtqWeCm_P4nr_UwOmNdQTZOI4iL6kloruB-xDxx7ivX_DtchYmFcJfGDnlyJnd7fQwdT6sc9tK5pPwV5E8qTgosDH9JHuIuP-DVnjdwhDbozckGbUrHWuho6qquv_p-a1-hivzluPljvlfmTWqiJHafp7-nwRa4dgA3_W_UfcJiMB6jMdyDnT521Fr4WviKkL1RhFErJXoNQZxyJT3_1abzNcAa_P5V1OjsoJhxyARZu0ZrfdXvaZBfNX9dFCABkyS4BS7Q",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfRBVmn5bhson25Nh_bp4SSkmXsY1PdafC6Aen5x6hxezEvYz4AtMMCHyQ1qH9zPkjdNd279yv4leNWMGLHzrzwpHDK_R7gB17g6JbVL0lRBF05tlAGXMQFi7yO8-fsNG6MP-1roBBVZfjIALWQ1jugxzOgecLEj86sk9JVaesGP5VPEoMdi3ERmV0N3-SnuTbJZ_VhTOsuxBfzAFyT85VMsKtTxiXetR-pw1qncWKY1zaUuQ8nTJ2_R7eJFMDay_Z4NoL2m7yKw"
};

export const programImages = {
  techHub: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKRnKsSlKD6T_DmCiW6TB2f3_PMGbFsSCwErfJgiFanhAwasp_9q0uT-ae3eS_3284e0lBAon8ytN5Evuh_aYCKMU85lxrpzS6gPReXaTn-x0izMnJEfe6UMY4lCHY2ycAWKsb_dMWoot0O7I1qX_2pPqZUguRQZiudvQoWVMMFj-Kn7yDn53ZZmLxwCf1nmaQFmbPQzutWX1TkqY98bcNS7x5WDIvKskVUFe0nDa-bdS8ihl_4lnqSA9KN9HX6Q-ZsjNbjvOvng",
  research: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbq4tvtqWeCm_P4nr_UwOmNdQTZOI4iL6kloruB-xDxx7ivX_DtchYmFcJfGDnlyJnd7fQwdT6sc9tK5pPwV5E8qTgosDH9JHuIuP-DVnjdwhDbozckGbUrHWuho6qquv_p-a1-hivzluPljvlfmTWqiJHafp7-nwRa4dgA3_W_UfcJiMB6jMdyDnT521Fr4WviKkL1RhFErJXoNQZxyJT3_1abzNcAa_P5V1OjsoJhxyARZu0ZrfdXvaZBfNX9dFCABkyS4BS7Q"
};
