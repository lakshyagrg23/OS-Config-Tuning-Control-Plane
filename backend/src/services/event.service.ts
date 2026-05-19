import prisma from '../db/prisma';

export async function createEvent(data: any) {
  return prisma.event.create({ data });
}