
import { GoogleGenAI, Type } from "@google/genai";
import { PatientProfile, LabResult, SymptomLog } from "../types";

/**
 * Initializes the Gemini AI client using the API key from environment variables.
 */
const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is missing");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// Generates a clinical summary for the patient's next visit.
export const generateClinicalSummary = async (patient: PatientProfile): Promise<string> => {
  try {
    const ai = getAIClient();
    const prompt = `
      You are an expert Oncology Assistant specialized in helping Black women navigate breast cancer care.
      Analyze this patient record and provide a "Visit Summary" for their next oncology appointment.
      
      Focus on:
      1. Breast Cancer details (Stage, ER/PR/HER2 status).
      2. Symptom trends (Fatigue, Nausea, Pain).
      3. Emotional wellbeing.
      4. Highlight specific health equity considerations or community resources that might be relevant.

      Keep it supportive, concise, and structured for a 15-minute doctor visit.

      Patient Record: ${JSON.stringify(patient)}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    return response.text || "Summary unavailable.";
  } catch (error) {
    console.error("Clinical summary error:", error);
    return "Error generating specialized summary.";
  }
};

// Generates a Patient Engagement Report for tracking treatment adherence and self-care in a clinical trial context.
export const generateEngagementReport = async (patient: PatientProfile): Promise<string> => {
  try {
    const ai = getAIClient();
    const symptomCount = patient.symptoms.length;
    const medAdherence = patient.medications.map(m => `${m.name}: ${m.adherence?.dosesTaken || 0} doses`).join(", ");
    
    const prompt = `
      You are a Clinical Trial Engagement Specialist. 
      Analyze this participant's data and provide a brief (2-sentence) "Study Momentum Statement."
      Focus on: 
      1. The quality and consistency of their data contribution (symptom logs, medication tracking).
      2. Their role as a vital contributor to oncology research.
      
      Context:
      - Symptom Diaries submitted: ${symptomCount}
      - Med Adherence recorded: ${medAdherence}
      - Wearable uptime: 96%
      
      Tone: Clinical, Professional, and Gratitude-focused. Highlight "Health Literacy" and "Protocol Fidelity".
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    return response.text || "Your consistent logging provides high-quality data for this study.";
  } catch (error) {
    return "Consistently logging data ensures the integrity of the clinical protocol.";
  }
};

// Analyzes symptom trends and provides insights
export const analyzeSymptomTrends = async (symptoms: SymptomLog[], medications: any[]): Promise<string> => {
  try {
    const ai = getAIClient();
    const prompt = `
      Analyze the following symptom log and medication list for a breast cancer patient.
      Identify any potential correlations or noteworthy trends.
      Keep the tone supportive, empowering, and clinical but accessible.
      
      Symptom History: ${JSON.stringify(symptoms.slice(-7))}
      Medications: ${JSON.stringify(medications)}
      
      Provide a 2-3 sentence insight focusing on patterns or reassurance.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    return response.text || "Continue logging to see trends.";
  } catch (error) {
    return "Log more data to receive personalized symptom insights.";
  }
};

// Summarizes lab results into plain language for the patient.
export const summarizeLabResult = async (lab: LabResult): Promise<string> => {
  try {
    const ai = getAIClient();
    const prompt = `
      Translate the following medical pathology/lab report into plain, supportive language for a patient.
      Explain what terms like "margins", "Nottingham Grade", and "hormone receptors" mean if present.
      Focus on being clear and reducing anxiety.
      
      Report: ${lab.rawReport || lab.testName}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    return response.text || "Translation unavailable.";
  } catch (error) {
    console.error("Lab summarization error:", error);
    return "Error interpreting results.";
  }
};

// Generates a list of questions for the patient to ask their oncologist.
export const generateVisitQuestions = async (patient: PatientProfile): Promise<string[]> => {
  try {
    const ai = getAIClient();
    const prompt = `
      You are an oncology expert. You want to empower your patient to have a high-quality discussion.
      Generate 5 professional and medically specific questions for the patient to ask their oncology team.
      
      Current Patient Status:
      - Diagnosis: ${patient.diagnoses[0]?.condition} (${patient.diagnoses[0]?.stage})
      - Medications: ${patient.medications.map(m => m.name).join(", ")}
      - Latest Symptom Data: Fatigue is ${patient.symptoms[patient.symptoms.length - 1]?.fatigue || 'untracked'}/10.

      Instructions:
      1. Write the questions in the first person ("Can you explain...").
      2. Frame each question with a clinical recommendation prefix such as "Your clinical team suggests asking:" or "Clinical Recommendation:".
      3. Focus on tumor markers, medication side-effect management, and long-term recovery.

      Return as a simple bulleted list of strings.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    return response.text?.split('\n').filter(q => q.trim().length > 0).map(q => q.replace(/^\s*[\*\-\d\.]+\s*/, '').trim()) || ["What are the next steps in my treatment?"];
  } catch (error) {
    console.error("Visit questions error:", error);
    return ["What are the next steps in my treatment?"];
  }
};

// Generates an empowering daily insight for the patient.
export const generateDailyInsight = async (patient: PatientProfile): Promise<{title: string, content: string}> => {
  try {
    const ai = getAIClient();
    const prompt = `
      Generate a short, empowering "Daily Wisdom" for a Black woman navigating breast cancer. 
      Focus on self-care, health advocacy, or mental resilience.
      Return JSON with "title" and "content".
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING }
          },
          propertyOrdering: ["title", "content"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Daily insight error:", error);
    return { title: "Strength & Grace", content: "You are the best advocate for your own health. Trust your voice today." };
  }
};

export const explainMedicalConcept = async (
  concept: string, 
  type: 'condition' | 'medication' | 'general', 
  patient: PatientProfile
): Promise<{title: string, explanation: string, actionItem: string}> => {
  try {
    const ai = getAIClient();
    const prompt = `
      Explain the following ${type}: "${concept}".
      The patient is a Black woman navigating breast cancer. 
      Tailor the explanation to be supportive, culturally sensitive, and easy to understand.
      Provide one specific "action item" for the patient to discuss with their care team.
      
      Return as JSON with "title", "explanation", and "actionItem".
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            explanation: { type: Type.STRING },
            actionItem: { type: Type.STRING },
          },
          propertyOrdering: ["title", "explanation", "actionItem"],
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error: any) {
    return { 
      title: concept, 
      explanation: "Unable to retrieve explanation.",
      actionItem: "Discuss this with your doctor."
    };
  }
};
