/*
  Warnings:

  - A unique constraint covering the columns `[libraryId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Library" ADD COLUMN     "libraryId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "libraryId" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_libraryId_key" ON "User"("libraryId");
