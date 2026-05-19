import { Request, Response } from 'express';
import * as eventService from '../services/event.service';

export async function createEvent(req: Request, res: Response) {
  const data = req.body;
  const ev = await eventService.createEvent(data);
  res.json(ev);
}