import GroupHome from "@/components/sections/groupDetails/GroupHome";
import { groups } from "@public/data/groups";

// Define page props interface that matches Next.js 15's expectations
interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Generate static paths
export async function generateStaticParams() {
  return groups.map((item) => ({
    id: item.id.toString(),
  }));
}

// Page component
export default async function GroupDetailsPage({ params }: PageProps) {
  // Resolve the params promise to get the id
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const singleGroup = groups.find((item) => item.id.toString() === id);

  return (
    <main>
      <GroupHome />
    </main>
  );
}
