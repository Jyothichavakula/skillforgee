import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import type {
  UpdateProfileData,
  UserProfile,
} from "../../api/user.api";

interface ProfileFormProps {
  user: UserProfile;
  onSubmit: (data: UpdateProfileData) => void;
  isSaving: boolean;
}

function ProfileForm({
  user,
  onSubmit,
  isSaving,
}: ProfileFormProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    college: "",
    degree: "",
    branch: "",
    graduationYear: "",
  });

  useEffect(() => {
    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
      college: user.college || "",
      degree: user.degree || "",
      branch: user.branch || "",
      graduationYear: user.graduationYear
        ? String(user.graduationYear)
        : "",
    });
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      college: form.college,
      degree: form.degree,
      branch: form.branch,
      graduationYear: form.graduationYear
        ? Number(form.graduationYear)
        : undefined,
    });
  };

  return (
    <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm md:p-8">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white">
          Personal & Academic Information
        </h2>

        <p className="mt-2 text-sm text-neutral-400">
          Keep your profile information up to date.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Personal Information */}
        <div>
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wide text-neutral-500 border-b border-neutral-800 pb-2">
            Personal Information
          </h3>

          <div className="grid gap-6 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-bold text-neutral-300">
                First Name
              </label>

              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-neutral-300">
                Last Name
              </label>

              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
              />
            </div>

          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-bold text-neutral-300">
            Email
          </label>

          <input
            value={user.email}
            disabled
            className="w-full cursor-not-allowed rounded-xl border border-neutral-800/50 bg-neutral-900/30 px-4 py-3 text-sm text-neutral-500"
          />

          <p className="mt-2 text-xs text-neutral-500">
            Email cannot be changed here.
          </p>
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-bold text-neutral-300">
            Phone
          </label>

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
          />
        </div>

        {/* Academic */}
        <div>
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wide text-neutral-500 border-b border-neutral-800 pb-2">
            Academic Information
          </h3>

          <div className="space-y-6">

            <div>
              <label className="mb-2 block text-sm font-bold text-neutral-300">
                College
              </label>

              <input
                name="college"
                value={form.college}
                onChange={handleChange}
                placeholder="Enter college name"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-300">
                  Degree
                </label>

                <input
                  name="degree"
                  value={form.degree}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-300">
                  Branch
                </label>

                <input
                  name="branch"
                  value={form.branch}
                  onChange={handleChange}
                  placeholder="e.g. CSE"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
                />
              </div>

            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-neutral-300">
                Graduation Year
              </label>

              <input
                name="graduationYear"
                type="number"
                value={form.graduationYear}
                onChange={handleChange}
                placeholder="e.g. 2027"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
              />
            </div>

          </div>
        </div>

        <div className="flex justify-end border-t border-neutral-800 pt-6">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-xl bg-yellow-500 px-8 py-3.5 text-sm font-extrabold text-black transition hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default ProfileForm;