-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "field" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
