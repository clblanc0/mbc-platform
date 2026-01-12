
export enum Status {
  Active = "Active",
  Completed = "Completed",
  Paused = "Paused"
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  source?: string;
  status: Status;
  adherence?: {
    lastTaken?: string;
    dosesTaken: number;
  };
}

export interface Diagnosis {
  id: string;
  condition: string;
  diagnosedDate: string;
  stage?: string;
  subtypes?: string[]; // e.g. ER+, HER2-
  notes: string;
  source?: string;
  clinician?: string;
  status: Status;
}

export interface LabResult {
  id: string;
  date: string;
  testName: string;
  value: string;
  unit?: string;
  isNormal: boolean;
  rawReport?: string;
}

export interface SymptomLog {
  id: string;
  date: string;
  fatigue: number; // 0-10
  nausea: number;
  pain: number;
  mood: number;
  otherSymptoms?: string[];
  notes?: string;
}

export interface WearableMetric {
  date: string;
  value: number;
}

export interface WearableData {
  heartRate: WearableMetric[];
  steps: WearableMetric[];
  sleep: WearableMetric[];
}

export interface SurveyResult {
  id: string;
  type: "GAD-7" | "SDOH" | "PHQ-9";
  date: string;
  score: number;
  interpretation: string;
  requestedBy?: string;
  details?: Record<string, string>;
}

export interface PatientProfile {
  id: string;
  name: string;
  email?: string;
  dob: string;
  bloodType: string;
  allergies: string[];
  medications: Medication[];
  diagnoses: Diagnosis[];
  surveys: SurveyResult[];
  labs: LabResult[];
  symptoms: SymptomLog[];
  wearableData: WearableData;
  connectedSources: {
    fasten: boolean;
    validic: boolean;
  };
}
