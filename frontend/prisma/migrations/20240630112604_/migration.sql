/*
  Warnings:

  - A unique constraint covering the columns `[AdminId]` on the table `Board` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `state` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "state" JSONB NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'First Board';

-- CreateIndex
CREATE UNIQUE INDEX "Board_AdminId_key" ON "Board"("AdminId");
