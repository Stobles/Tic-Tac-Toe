/*
  Warnings:

  - Made the column `connectionVer` on table `GamePlayer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GamePlayer" ALTER COLUMN "connectionVer" SET NOT NULL,
ALTER COLUMN "connectionVer" SET DEFAULT 1;
