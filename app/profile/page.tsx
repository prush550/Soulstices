import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb"; // make sure you have prisma client setup

export default async function ProfilePage() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      email: true,
      hobbiesAndInterests: true,
      bio: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-slate-800 text-white p-6 rounded-xl">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Hobbies & Interests:</strong> {user.hobbiesAndInterests || "—"}
      </p>
      <p>
        <strong>Bio:</strong> {user.bio || "—"}
      </p>
    </div>
  );
}
