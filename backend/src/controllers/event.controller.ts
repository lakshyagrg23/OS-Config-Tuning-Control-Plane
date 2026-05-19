import { Request, Response } from 'express';
import * as eventService from '../services/event.service';

export async function createEvent(req: Request, res: Response) {
  console.log(12344)
  try {
    const data = req.body;
    // All fields required by the DB schema (booleans must be present but can be false)
    const required = ['nodeId', 'param', 'process', 'decisionAction', 'finalAction', 'cooldownApplied', 'conflictDetected', 'timestamp'];
    const missing = required.filter(f => data[f] === undefined || data[f] === null);
    if (missing.length > 0) {
      res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` });
      return;
    }
    const ev = await eventService.createEvent(data);
    console.log(`[EVENT] 🚨 node=${data.nodeId.slice(0, 8)}… param=${data.param} process=${data.process} decision=${data.decisionAction} final=${data.finalAction}`);
    res.status(201).json(ev);
  } catch (err: any) {
    console.error(`[EVENT] ❌ Error: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
}

