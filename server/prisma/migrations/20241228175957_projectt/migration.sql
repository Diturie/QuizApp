-- CreateTable
CREATE TABLE "QuizSessions" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "quizId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizSessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuizSessions_email_quizId_key" ON "QuizSessions"("email", "quizId");
