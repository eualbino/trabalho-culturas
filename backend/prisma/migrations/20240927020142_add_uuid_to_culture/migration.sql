/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Culture` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Culture" ADD COLUMN "uuid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Culture_uuid_key" ON "Culture"("uuid");
