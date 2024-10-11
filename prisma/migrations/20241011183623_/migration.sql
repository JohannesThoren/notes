/*
  Warnings:

  - You are about to drop the column `password_salt` on the `user` table. All the data in the column will be lost.

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
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "session" TEXT NOT NULL,
    "session_expires" DATETIME NOT NULL
);
INSERT INTO "new_user" ("created", "email", "first_name", "id", "last_name", "password_hash", "session", "session_expires") SELECT "created", "email", "first_name", "id", "last_name", "password_hash", "session", "session_expires" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE UNIQUE INDEX "user_session_key" ON "user"("session");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
