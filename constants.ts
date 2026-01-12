
import { PatientProfile, Status } from "./types";

export const MOCK_PATIENT: PatientProfile = {
  id: "P-77281",
  name: "Participant",
  dob: "1982-06-15",
  bloodType: "A-",
  allergies: ["Latex"],
  connectedSources: {
    fasten: true,
    validic: true
  },
  medications: [
    {
      id: "m1",
      name: "Tamoxifen",
      dosage: "20mg",
      frequency: "Once daily",
      prescribedBy: "Oncology Team",
      source: "Epic",
      status: Status.Active,
      adherence: { dosesTaken: 1 }
    },
    {
      id: "m2",
      name: "Zofran",
      dosage: "4mg",
      frequency: "Every 8 hours as needed for nausea",
      prescribedBy: "Oncology Team",
      source: "Manual",
      status: Status.Active,
      adherence: { dosesTaken: 0 }
    }
  ],
  diagnoses: [
    {
      id: "d1",
      condition: "Invasive Ductal Carcinoma (Left Breast)",
      diagnosedDate: "2023-10-12",
      stage: "Stage IIA",
      subtypes: ["ER+", "PR+", "HER2-"],
      notes: "Completed lumpectomy Nov 2023. Currently in hormone therapy.",
      source: "Rhapsody",
      clinician: "Oncology Specialist",
      status: Status.Active,
    },
    {
      id: "d2",
      condition: "Hypertension",
      diagnosedDate: "2018-04-05",
      notes: "Managed with diet and exercise.",
      source: "Epic",
      clinician: "Primary Care Physician",
      status: Status.Active,
    }
  ],
  labs: [
    {
      id: "l1",
      date: "2023-11-05",
      testName: "Pathology Report - Post Surgery",
      value: "Clear Margins",
      isNormal: true,
      rawReport: "Specimen labeled 'Left Breast Lumpectomy'. Histologic type: Invasive ductal carcinoma. Tumor size: 1.8 cm. Nottingham Grade: 2. Margins: No tumor at ink. Lymph nodes: 0/2 sentinel nodes positive."
    }
  ],
  symptoms: [
    { id: "sym-log-01", date: "2024-03-01", fatigue: 4, nausea: 1, pain: 2, mood: 7 },
    { id: "sym-log-02", date: "2024-03-02", fatigue: 6, nausea: 2, pain: 3, mood: 6 },
    { id: "sym-log-03", date: "2024-03-03", fatigue: 5, nausea: 1, pain: 2, mood: 8 },
    { id: "sym-log-04", date: "2024-03-04", fatigue: 3, nausea: 0, pain: 1, mood: 9 },
  ],
  wearableData: {
    heartRate: [
      { date: "2024-03-01", value: 72 },
      { date: "2024-03-02", value: 75 },
      { date: "2024-03-03", value: 68 },
      { date: "2024-03-04", value: 70 },
      { date: "2024-03-05", value: 82 },
      { date: "2024-03-06", value: 74 },
      { date: "2024-03-07", value: 71 },
    ],
    steps: [
      { date: "2024-03-01", value: 4500 },
      { date: "2024-03-02", value: 3200 },
      { date: "2024-03-03", value: 5100 },
      { date: "2024-03-04", value: 6200 },
      { date: "2024-03-05", value: 2800 },
      { date: "2024-03-06", value: 4000 },
      { date: "2024-03-07", value: 5500 },
    ],
    sleep: [
      { date: "2024-03-01", value: 7.2 },
      { date: "2024-03-02", value: 6.5 },
      { date: "2024-03-03", value: 8.0 },
      { date: "2024-03-04", value: 7.5 },
      { date: "2024-03-05", value: 5.8 },
      { date: "2024-03-06", value: 6.9 },
      { date: "2024-03-07", value: 7.4 },
    ]
  },
  surveys: [
    {
      id: "s1",
      type: "GAD-7",
      date: "2024-02-15",
      score: 8,
      interpretation: "Mild Anxiety",
    }
  ],
};
