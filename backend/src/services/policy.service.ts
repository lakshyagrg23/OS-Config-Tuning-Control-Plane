import prisma from '../db/prisma';

export async function getLatestPolicy() {
  return prisma.policy.findFirst({ orderBy: { createdAt: 'desc' } });
}