-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "AdminId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BoardToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BoardToUser_AB_unique" ON "_BoardToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BoardToUser_B_index" ON "_BoardToUser"("B");

-- AddForeignKey
ALTER TABLE "_BoardToUser" ADD CONSTRAINT "_BoardToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardToUser" ADD CONSTRAINT "_BoardToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
