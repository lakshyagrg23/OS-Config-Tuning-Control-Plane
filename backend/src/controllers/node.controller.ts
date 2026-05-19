import { Request, Response } from 'express';
import * as nodeService from '../services/node.service';

export async function registerNode(req: Request, res: Response) {
  const { hostname, ipAddress, agentVersion } = req.body;
  const node = await nodeService.upsertNode({ hostname, ipAddress, agentVersion });
  res.json({ nodeId: node.id });
}

export async function heartbeat(req: Request, res: Response) {
  const { nodeId, status } = req.body;
  const node = await nodeService.updateHeartbeat(nodeId, status);
  res.json({ ok: true, lastSeen: node.lastSeen });
}