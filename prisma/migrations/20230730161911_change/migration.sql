/*
  Warnings:

  - You are about to drop the column `languages` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "languages",
ADD COLUMN     "language" TEXT[];
