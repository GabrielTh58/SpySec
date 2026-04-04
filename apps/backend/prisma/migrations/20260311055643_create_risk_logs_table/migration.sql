-- CreateTable
CREATE TABLE "risk_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "missionId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "failedConcepts" TEXT[],
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "risk_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "risk_logs_userId_idx" ON "risk_logs"("userId");

-- AddForeignKey
ALTER TABLE "risk_logs" ADD CONSTRAINT "risk_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
