/*
  Warnings:

  - A unique constraint covering the columns `[trackId,order]` on the table `missions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "missions_order_key";

-- CreateIndex
CREATE UNIQUE INDEX "missions_trackId_order_key" ON "missions"("trackId", "order");
