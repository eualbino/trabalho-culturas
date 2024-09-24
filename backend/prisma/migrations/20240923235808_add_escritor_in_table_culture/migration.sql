/*
  Warnings:

  - Added the required column `escritor` to the `Culture` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Culture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "escritor" TEXT NOT NULL,
    "regiao" TEXT NOT NULL,
    "tema" TEXT NOT NULL,
    "idioma" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL
);
INSERT INTO "new_Culture" ("conteudo", "id", "idioma", "name", "regiao", "tema") SELECT "conteudo", "id", "idioma", "name", "regiao", "tema" FROM "Culture";
DROP TABLE "Culture";
ALTER TABLE "new_Culture" RENAME TO "Culture";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
