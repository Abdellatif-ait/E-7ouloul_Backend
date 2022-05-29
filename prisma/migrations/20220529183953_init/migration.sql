-- CreateTable
CREATE TABLE "tourist" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "phoneNum" TEXT NOT NULL,

    CONSTRAINT "tourist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lieu" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "accesstimebeg" TIMESTAMP(3) NOT NULL,
    "accesstimend" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lieu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documentation" (
    "id" TEXT NOT NULL,
    "lieuid" TEXT NOT NULL,

    CONSTRAINT "Documentation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qrCode" (
    "id" TEXT NOT NULL,
    "lieuid" TEXT NOT NULL,

    CONSTRAINT "qrCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" TEXT NOT NULL,
    "postedat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "touristid" TEXT NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "circuit" (
    "id" TEXT NOT NULL,
    "touristid" TEXT NOT NULL,

    CONSTRAINT "circuit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "abonne" (
    "aboneeid" TEXT NOT NULL,
    "abonnementsid" TEXT NOT NULL,

    CONSTRAINT "abonne_pkey" PRIMARY KEY ("aboneeid","abonnementsid")
);

-- CreateTable
CREATE TABLE "visiter" (
    "visiteurid" TEXT NOT NULL,
    "placeid" TEXT NOT NULL,

    CONSTRAINT "visiter_pkey" PRIMARY KEY ("visiteurid","placeid")
);

-- CreateIndex
CREATE UNIQUE INDEX "tourist_phoneNum_key" ON "tourist"("phoneNum");

-- AddForeignKey
ALTER TABLE "Documentation" ADD CONSTRAINT "Documentation_lieuid_fkey" FOREIGN KEY ("lieuid") REFERENCES "lieu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qrCode" ADD CONSTRAINT "qrCode_lieuid_fkey" FOREIGN KEY ("lieuid") REFERENCES "lieu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_touristid_fkey" FOREIGN KEY ("touristid") REFERENCES "tourist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "circuit" ADD CONSTRAINT "circuit_touristid_fkey" FOREIGN KEY ("touristid") REFERENCES "tourist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "abonne" ADD CONSTRAINT "abonne_aboneeid_fkey" FOREIGN KEY ("aboneeid") REFERENCES "tourist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "abonne" ADD CONSTRAINT "abonne_abonnementsid_fkey" FOREIGN KEY ("abonnementsid") REFERENCES "tourist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visiter" ADD CONSTRAINT "visiter_visiteurid_fkey" FOREIGN KEY ("visiteurid") REFERENCES "tourist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visiter" ADD CONSTRAINT "visiter_placeid_fkey" FOREIGN KEY ("placeid") REFERENCES "lieu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
