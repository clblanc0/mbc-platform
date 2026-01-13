
import { PatientProfile, Status } from "./types";

/** 
 * BRAND CONFIGURATION
 * Permanent branding configuration. No user overrides allowed.
 */
export const APP_CONFIG = {
  brandName: "Curanostics",
  logoUrl: "/logo.png"
};

export const MOCK_PATIENT: PatientProfile = {
  id: "pt-12345",
  name: "Sarah Jenkins",
  dob: "1988-05-12",
  bloodType: "O+",
  allergies: ["Penicillin", "Latex"],
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
