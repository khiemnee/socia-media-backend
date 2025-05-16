-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_postById_fkey";

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "postById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_postById_fkey" FOREIGN KEY ("postById") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
