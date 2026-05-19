import prisma from '../db/prisma';

export async function upsertNode({
  nodeId,
  hostname,
  ipAddress,
  agentVersion,
}: {
  nodeId?: string;
  hostname: string;
  ipAddress: string;
  agentVersion: string;
}) {
  return prisma.node.upsert({
    where: { hostname },
    update: { ipAddress, agentVersion, status: 'healthy', lastSeen: new Date() },
    create: {
      // Use agent-provided nodeId as PK so heartbeats match immediately.
      // If absent (e.g. direct API call), Prisma falls back to @default(cuid()).
      ...(nodeId ? { id: nodeId } : {}),
      hostname,
      ipAddress,
      agentVersion,
      status: 'healthy',
      lastSeen: new Date(),
    },
  });
}

export async function updateHeartbeat(nodeId: string, status: string) {
  const existing = await prisma.node.findUnique({ where: { id: nodeId } });
  if (!existing) {
    throw new Error(`Node not found: ${nodeId}. Agent must register before sending heartbeats.`);
  }
  return prisma.node.update({
    where: { id: nodeId },
    data: { status: status || 'healthy', lastSeen: new Date() },
  });
}