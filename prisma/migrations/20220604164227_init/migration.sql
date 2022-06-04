-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "lieuId" TEXT NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_lieuId_fkey" FOREIGN KEY ("lieuId") REFERENCES "lieu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
