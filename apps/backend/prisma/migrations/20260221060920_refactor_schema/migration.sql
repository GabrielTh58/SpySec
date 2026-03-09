-- CreateEnum
CREATE TYPE "feedback_mood" AS ENUM ('HAPPY', 'NEUTRAL', 'SAD');

-- CreateEnum
CREATE TYPE "feedback_status" AS ENUM ('PENDING', 'REVIEWED', 'RESOLVED');

-- CreateEnum
CREATE TYPE "feedback_type" AS ENUM ('BUG', 'IDEIA', 'OUTRO');

-- CreateTable
CREATE TABLE "chat_session" (
    "id" SERIAL NOT NULL,
    "session_id" VARCHAR(255) NOT NULL,
    "message" JSONB NOT NULL,

    CONSTRAINT "chat_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_feedback" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID,
    "user_email" TEXT,
    "user_name" TEXT,
    "user_level" INTEGER,
    "type" "feedback_type" NOT NULL,
    "message" TEXT NOT NULL,
    "mood" "feedback_mood",
    "page_url" TEXT,
    "user_agent" TEXT,
    "status" "feedback_status" DEFAULT 'PENDING',
    "admin_notes" TEXT,

    CONSTRAINT "system_feedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
