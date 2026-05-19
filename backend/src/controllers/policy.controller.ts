import { Request, Response } from 'express';
import * as policyService from '../services/policy.service';

export async function getLatestPolicy(req: Request, res: Response) {
  const pol = await policyService.getLatestPolicy();
  if (!pol) return res.status(404).json({ error: 'no policy' });
  res.json({ version: pol.version, policy: pol.policyJson });
}