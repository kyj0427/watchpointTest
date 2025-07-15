import ProfileHeader from "@/components/sections/profile/ProfileHeader";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <ProfileHeader />
      {children}
    </main>
  );
}
