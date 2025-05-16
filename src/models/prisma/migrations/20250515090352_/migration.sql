/*
  Warnings:

  - A unique constraint covering the columns `[authorById,postById]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[followersById,followingById]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userById,postById]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `message` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "message" TEXT NOT NULL,
ALTER COLUMN "readed" DROP NOT NULL,
ALTER COLUMN "readed" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "views" DROP NOT NULL,
ALTER COLUMN "views" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Comment_authorById_postById_key" ON "Comment"("authorById", "postById");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followersById_followingById_key" ON "Follow"("followersById", "followingById");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userById_postById_key" ON "Like"("userById", "postById");
