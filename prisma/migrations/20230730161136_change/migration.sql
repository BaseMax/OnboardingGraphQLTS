/*
  Warnings:

  - You are about to drop the column `addressDetail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `postCode` on the `User` table. All the data in the column will be lost.
  - Added the required column `address_detail` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `f_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `l_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_code` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "addressDetail",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "postCode",
ADD COLUMN     "address_detail" TEXT NOT NULL,
ADD COLUMN     "f_name" TEXT NOT NULL,
ADD COLUMN     "l_name" TEXT NOT NULL,
ADD COLUMN     "post_code" TEXT NOT NULL;
