import prisma from "@/lib/prismadb";

interface User {
  id: string;
  name: string | null;
  hobbiesAndInterests: string | null;
  bio: string | null;
}

export default async function PublicProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const user: User | null = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      name: true,
      hobbiesAndInterests: true,
      bio: true,
    },
  });

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
        <p>User not found</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">{user.name}</h1>

        <h2 className="text-lg font-semibold mb-2">Hobbies & Interests</h2>
        <p className="mb-4">{user.hobbiesAndInterests || "Not specified"}</p>

        <h2 className="text-lg font-semibold mb-2">About Me</h2>
        <p className="tex
