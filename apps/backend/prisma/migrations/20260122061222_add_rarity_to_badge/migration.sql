-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('COMMON', 'RARE', 'EPIC', 'LEGENDARY');

-- AlterTable
ALTER TABLE "badges" ADD COLUMN     "rarity" "Rarity" NOT NULL DEFAULT 'COMMON';
