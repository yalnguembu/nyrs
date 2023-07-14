import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const query = async (callback: Function) => {
  try {
    const response = await callback();
    await prisma.$disconnect();
    return response;
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};
