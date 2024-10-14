/*
  Warnings:

  - Made the column `username` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "guild" ADD COLUMN     "name" VARCHAR(100) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "username" SET DATA TYPE VARCHAR(32);
