/*
  Warnings:

  - Added the required column `step` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "step" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
