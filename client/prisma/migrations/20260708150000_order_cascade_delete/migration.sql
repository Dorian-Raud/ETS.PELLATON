-- Permet à l'admin de supprimer une œuvre même si des commandes y sont liées :
-- la suppression d'une œuvre supprime désormais ses commandes en cascade.

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_artworkId_fkey";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;
