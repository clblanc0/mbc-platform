
import { PatientProfile, Status } from "./types";

/** 
 * BRAND CONFIGURATION
 * This is the permanent home for your branding.
 */
export const APP_CONFIG = {
  brandName: "Curanostics",
  logoUrl: "data:image/png;base64,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"
};

export const MOCK_PATIENT: PatientProfile = {
  id: "pt-12345",
  name: "Participant",
  dob: "1988-05-12",
  bloodType: "O+",
  allergies: ["Penicillin"],
  medications: [
    {
      id: "m1",
      name: "Tamoxifen",
      dosage: "20mg",
      frequency: "Daily",
      prescribedBy: "Dr. Arisara",
      status: Status.Active,
      adherence: { dosesTaken: 28 }
    },
    {
      id: "m2",
      name: "Zoladex",
      dosage: "3.6mg",
      frequency: "Every 4 weeks",
      prescribedBy: "Dr. Arisara",
      status: Status.Active,
      adherence: { dosesTaken: 4 }
    }
  ],
  diagnoses: [
    {
      id: "d1",
      condition: "Invasive Ductal Carcinoma",
      diagnosedDate: "2024-02-15",
      stage: "Stage II",
      subtypes: ["ER+", "PR+", "HER2-"],
      notes: "Right breast, Nottingham Grade 2",
      status: Status.Active
    }
  ],
  surveys: [
    {
      id: "s1",
      type: "GAD-7",
      date: "2024-11-20",
      score: 4,
      interpretation: "Minimal Anxiety"
    }
  ],
  labs: [
    {
      id: "l1",
      date: "2024-11-15",
      testName: "Pathology Report",
      value: "See Summary",
      isNormal: true,
      rawReport: "Specimen A: Right breast mass. Diagnosis: Invasive ductal carcinoma. Nottingham Grade 2. Margins clear (>2mm). ER/PR strongly positive. HER2 negative by IHC (score 1+)."
    }
  ],
  symptoms: [
    { id: "log1", date: "2024-11-25", fatigue: 4, nausea: 1, pain: 2, mood: 7, notes: "Mild joint stiffness in the morning." },
    { id: "log2", date: "2024-11-24", fatigue: 3, nausea: 0, pain: 1, mood: 8 },
    { id: "log3", date: "2024-11-23", fatigue: 5, nausea: 2, pain: 3, mood: 6 }
  ],
  wearableData: {
    heartRate: [
      { date: "2024-11-19", value: 72 },
      { date: "2024-11-20", value: 74 },
      { date: "2024-11-21", value: 71 },
      { date: "2024-11-22", value: 75 },
      { date: "2024-11-23", value: 78 },
      { date: "2024-11-24", value: 73 },
      { date: "2024-11-25", value: 72 },
    ],
    steps: [
      { date: "2024-11-19", value: 4500 },
      { date: "2024-11-20", value: 5200 },
      { date: "2024-11-21", value: 3800 },
      { date: "2024-11-22", value: 6100 },
      { date: "2024-11-23", value: 4900 },
      { date: "2024-11-24", value: 5500 },
      { date: "2024-11-25", value: 4200 },
    ],
    sleep: [
      { date: "2024-11-19", value: 6.5 },
      { date: "2024-11-20", value: 7.2 },
      { date: "2024-11-21", value: 5.8 },
      { date: "2024-11-22", value: 7.0 },
      { date: "2024-11-23", value: 6.2 },
      { date: "2024-11-24", value: 8.1 },
      { date: "2024-11-25", value: 7.4 },
    ]
  },
  connectedSources: {
    fasten: true,
    validic: true
  }
};
