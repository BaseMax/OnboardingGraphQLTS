-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stepId" INTEGER NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
