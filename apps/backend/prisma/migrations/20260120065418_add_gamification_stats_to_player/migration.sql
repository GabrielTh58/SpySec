/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `missions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "players" ADD COLUMN     "completedMissionsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalStudySeconds" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "missions_order_key" ON "missions"("order");
