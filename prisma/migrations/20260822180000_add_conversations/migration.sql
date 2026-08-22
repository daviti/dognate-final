-- Step 1: create Conversation table (unique constraints added at the end, after dedup is guaranteed)
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "wishlistItemId" TEXT,
    "supplyId" TEXT,
    "posterId" TEXT NOT NULL,
    "inquirerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Conversation_posterId_idx" ON "Conversation"("posterId");
CREATE INDEX "Conversation_inquirerId_idx" ON "Conversation"("inquirerId");

ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_wishlistItemId_fkey" FOREIGN KEY ("wishlistItemId") REFERENCES "WishlistItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_supplyId_fkey" FOREIGN KEY ("supplyId") REFERENCES "Supply"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_inquirerId_fkey" FOREIGN KEY ("inquirerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Step 2: backfill Conversation rows from existing Message data, one row per
-- distinct (item, inquirer) pair. Recipient ("poster") is derived from the
-- item's own owner column.
INSERT INTO "Conversation" (id, "wishlistItemId", "posterId", "inquirerId", "createdAt")
SELECT
    md5(random()::text || clock_timestamp()::text),
    m."wishlistItemId",
    w."userId",
    m."fromUserId",
    MIN(m."createdAt")
FROM "Message" m
JOIN "WishlistItem" w ON w.id = m."wishlistItemId"
WHERE m."wishlistItemId" IS NOT NULL
GROUP BY m."wishlistItemId", w."userId", m."fromUserId";

INSERT INTO "Conversation" (id, "supplyId", "posterId", "inquirerId", "createdAt")
SELECT
    md5(random()::text || clock_timestamp()::text),
    m."supplyId",
    s."userId",
    m."fromUserId",
    MIN(m."createdAt")
FROM "Message" m
JOIN "Supply" s ON s.id = m."supplyId"
WHERE m."supplyId" IS NOT NULL
GROUP BY m."supplyId", s."userId", m."fromUserId";

-- Step 3: add new Message columns
ALTER TABLE "Message" ADD COLUMN "conversationId" TEXT;
ALTER TABLE "Message" ADD COLUMN "readAt" TIMESTAMP(3);

-- Step 4: point every existing Message at the Conversation just created for it
UPDATE "Message" m
SET "conversationId" = c.id
FROM "Conversation" c
WHERE m."wishlistItemId" IS NOT NULL
  AND c."wishlistItemId" = m."wishlistItemId"
  AND c."inquirerId" = m."fromUserId";

UPDATE "Message" m
SET "conversationId" = c.id
FROM "Conversation" c
WHERE m."supplyId" IS NOT NULL
  AND c."supplyId" = m."supplyId"
  AND c."inquirerId" = m."fromUserId";

-- Safety check: abort (and roll back the whole migration) if anything didn't map cleanly
DO $$
DECLARE
    orphan_count INTEGER;
BEGIN
    SELECT count(*) INTO orphan_count FROM "Message" WHERE "conversationId" IS NULL;
    IF orphan_count > 0 THEN
        RAISE EXCEPTION 'Migration aborted: % Message rows could not be mapped to a Conversation', orphan_count;
    END IF;
END $$;

-- Step 5: finalize the Message shape
ALTER TABLE "Message" DROP CONSTRAINT "Message_wishlistItemId_fkey";
ALTER TABLE "Message" DROP CONSTRAINT "Message_supplyId_fkey";
DROP INDEX "Message_wishlistItemId_idx";
DROP INDEX "Message_supplyId_idx";
ALTER TABLE "Message" DROP COLUMN "wishlistItemId";
ALTER TABLE "Message" DROP COLUMN "supplyId";

ALTER TABLE "Message" ALTER COLUMN "conversationId" SET NOT NULL;
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
CREATE INDEX "Message_conversationId_idx" ON "Message"("conversationId");

-- Step 6: now that the backfill grouping guarantees no duplicates, lock in
-- the "one conversation per item+inquirer" invariant
CREATE UNIQUE INDEX "Conversation_wishlistItemId_inquirerId_key" ON "Conversation"("wishlistItemId", "inquirerId");
CREATE UNIQUE INDEX "Conversation_supplyId_inquirerId_key" ON "Conversation"("supplyId", "inquirerId");
