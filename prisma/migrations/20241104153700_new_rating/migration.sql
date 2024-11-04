-- AlterEnum
ALTER TYPE "BookReview" ADD VALUE 'unrated';

-- AlterTable
ALTER TABLE "Library" ALTER COLUMN "bookReview" DROP NOT NULL;
