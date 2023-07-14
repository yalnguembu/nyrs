/*
  Warnings:

  - You are about to drop the column `summary` on the `Tag` table. All the data in the column will be lost.
  - Added the required column `description` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "summary",
ADD COLUMN     "description" TEXT NOT NULL;
