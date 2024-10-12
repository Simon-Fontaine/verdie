-- CreateTable
CREATE TABLE "user" (
    "id" VARCHAR(19) NOT NULL,
    "username" VARCHAR(19),
    "discriminator" VARCHAR(4),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_id_idx" ON "user"("id");
