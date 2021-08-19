-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'BANNED', 'CONTENT', 'CREATOR', 'ADMIN');

-- CreateTable
CREATE TABLE "Auth" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "magic_word" TEXT NOT NULL,
    "username" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TEXT,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'BASIC',
    "token_version" INTEGER,
    "username" TEXT NOT NULL,
    "follow_ids" TEXT[],

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "createdAt" TEXT,
    "body" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyboard" (
    "id" TEXT NOT NULL,
    "extra_pcbs" BOOLEAN NOT NULL DEFAULT false,
    "extra_plates" BOOLEAN NOT NULL DEFAULT false,
    "about" TEXT,
    "alias" TEXT NOT NULL,
    "angle" TEXT,
    "brand" TEXT,
    "connection" TEXT,
    "firmware" TEXT,
    "mount" TEXT,
    "name" TEXT NOT NULL,
    "pcb" TEXT,
    "size" TEXT,
    "switch_support" TEXT,
    "images" TEXT[],
    "elastics" JSONB,
    "user_id" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth.email_unique" ON "Auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Auth.magic_word_unique" ON "Auth"("magic_word");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Keyboard.alias_unique" ON "Keyboard"("alias");

-- AddForeignKey
ALTER TABLE "Keyboard" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
