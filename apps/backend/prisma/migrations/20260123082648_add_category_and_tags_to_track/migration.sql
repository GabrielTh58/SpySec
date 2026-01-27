-- CreateEnum
CREATE TYPE "TrackCategory" AS ENUM ('MINDSET', 'DEVICES', 'CORPORATE', 'TRENDS');

-- AlterTable
ALTER TABLE "tracks" ADD COLUMN     "category" "TrackCategory" NOT NULL DEFAULT 'MINDSET',
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
