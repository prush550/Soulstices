import prisma from "@/lib/prismadb";

interface Props {
  params: { id: string };
}

export default async function PublicProfilePage({ params }: Props) {
  const user = await prisma.user.findUnique({
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
        <p className="text-gray-300">
          {user.bio || "This user has not written a bio yet."}
        </p>
      </div>
    </div>
  );
}
