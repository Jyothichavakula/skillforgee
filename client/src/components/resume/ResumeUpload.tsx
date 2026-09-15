import { useState } from "react";
import type { ChangeEvent } from "react";
import { FileText, Upload, Loader2 } from "lucide-react";

interface ResumeUploadProps {
  onAnalyze: (file: File) => void;
  isLoading: boolean;
}

const ResumeUpload = ({ onAnalyze, isLoading }: ResumeUploadProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Please upload a PDF or DOCX file.");
      return;
    }

    setFile(selectedFile);
  };

  const handleAnalyze = () => {
    if (!file) return;
    onAnalyze(file);
  };

  return (
    <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center gap-4 border-b border-neutral-800 pb-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
          <FileText size={24} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Upload Your Resume
          </h2>
          <p className="text-sm text-neutral-400">
            Upload a PDF or DOCX file for AI analysis
          </p>
        </div>
      </div>

      <label className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-700 bg-neutral-900/50 px-6 py-12 text-center transition duration-300 hover:border-yellow-500 hover:bg-yellow-500/5">
        <div className="mb-4 rounded-full bg-neutral-800 p-4 transition duration-300 group-hover:bg-yellow-500/20 group-hover:text-yellow-500">
          <Upload size={32} className="text-neutral-500 group-hover:text-yellow-500" />
        </div>

        <p className="text-lg font-bold text-white transition group-hover:text-yellow-400">
          {file ? file.name : "Click or drag to choose your resume"}
        </p>

        <p className="mt-2 text-sm font-bold uppercase tracking-wide text-neutral-500">
          PDF or DOCX
        </p>

        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      <button
        type="button"
        onClick={handleAnalyze}
        disabled={!file || isLoading}
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-yellow-500 px-6 py-4 text-base font-extrabold text-black transition hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Analyzing Resume...
          </>
        ) : (
          "Analyze Resume"
        )}
      </button>
    </div>
  );
};

export default ResumeUpload;