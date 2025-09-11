// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Change these values if needed
  const email = "founder@soulstices.com";
  const plainPassword = "StrongPassword123"; // choose a secure password
  const name = "Founder";

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const founder = await prisma.user.upsert({
    where: { email },
    update: {}, // do nothing if already exists
    create: {
      name,
      email,
      password: hashedPassword,
      role: "FOUNDER",
    },
  });

  console.log("✅ Founder user created or already exists:");
  console.log(founder);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("❌ Error creating founder:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
