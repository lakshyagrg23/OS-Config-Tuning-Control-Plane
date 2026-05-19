import { Request, Response } from 'express';
import * as eventService from '../services/event.service';

export async function createEvent(req: Request, res: Response) {
  try {
    const data = req.body;
    const required = ['nodeId', 'param', 'process', 'decisionAction', 'finalAction', 'timestamp'];
    const missing = required.filter(f => data[f] === undefined || data[f] === null);
    if (missing.length > 0) {
      res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` });
      return;
    }
    const ev = await eventService.createEvent(data);
    res.status(201).json(ev);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}