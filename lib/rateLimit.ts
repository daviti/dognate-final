import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwardedFor = h.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}

/**
 * Fixed-window rate limit backed by Postgres. Records an attempt and checks
 * whether `key` has exceeded `limit` attempts within the last `windowMs`.
 * Also opportunistically clears out this key's expired attempts so the
 * table doesn't grow unbounded.
 */
export async function checkRateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): Promise<{ allowed: boolean }> {
  const windowStart = new Date(Date.now() - windowMs);

  const [count] = await prisma.$transaction([
    prisma.rateLimitAttempt.count({
      where: { key, createdAt: { gte: windowStart } },
    }),
    prisma.rateLimitAttempt.deleteMany({
      where: { key, createdAt: { lt: windowStart } },
    }),
  ]);

  if (count >= limit) {
    return { allowed: false };
  }

  await prisma.rateLimitAttempt.create({ data: { key } });
  return { allowed: true };
}

export const RATE_LIMIT_MESSAGE = "Too many attempts. Please try again in a few minutes.";
