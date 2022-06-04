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
CREATE TABLE "responsable" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "responsable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annonce" (
    "idannonce" TEXT NOT NULL,
    "contenue" TEXT NOT NULL,
    "Addedat" TIMESTAMP(3) NOT NULL,
    "idres" TEXT NOT NULL,

    CONSTRAINT "annonce_pkey" PRIMARY KEY ("idannonce")
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
    "docURL" TEXT NOT NULL,
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
    "mediaURL" TEXT NOT NULL DEFAULT E'',
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
CREATE TABLE "contenue" (
    "idcontent" TEXT NOT NULL,
    "contentURL" TEXT NOT NULL,
    "addedat" TIMESTAMP(3) NOT NULL,
    "resid" TEXT NOT NULL,
    "idplace" TEXT NOT NULL,

    CONSTRAINT "contenue_pkey" PRIMARY KEY ("idcontent")
);

-- CreateTable
CREATE TABLE "visiter" (
    "visiteurid" TEXT NOT NULL,
    "placeid" TEXT NOT NULL,

    CONSTRAINT "visiter_pkey" PRIMARY KEY ("visiteurid","placeid")
);

-- CreateTable
CREATE TABLE "circuitContent" (
    "circuitId" TEXT NOT NULL,
    "lieuId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "circuitContent_pkey" PRIMARY KEY ("circuitId","lieuId")
);

-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "lieuId" TEXT NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tourist_phoneNum_key" ON "tourist"("phoneNum");

-- AddForeignKey
ALTER TABLE "annonce" ADD CONSTRAINT "annonce_idres_fkey" FOREIGN KEY ("idres") REFERENCES "responsable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "contenue" ADD CONSTRAINT "contenue_resid_fkey" FOREIGN KEY ("resid") REFERENCES "responsable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contenue" ADD CONSTRAINT "contenue_idplace_fkey" FOREIGN KEY ("idplace") REFERENCES "lieu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visiter" ADD CONSTRAINT "visiter_visiteurid_fkey" FOREIGN KEY ("visiteurid") REFERENCES "tourist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visiter" ADD CONSTRAINT "visiter_placeid_fkey" FOREIGN KEY ("placeid") REFERENCES "lieu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "circuitContent" ADD CONSTRAINT "circuitContent_lieuId_fkey" FOREIGN KEY ("lieuId") REFERENCES "lieu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "circuitContent" ADD CONSTRAINT "circuitContent_circuitId_fkey" FOREIGN KEY ("circuitId") REFERENCES "circuit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_lieuId_fkey" FOREIGN KEY ("lieuId") REFERENCES "lieu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
