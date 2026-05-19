import { Request, Response } from 'express';
import * as policyService from '../services/policy.service';

export async function getLatestPolicy(req: Request, res: Response) {
  try {
    const pol = await policyService.getLatestPolicy();
    if (!pol) {
      res.status(404).json({ error: 'No policy found' });
      return;
    }
    res.json({ version: pol.version, policy: pol.policyJson });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}