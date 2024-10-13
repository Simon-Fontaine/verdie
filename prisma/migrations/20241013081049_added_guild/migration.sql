-- CreateTable
CREATE TABLE "guild" (
    "id" VARCHAR(19) NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "language" VARCHAR(5) NOT NULL DEFAULT 'en-US',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guild_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "guild_id_idx" ON "guild"("id");
