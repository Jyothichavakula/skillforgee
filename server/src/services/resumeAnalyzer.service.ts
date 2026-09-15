import User from "../models/User.js";
import ResumeAnalysis from "../models/ResumeAnalysis.js";

import {
  extractResumeText,
} from "./resumeParser.service.js";

import {
  generateAIResponse,
} from "../ai/ai.service.js";

interface AnalyzeResumeInput {
  userId: string;
  fileName: string;
  fileType: "PDF" | "DOCX";
  buffer: Buffer;
}

interface AIResumeAnalysis {
  atsScore: number;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  suggestions: string[];
}

export const analyzeResume = async (
  data: AnalyzeResumeInput
) => {
  const user = await User.findById(
    data.userId
  ).select(
    "firstName lastName degree university skills"
  );

  if (!user) {
    throw new Error("User not found");
  }

  const resumeText =
    await extractResumeText(
      data.buffer,
      data.fileType
    );

  const systemMessage = `
You are SkillForge AI Resume Analyzer.

Analyze the student's resume for software engineering
and placement preparation.

Return ONLY valid JSON.

Do not use markdown.
Do not wrap the response in code fences.

The JSON must have exactly these fields:

{
  "atsScore": number,
  "strengths": string[],
  "weaknesses": string[],
  "missingSkills": string[],
  "suggestions": string[]
}

Rules:

1. atsScore must be between 0 and 100.
2. Evaluate clarity, structure, technical skills,
   projects, education, experience, measurable impact,
   and relevance for software engineering roles.
3. Do not invent information that is not present.
4. Missing skills should only include reasonable
   technical skills that would strengthen a software
   engineering resume.
5. Suggestions must be actionable.
6. Keep each array concise.
7. The analysis should be useful for student placements.

========================================
STUDENT PROFILE
========================================

Name:
${user.firstName} ${user.lastName}

Degree:
${user.degree ?? "Not provided"}

University:
${user.university ?? "Not provided"}

Skills listed in SkillForge:
${
  user.skills.length > 0
    ? user.skills.join(", ")
    : "None"
}

========================================
RESUME
========================================

${resumeText}
`;

  const response =
    await generateAIResponse([
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content:
          "Analyze this resume for my software engineering placement preparation.",
      },
    ]);

  let parsedAnalysis: AIResumeAnalysis;

  try {
    parsedAnalysis = JSON.parse(
      response.content
    ) as AIResumeAnalysis;
  } catch {
    throw new Error(
      "AI returned an invalid resume analysis format"
    );
  }

  if (
    typeof parsedAnalysis.atsScore !==
      "number" ||
    parsedAnalysis.atsScore < 0 ||
    parsedAnalysis.atsScore > 100
  ) {
    throw new Error(
      "Invalid ATS score returned by AI"
    );
  }

  const analysis =
    await ResumeAnalysis.create({
      userId: data.userId,
      fileName: data.fileName,
      fileType: data.fileType,
      resumeText,
      atsScore: Math.round(
        parsedAnalysis.atsScore
      ),
      strengths:
        parsedAnalysis.strengths ?? [],
      weaknesses:
        parsedAnalysis.weaknesses ?? [],
      missingSkills:
        parsedAnalysis.missingSkills ?? [],
      suggestions:
        parsedAnalysis.suggestions ?? [],
      analyzedAt: new Date(),
    });

  return analysis;
};

export const getMyResumeAnalyses =
  async (userId: string) => {
    return ResumeAnalysis.find({
      userId,
    })
      .select(
        "-resumeText"
      )
      .sort({
        createdAt: -1,
      });
  };

export const getResumeAnalysisById =
  async (
    userId: string,
    analysisId: string
  ) => {
    const analysis =
      await ResumeAnalysis.findOne({
        _id: analysisId,
        userId,
      }).select("-resumeText");

    if (!analysis) {
      throw new Error(
        "Resume analysis not found"
      );
    }

    return analysis;
  };