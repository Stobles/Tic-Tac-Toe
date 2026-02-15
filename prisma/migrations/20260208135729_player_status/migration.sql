/*
  Warnings:

  - Added the required column `status` to the `GamePlayer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlayerStatus" AS ENUM ('connected', 'disconnected', 'forfeited');

-- AlterTable
ALTER TABLE "GamePlayer" ADD COLUMN     "status" "PlayerStatus" NOT NULL;
