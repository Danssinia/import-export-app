/*
  Warnings:

  - Changed the type of `totalCount` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `soldCount` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "totalCount",
ADD COLUMN     "totalCount" INTEGER NOT NULL,
DROP COLUMN "soldCount",
ADD COLUMN     "soldCount" INTEGER NOT NULL;
