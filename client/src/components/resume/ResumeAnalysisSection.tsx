interface ResumeAnalysisSectionProps {
  title: string;
  items: string[];
}

const ResumeAnalysisSection = ({
  title,
  items,
}: ResumeAnalysisSectionProps) => {
  return (
    <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm">
      <h3 className="mb-5 text-lg font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
        <span className="h-6 w-1.5 rounded-full bg-yellow-500"></span>
        {title}
      </h3>

      {items.length === 0 ? (
        <p className="text-sm font-medium text-neutral-500">
          No items available.
        </p>
      ) : (
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex items-start gap-3 rounded-xl border border-neutral-800/50 bg-neutral-900/50 px-4 py-3 text-sm leading-relaxed text-neutral-300"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.8)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResumeAnalysisSection;