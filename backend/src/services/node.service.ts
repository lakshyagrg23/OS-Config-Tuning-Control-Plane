import prisma from '../db/prisma';

export async function upsertNode({ hostname, ipAddress, agentVersion }: { hostname: string; ipAddress: string; agentVersion: string }) {
  const existing = await prisma.node.findUnique({ where: { hostname } as any }).catch(() => null);
  if (existing) {
    return prisma.node.update({ where: { id: existing.id }, data: { ipAddress, agentVersion, status: 'healthy', lastSeen: new Date() } });
  }
  return prisma.node.create({ data: { hostname, ipAddress, agentVersion, status: 'healthy', lastSeen: new Date() } });
}

export async function updateHeartbeat(nodeId: string, status: string) {
  return prisma.node.update({ where: { id: nodeId }, data: { status, lastSeen: new Date() } });
}