/*
  Warnings:

  - You are about to drop the column `visibility` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- AlterTable
ALTER TABLE "Library" DROP COLUMN "visibility";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "libraryVisibility" "Visibility" NOT NULL DEFAULT 'private';

-- DropTable
DROP TABLE "Review";
