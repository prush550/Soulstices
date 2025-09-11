// prisma/seed.mjs
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "mail.soulstices@gmail.com";           // change if you want
  const plainPassword = "Jmjnap@550";        // change to a secure password
  const name = "Founder";

  // Hash the password
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // Upsert: if user exists, skip creating; otherwise create
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("Founder already exists:", existing.email);
    return;
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "FOUNDER",
    },
  });

  console.log("Created founder:", user.email);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
