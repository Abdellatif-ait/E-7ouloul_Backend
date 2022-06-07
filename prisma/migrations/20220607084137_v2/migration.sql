/*
  Warnings:

  - Added the required column `lieuId` to the `responsable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "responsable" ADD COLUMN     "lieuId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "responsable" ADD CONSTRAINT "responsable_lieuId_fkey" FOREIGN KEY ("lieuId") REFERENCES "lieu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
