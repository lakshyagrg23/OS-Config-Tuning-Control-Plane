import prisma from '../db/prisma';

// Nodes are considered offline if no heartbeat received within this window
const HEARTBEAT_TIMEOUT_MS = 30_000; // 30 seconds (agent heartbeats every 10s)

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

/**
 * Called periodically by the control plane.
 * Marks any node that hasn't sent a heartbeat within HEARTBEAT_TIMEOUT_MS as 'offline'.
 */
export async function markStaleNodesOffline(): Promise<number> {
  const cutoff = new Date(Date.now() - HEARTBEAT_TIMEOUT_MS);
  const result = await prisma.node.updateMany({
    where: {
      lastSeen: { lt: cutoff },
      status: { not: 'offline' }, // skip already-offline nodes
    },
    data: { status: 'offline' },
  });
  return result.count;
}