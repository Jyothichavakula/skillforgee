import ResumeUpload from "../../components/resume/ResumeUpload";
import ResumeScore from "../../components/resume/ResumeScore";
import ResumeAnalysisSection from "../../components/resume/ResumeAnalysisSection";
import ResumeHistory from "../../components/resume/ResumeHistory";
import {
  useAnalyzeResume,
  useResumeAnalyses,
} from "../../hooks/useResume";
import { FileText } from "lucide-react";

const Resume = () => {
  const analyzeMutation = useAnalyzeResume();
  const { data: analyses = [] } = useResumeAnalyses();

  const latestAnalysis = analyzeMutation.data;

  const handleAnalyze = (file: File) => {
    analyzeMutation.mutate(file);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4 pb-20 md:p-6 lg:p-8">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-6">
        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-yellow-500 mb-2">
          <FileText className="h-4 w-4" />
          Career Preparation
        </p>

        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Resume Analyzer
        </h1>

        <p className="mt-2 max-w-2xl text-lg text-neutral-400">
          Upload your resume and get AI-powered feedback to improve your ATS compatibility and career profile.
        </p>
      </div>

      {/* Upload */}
      <ResumeUpload
        onAnalyze={handleAnalyze}
        isLoading={analyzeMutation.isPending}
      />

      {/* Error */}
      {analyzeMutation.isError && (
        <div className="rounded-2xl border border-red-500/20 bg-[#121215] p-6 text-center text-sm font-bold text-red-500">
          Failed to analyze the resume. Please try again.
        </div>
      )}

      {/* Analysis */}
      {latestAnalysis && (
        <div className="space-y-6 pt-4">
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2 border-b border-neutral-800 pb-4">
            <span className="h-8 w-2 rounded-full bg-yellow-500"></span>
            Resume Analysis
          </h2>

          <ResumeScore score={latestAnalysis.atsScore} />

          <div className="grid gap-6 md:grid-cols-2">
            <ResumeAnalysisSection
              title="Strengths"
              items={latestAnalysis.strengths}
            />

            <ResumeAnalysisSection
              title="Weaknesses"
              items={latestAnalysis.weaknesses}
            />

            <ResumeAnalysisSection
              title="Missing Skills"
              items={latestAnalysis.missingSkills}
            />

            <ResumeAnalysisSection
              title="Suggestions"
              items={latestAnalysis.suggestions}
            />
          </div>
        </div>
      )}

      {/* History */}
      <div className="pt-4">
        <h2 className="text-xl font-extrabold text-white mb-6 flex items-center gap-2 border-b border-neutral-800 pb-4">
          <span className="h-8 w-2 rounded-full bg-yellow-500"></span>
          Analysis History
        </h2>
        <ResumeHistory analyses={analyses} />
      </div>
    </div>
  );
};

export default Resume;