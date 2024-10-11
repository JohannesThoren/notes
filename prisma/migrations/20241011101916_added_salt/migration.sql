/*
  Warnings:

  - Added the required column `password_salt` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_expires` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "password_salt" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "session" TEXT NOT NULL,
    "session_expires" DATETIME NOT NULL
);
INSERT INTO "new_user" ("created", "email", "first_name", "id", "last_name", "password_hash") SELECT "created", "email", "first_name", "id", "last_name", "password_hash" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
