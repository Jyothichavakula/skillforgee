import { useState } from "react";
import { X, Plus, Sparkles } from "lucide-react";

interface SkillsSectionProps {
  skills: string[];
  onSave: (skills: string[]) => void;
  isSaving: boolean;
}

function SkillsSection({ skills, onSave, isSaving }: SkillsSectionProps) {
  const [currentSkills, setCurrentSkills] = useState<string[]>(skills || []);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !currentSkills.includes(newSkill.trim())) {
      setCurrentSkills([...currentSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setCurrentSkills(currentSkills.filter((s) => s !== skillToRemove));
  };

  const handleSave = () => {
    onSave(currentSkills);
  };

  return (
    <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm md:p-8">
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-white">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          Technical Skills
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          Add your technical skills. These help us match you with the right jobs and learning path.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-bold text-neutral-300">
            Add a Skill
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. React, Python, Machine Learning"
              className="flex-1 rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="flex items-center gap-2 rounded-xl bg-neutral-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-neutral-700"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-neutral-500">
            Your Skills
          </h3>
          {currentSkills.length === 0 ? (
            <p className="text-sm text-neutral-500">No skills added yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {currentSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-3 py-1.5 text-sm font-bold text-yellow-500"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-1 rounded-full p-0.5 text-yellow-500/70 hover:bg-yellow-500/20 hover:text-yellow-500"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end border-t border-neutral-800 pt-6">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-xl bg-yellow-500 px-8 py-3.5 text-sm font-extrabold text-black transition hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Skills"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SkillsSection;