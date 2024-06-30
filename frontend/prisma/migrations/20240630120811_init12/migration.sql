/*
  Warnings:

  - You are about to drop the `_BoardToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BoardToUser" DROP CONSTRAINT "_BoardToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BoardToUser" DROP CONSTRAINT "_BoardToUser_B_fkey";

-- DropTable
DROP TABLE "_BoardToUser";
