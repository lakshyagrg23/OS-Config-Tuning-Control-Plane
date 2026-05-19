import { Request, Response } from 'express';
import * as nodeService from '../services/node.service';

export async function registerNode(req: Request, res: Response) {
  try {
    const { nodeId, hostname, ipAddress, agentVersion } = req.body;
    if (!hostname || !ipAddress) {
      res.status(400).json({ error: 'hostname and ipAddress are required' });
      return;
    }
    const node = await nodeService.upsertNode({ nodeId, hostname, ipAddress, agentVersion });
    res.json({ nodeId: node.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function heartbeat(req: Request, res: Response) {
  try {
    const { nodeId, status } = req.body;
    if (!nodeId) {
      res.status(400).json({ error: 'nodeId is required' });
      return;
    }
    const node = await nodeService.updateHeartbeat(nodeId, status);
    res.json({ ok: true, lastSeen: node.lastSeen });
  } catch (err: any) {
    const isNotFound = err.message?.includes('Node not found');
    res.status(isNotFound ? 404 : 500).json({ error: err.message });
  }
}