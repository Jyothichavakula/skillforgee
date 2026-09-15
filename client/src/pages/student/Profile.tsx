import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileForm from "../../components/profile/ProfileForm";
import SkillsSection from "../../components/profile/SkillsSection";

import {
  useProfile,
  useUpdateProfile,
} from "../../hooks/useProfile";

function Profile() {
  const {
    data: user,
    isLoading,
    isError,
  } = useProfile();

  const updateMutation = useUpdateProfile();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-neutral-500">
          Loading profile...
        </p>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
        <h2 className="font-semibold text-red-500">
          Unable to load profile
        </h2>

        <p className="mt-1 text-sm text-red-400">
          Please try again later.
        </p>
      </div>
    );
  }

  const handleSkillsSave = (skills: string[]) => {
    updateMutation.mutate({ skills });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4 md:p-6 lg:p-8 pb-20">

      {/* Page Header */}
      <div className="mb-8 border-b border-neutral-800 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Profile & Settings
        </h1>

        <p className="mt-2 text-lg text-neutral-400">
          Manage your personal information and career profile.
        </p>
      </div>

      <ProfileHeader user={user} />

      <ProfileForm
        user={user}
        onSubmit={(data) =>
          updateMutation.mutate(data)
        }
        isSaving={updateMutation.isPending}
      />

      <SkillsSection
        skills={user.skills || []}
        onSave={handleSkillsSave}
        isSaving={updateMutation.isPending}
      />

      {updateMutation.isSuccess && (
        <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm font-bold text-green-500">
          Profile updated successfully.
        </div>
      )}

      {updateMutation.isError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-500">
          Failed to update profile. Please try again.
        </div>
      )}

    </div>
  );
}

export default Profile;