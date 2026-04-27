import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type PatientStatus = 'active' | 'critical' | 'discharged'

export type Patient = {
  id: string
  fullName: string
  mrn: string
  dob: string
  sex: 'F' | 'M' | 'X'
  department: string
  attending: string
  lastVisit: string
  diagnosis: string
  status: PatientStatus
  riskScore: number
}

export type PatientViewMode = 'grid' | 'list'

const seedPatients: Patient[] = [
  {
    id: 'p-10021',
    fullName: 'Jordan Lee',
    mrn: 'MRN-882901',
    dob: '1988-04-12',
    sex: 'M',
    department: 'Cardiology',
    attending: 'Dr. Amira Hassan',
    lastVisit: '2026-04-22',
    diagnosis: 'Hypertension, Stage 2',
    status: 'active',
    riskScore: 42,
  },
  {
    id: 'p-10044',
    fullName: 'Morgan Patel',
    mrn: 'MRN-771204',
    dob: '1974-11-03',
    sex: 'F',
    department: 'Endocrinology',
    attending: 'Dr. Luis Ortega',
    lastVisit: '2026-04-20',
    diagnosis: 'Type 2 Diabetes Mellitus',
    status: 'critical',
    riskScore: 78,
  },
  {
    id: 'p-10058',
    fullName: 'Casey Nguyen',
    mrn: 'MRN-660933',
    dob: '1992-07-29',
    sex: 'X',
    department: 'Pulmonology',
    attending: 'Dr. Priya Desai',
    lastVisit: '2026-04-18',
    diagnosis: 'Asthma, moderate persistent',
    status: 'active',
    riskScore: 31,
  },
  {
    id: 'p-10072',
    fullName: 'Riley Brooks',
    mrn: 'MRN-551877',
    dob: '1961-01-16',
    sex: 'F',
    department: 'Orthopedics',
    attending: 'Dr. Noah Kim',
    lastVisit: '2026-03-02',
    diagnosis: 'Post-op total knee arthroplasty',
    status: 'discharged',
    riskScore: 18,
  },
  {
    id: 'p-10089',
    fullName: 'Taylor Washington',
    mrn: 'MRN-449021',
    dob: '2001-09-08',
    sex: 'M',
    department: 'Emergency',
    attending: 'Dr. Elena Rossi',
    lastVisit: '2026-04-26',
    diagnosis: 'Acute dehydration',
    status: 'active',
    riskScore: 55,
  },
  {
    id: 'p-10103',
    fullName: 'Jamie Carter',
    mrn: 'MRN-338744',
    dob: '1956-05-21',
    sex: 'F',
    department: 'Nephrology',
    attending: 'Dr. Omar Farouk',
    lastVisit: '2026-04-25',
    diagnosis: 'CKD Stage 3b',
    status: 'active',
    riskScore: 64,
  },
]

type PatientsState = {
  patients: Patient[]
  detailViewMode: PatientViewMode
}

const initialState: PatientsState = {
  patients: seedPatients,
  detailViewMode: 'grid',
}

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setDetailViewMode(state, action: PayloadAction<PatientViewMode>) {
      state.detailViewMode = action.payload
    },
  },
})

export const { setDetailViewMode } = patientsSlice.actions
export default patientsSlice.reducer
